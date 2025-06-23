const User = require("../models/User");

// --- GET /api/users/me ---
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// --- PUT /api/users/me ---
exports.updateMe = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      lastPeriod,
      cycleLength,
      notificationSettings,
      privacyMode,
    } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (age !== undefined) user.age = age;
    if (lastPeriod !== undefined) user.lastPeriodDate = lastPeriod;
    if (cycleLength !== undefined) user.cycleLength = cycleLength;

    user.hasStartedMenstruating =
      !!user.lastPeriodDate && !!user.cycleLength;

    if (notificationSettings !== undefined)
      user.notificationSettings = notificationSettings;
    if (privacyMode !== undefined) user.privacyMode = privacyMode;

    user = await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// --- ✅ SAVED DIET TIPS ---

// GET /api/users/saved-diet-tips
exports.getSavedDietTips = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.savedDietTips || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// POST /api/users/saved-diet-tips
exports.saveDietTip = async (req, res) => {
  try {
    const { name, benefit, tips, category } = req.body;
    const user = await User.findById(req.user.id);

    const exists = user.savedDietTips.find(tip => tip.name === name);
    if (exists)
      return res.status(400).json({ message: "Tip already saved." });

    user.savedDietTips.push({ name, benefit, tips, category });
    await user.save();

    res.status(201).json({ message: "Tip saved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// DELETE /api/users/saved-diet-tips/:name
exports.deleteSavedDietTip = async (req, res) => {
  try {
    const tipName = decodeURIComponent(req.params.name);
    const user = await User.findById(req.user.id);

    user.savedDietTips = user.savedDietTips.filter(
      tip => tip.name !== tipName
    );
    await user.save();

    res.json({ message: "Tip removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// --- ✅ VIDEO PROGRESS ---

// GET /api/users/video-progress
// GET /api/users/video-progress
exports.getVideoProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ videoProgress: user.videoProgress || {} });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// PUT /api/users/video-progress
exports.updateVideoProgress = async (req, res) => {
  try {
    const { videoId, completed } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.videoProgress) user.videoProgress = new Map();
    user.videoProgress.set(videoId, completed);
    user.markModified("videoProgress");
    await user.save();

    res.json({ message: "Progress updated", videoProgress: user.videoProgress });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
