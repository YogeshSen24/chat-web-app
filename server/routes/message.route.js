import express from "express"
import {getMessage, sendMessage} from "../controllers/message.controller.js"
import {verifyUser} from "../middlewares/verifyUser.middleware.js"

const router = express.Router()


router.post("/send/:id",verifyUser,sendMessage)
router.post("/:id",verifyUser,getMessage)

export default router
