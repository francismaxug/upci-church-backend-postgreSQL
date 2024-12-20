CREATE TABLE IF NOT EXISTS "children" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"img" varchar(256),
	"mothers_name" varchar(50),
	"fathers_name" varchar(50),
	"gender" "user_gender" DEFAULT 'M',
	"parents_availability" "pAvailability" DEFAULT 'Both Parents Alive',
	"name_of_guardian" varchar(50) NOT NULL,
	"level_of_education" varchar(50) NOT NULL,
	"gaurdian_phone" varchar(20) NOT NULL,
	"school_name" varchar(50) NOT NULL,
	"isBaptised" boolean DEFAULT false NOT NULL,
	"hobbies" text[] DEFAULT ARRAY[]::text[],
	"dob" varchar(50) NOT NULL,
	"ministry" varchar(50) DEFAULT 'Children Ministry',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "children-schema" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "children" ADD CONSTRAINT "children_created_by_useradmin_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."useradmin"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
