const express = require("express");
const {
  registerUser,
  authorizeUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authorizeUser);

module.exports = router;
