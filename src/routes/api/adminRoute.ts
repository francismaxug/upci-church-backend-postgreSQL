import {
  adminLogin,
  completeRegistration,
  getCurrentAdmin,
  getAdminProfileInfo,
  adminUpdateProfile,
  requestForCode,
  checkCodeSent,
  resetPassword
} from "../../controllers/adminUser"
import express from "express"
import { protect } from "../../middleware/auth"
const router = express.Router()

router.post("/login", adminLogin)
router.patch("/complete-registration", protect, completeRegistration)
// router.get("/logout", logout)
router.get("/getCurrentAdmin", protect, getCurrentAdmin)
router.get("/admin/profileInfo", protect, getAdminProfileInfo)
router.patch("/admin/updateprofile", protect, adminUpdateProfile)
router.post("/admin/get-reset-code", requestForCode)
router.post("/admin/check-reset-code", protect, checkCodeSent)
router.post("/admin/reset-password", protect, resetPassword)

export default router
