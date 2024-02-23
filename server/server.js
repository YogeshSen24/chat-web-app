import express from "express";
import {Server} from "socket.io"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import {connectDB} from "./db/connectDB.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors({
  origin: "*",
  credentials : true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" , authRoute)
app.use("/api/message" , messageRoute)
app.use("/api/users" , userRoute)

app.listen(process.env.PORT||8000 , ()=>{
    console.log("server is running on port :: " , process.env.PORT||8000);
})
connectDB()