import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const sendEmail = async (optios: {
  text: string
  subject: string
  to: string
}) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: optios.to,
    subject: optios.subject,
    text: optios.text
  }

  try {
    const res = await transporter.sendMail(mailOptions)
    // console.log(res)
  } catch (error) {
    console.log(error)
  }
}
export default transporter

//Send mail

// const mailOptions = {
//   from: process.env.SENDER_EMAIL,
//   to: "emauil@email.com",
//   subject: "Password reset",
//   text: "Hey you have successfully reset your password"
// }

// await transporter.sendMail(mailOptions)
