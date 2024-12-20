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

export const genderEnum = pgEnum("user_gender", ["M", "F"])
export const maritalStatusEnum = pgEnum("mstatus", [
  "Married",
  "Single",
  "Divorced",
  "widowed",
  "Separated"
])
export const ministryEnum = pgEnum("ministryStatus", [
  "Children Ministry",
  "Womens Ministry",
  "Youth Ministry",
  "Men Ministry"
])
export const employmentStatusEnum = pgEnum("emstatus", [
  "Self Employed",
  "Employed",
  "Unemployed",
  "Student",
  "pensioner",
  "apprentice"
])

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  memberId: varchar({ length: 50 }).unique().notNull(),
  first_name: varchar({ length: 50 }).notNull(),
  createdBy: uuid()
    .references(() => adminSchema.id, { onDelete: "no action" })
    .notNull(),
  img: varchar({ length: 256 }),
  last_name: varchar({ length: 50 }).notNull(),
  phone: varchar({ length: 20 }).unique().notNull(),
  email: varchar({ length: 100 }),
  gender: genderEnum("gender").default("M"),
  raw_password: varchar({ length: 100 }).notNull(),
  password: varchar({ length: 300 }).notNull(),
  ministry: ministryEnum().default("Youth Ministry"),
  created_at: timestamp({
    withTimezone: true
  }).defaultNow()
})

export const usersProfile = pgTable("users_profile", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  metadata: jsonb("metadata"),
  dob: varchar({ length: 50 }),
  nationality: varchar({ length: 50 }),
  district: varchar({ length: 50 }),
  languages: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  res_address: varchar({ length: 50 }),
  phone_2: varchar({ length: 20 }),
  fathers_name: varchar({ length: 50 }),
  mothers_name: varchar({ length: 50 }),
  fathers_hometown: varchar({ length: 50 }),
  mothers_hometown: varchar({ length: 50 }),
  nxt_of_kin: varchar({ length: 50 }),
  nxt_of_kin_phone: varchar({ length: 20 }),
  baptised: boolean().default(false),
  type_of_baptism: varchar({ length: 50 }),
  name_of_previous_church: varchar({ length: 50 }),
  reasons_for_leaving: varchar({ length: 50 }),
  marital_status: maritalStatusEnum().default("Single"),
  name_of_spouse: varchar({ length: 50 }),
  occupation_of_spouse: varchar({ length: 50 }),
  spouse_religion: varchar({ length: 50 }),
  no_of_children: varchar({ length: 50 }),
  marriage_date: varchar({ length: 50 }),
  names_of_children: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  level_of_education: varchar({ length: 50 }),
  employment_status: employmentStatusEnum().default("Employed"),
  occupation: varchar({ length: 50 }),
  hobies: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  talent: text(),

  thith_with_spouse: boolean().default(false),
  created_at: timestamp({
    withTimezone: true
  }).defaultNow(),
  updated_at: timestamp({ mode: "date" })
    .$onUpdate(() => new Date())
    .defaultNow()
})

export const usersRelations = relations(users, ({ one }) => ({
  profileInfo: one(usersProfile)
}))

export const profileInfoRelations = relations(usersProfile, ({ one }) => ({
  user: one(users, { fields: [usersProfile.userId], references: [users.id] })
}))

export type userInsertType = typeof users.$inferInsert
export type userAdditonalInfoInsertType = typeof usersProfile.$inferInsert
export type userSelectType = typeof users.$inferSelect
