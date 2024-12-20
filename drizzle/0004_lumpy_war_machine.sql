CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"createdBy" uuid NOT NULL,
	"img" varchar(256),
	"last_name" varchar(50) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(300) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"metadata" jsonb,
	"dob" varchar(50),
	"nationality" varchar(50),
	"district" varchar(50),
	"languages" text[] DEFAULT ARRAY[]::text[],
	"res_address" varchar(50),
	"phone_2" varchar(20),
	"fathers_name" varchar(50),
	"mothers_name" varchar(50),
	"fathers_hometown" varchar(50),
	"mothers_hometown" varchar(50),
	"nxt_of_kin" varchar(50),
	"nxt_of_kin_phone" varchar(20),
	"baptised" boolean DEFAULT false,
	"type_of_baptism" varchar(50),
	"name_of_previous_church" varchar(50),
	"reasons_for_leaving" varchar(50),
	"name_of_spouse" varchar(50),
	"occupation_of_spouse" varchar(50),
	"spouse_religion" varchar(50),
	"no_of_children" varchar(50),
	"marriage_date" varchar(50),
	"names_of_children" text[] DEFAULT ARRAY[]::text[],
	"level_of_education" varchar(50),
	"occupation" varchar(50),
	"hobies" text[] DEFAULT ARRAY[]::text[],
	"talent" text,
	"thith_with_spouse" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_createdBy_useradmin_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."useradmin"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_profile" ADD CONSTRAINT "users_profile_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
