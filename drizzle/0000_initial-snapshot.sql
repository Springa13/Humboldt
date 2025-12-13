CREATE TABLE "sentences" (
	"id" serial PRIMARY KEY NOT NULL,
	"word_id" integer NOT NULL,
	"language_code" varchar(10) NOT NULL,
	"target_sentence" text NOT NULL,
	"translated_sentence" text NOT NULL,
	"audio_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"native_language" varchar(10) NOT NULL,
	"target_language" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"language_code" varchar(10) NOT NULL,
	"word" varchar(255) NOT NULL,
	"translation" varchar(255) NOT NULL,
	"alternative_translations" jsonb[] DEFAULT '{}',
	"pronunciation" varchar(255),
	"audio_url" text,
	"part_of_speech" varchar(50),
	"inflections" jsonb[] DEFAULT '{}'
);
--> statement-breakpoint
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "words_language_idx" ON "words" USING btree ("language_code");