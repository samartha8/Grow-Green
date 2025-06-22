const DailyTracking = require("../models/DailyTracking");

exports.getTrackingStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await DailyTracking.find({ userId }).sort({ date: -1 });

    if (history.length === 0) {
      return res.json({ streak: 0 });
    }

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < history.length; i++) {
      const trackedDate = new Date(history[i].date);
      trackedDate.setHours(0, 0, 0, 0);

      if (trackedDate.getTime() === currentDate.getTime()) {
        streak++;
      } else if (trackedDate.getTime() < currentDate.getTime()) {
        // Check if the gap is exactly one day
        const prevDay = new Date(currentDate);
        prevDay.setDate(currentDate.getDate() - 1);
        if (trackedDate.getTime() === prevDay.getTime()) {
          streak++;
        } else {
          break; // Gap in streak
        }
      } else {
        // Future date, skip for streak calculation
        continue;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }

    res.json({ streak });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.addDailyTracking = async (req, res) => {
  try {
    const { date, flowIntensity, symptoms, mood } = req.body;

    let tracking = await DailyTracking.findOneAndUpdate(
      { userId: req.user.id, date: new Date(date) },
      { flowIntensity, symptoms, mood, updatedAt: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(tracking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getTrackingHistory = async (req, res) => {
  try {
    const history = await DailyTracking.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCyclePredictions = async (req, res) => {
  try {
    const user = req.user;

    if (!user.hasStartedMenstruating) {
      return res
        .status(400)
        .json({ message: "User has not started menstruating." });
    }

    const lastPeriodDate = new Date(user.lastPeriodDate);
    const cycleLength = user.cycleLength;

    if (!lastPeriodDate || !cycleLength) {
      return res
        .status(400)
        .json({ message: "Last period date and cycle length are required." });
    }

    const predictions = predictCycle(lastPeriodDate, cycleLength);
    res.json(predictions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
