import express from "express";
import {Server} from "socket.io"
import {createServer} from "http"

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
let onlineUsers = {}
const getUserSocketId = (user)=>{
    return  onlineUsers[user]
}
io.on("connection",(socket)=>{
    const user = socket.handshake.query.userId
    console.log("a user connected",socket.id);
    if(user)onlineUsers[user]=socket.id
    io.emit("onlineUsers" , Object.keys(onlineUsers))
    socket.on("disconnect",()=>{
      console.log(socket.id," dissconnected");
      delete onlineUsers[user]
      io.emit("onlineUsers" , Object.keys(onlineUsers))
    })
  })

  export {app , server , io , getUserSocketId}