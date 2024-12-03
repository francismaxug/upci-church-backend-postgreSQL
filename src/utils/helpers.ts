import { Request, Response } from "express"
import { IAdminEditProfileInfo } from "../types/admin"
import { AdminInsert, AdminSelect } from "../models/shemas/adminSchema"

export function sanitizePhone(phone: string) {
  if (phone.charAt(0) === "0") {
    const phoneCat = phone.slice(1)
    const phoneWithCode = "233" + phoneCat
    return phoneWithCode
  }

  return phone
}

export async function adminUpdateProfileResults(
  req: Request,
  res: Response,
  data: AdminSelect
) {
  const admin = await req.context?.services?.userAdmin.adminUpdateProfile(data)

  console.log(admin)
  return res.status(200).json({
    _id: req.user.id,
    role: req.user.role,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImage: admin?.profileImage,
    email: admin?.email,
    isSubmitFullDetails: req.user.isSubmitFullDetails
  })
}

export function generateRandomCode() {
  return new Promise((resolve) => {
    const codeLength = 5
    let code = ""

    for (let i = 0; i < codeLength; i++) {
      const digit = Math.floor(Math.random() * 10) // Generate a random digit from 0 to 9
      code += digit.toString()
    }

    resolve(code)
  })
}

export const message_template = (name: string, code: string) => {
  return `Hello ${name}, your password reset code is: ${code}. This code will expire in 10 minutes. Kindly ignore this message if you did not request for a password reset`
}

//  function generateRandomCode() {
//   let code = ""

//   for (let i = 0; i <= 4; i++) {
//     console.log(i)
//     const random_number = Math.floor(Math.random() * 10)
//     console.log(random_number)

//     code += random_number
//   }
//   return code
// }


export function sendEmailFunction  (user: any, ) {
  const message = `Hello ${user.name}, Your password reset was successful`
  return {
    email: user.email,
    subject: `password reset success`,
    message,
    text: `password reset success`
  }
}