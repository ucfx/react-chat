const router = new (require("express").Router)();
const { signup, login, logout } = require("../controllers/auth.controller");
const protectRoute = require("../middlewares/protectRoute");
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/", protectRoute, (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});

module.exports = router;
