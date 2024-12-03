import dotenv from "dotenv"
import { Config } from "./serve"
dotenv.config()
export const devConfig:Config = {
  initApp: {
    port: Number(process.env.PORT) || 8080,
    name: "Church Management",
    env: "development"
  },
  dbString: {
    uri: process.env.MONGO_URI! 
  }
}
