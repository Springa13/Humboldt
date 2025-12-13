// src/routes/(app)/library/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { words } from '$lib/server/db/schema';
import { eq, ilike, and, count } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url, locals, parent }) => {
  // This comes from your (app)/+layout.server.ts
  
  const data = await parent();
  const user = data.userInfo;
  if (!user?.targetLanguage) {
    return { words: [], total: 0, search: '' };
  }

  const targetLang = user.targetLanguage;

  // Optional: search term from URL (e.g. ?q=casa)
  const search = url.searchParams.get('q')?.trim() || '';

  // Optional: pagination
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = 150;
  const offset = (page - 1) * limit;

  // Build the WHERE clause
  const whereClause = search
    ? and(
        eq(words.languageCode, targetLang),
        ilike(words.word, `%${search}%`)
      )
    : eq(words.languageCode, targetLang);

  // Fetch words + total count in parallel (super fast)
  const [wordList, totalResult] = await Promise.all([
    db
      .select({
        id: words.id,
        word: words.word,
        translation: words.translation,
        pronunciation: words.pronunciation,
        // exampleSentence: words.exampleSentence,
        // exampleTranslation: words.exampleTranslation,
        partOfSpeech: words.partOfSpeech,
      })
      .from(words)
      .where(whereClause)
      .orderBy(words.word)
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(words)
      .where(whereClause)
      .then(rows => rows[0]?.count || 0),
  ]);

  return {
    words: wordList,
    total: Number(totalResult),
    search,
    page,
    hasMore: offset + wordList.length < Number(totalResult),
    targetLanguage: targetLang,
  };
};