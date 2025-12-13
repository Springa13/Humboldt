import { relations } from "drizzle-orm/relations";
import { user, session, users, words, sentences } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	users: many(users),
}));

export const usersRelations = relations(users, ({one}) => ({
	user: one(user, {
		fields: [users.id],
		references: [user.id]
	}),
}));

export const sentencesRelations = relations(sentences, ({one}) => ({
	word: one(words, {
		fields: [sentences.wordId],
		references: [words.id]
	}),
}));

export const wordsRelations = relations(words, ({many}) => ({
	sentences: many(sentences),
}));