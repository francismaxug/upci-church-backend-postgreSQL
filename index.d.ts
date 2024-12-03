import * as express from "express-serve-static-core"
import { IAppContext } from "./src/types/app"
import { Transport } from "nodemailer"

declare global {
  namespace Express {
    interface Request {
      context?: IAppContext
    }
  }
}


declare namespace nodemailerSendgrid {
  interface SendgridOptions {
    apiKey: string
  }
}

declare function nodemailerSendgrid(
  options: nodemailerSendgrid.SendgridOptions
): Transport

export default nodemailerSendgrid
