import dotenv from "dotenv"
dotenv.config()

import { config } from "./config/serve"

import { startApp } from "./app/app"

startApp(config)