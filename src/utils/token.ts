// import jwt from "jsonwebtoken"
// const getToken = (user, res) => {
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRESIN
//   })
//   res.cookie("jwt", token, {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "development" ? false : true,
//     sameSite: "none"
//     // maxAge: 30 * 24 * 60 * 60 * 1000
//   })
//   return
// }

// export default getToken
