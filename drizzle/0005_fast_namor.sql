CREATE TYPE "public"."emstatus" AS ENUM('Self Employed', 'Employed', 'Unemployed', 'Student', 'pensioner', 'apprentice');--> statement-breakpoint
CREATE TYPE "public"."user_gender" AS ENUM('M', 'F');--> statement-breakpoint
CREATE TYPE "public"."mstatus" AS ENUM('Married', 'Single', 'Divorced', 'widowed', 'Separated');--> statement-breakpoint
CREATE TYPE "public"."ministryStatus" AS ENUM('Children Ministry', 'Womens Ministry', 'Youth Ministry', 'Men Ministry');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" "user_gender" DEFAULT 'M';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "ministry" "ministryStatus" DEFAULT 'Youth Ministry';--> statement-breakpoint
ALTER TABLE "users_profile" ADD COLUMN "marital_status" "mstatus" DEFAULT 'Single';--> statement-breakpoint
ALTER TABLE "users_profile" ADD COLUMN "employment_status" "emstatus" DEFAULT 'Employed';