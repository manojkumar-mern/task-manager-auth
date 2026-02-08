const express = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// protected
router.get("/me", protect, getProfile);
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
