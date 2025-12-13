// src/routes/learn/[languageCode]/[word]/+page.server.ts
import { db } from '$lib/server/db';
import { sentences, words } from '$lib/server/db/schema';
import { error } from 'console';
import type { PageServerLoad } from '../../../library/$types';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  const { languageCode, word } = params;

  // Example: fetch the word from DB
  const wordData = await db
    .select()
    .from(words)
    .where(
      and(
        eq(words.languageCode, languageCode),
        eq(words.word, word)  // case-sensitive! use ilike() if needed
      )
    )
    .then(rows => rows[0]);

    // Get all sentences for a word by word.id
    const sentencesForWord = await db
    .select({
        id: sentences.id,
        targetSentence: sentences.targetSentence,
        translatedSentence: sentences.translatedSentence,
        audioUrl: sentences.audioUrl,
        createdAt: sentences.createdAt,
    })
    .from(sentences)
    .where(eq(sentences.wordId, wordData.id))  // ← wordId is the integer ID from words table
    .orderBy(sentences.createdAt);

  if (!wordData) {
    throw error(404, 'Word not found');
  }

  return {
    languageCode,
    wordData: wordData,
    sentencesForWord
  };
};