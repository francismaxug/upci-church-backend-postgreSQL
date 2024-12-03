import { ReqBody } from "../interfaces/body"
import { IAppContext } from "../types/app"
import createError from "../utils/appError"
import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import {
  validateAdmin,
  validateCompleteRegistration
} from "../validators/admin"
import cloudinary from "../config/cloudinary"
import {
  adminUpdateProfileResults,
  generateRandomCode,
  sanitizePhone
} from "../utils/helpers"
import Apiip from "apiip.net"
import resultsLocation from "../location"
import { IGeoLocation, IUserAdmin } from "../types/admin"
import UserLocation from "../models/geolocationModel"
import { permit } from "../utils/permission"

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext
  }
}

//-----------------login admin----------------------
const adminLogin = catchAsync(
  async (req: Request<{}, {}, ReqBody>, res: Response, next: NextFunction) => {
    const { adminID, password } = req.body
    console.log(req)

    if (!adminID || !password) {
      return next(createError("Please provide email and password", 400))
    }

    const { error } = validateAdmin({ adminID, password })
    console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError("Invalid Credentials", 400))
    }
    // const apiip = Apiip('f3e954e8-4601-4ff7-9fc1-bef3581f7bf0', { ssl: false })
    const results = (await resultsLocation) as IGeoLocation
    // console.log("results", results)
    const admin = await req.context?.services?.userAdmin.login({
      adminID,
      password
    })

    console.log(admin)

    const check = permit(admin?.user?.role!, "save:info")
    console.log(check)
    if (check)
      await req.context?.services?.userAdmin.saveLocationDetails(
        results,
        adminID
      )

    return res.status(200).json(admin)
  }
)
// const rateLimit = catchAsync(
//   async (req: Request<{}, {}, ReqBody>, res: Response, next: NextFunction) => {
//     const { adminID, password } = req.body

//     if (!adminID || !password) {
//       return next(createError("Please provide email and password", 400))
//     }

//     const { error } = validateAdmin({ adminID, password })
//     console.log(error)

//     if (error) {
//       const errorInputs = error.details[0].message
//       console.log(errorInputs)
//       return next(createError("Invalid Credentials", 400))
//     }
//     // const apiip = Apiip('f3e954e8-4601-4ff7-9fc1-bef3581f7bf0', { ssl: false })
//     // const results = await resultsLocation as IGeoLocation
//     // console.log("results",results)
//     const admin = await req.context?.services?.userAdmin.login({
//       adminID,
//       password
//     })

//     return res.status(200).json(admin)
//   }
// )

//----------complete registration of admin----------------------

const completeRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    const changePhoneNumToGhanaCode = sanitizePhone(req.body.phoneNumber)

    const { error } = validateCompleteRegistration(req.body)
    // console.log(error)

    if (error) {
      const errorInputs = error.details[0].message
      console.log(errorInputs)
      return next(createError(`${errorInputs}`, 400))
    }
    const admin = await req.context?.services?.userAdmin.completeRegistration({
      ...req.body,
      phoneNumber: changePhoneNumToGhanaCode,
      id: req.user.id
    })
    // console.log(admin)
    return res.status(200).json(admin)
  }
)

//-------get current active admin----------------------

const getCurrentAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user)
    return res.status(200).json({
      _id: req.user.id,
      role: req.user.role,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage,
      email: req.user.email,
      isSubmitFullDetails: req.user.isSubmitFullDetails
    })
  }
)

//-------get admin profile info for update----------------------

const getAdminProfileInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.user)
    // console.log("hello")
    return res.status(200).json({
      firstName: req.user.firstName,
      role: req.user.role,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage,
      email: req.user.email,
      country: req.user.country,
      position: req.user.position,
      region: req.user.region,
      placeOfResidence: req.user.placeOfResidence,
      phoneNumber: req.user.phoneNumber,
      languages: req.user.languages,
      address: req.user.address,
      zipCode: req.user.zipCode,
      createdAt: req.user.createdAt,
     
    })
  }
)
//----------update profile of admin----------------------

const adminUpdateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("hii",req.body)
    //----change phone number to add countrycode 233*********** ------------------
    const changePhoneNumToGhanaCode = sanitizePhone(req.body.phoneNumber)

    //-----manipulate languages string into an array---------------
    const languagesArr = req.body.languages
      .split(" ")
      .filter((item: string) => item !== "")

    //-----------------check if there is no image selected by user----------------------

    if (!req.files || Object.keys(req.files).length === 0) {
      return adminUpdateProfileResults(req, res, {
        ...req.body,
        languages: languagesArr,
        phoneNumber: changePhoneNumToGhanaCode,
        id: req.user.id
      })
    }

    // console.log(req.body)
    // console.log(req.user)
    // console.log(req.files)

    const file1 = req.files?.profileImage

    // console.log(file1)

    let imageData
    let mimetype
    // Check if it's a single file
    if (file1 instanceof Array) {
      // If it's an array, access the first file
      imageData = file1[0].data
      mimetype = file1[0].mimetype
    } else {
      // If it's a single file
      imageData = file1?.data
      mimetype = file1?.mimetype
    }

    // console.log(imageData)

    // Convert image to base64
    const tobase64 = imageData!.toString("base64")
    //-----------------If user selects a new image, check if the has an old image in the datatabse, if so delete the old one from cloudinary and upload a new one----------------------
    const checkPublickId = req.user.cloudianryPublicId
    if (checkPublickId) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(checkPublickId)

      // Upload new image to Cloudinary
      const upload = await cloudinary.uploader.upload(
        `data:${mimetype};base64,${tobase64}`,
        {
          folder: "upci-church-uploads"
        }
      )

      const newBody = {
        ...req.body,
        phoneNumber: changePhoneNumToGhanaCode,
        languages: languagesArr,
        profileImage: upload.secure_url,
        cloudianryPublicId: upload.public_id
      }
      console.log(newBody)

      return adminUpdateProfileResults(req, res, {
        ...newBody,
        id: req.user.id
      })
    }

    //-----------------if user is now about to add a profile image----------------------

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(
      `data:${mimetype};base64,${tobase64}`,
      {
        folder: "upci-church-uploads"
      }
    )

    const newBody = {
      ...req.body,
      profileImage: upload.secure_url,
      cloudianryPublicId: upload.public_id,
      languages: languagesArr,
      phoneNumber: changePhoneNumToGhanaCode
    }
    // console.log(newBody)
    return adminUpdateProfileResults(req, res, {
      ...newBody,
      id: req.user.id
    })
  }
)

const requestForCode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    const changePhoneNumToGhanaCode = sanitizePhone(req.body.phoneNumber)
    // console.log(changePhoneNumToGhanaCode)
    const admin = await req.context?.services?.userAdmin.adminRequestResetCode(
      changePhoneNumToGhanaCode,
      req.body.phoneNumber
    )
    // console.log(admin)

    return res.status(200).json(admin)
  }
)
// const checkCodeSent = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body

//     const admin = await req.context?.services?.userAdmin.adminSendsSecreteCode(
//       req.user._id,
//       req.body.code
//     )
//     // console.log(admin)

//     return res.status(200).json(admin)
//   }
// )
// const resetPassword = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body

//     const admin = await req.context?.services?.userAdmin.adminResetPassword(
//       req.user._id,
//       req.body?.newPassword
//     )
//     // console.log(admin)

//     return res.status(200).json(admin)
//   }
// )

export {
  adminLogin,
  completeRegistration,
  getCurrentAdmin,
  getAdminProfileInfo,
  adminUpdateProfile,
  requestForCode,
  // checkCodeSent,
  // resetPassword
}
