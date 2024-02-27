import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { getUserSocketId ,io } from "../socket.js";

const sendMessage = asyncHandler(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const { sender , message } = req.body;
  const senderId = sender;
  let conversastion = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  });
  if (!conversastion) {
    console.log("creating new collection");
    conversastion = await Conversation.create({
      users: [senderId, receiverId],
    });
  }
  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversastion.messages.push(newMessage._id);
  }
  //   await conversastion.save()
  //   await newMessage.save()
  await Promise.all([conversastion.save(), newMessage.save()]);
  const receiver = getUserSocketId(receiverId)
  io.to(receiver).emit("newMessage",newMessage)
  res.status(200).send("message send successfully!!!");

});

const getMessage = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const {sender} = req.body
  const senderId = sender;
  const conversastion = await Conversation.findOne({
    users: { $in: [senderId, receiverId]},
  }).populate("messages");
  if (!conversastion) {
    res.status(400).send("messeges not found");
  }
  res.status(200).send(conversastion);

});

export { sendMessage, getMessage };
