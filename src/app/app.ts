import express from "express"
import { Request, Response, NextFunction } from "express-serve-static-core"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import morgan from "morgan"
import handleError from "../middleware/customError"
import userRouter from "../routes/api/adminRoute"
import cors from "cors"
import { Config } from "../config/serve"
import { IAppContext } from "../types/app"
import { startServices } from "../services/serve"
import teamsRouter from "../routes/api/teams"
// import { pool } from "./../models"

export const app = express()

export const startApp = async (config: Config) => {
  try {
    const appContext: IAppContext = {}

    appContext.services = await startServices()

    const corsOptions = {
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://upci-church-app.vercel.app",
      credentials: true
    }
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"))
    }
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use((req: Request, res: Response, next: NextFunction) => {
      req.context = appContext
      next()
    })
    app.use(fileUpload({}))
    app.use("/api/v1/church", userRouter)
    app.use("/api/v1/church", teamsRouter)
    app.use(handleError)
    app.all("*", (req, res) => {
      res.status(404).json({
        status: "failed",
        message: `Can't find ${req.originalUrl} on this server`
      })
    })
  } catch (error) {
    throw error
  }

  // pool.on("")
  // pool.on("connect", () => {
  //   console.log("Database connected successfuly")
  // })

  app.listen(config.initApp.port, () => {
    console.log(`Server is running on port ${config.initApp.port}`)
  })
}
