const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided in req.body
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (age !== undefined) user.age = age;

    // Handle lastPeriod and cycleLength updates
    if (lastPeriod !== undefined) {
      user.lastPeriodDate = lastPeriod;
    }
    if (cycleLength !== undefined) {
      user.cycleLength = cycleLength;
    }

    // Determine hasStartedMenstruating based on the updated user object
    if (
      user.lastPeriodDate &&
      user.lastPeriodDate !== null &&
      user.cycleLength &&
      user.cycleLength !== null
    ) {
      user.hasStartedMenstruating = true;
    } else {
      user.hasStartedMenstruating = false;
    }

    if (notificationSettings !== undefined)
      user.notificationSettings = notificationSettings;
    if (privacyMode !== undefined) user.privacyMode = privacyMode;

    // Save the updated user
    user = await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
