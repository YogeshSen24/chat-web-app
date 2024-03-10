// import axios from "axios";
import { FiSend } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContextProvider.jsx";

function Chat() {
  const { receiver } = useParams();
  const [receiverData, setReceiverData] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  var userId = localStorage.getItem("user");
  const { socket } = useContext(SocketContext);
  const fetchConversation = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/message/${receiver}`,
        {
          sender: userId,
        }
      );
      setConversation(res.data.messages);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReceiverData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8000/api/users/${receiver}`
      );
      setReceiverData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:8000/api/message/send/${receiver}`, {
        message,
        sender: userId,
      });
      socket.emit("message", message);
      setMessage("");
      fetchConversation(userId, receiver);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: sendMessage,
  });

  const onSend = () => {
    mutateAsync();
  };

  useEffect(() => {
    fetchConversation();
    fetchReceiverData();
  }, [socket]);
  socket?.on(
    "newMessage",
    (newMessage) => {
      // console.log(newMessage)
      setConversation([...conversation, newMessage]);
      return () => socket?.off(newMessage);
    },
    [socket, setConversation, conversation]
  );
  return (
    <div className="shadow-2xl  w-full p-5 m-5 ">
      <div className="w-screen p-5 bg-blue-500">
        <h2 className="text-3xl font-bold">
          {receiverData && receiverData[0]?.name}
        </h2>
      </div>
      <div className=" w-full h-5/6 mb-10 overflow-y-scroll">
        {conversation?.map((item) => (
          <div
            key={item._id}
            className={`flex my-4 ${
              receiver === item.receiverId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="p-2 bg-blue-600 rounded-3xl">{item.message}</div>
          </div>
        ))}
      </div>
      <div className="flex bg-white w-full justify-between gap-3">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={onSend}
          className="btn rounded-full p-1  aspect-square btn-active text-2xl btn-primary"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
