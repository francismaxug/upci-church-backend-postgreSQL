import { Schema, model, Model, models } from "mongoose"
import { IGeoLocationModel, IGeoLocationSchema } from "../types/geoLocation"

const geolocationSchema = new Schema<IGeoLocationSchema>({
  user:{
    type: Schema.Types.ObjectId,
    ref: "UserAdmin"
  },
  ipAddress: {
    type: String
  },
  name: String,
  role: String,
  region: {
    type: String
  },
  countryCode: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const UserLocation = models.GeoLocation || model<IGeoLocationSchema, IGeoLocationModel>("GeoLocation", geolocationSchema)

export default UserLocation
