const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, userController.getMe);

// @route   PUT /api/users/me
// @desc    Update current user's profile
// @access  Private
router.put("/me", auth, userController.updateMe);

module.exports = router;
