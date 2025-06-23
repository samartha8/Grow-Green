const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  lastPeriodDate: {
    type: Date,
    required: function () {
      return this.hasStartedMenstruating === true;
    },
  },
  cycleLength: {
    type: Number,
    required: function () {
      return this.hasStartedMenstruating === true;
    },
  },
  hasStartedMenstruating: {
    type: Boolean,
    required: true,
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  privacyMode: {
    type: Boolean,
    default: false,
  },
  savedDietTips: [
    {
      name: String,
      benefit: String,
      tips: String,
      category: String,
      icon: String, // Store icon identifier as string (e.g., "Apple", "Leaf")
    },
  ],
  videoProgress: {
    type: Map,
    of: Boolean,
    default: {},
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

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
