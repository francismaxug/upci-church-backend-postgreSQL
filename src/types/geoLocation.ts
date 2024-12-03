import { Model, Types } from "mongoose"

export interface IGeoLocationSchema {
  user: Types.ObjectId
  name: string
  role: string
  ipAddress: string
  region: string
  countryCode: string
  country: string
  city: string
  createdAt: Date
}

export interface IGeoLocationModel extends Model<IGeoLocationSchema> {}
