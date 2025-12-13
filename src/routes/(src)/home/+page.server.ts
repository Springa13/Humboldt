// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { words, sentences } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';


export const load: PageServerLoad = async ({ locals, parent }) => {
  const data = await parent();
  const user = data.userInfo;

  if (!user?.targetLanguage) {
    return {
      stats: {
        language: '??',
        wordCount: 0,
        sentenceCount: 0,
      },
    };
  }

  const langCode = user.targetLanguage;

  // Count words and sentences in one query (super fast)
  const [wordCount, sentenceCount] = await Promise.all([
    // Count words
    db.select({ value: count() })
      .from(words)
      .where(eq(words.languageCode, langCode)),

    // Count sentences (only those linked to words in the target language)
    db.select({ value: count() })
      .from(sentences)
      .innerJoin(words, eq(sentences.wordId, words.id))
      .where(eq(words.languageCode, langCode)),
  ]);

  return {
    stats: {
      language: langCode.toUpperCase(),
      wordCount: Number(wordCount[0]?.value ?? 0),
      sentenceCount: Number(sentenceCount[0]?.value ?? 0),
    },
  };
};