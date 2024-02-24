import express from "express"
import {getMessage, sendMessage} from "../controllers/message.controller.js"
import {verifyUser} from "../middlewares/verifyUser.middleware.js"

const router = express.Router()


router.post("/send/:id",sendMessage) //verifyUser to be added
router.post("/:id",getMessage) //verifyUser to be added

export default router
