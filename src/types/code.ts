import { Types, Model } from "mongoose"

export interface ICodeType {
  user: Types.ObjectId
  code: string
  createdAt: Date
  isUsed: boolean
}

export interface ICodeSchema extends ICodeType, Document {
  _id: Types.ObjectId
}

export interface ICodeModel extends Model<ICodeSchema> {}
