const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded._id).select(
      "-password -__v -gender"
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid User" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error on protectRoute: ", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute;
