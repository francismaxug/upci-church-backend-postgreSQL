import { Request, Response } from "express"
// import UserAdmin from "../models/adminModel"
import { catchAsync } from "../utils/catchAsync"

const getAllMembers = catchAsync(async (req: Request, res: Response) => {
  // const users = await UserAdmin.find({
  //   isSubmitFullDetails: true,
  //   role: {
  //     $eq: "User"
  //   }
  // })
  // console.log(users)
  // return res.status(200).json(users)
})

export { getAllMembers }
