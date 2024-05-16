const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const usersSocketMap = {};

io.on("connection", async (socket) => {
  console.log("userConnected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    usersSocketMap[userId] = socket.id;
  }
  console.log(usersSocketMap);
  const onlineUsers = await getOnlineFriends(userId);

  socket.emit("getOnlineUsers", onlineUsers);

  Object.keys(onlineUsers).forEach((uId) => {
    socket.to(onlineUsers[uId]).emit("online", userId);
  });

  socket.on("readMessage", async (messageId, from, to) => {
    console.log("readMessage", messageId, from, to);
    const msg = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );

    const toSocketId = getSocketId(to);

    if (toSocketId) {
      io.to(toSocketId).emit("readMessage", messageId, from, msg.updatedAt);
    }
  });

  socket.on("disconnect", async () => {
    console.log("userdisconnected", socket.id);
    delete usersSocketMap[userId];
    const onlineUsers = await getOnlineFriends(userId);
    Object.keys(onlineUsers).forEach((uId) => {
      socket.to(onlineUsers[uId]).emit("disconnectUser", userId);
    });
  });
});

const getSocketId = (userId) => {
  return usersSocketMap[userId];
};

module.exports = {
  app,
  io,
  server,
  getSocketId,
};

const getOnlineFriends = async (currentUserId) => {
  const conversations = await Conversation.find({
    members: currentUserId,
  }).populate("members");

  const onlineFriend = {};

  conversations.forEach((conversation) => {
    const otherUser = conversation.members.find(
      (member) => member._id.toString() !== currentUserId
    );
    if (otherUser) {
      if (getSocketId(otherUser._id)) {
        onlineFriend[otherUser._id] = getSocketId(otherUser._id);
      }
    }
  });

  console.log(onlineFriend);

  return onlineFriend;
};
