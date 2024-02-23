import { FiSend } from "react-icons/fi";

function Chat() {
  return (
    <div className="shadow-2xl p-5 m-5 w-full">
      <div className="w-full h-5/6 mb-10 overflow-y-scroll">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary">
            Hi , how are you
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary">I am fine , what about you</div>
        </div>
      </div>
      <div className="flex bg-white w-full justify-between gap-3">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full "
        />
        <button className="btn rounded-full p-1  aspect-square btn-active text-2xl btn-primary">
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
