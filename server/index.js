require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const connectDb = require("./db/connectDb");

const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

connectDb(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
