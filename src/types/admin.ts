import { Document, Model, Types } from "mongoose"
export interface IUserAdmin {
  role: string
  firstName: string
  status: string
  phoneNumber: string
  lastName: string
  profileImage: string
  email: string
  isSubmitFullDetails: boolean
}

export interface IUserLoginSucces {
  status: string
  message: string
  user: {
    _id: Types.ObjectId
    role: string
    firstName: string
    status: string
    phoneNumber: string
    lastName: string
    profileImage: string
    email: string
    isSubmitFullDetails: boolean
  }
}

export interface IAdminLogin {
  adminID: string
  password: string
}

export interface IUserSchema extends IUserAdmin, Document {
  _id: Types.ObjectId
  comparePasswords(password: string): Promise<boolean>
  adminID: string
  role: string
  status: string
  position: string
  country: string
  address: string
  zipCode: string
  languages: string[]
  password: string
  region: string
  placeOfResidence: string
  createdAt: Date
  updatedAt: Date
  cloudianryPublicId: string
}

export interface IUserGetAuthInfo extends IUserAdmin {
  _id: string
}
export interface IUserGetAllInfo {
  role: string
  firstName: string
  lastName: string
  email: string
  country: string
  position: string
  region: string
  placeOfResidence: string
  phoneNumber: string
  isSubmitFullDetails: boolean
  profileImage: string
}

export interface IUserProfileCompleteInfo
  extends Omit<
    IUserGetAllInfo,
    "firstName" | "lastName" | "isSubmitFullDetails" | "profileImage" | "role"
  > {
  _id: Types.ObjectId
}

export interface IGeoLocation {
  ip: string
  continentCode: string
  continentName: string
  countryCode: string
  countryName: string
  countryNameNative: string
  officialCountryName: string
  regionCode: string
  regionName: string
  cityGeoNameId: number
  city: string
  latitude: number
  longitude: number
  capital: string
  phoneCode: string
  countryFlagEmoj: string
  countryFlagEmojUnicode: string
  isEu: boolean
  borders: string[]
  topLevelDomains: string[]
}

export interface IAdminEditProfileInfo
  extends Omit<IUserGetAllInfo, "role" | "isSubmitFullDetails" | "position"> {
  zipCode: string
  address: string
  languages: string[]
  _id: Types.ObjectId
  cloudianryPublicId: string
}

export interface IUserAdminModel extends Model<IUserSchema> {}
