const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/trackingController");
const auth = require("../middleware/auth");

// @route   POST /api/tracker/daily
// @desc    Add or update daily tracking data (includes hydration, selfCare, education)
// @access  Private
router.post("/daily", auth, trackingController.addDailyTracking);

// @route   GET /api/tracker/history
// @desc    Get user's full tracking history
// @access  Private
router.get("/history", auth, trackingController.getTrackingHistory);

// @route   GET /api/tracker/predictions
// @desc    Get menstrual cycle predictions
// @access  Private
router.get("/predictions", auth, trackingController.getCyclePredictions);

// @route   GET /api/tracker/streak
// @desc    Get user's wellness streaks (tracking, hydration, selfCare, education)
// @access  Private
router.get("/streak", auth, trackingController.getTrackingStreak);

module.exports = router;
