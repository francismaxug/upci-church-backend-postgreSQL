// import nodemailer from "nodemailer"
// import nodemailerSendgrid from "nodemailer-sendgrid"
// const sendEmailToUser = async (options: {
//   email: string
//   text: string
//   message: string
//   subject: string
// }) => {
//   const mailOptions = {
//     apiKey:
//       "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"
//   }
//   const transporter = nodemailer.createTransport(
//     nodemailerSendgrid(mailOptions)
//   )

//   const sendIt = {
//     to: options.email,
//     from: "fatinga@st.ug.edu.gh",
//     subject: options.subject,
//     text: options.text,
//     html: options.message
//   }

//   return await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(sendIt, (err, info) => {
//       if (err) {
//         console.error(err)
//         reject(err)
//       } else {
//         console.log(info)
//         resolve(info)
//       }
//     })
//   })
// }

// export default sendEmailToUser

import FormData from "form-data"
import Mailgun from "mailgun.js"
const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere"
})

const send = async () => {
  try {
    const res = await mg.messages.create("sandbox-123.mailgun.org", {
      from: "Excited User <mailgun@sandbox75143d8031ff4d60a507964de1f5a251.mailgun.org>",
      to: ["atingafrancis123@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>"
    })
    console.log(res) // logs response data
  } catch (error) {
    console.log(error) // logs any error
  }
}

export default send
