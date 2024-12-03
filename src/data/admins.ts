import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const int = parseInt(process.env.HASH_NUMBER!)

const admin = [
  {
    adminID: process.env.ADMIN_ID_1 as string,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD!, int) as string,
    role: (process.env.ADMIN_1_ROLE as string) || "",
    firstName: (process.env.MAIN_ADMIN_FIRST_NAME as string) || "",
    lastName: (process.env.MAIN_ADMIN_LAST_NAME as string) || "",
    phoneNumber: process.env.ADMIN_1_PHONE as string,
    languages: ["Ewe"], 
   

  },
  {
    adminID: process.env.ADMIN_ID_2 as string,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD! as string, int),
    firstName: (process.env.FIRST_ADMIN_FIRST_NAME as string) || "",
    lastName: (process.env.FIRST_ADMIN_LAST_NAME as string) || "",
    phoneNumber: process.env.ADMIN_2_PHONE as string,
    languages: ["Hausa"],
 
  },
  {
    adminID: process.env.ADMIN_ID_3 as string,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD! as string, int),
    firstName: (process.env.SECOND_ADMIN_FIRST_NAME as string) || "",
    lastName: (process.env.SECOND_ADMIN_LAST_NAME as string) || "",
    phoneNumber: process.env.ADMIN_3_PHONE as string,
    languages: ["Twi"],
 
  },

  {
    adminID: process.env.ADMIN_ID_4 as string,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD! as string, int),
    role: (process.env.ADMIN_4_ROLE as string) || "",
    firstName: (process.env.SUPER_ADMIN_FIRST_NAME as string) || "",
    lastName: (process.env.SUPER_ADMIN_LAST_NAME as string) || "",
    phoneNumber: process.env.ADMIN_4_PHONE as string,
    languages: ["Ewe"],
  

  }
]

export default admin
