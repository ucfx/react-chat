const router = new (require("express").Router)();

const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const protectRoute = require("../middlewares/protectRoute");

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

module.exports = router;
