import { IInitDB } from "../models/initalize";
import { IServices } from "../services/serve";
import { IUserAdminModel } from "./admin"


export interface IAppContext {
  queryDB?: IInitDB;
  services?: IServices;
}
export class InitAdmin {
  queryDB: IInitDB
  constructor(query: IAppContext) {
    this.queryDB = query.queryDB!
  }
}
