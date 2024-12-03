CREATE TABLE IF NOT EXISTS "useradmin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adminID" varchar(15) NOT NULL,
	"role" varchar(15) DEFAULT 'User' NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50) NOT NULL,
	"email" varchar(100) DEFAULT '',
	"country" varchar(50) DEFAULT '',
	"region" varchar(50) DEFAULT '',
	"placeOfResidence" varchar(50) DEFAULT '',
	"phoneNumber" varchar(15) NOT NULL,
	"address" text,
	"zipCode" varchar(15) DEFAULT '',
	"cloudianryPublicId" varchar(100) DEFAULT '',
	"languages" text[] DEFAULT ARRAY[]::text[],
	"password" varchar(200) NOT NULL,
	"position" varchar(50) DEFAULT 'Head Pastor',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"isSubmitFullDetails" boolean DEFAULT false,
	"profileImage" varchar(256) DEFAULT '',
	"status" varchar(15) DEFAULT 'Active',
	CONSTRAINT "useradmin_adminID_unique" UNIQUE("adminID"),
	CONSTRAINT "useradmin_phoneNumber_unique" UNIQUE("phoneNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"code" char(5) DEFAULT '00000',
	"isUsed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "geolocation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"ipAddress" varchar(30),
	"country" varchar(30),
	"region" varchar(30),
	"city" varchar(30),
	"countryCode" varchar(30),
	"name" varchar(30),
	"role" varchar(30),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code" ADD CONSTRAINT "code_admin_id_useradmin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."useradmin"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_admin_id_useradmin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."useradmin"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
