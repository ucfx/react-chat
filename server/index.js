require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");

const express = require("express");
const port = process.env.PORT || 5000;

const { app, server } = require("./socket/socket");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://react-chat-kk8v.onrender.com"],
  })
);

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log("Error Connecting:", error.message);
}
