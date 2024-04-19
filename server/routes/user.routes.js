const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const {
  getUsers,
  isAvailable,
  searchUsers,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/search/:q", searchUsers);
router.get("/:username", isAvailable);

module.exports = router;
