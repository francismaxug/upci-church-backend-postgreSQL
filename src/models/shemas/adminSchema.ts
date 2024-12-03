import { sql } from "drizzle-orm"
import {
  PgTable,
  varchar,
  uuid,
  integer,
  text,
  boolean,
  pgTable,
  timestamp
} from "drizzle-orm/pg-core"
import { z } from "zod"
import { createInsertSchema } from "drizzle-zod"

export const adminSchema = pgTable("useradmin", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  adminID: varchar({ length: 15 }).unique().notNull(),
  role: varchar({ length: 15 }).notNull().default("User"),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 100 }).default(""),
  country: varchar({ length: 50 }).default(""),
  region: varchar({ length: 50 }).default(""),
  placeOfResidence: varchar({ length: 50 }).default(""),
  phoneNumber: varchar({ length: 15 }).unique().notNull(),
  address: text(),
  zipCode: varchar({ length: 15 }).default(""),
  cloudianryPublicId: varchar({ length: 100 }).default(""),
  languages: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  password: varchar({ length: 200 }).notNull(),
  position: varchar({ length: 50 }).default("Head Pastor"),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
  isSubmitFullDetails: boolean().default(false),
  profileImage: varchar({ length: 256 }).default(""),
  status: varchar({ length: 15 }).default("Active")
})

export const insertAdminSchema = createInsertSchema(adminSchema, {
  email: z.string().email({
    message: "Not a valid email"
  })
})

export type AdminInsert = typeof adminSchema.$inferInsert
export type AdminSelect = typeof adminSchema.$inferSelect
