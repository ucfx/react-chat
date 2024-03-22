const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");
const getUsers = async (req, res) => {
  try {
    const { _id: currentUserId } = req.user;
    const conversations = await Conversation.find({
      members: currentUserId,
    })
      .sort({ updatedAt: -1 })
      .populate("members");

    const users = conversations
      .map((conversation) => {
        const otherUser = conversation.members.find(
          (member) => member._id.toString() !== currentUserId.toString()
        );
        if (otherUser) {
          const { password, ...userWithoutPassword } = otherUser.toObject();
          return userWithoutPassword;
        }
      })
      .filter(Boolean);

    res.status(200).json(users);
  } catch (error) {
    console.log("Error on getUsers: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error on getUserByUsername: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUsers,
  getUserByUsername,
};
