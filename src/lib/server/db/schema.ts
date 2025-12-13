import { pgTable, serial, integer, text, varchar, timestamp, index, foreignKey, jsonb, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// ──────────────────────────────────────────────────────────────
// 2. Your app-specific tables (minimal random-word mode)
// ──────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }), // links to Lucia user

  nativeLanguage: varchar('native_language', { length: 10 }).notNull(), // e.g. "en"
  targetLanguage: varchar('target_language', { length: 10 }).notNull(), // e.g. "es"

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  languageCode: varchar('language_code', { length: 10 }).notNull(),

  word: varchar('word', { length: 255 }).notNull(),
  translation: varchar('translation', { length: 255 }).notNull(),
  alternativeTranslations: jsonb('alternative_translations').array().$type<string[]>(),  // No default
  pronunciation: varchar('pronunciation', { length: 255 }),
  audioUrl: text('audio_url'),
  partOfSpeech: varchar('part_of_speech', { length: 50 }),
  inflections: jsonb('inflections').array().$type<string[]>(),  // No default

}, (table) => ({
  languageIdx: index('words_language_idx').on(table.languageCode),
}));

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey(),
  wordId: integer('word_id').notNull(),           // links to words.id
  languageCode: varchar('language_code', { length: 10 }).notNull(), 
  targetSentence: text('target_sentence').notNull(),   // e.g. "Me gusta el gato"
  translatedSentence: text('translated_sentence').notNull(),   // e.g. "I like the cat"
  audioUrl: text('audio_url'),                 // optional TTS or uploaded
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  // Foreign key to words.id (enforces referential integrity)
  wordFk: foreignKey({
    columns: [table.wordId],
    foreignColumns: [words.id],
    name: 'sentences_word_id_fkey'
  })
}));

// ──────────────────────────────────────────────────────────────
// Types (optional but nice)
// ──────────────────────────────────────────────────────────────
export type Session = typeof session.$inferSelect;
export type AuthUser = typeof user.$inferSelect;
export type AppUser = typeof users.$inferSelect;
export type Word = typeof words.$inferSelect;