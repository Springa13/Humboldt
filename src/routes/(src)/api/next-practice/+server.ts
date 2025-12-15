import { db } from '$lib/server/db/';
import { sentences, words } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { sql, eq } from 'drizzle-orm';

export const GET = async ({ locals }) => {
    
  const user = locals.user;

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userInfo = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, user.id),
  });

  const targetLang = userInfo?.targetLanguage;

  if (!targetLang) {
    return json({ error: 'No target language set' }, { status: 400 });
  }
  // ... your existing random sentence query ...
  const practiceItem = await db
    .select({
      sentence: {
        id: sentences.id,
        targetSentence: sentences.targetSentence,
        translatedSentence: sentences.translatedSentence,
        audioUrl: sentences.audioUrl,
      },
      word: {
        id: words.id,
        word: words.word,
        languageCode: words.languageCode,
        translation: words.translation,
        pronunciation: words.pronunciation,
        partOfSpeech: words.partOfSpeech,
        alternativeTranslations: words.alternativeTranslations,
        inflections: words.inflections
      },
    })
    .from(sentences)
    .innerJoin(words, eq(sentences.wordId, words.id))
    .where(eq(words.languageCode, targetLang))
    .orderBy(sql`RANDOM()`)   // ← PostgreSQL random
    // .orderBy(sql`rand()`)   // ← MySQL
    // .orderBy(() => sql`RANDOM()`) // ← if above doesn't work
    .limit(1)
    .then(rows => rows[0] ?? null);

  return json({ practice: practiceItem });
};