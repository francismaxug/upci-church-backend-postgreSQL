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

export const geoLocationTable = pgTable("geolocation", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  admin_id: uuid()
    .references(() => adminSchema.id, { onDelete: "cascade" })
    .notNull(),
  ipAddress: varchar({ length: 30 }),
  country: varchar({ length: 30 }),
  region: varchar({ length: 30 }),
  city: varchar({ length: 30 }),
  countryCode: varchar({ length: 30 }),
  name: varchar({ length: 30 }),
  role: varchar({ length: 30 }),
  created_at: timestamp({
    withTimezone: true
  }).defaultNow()
})

export const insertCode = createInsertSchema(geoLocationTable)
export const GeoInsertType = typeof geoLocationTable.$inferInsert
export const GeoSelectType = typeof geoLocationTable.$inferSelect
