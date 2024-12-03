import { Router } from "express"
import { getAllMembers } from "../../controllers/teams"

const router = Router()

router.get("/getAllTeams", getAllMembers)


export default router
