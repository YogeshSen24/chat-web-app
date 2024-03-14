import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./UserContextProvider.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();
function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const { user } = useContext(UserContext);
  const id = localStorage.getItem("user")

  useEffect(() => {
    if (user) {
      const client = io("https://yug-chat-app.onrender.com",{
        query:{userId : id}
      });
      setSocket(client);
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      socket.on("message", (message) => {
        console.log("Received message: ", message);
      });
      socket.on("onlineUsers",(users)=>{
        setActiveUsers(users);
      })

      return () => {
        socket.disconnect();
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket , activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };