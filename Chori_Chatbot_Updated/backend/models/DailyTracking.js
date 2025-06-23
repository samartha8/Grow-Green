const mongoose = require("mongoose");

const dailyTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  flowIntensity: {
    type: String,
    enum: ["none", "light", "medium", "heavy"],
  },
  symptoms: {
    type: [String],
  },
  mood: {
    type: String,
    enum: ["great", "good", "okay", "low"],
  },
  hydration: {
    type: Boolean,
    default: false,
  },
  selfCare: {
    type: Boolean,
    default: false,
  },
  education: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique tracking per user per day
dailyTrackingSchema.index({ userId: 1, date: 1 }, { unique: true });

// Update the timestamp before saving
dailyTrackingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("DailyTracking", dailyTrackingSchema);
