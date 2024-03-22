require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const messagesRoutes = require("./routes/message.routes");
const connectDb = require("./db/connectDb");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/messages", messagesRoutes);

connectDb(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
