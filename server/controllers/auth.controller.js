const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", field: "confirmPassword" });
    }

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists", field: "username" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    generateToken({ _id: newUser._id }, res);

    await newUser.save();

    res.status(201).json({
      message: "User created",
      user: {
        _id: newUser._id,
        fullName,
        username,
        profilePic,
      },
    });
  } catch (error) {
    console.log("Error on signup: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken({ _id: user._id }, res);

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error on login: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error on logout: ", error.message || error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
