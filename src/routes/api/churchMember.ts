import express from "express"
import {
  createMemberAdult,
  createMemberChildren,
  adultsAdditionalInfo
} from "../../controllers/churchMember"
import { protect } from "../../middleware/auth"
const router = express.Router()

router.post("/create-member-adult", protect, createMemberAdult)
router.post("/create-member-children", protect, createMemberChildren)
router.post("/additionalMemberInfo", adultsAdditionalInfo)

export default router
