const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
  getUsers,
  getUserByUsername,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/:username", protectRoute, getUserByUsername);

module.exports = router;
