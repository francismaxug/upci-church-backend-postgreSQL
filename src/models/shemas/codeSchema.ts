import {
  varchar,
  char,
  uuid,
  boolean,
  pgTable,
  timestamp
} from "drizzle-orm/pg-core"
import { adminSchema } from "./adminSchema"
import { createInsertSchema } from "drizzle-zod"

export const codeTable = pgTable("code", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  admin_id: uuid()
    .references(() => adminSchema.id, { onDelete: "cascade" })
    .notNull(),
  code: char({ length: 5 }).default("00000"),
  isUsed: boolean().default(false),
  created_at: timestamp().defaultNow()
})

export const insertCode = createInsertSchema(codeTable)
export const codeInsertType = typeof codeTable.$inferInsert
export const codeSelectType = typeof codeTable.$inferSelect
