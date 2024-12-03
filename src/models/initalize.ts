import { IUserAdminModel, IUserSchema } from "../types/admin"
import { ICodeModel } from "../types/code"
import { IGeoLocationModel } from "../types/geoLocation"

export interface IInitDB {
  adminModel: IUserAdminModel
  geolocation: IGeoLocationModel
  code: ICodeModel
}
