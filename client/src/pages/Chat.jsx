// import axios from "axios";
import { FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chat() {
  const { receiver } = useParams();
  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState();
  var user = localStorage.getItem("user");

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:8000/api/message/send/${receiver}`, {
        message,
        sender: user,
      });
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
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/message/${receiver}`,
          {
            sender: user,
          }
        );
        setConversation(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="shadow-2xl  w-full p-5 m-5 ">
      <div className=" w-full h-5/6 mb-10 overflow-y-scroll">
        {conversation?.data?.messages.map((item) => (
          <div key={item._id}
            className={`chat chat-${
              receiver === item.receiverId ? "start" : "end" 
            }`}>
          <div className="chat-bubble chat-bubble-primary">{item.message}</div>
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
