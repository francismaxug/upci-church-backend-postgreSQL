import cloudinary from "../config/cloudinary"
import { codeTable } from "../models/shemas/codeSchema"
import { geoLocationTable } from "../models/shemas/geoLocationSchema"
import {
  IAdminEditProfileInfo,
  IAdminLogin,
  IGeoLocation,
  IUserLoginSucces,
  IUserProfileCompleteInfo
} from "../types/admin"
import { IAppContext, InitAdmin } from "../types/app"
import createError from "../utils/appError"
import {
  generateRandomCode,
  message_template,
  sendEmailFunction
} from "../utils/helpers"
import { sendSMS } from "../utils/sms"
import { db } from "./../models"
import {
  AdminInsert,
  adminSchema,
  AdminSelect
} from "./../models/shemas/adminSchema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
// import sendEmailToUser from "../utils/email"
export class AdminServices {
  login = async (input: { adminID: string; password: string }) => {
    // console.log(input)
    try {
      const [user] = await db
        .select()
        .from(adminSchema)
        .where(eq(adminSchema.adminID, input.adminID))

      if (!user) throw createError("Invalid Credentials", 404)
      const checkPassword = await bcrypt.compare(input.password, user.password)
      console.log(checkPassword)
      if (!checkPassword) throw createError("Invalid Credentials", 404)
      console.log(user)

      const authAdmin = {
        status: "success",
        message: "Login Successful",
        user: {
          _id: user.id,
          role: user.role,
          phoneNumber: user.phoneNumber,
          status: user?.status,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          email: user.email,
          isSubmitFullDetails: user.isSubmitFullDetails
        }
      }
      return authAdmin
    } catch (err) {
      throw err
    }
  }

  saveLocationDetails = async (location: IGeoLocation, admin: string) => {
    try {
      const [user] = await db
        .select()
        .from(adminSchema)
        .where(eq(adminSchema.adminID, admin))

      console.log(user)

      await db.insert(geoLocationTable).values({
        admin_id: user?.id,
        name: user?.lastName + " " + user?.firstName,
        role: user?.role,
        country: location.countryName,
        countryCode: location.countryCode,
        region: location.regionName,
        city: location.city,
        ipAddress: location.ip
      })

      // await this.queryDB.geolocation.create({
      //   user: user?._id,
      //   name: user?.lastName + " " + user?.firstName,
      //   role: user?.role,
      //   country: location.countryName,
      //   countryCode: location.countryCode,
      //   region: location.regionName,
      //   city: location.city,
      //   ipAddress: location.ip
      // })
    } catch (err) {
      throw err
    }
  }
  completeRegistration = async (input: AdminSelect) => {
    try {
      console.log(input)
      await db
        .update(adminSchema)
        .set({
          email: input.email,
          country: input.country,
          region: input.region,
          placeOfResidence: input.placeOfResidence,
          phoneNumber: input.phoneNumber,
          position: input.position,
          isSubmitFullDetails: true
        })
        .where(eq(adminSchema.id, input.id))

      return {
        status: "success",
        message: "Registration Successful"
      }
    } catch (err) {
      throw err
    }
  }

  adminUpdateProfile = async (input: AdminSelect) => {
    try {
      const [admin] = await db
        .update(adminSchema)
        .set({
          email: input.email,
          country: input.country,
          region: input.region,
          placeOfResidence: input.placeOfResidence,
          phoneNumber: input.phoneNumber,
          zipCode: input.zipCode,
          address: input.address,
          languages: input.languages,
          profileImage: input.profileImage,
          firstName: input.firstName,
          lastName: input.lastName,
          cloudianryPublicId: input.cloudianryPublicId
        })
        .where(eq(adminSchema.id, input.id))
        .returning()

      return admin
    } catch (err) {
      throw err
    }
  }

  adminRequestResetCode = async (input: string, phone: string) => {
    try {
      const [findAdmin] = await db
        .select()
        .from(adminSchema)
        .where(eq(adminSchema.phoneNumber, input))

      if (!findAdmin) throw createError("User does not exist", 404)
      // console.log(findAdmin)

      const code = (await generateRandomCode()) as string

      await db.insert(codeTable).values({
        code: code,
        admin_id: findAdmin.id
      })

      const message = message_template(findAdmin?.lastName, code as string)
      const isSent = await sendSMS(message, input)

      // console.log(isSent)
      if (!isSent) throw createError("Failed to send SMS", 500)
      console.log(code)
      return {
        status: "success",
        message: "Code has been sent to your phone number",
        code,
        user: {
          _id: findAdmin.id,
          role: findAdmin.role,
          phoneNumber: phone,
          status: findAdmin?.status,
          firstName: findAdmin.firstName,
          lastName: findAdmin.lastName,
          profileImage: findAdmin.profileImage,
          email: findAdmin.email,
          isSubmitFullDetails: findAdmin.isSubmitFullDetails
        }
      }
    } catch (err) {
      throw err
    }
  }

  // adminSendsSecreteCode = async (userId: string, code: string) => {
  //   try {
  //     const findAdmin = await this.queryDB.code
  //       .findOne({
  //         user: userId,
  //         code,
  //         isUsed: false
  //       })
  //       .sort({
  //         createdAt: -1
  //       })

  //     // console.log(findAdmin)

  //     if (!findAdmin) throw createError("Invalid or expired code", 404)

  //     findAdmin.isUsed = true
  //     await findAdmin.save()

  //     return {
  //       status: "success"
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }

  // adminResetPassword = async (userId: Types.ObjectId, password: string) => {
  //   try {
  //     const findAdmin = await this.queryDB.adminModel.findById(userId)
  //     // console.log(findAdmin)

  //     if (!findAdmin) throw createError("User does not exist", 404)

  //     findAdmin.password = password
  //     await findAdmin.save()

  //     const res = sendEmailFunction({
  //       name: findAdmin?.lastName,
  //       email: findAdmin?.email
  //     }) as {
  //       text: string
  //       email: string
  //       message: string
  //       subject: string
  //     }

  //     // await sendEmailToUser({
  //     //   email: res.email,
  //     //   message: res.message,
  //     //   subject: res.subject,
  //     //   text: res.text
  //     // })
  //     return {
  //       status: "success",
  //       message: "Password reset successful"
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }
}
