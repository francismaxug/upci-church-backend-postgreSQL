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

export function generateRandomCode(codeLength: number = 5) {
  return new Promise((resolve) => {
    let code = ""

    for (let i = 0; i < codeLength; i++) {
      const digit = Math.floor(Math.random() * 10) // Generate a random digit from 0 to 9
      code += digit.toString()
    }

    resolve(code)
  })
}

export const message_template = (name: string, code: string) => {
  return `Hello ${name}, your password reset code is: ${code}.\nThis code will expire in 10 minutes. Kindly ignore this message if you did not request for a password reset`
}
export const create_user_account = (
  name: string,
  memberId: string,
  password: string
) => {
  return `Hello ${name}, you have successfuly been registered unto the UPCI-GHANA-KADOSH CHAPLE CHURCH APP\nBelow is the details you will user to log into the app\nMemberId: ${memberId}\nPassword: ${password}\n\nPlease do not share this details with anyone. SHALOM!!!`
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

export function sendEmailFunction(user: any) {
  const message = `Hello ${user.name}, Your password reset was successful`
  return {
    email: user.email,
    subject: `password reset success`,
    message,
    text: `password reset success`
  }
}

const lowercase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
)

// Uppercase alphabets
const uppercase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
)

// Combine both
const alphabets = [...lowercase, ...uppercase]

export async function generateRandomPassword(codeLength: number = 5) {
  const val = await new Promise((resolve) => {
    let code = ""

    for (let i = 0; i < codeLength; i++) {
      const digit = Math.floor(Math.random() * 53) // Generate a random digit from 0 to 9
      const letter = alphabets[digit]
      code += letter
    }

    resolve(code)
  })

  const getNum = await generateRandomCode(3)
  // console.log(getNum)
  // console.log(val)

  return val + (getNum as string)
}
