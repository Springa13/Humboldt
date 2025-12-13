// src/routes/(app)/admin/words/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { sentences, words } from '$lib/server/db/schema';
import { error, fail } from '@sveltejs/kit';
import { eq, and, ilike } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  // Optional: show last 10 added words
  const recent = await db
    .select()
    .from(words)
    .limit(10);

  return { recent };
};

export const actions: Actions = {
  addWord: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const data = await request.formData();
    const word = data.get('word')?.toString().trim();
    const translation = data.get('translation')?.toString().trim();
    const languageCode = data.get('languageCode')?.toString().trim() || 'es';
    const alternativeTranslations = '';

    if (!word || !translation) {
      return fail(400, { error: 'Word and translation are required' });
    }

    try {
      await db.insert(words).values({
        word,
        translation,
        languageCode,
        pronunciation: data.get('pronunciation')?.toString() || null,
        alternativeTranslations: data.get('alternativeTranslations')?.toString() || null,
        partOfSpeech: data.get('partOfSpeech')?.toString() || null,
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Failed to save word' });
    }
  },
  // 2. NEW: Bulk CSV import
  importWordCSV: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const formData = await request.formData();
    const file = formData.get('csv') as File;

    if (!file || file.size === 0) {
      return fail(400, { error: 'Please upload a CSV file' });
    }

    const text = await file.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());

    // Expected columns (you can customize)
    const required = ['word', 'translation'];
    const missing = required.filter(col => !headers.includes(col));
    if (missing.length > 0) {
      return fail(400, { error: `Missing columns: ${missing.join(', ')}` });
    }

    let added = 0;
    let skipped = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      if (values.length < headers.length || values.every(v => !v)) {
        skipped++;
        continue; // skip empty rows
      }

      const row: any = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || null;
      });


      // Default language if not provided
      row.languageCode = row.languagecode || row.language || 'es';
      row.alternativeTranslations = row.alternativetranslations?.split('/');
      row.inflections = row.inflections?.split(';');

      try {
        await db.insert(words).values({
          word: row.word,
          translation: row.translation,
          languageCode: row.languageCode,
          pronunciation: row.pronunciation || null,
          audioUrl: row.audioUrl || null,
          partOfSpeech: row.partofspeech || row.pos || null,
          alternativeTranslations: row.alternativeTranslations || null,
          inflections: row.inflections || null,
        });
        added++;
      } catch (err) {
        skipped++; // duplicate or bad data
      }
    }

    return { success: true, added, skipped };
  },
  addSentence: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const data = await request.formData();
    const word = data.get('word')?.toString().trim();
    const languageCode = data.get('languageCode')?.toString().trim() || 'es';
    const targetSentence = data.get('targetSentence')?.toString().trim();
    const translatedSentence = data.get('translatedSentence')?.toString().trim();
    const audioUrl = data.get('audioUrl')?.toString().trim();

    console.log(word)
    console.log(languageCode)
    

    if (!word || !targetSentence || !translatedSentence) {
      return fail(400, { error: 'Word and translation are required' });
    }

    const users_word = await db.select()
      .from(words)
      .where(and(eq(words.word, word), eq(words.languageCode, languageCode)))
      .then((rows) => rows[0]);

    console.log(users_word)

    try {
      // if (users_word == undefined) { throw error }
      await db.insert(sentences).values({
        wordId: users_word.id,
        languageCode,
        targetSentence,
        translatedSentence,
        audioUrl
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Failed to save word' });
    }
  },
  // 2. NEW: Bulk CSV import
  importSentenceCSV: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const formData = await request.formData();
    const file = formData.get('csv') as File;
    if (!file || file.size === 0) return fail(400, { error: 'No file uploaded' });

    const text = await file.text();
    const lines = text.trim().split(/\r?\n/); // handles both \n and \r\n

    // Simple but robust CSV parser (handles quotes + commas inside fields)
    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let field = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          result.push(field.trim());
          field = '';
        } else {
          field += char;
        }
      }
      result.push(field.trim());
      return result.map(f => f.replace(/^"|"$/g, '')); // strip surrounding quotes
    };

    const headers = parseLine(lines[0]).map(h => h.toLowerCase().trim());

    let added = 0;
    let skipped = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      if (values.length < 4 || values.every(v => !v)) {
        skipped++;
        continue;
      }

      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });

      const wordText = row.word?.trim();
      const langCode = row.languagecode?.trim() || 'es';
      const target = row.targetsentence?.trim();
      const translated = row.translatedsentence?.trim();
      const audio = row.audiourl?.trim() || null;

      if (!wordText || !target || !translated) {
        console.warn('Skipping incomplete row:', row);
        skipped++;
        continue;
      }

      // Find the word (case-insensitive)
      const wordRecord = await db
        .select()
        .from(words)
        .where(
          and(
            ilike(words.word, wordText),
            ilike(words.languageCode, langCode)
          )
        )
        .then(rows => rows[0]);

      if (!wordRecord) {
        console.warn(`Word not found: "${wordText}" (${langCode})`);
        skipped++;
        continue;
      }

      try {
        await db.insert(sentences).values({
          wordId: wordRecord.id,
          languageCode: langCode,
          targetSentence: target,
          translatedSentence: translated,
          audioUrl: audio,
        });
        added++;
      } catch (err: any) {
        if (err?.code === '23505') {
          // Duplicate sentence — ignore
        } else {
          console.error('Insert error:', err);
        }
        skipped++;
      }
    }

    return { success: true, message: `Imported ${added} sentences${skipped > 0 ? `, skipped ${skipped}` : ''}` };
  }
};