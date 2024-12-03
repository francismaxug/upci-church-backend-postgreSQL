// // models/ResetCode.js
// const mongoose = require('mongoose');

// const resetCodeSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   code: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 600 // Document will be automatically deleted after 10 minutes
//   },
//   isUsed: {
//     type: Boolean,
//     default: false
//   }
// });

// const ResetCode = mongoose.model('ResetCode', resetCodeSchema);

// // utils/sms.js
// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSMS = async (phoneNumber, message) => {
//   try {
//     await client.messages.create({
//       body: message,
//       to: phoneNumber,
//       from: process.env.TWILIO_PHONE_NUMBER
//     });
//     return true;
//   } catch (error) {
//     console.error('SMS sending failed:', error);
//     return false;
//   }
// };

// // controllers/authController.js
// const User = require('../models/User');
// const ResetCode = require('../models/ResetCode');
// const { sendSMS } = require('../utils/sms');

// // Generate a random 6-digit code
// const generateCode = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Request password reset
// const requestPasswordReset = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;

//     // Find user by phone number
//     const user = await User.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate new reset code
//     const code = generateCode();

//     // Save the code in database
//     await ResetCode.create({
//       userId: user._id,
//       code: code
//     });

//     // Send SMS with the code
//     const message = `Your password reset code is: ${code}. This code will expire in 10 minutes.`;
//     const smsSent = await sendSMS(phoneNumber, message);

//     if (!smsSent) {
//       return res.status(500).json({ message: 'Failed to send SMS' });
//     }

//     res.status(200).json({
//       message: 'Reset code sent successfully',
//       userId: user._id
//     });

//   } catch (error) {
//     console.error('Password reset request failed:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Verify reset code and update password
// const resetPassword = async (req, res) => {
//   try {
//     const { userId, code, newPassword } = req.body;

//     // Find the most recent unused reset code for the user
//     const resetCode = await ResetCode.findOne({
//       userId,
//       code,
//       isUsed: false
//     }).sort({ createdAt: -1 });

//     if (!resetCode) {
//       return res.status(400).json({ message: 'Invalid or expired reset code' });
//     }

//     // Mark the code as used
//     resetCode.isUsed = true;
//     await resetCode.save();

//     // Update user's password
//     const user = await User.findById(userId);
//     user.password = newPassword; // Assuming you're hashing the password in your User model
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });

//   } catch (error) {
//     console.error('Password reset failed:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { requestPasswordReset, resetPassword } = require('../controllers/authController');

// router.post('/request-reset', requestPasswordReset);
// router.post('/reset-password', resetPassword);

// module.exports = router;

import { Schema, model, models } from "mongoose"
import { ICodeModel, ICodeSchema } from "../types/code"

const resetCodeSchema = new Schema<ICodeSchema>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Document will be automatically deleted after 10 minutes
  }
})

const ResetCode =
  models.ResetCode ||
  model<ICodeSchema, ICodeModel>("ResetCode", resetCodeSchema)

export default ResetCode
