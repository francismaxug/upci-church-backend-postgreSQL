ALTER TABLE "users" ADD COLUMN "memberId" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "raw_password" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_memberId_unique" UNIQUE("memberId");