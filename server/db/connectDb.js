const mongoose = require("mongoose");

const connectDb = async (cb) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    cb();
  } catch (error) {
    console.log("Error Connecting:", error.message);
  }
};

module.exports = connectDb;
