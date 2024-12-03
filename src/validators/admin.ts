//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
import Joi from "joi"

const validateAdminInput = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
  schema.validate(payload, { abortEarly: true })
const adminValidation = Joi.object({
  adminID: Joi.string().min(6).max(6).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*-_+=])[A-Za-z0-9!@#$%^&*-_+=]+$"
      )
    )
    .required()
})
const validateAdmin = validateAdminInput(adminValidation)

const validateAdminCompleteRegistration =
  (schema: Joi.ObjectSchema<any>) => (payload: any) =>
    schema.validate(payload, { abortEarly: true })
const adminCompleteRegistrationValidation = Joi.object({
  country: Joi.string().required(),
  placeOfResidence: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "gh", "info"] }
    })
    .required(),
  position: Joi.string().required(),
  region: Joi.string().required()
})

const validateCompleteRegistration = validateAdminCompleteRegistration(
  adminCompleteRegistrationValidation
)
// const validateUpdateProfile =
//   (schema: Joi.ObjectSchema<any>) => (payload: any) =>
//     schema.validate(payload, { abortEarly: true })
// const adminCompleteRegistrationValidation = Joi.object({
//   country: Joi.string().required(),
//   placeOfResidence: Joi.string().required(),
//   phoneNumber: Joi.string().required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net", "gh", "info"] }
//     })
//     .required(),
//     position:Joi.string().required(),
//     region:Joi.string().required()
// })

// const validateCompleteRegistration = validateAdminCompleteRegistration(
//   adminCompleteRegistrationValidation
// )

export { validateAdmin, validateCompleteRegistration }
