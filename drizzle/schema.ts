import { pgTable, unique, text, foreignKey, timestamp, varchar, index, serial, jsonb, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	username: text().notNull(),
	passwordHash: text("password_hash").notNull(),
}, (table) => [
	unique("user_username_unique").on(table.username),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	nativeLanguage: varchar("native_language", { length: 10 }).notNull(),
	targetLanguage: varchar("target_language", { length: 10 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [user.id],
			name: "users_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const words = pgTable("words", {
	id: serial().primaryKey().notNull(),
	languageCode: varchar("language_code", { length: 10 }).notNull(),
	word: varchar({ length: 255 }).notNull(),
	translation: varchar({ length: 255 }).notNull(),
	pronunciation: varchar({ length: 255 }),
	audioUrl: text("audio_url"),
	partOfSpeech: varchar("part_of_speech", { length: 50 }),
	alternativeTranslations: jsonb("alternative_translations").array(),
}, (table) => [
	index("words_language_idx").using("btree", table.languageCode.asc().nullsLast().op("text_ops")),
]);

export const sentences = pgTable("sentences", {
	id: serial().primaryKey().notNull(),
	wordId: integer("word_id").notNull(),
	languageCode: varchar("language_code", { length: 10 }).notNull(),
	targetSentence: text("target_sentence").notNull(),
	translatedSentence: text("translated_sentence").notNull(),
	audioUrl: text("audio_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.wordId],
			foreignColumns: [words.id],
			name: "sentences_word_id_fkey"
		}),
]);
