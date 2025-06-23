const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

//
// --- ✅ PROFILE ROUTES ---
//

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, userController.getMe);

// @route   PUT /api/users/me
// @desc    Update current user's profile
// @access  Private
router.put("/me", auth, userController.updateMe);

//
// --- ✅ SAVED DIET TIPS ROUTES ---
//

// @route   GET /api/users/saved-diet-tips
// @desc    Get user's saved diet tips
// @access  Private
router.get("/saved-diet-tips", auth, userController.getSavedDietTips);

// @route   POST /api/users/saved-diet-tips
// @desc    Save a new diet tip
// @access  Private
router.post("/saved-diet-tips", auth, userController.saveDietTip);

// @route   DELETE /api/users/saved-diet-tips/:name
// @desc    Delete a saved diet tip by name
// @access  Private
router.delete("/saved-diet-tips/:name", auth, userController.deleteSavedDietTip);

//
// --- ✅ VIDEO PROGRESS ROUTES ---
//

// @route   GET /api/users/video-progress
// @desc    Get user's completed video progress map
// @access  Private
router.get("/video-progress", auth, userController.getVideoProgress);

// @route   PUT /api/users/video-progress
// @desc    Mark a video as completed
// @access  Private
router.put("/video-progress", auth, userController.updateVideoProgress);

module.exports = router;
