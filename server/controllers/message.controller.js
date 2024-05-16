const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const { getSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiver } = req.params;
    const { _id: sender } = req.user;

    let conversation = await Conversation.findOne({
      members: {
        $all: [sender, receiver],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [sender, receiver],
      });
    }

    const newMessage = await Message.create({
      message,
      sender,
      receiver,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
      const receiverSocketId = getSocketId(receiver);
      const senderSocketId = getSocketId(sender);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage, sender);
        io.to(senderSocketId).emit("online", receiver);
      }

      res.status(201).json(newMessage);
    } else {
      res.status(500).json({ message: "Failed to send message" });
    }
  } catch (error) {
    console.error("Error on sendMessage: ", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user;

    const receiver = await User.findOne({ _id: receiverId });

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const conversation = await Conversation.findOne({
      members: {
        $all: [senderId, receiverId],
      },
    }).populate("messages");

    res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.error("Error on getMessage: ", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
