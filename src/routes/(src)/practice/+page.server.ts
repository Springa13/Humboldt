// src/routes/(app)/practice/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { words, sentences } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { sql } from 'drizzle-orm';


// export const load: PageServerLoad = async ({ parent }) => {
//   const { userInfo } = await parent();
//   const targetLang = userInfo.targetLanguage

//   // Get ONE random sentence + its full word data
//   const practiceItem = await db
//     .select({
//       sentence: {
//         id: sentences.id,
//         targetSentence: sentences.targetSentence,
//         translatedSentence: sentences.translatedSentence,
//         audioUrl: sentences.audioUrl,
//       },
//       word: {
//         id: words.id,
//         word: words.word,
//         translation: words.translation,
//         pronunciation: words.pronunciation,
//         partOfSpeech: words.partOfSpeech,
//         alternativeTranslations: words.alternativeTranslations
//       },
//     })
//     .from(sentences)
//     .innerJoin(words, eq(sentences.wordId, words.id))
//     .where(eq(words.languageCode, targetLang))
//     .orderBy(sql`RANDOM()`)   // ← PostgreSQL random
//     // .orderBy(sql`rand()`)   // ← MySQL
//     // .orderBy(() => sql`RANDOM()`) // ← if above doesn't work
//     .limit(1)
//     .then(rows => rows[0] ?? null);

//   // Optional: fallback if no sentences exist yet
//   if (!practiceItem) {
//     return {
//       practice: null,
//       message: "No sentences yet! Add some in Admin → Sentences",
//     };
//   }

//   return {
//     practice: practiceItem,
//   };
// };