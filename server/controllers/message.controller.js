const Conversation = require("../models/conversation.mode");
const Message = require("../models/message.model");

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
    }

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.error("Error on sendMessage: ", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiver } = req.params;
    const { _id: sender } = req.user;

    const conversation = await Conversation.findOne({
      members: {
        $all: [sender, receiver],
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
