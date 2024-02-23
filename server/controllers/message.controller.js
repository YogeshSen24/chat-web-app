import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const sendMessage = asyncHandler(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
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
  res.status(200).send("message send successfully!!!");
});

const getMessage = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.body._id;
  const conversastion = await Conversation.findOne({
    users: { $in: [senderId, receiverId]},
  }).populate("messages");
  if (!conversastion) {
    res.status(400).send("messeges not found");
  }
  res.status(200).send(conversastion);

});

export { sendMessage, getMessage };
