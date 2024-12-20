import cloudinary from "../config/cloudinary"
import { catchAsync } from "../utils/catchAsync"
import { generateRandomPassword, sanitizePhone } from "../utils/helpers"

const createMemberAdult = catchAsync(async (req, res, next) => {
  const tempPassword = await generateRandomPassword(3)
  console.log(tempPassword)

  const { firstName, lastName, email, phoneNumber, ministry, img, gender } =
    req.body

  const changePhoneNumToGhanaCode = sanitizePhone(phoneNumber)

  if (!req.files || Object.keys(req.files).length === 0) {
    const user = await req.context.services?.churchMember.createMemberAdult({
      firstName,
      lastName,
      email,
      phone: changePhoneNumToGhanaCode,
      password: tempPassword,
      ministry,
      img,
      gender,
      userId: req.user.id
    })

    return res.status(200).json(user)
  }

  const file1 = req.files?.img

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

  const tobase64 = imageData!.toString("base64")

  const upload = await cloudinary.uploader.upload(
    `data:${mimetype};base64,${tobase64}`,
    {
      folder: "upci-church-uploads"
    }
  )

  const newBody = {
    ...req.body,
    img: upload.secure_url,
    phone: changePhoneNumToGhanaCode,
    userId: req.user.id,
    password: tempPassword
  }
  // console.log(newBody)
  const user = await req.context.services?.churchMember.createMemberAdult(
    newBody
  )
  return res.status(200).json(user)
})

const createMemberChildren = catchAsync(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    const user = await req.context.services?.churchMember.createMemberChildren({
      ...req.body,
      created_by: req.user.id
    })

    return res.status(200).json(user)
  }

  const file1 = req.files?.img

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

  const tobase64 = imageData!.toString("base64")

  const upload = await cloudinary.uploader.upload(
    `data:${mimetype};base64,${tobase64}`,
    {
      folder: "upci-church-uploads"
    }
  )

  const newBody = {
    ...req.body,
    img: upload.secure_url,
    created_by: req.user.id
  }
  // console.log(newBody)
  const user = await req.context.services?.churchMember.createMemberChildren(
    newBody
  )
  return res.status(200).json(user)
})

const adultsAdditionalInfo = catchAsync(async (req, res, next) => {
  const languagesArr = req.body.languages
    .split(" ")
    .filter((item: string) => item !== "")

  const user = req.context.services?.churchMember.adultsAdditionalInfo({
    ...req.body,
    languages: languagesArr
  })
})

export { createMemberAdult, createMemberChildren, adultsAdditionalInfo }
