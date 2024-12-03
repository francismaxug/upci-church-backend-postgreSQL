import { Request, Response } from "express"
// import UserAdmin from "../models/adminModel"
import { catchAsync } from "../utils/catchAsync"
import { db } from "../models"
import { adminSchema } from "../models/shemas/adminSchema"
import { and, eq } from "drizzle-orm"

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  const users = await db
    .select()
    .from(adminSchema)
    .where(
      and(
        eq(adminSchema.isSubmitFullDetails, true),
        eq(adminSchema.role, "User")
      )
    )

  console.log(users)
  return res.status(200).json(users)
})

export { getAllMembers }
