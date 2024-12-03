import dotenv from "dotenv"
dotenv.config()
import { devConfig } from "./developement"
import { prodConfig } from "./production"
export interface Config {
  initApp: {
    env: "development" | "production" | "test"
    port: number
    name: string
  }

  dbString: {
    uri: string
  }
}

export const config =
  process.env.NODE_ENV === "development" ? devConfig : prodConfig
