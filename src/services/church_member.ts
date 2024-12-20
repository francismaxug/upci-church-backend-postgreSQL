import cloudinary from "../config/cloudinary"
import {
  userAdditonalInfoInsertType,
  users,
  usersProfile
} from "../models/shemas/adultsSchema"
import { children, childrenInsertType } from "../models/shemas/childrenSchema"
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
import { sendEmail } from "../utils/email"
import {
  create_user_account,
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
import { and, desc, eq, lt, lte, SQL, sql } from "drizzle-orm"
// import sendEmailToUser from "../utils/email"
export class ChurchMemberServices {
  createMemberAdult = async (input: {
    firstName: string
    lastName: string
    email: string
    ministry:
      | "Children Ministry"
      | "Womens Ministry"
      | "Youth Ministry"
      | "Men Ministry"
    gender: "M" | "F"
    phone: string
    password: string
    img: string
    userId: string
  }) => {
    // console.log(input)

    try {
      const hashedPassword = await bcrypt.hash(input.password, 12)
      const memberId = (await generateRandomCode(6)) as string

      const [checkIfIdExist] = await db
        .select({ memberId: users.memberId })
        .from(users)
        .where(eq(users.memberId, memberId))
      console.log(checkIfIdExist)
      console.log(memberId)
      // console.log(users.memberId)

      if (checkIfIdExist) {
        if (memberId === checkIfIdExist.memberId)
          throw createError("User registration failed", 400)
        const user = await db
          .insert(users)
          .values({
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            phone: input.phone,
            password: hashedPassword,
            ministry: input.ministry,
            raw_password: input.password,
            img: input.img,
            memberId,
            gender: input.gender,
            createdBy: input.userId
          })
          .returning()

        if (!user) throw createError("Registration Failed", 404)
        if (!input.phone) return
        const message = create_user_account(
          `${input.firstName + "" + input.lastName}`,
          memberId,
          input.password
        )
        await sendSMS(message, input.phone)
        return user
      }

      const user = await db
        .insert(users)
        .values({
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email,
          phone: input.phone,
          password: hashedPassword,
          ministry: input.ministry,
          raw_password: input.password,
          img: input.img,
          memberId,
          gender: input.gender,
          createdBy: input.userId
        })
        .returning()

      if (!user) throw createError("Registration Failed", 404)
      if (!input.phone) return
      const message = create_user_account(
        `${input.firstName + "" + input.lastName}`,
        memberId,
        input.password
      )
      await sendSMS(message, input.phone)
      return user
    } catch (err) {
      throw err
    }
  }

  adultsAdditionalInfo = async (input: userAdditonalInfoInsertType) => {
    // console.log(input)

    try {
      const user = await db.insert(usersProfile).values(input).returning()

      if (!user) throw createError("Registration Failed", 400)
      return user
    } catch (err) {
      throw err
    }
  }

  createMemberChildren = async (input: childrenInsertType) => {
    // console.log(input)
    try {
      const user = await db.insert(children).values(input).returning()

      if (!user) throw createError("Registration Failed", 404)

      return user
    } catch (err) {
      throw err
    }
  }

  updateMember = async (location: IGeoLocation, admin: string) => {
    try {
      const [user] = await db
        .select({
          id: adminSchema.id,
          lastName: adminSchema.lastName,
          firstName: adminSchema.firstName,
          role: adminSchema.role
        })
        .from(adminSchema)
        .where(eq(adminSchema.adminID, admin))

      // console.log(user)

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
  deleteMember = async (input: AdminSelect) => {
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

  getAllMembers = async (input: AdminSelect) => {
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
}
