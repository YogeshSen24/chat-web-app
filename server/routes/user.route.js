import express from "express"
import { verifyUser } from "../middlewares/verifyUser.middleware.js"
import {getUser} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/",verifyUser,getUser)

export default router