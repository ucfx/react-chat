const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");
const getUsers = async (req, res) => {
  try {
    const { _id: currentUserId } = req.user;
    const conversations = await Conversation.find({
      members: currentUserId,
    })
      .populate("members")
      .populate("messages");

    const users = conversations
      .map((conversation) => {
        const otherUser = conversation.members.find(
          (member) => member._id.toString() !== currentUserId.toString()
        );
        if (otherUser) {
          const { password, ...userWithoutPassword } = otherUser.toObject();
          return {
            ...userWithoutPassword,
            lastMessage:
              conversation.messages[conversation.messages.length - 1],
            unreadMessagesCount: conversation.messages.filter(
              (message) =>
                message.receiver.toString() === currentUserId.toString() &&
                !message.read
            ).length,
          };
        }
      })
      .filter(Boolean);

    res.status(200).json(users);
  } catch (error) {
    console.log("Error on getUsers: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const isAvailable = async (req, res) => {
  console.log("availabl");
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(200).json({
        available: true,
      });
    }

    res.status(200).json({
      available: false,
    });
  } catch (error) {
    console.log("Error on getUserByUsername: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q: username } = req.params;
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.log("Error on searchUsers: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUsers,
  isAvailable,
  searchUsers,
};
