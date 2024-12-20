ALTER TABLE "children" DROP CONSTRAINT "children_created_by_useradmin_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "children" ADD CONSTRAINT "children_created_by_useradmin_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."useradmin"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
