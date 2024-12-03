import jwt from "jsonwebtoken"
// import UserAdmin from "../models/adminModel"
import { catchAsync } from "../utils/catchAsync"
import AppError from "../utils/appError"
import { Request, Response, NextFunction } from "express"
import { IUserSchema } from "../types/admin"
import createError from "../utils/appError"
import { adminSchema, AdminSelect } from "../models/shemas/adminSchema"
import { db } from "../models"
import { eq } from "drizzle-orm"
// import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node"

declare module "express-serve-static-core" {
  interface Request {
    user: AdminSelect
  }
}

//  const aj = arcjet({
//   // Get your site key from https://app.arcjet.com and set it as an environment
//   // variable rather than hard coding.
//   key: process.env.ARCJET_KEY as string,
//   characteristics: ["ip.src"], // Track requests by IP
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except search engine crawlers. See
//       // https://arcjet.com/bot-list
//       allow: ["CATEGORY:SEARCH_ENGINE"]
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode: "LIVE",
//       refillRate: 5, // Refill 5 tokens per interval
//       interval: 10, // Refill every 10 seconds
//       capacity: 10 // Bucket capacity of 10 tokens
//     })
//   ]
// })
const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)
    let token

    token = req.headers.authorization?.split(" ")[1]
    // token = req.cookies.authsession
    // console.log(token)

    if (!token) return next(createError("no token found", 404))

    const decodeUser = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload
    // console.log(decodeUser)
    if (!decodeUser) return next(createError("no token found", 404))

    const [currentUser] = await db
      .select()
      .from(adminSchema)
      .where(eq(adminSchema.id, decodeUser.user._id))
    if (!currentUser) return next(createError("Token expired", 404))
    // console.log("heyy", currentUser)
    req.user = currentUser
    next()
  }
)
// const rateLimit = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // console.log(req)
//     const decision = await aj.protect(req, { requested: 5 }) // Deduct 5 tokens from the bucket
//     console.log("Arcjet decision", decision)
//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         console.log("Rate limit exceeded")
//       } else if (decision.reason.isBot()) {
//         console.log("Bot detected")
//       } else {
//         console.log("Shield blocked the request")
//       }
//     } else {
//       next()
//     }
//     // next()
//   }
// )

export { protect }
