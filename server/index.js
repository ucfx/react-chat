require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");

const connectDb = require("./db/connectDb");

const express = require("express");
const port = process.env.PORT || 5000;

// const app = express();
const { app, server } = require("./socket/socket");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.43.24:5173"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

connectDb(() => {});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
