import express from "express";
import {createServer} from "http"
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
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors({
  origin: "*",
  credentials : true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth" , authRoute)
app.use("/api/message" , messageRoute)
app.use("/api/users" , userRoute)


server.listen(process.env.PORT||8000 , ()=>{
    console.log("server is running on port :: " , process.env.PORT||8000);
})
connectDB()

io.on("connection",(socket)=>{
  console.log("a user connected",socket.id);
  socket.on("disconnect",()=>{
    console.log(socket.id," dissconnected");
  })
})