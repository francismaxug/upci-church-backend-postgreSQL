import { relations, sql } from "drizzle-orm"



import {
  varchar,
  uuid,
  pgTable,
  char,
  pgEnum,
  text,
  boolean,
  jsonb,
  timestamp
} from "drizzle-orm/pg-core"
import { adminSchema } from "./adminSchema"
import { genderEnum } from "./adultsSchema"
export const availabilityEnum = pgEnum("pAvailability", [
  "Only Mother Alive",
  "Only Father Alive",
  "Both Parents Alive",
  "Parents are Deceased"
])

export const children = pgTable("children", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  created_by: uuid()
    .references(() => adminSchema.id, { onDelete: "no action" })
    .notNull(),
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  img: varchar({ length: 256 }),
  mothers_name: varchar({ length: 50 }),
  fathers_name: varchar({ length: 50 }),
  gender: genderEnum("gender").default("M"),
  parents_availability: availabilityEnum().default("Both Parents Alive"),
  name_of_guardian: varchar({ length: 50 }).notNull(),
  level_of_education: varchar({ length: 50 }).notNull(),
  gaurdian_phone: varchar({ length: 20 }).notNull(),
  school_name: varchar({ length: 50 }).notNull(),
  isBaptised: boolean().default(false).notNull(),
  hobbies: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  dob: varchar({ length: 50 }).notNull(),

  ministry: varchar({ length: 50 }).default("Children Ministry"),
  created_at: timestamp({
    withTimezone: true
  }).defaultNow(),
  updated_at: timestamp({ mode: "date" })
    .$onUpdate(() => new Date())
    .defaultNow()
})

export type childrenInsertType = typeof children.$inferInsert
export type childrenSelectType = typeof children.$inferSelect
