import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./UserContextProvider.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();
function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const client = io("http://localhost:8000/");
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

      return () => {
        socket.disconnect();
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, SocketContext };