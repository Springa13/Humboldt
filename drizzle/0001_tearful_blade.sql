ALTER TABLE "words" ALTER COLUMN "alternative_translations" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "words" ALTER COLUMN "inflections" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;