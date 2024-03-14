// import axios from "axios";
import { FiSend } from "react-icons/fi";
import { useState, useEffect, useContext, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContextProvider.jsx";
import { MdCircle } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

function Chat() {
  const { receiver } = useParams();
 
  const [receiverData, setReceiverData] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const { activeUsers } = useContext(SocketContext);
  var userId = localStorage.getItem("user");
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate()
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
      await axios.post(`/api/message/send/${receiver}`, {
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
  
  const messageContainerRef = useRef(null); // Create a ref for the message container

  useEffect(() => {
    // Scroll to the bottom of the message container whenever conversation state changes
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [conversation]);
  return (
    <div id="chat" className="w-full px-2 ">
      <div id="chat-head" className="flex p-5">
          <IoMdArrowBack onClick={()=>navigate("/side-bar")} className="w-10 h-10 mobile rounded-full bg-white aspect-square mr-5" />
        <h2 className="text-3xl  font-bold">
          {receiverData && receiverData[0]?.name}
        </h2>
        {activeUsers.includes(receiver) ? <MdCircle className="text-green-700"/> : <MdCircle className="text-red-700"/> }
      </div>
      <div id="message-container" ref={messageContainerRef} className=" w-full h-5/6 my-10 overflow-y-scroll">
        {conversation?.map((item) => (
          <div
            key={item._id}
            className={`flex ${
              receiver === item.receiverId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="p-2  message">{item.message}</div>
          </div>
        ))}
      </div>
      <div id="message-box" className="flex px-5 justify-between gap-3">
        <input
          type="text"
          placeholder="Type here"
          className=" input-field w-full "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={onSend}
          className=" rounded-full p-2 btn aspect-square text-2xl"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
