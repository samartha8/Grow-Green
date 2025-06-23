const DailyTracking = require("../models/DailyTracking");

// Get full wellness streak breakdown per user with tracking streak logic
exports.getTrackingStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await DailyTracking.find({ userId }).sort({ date: -1 });

    if (history.length === 0) {
      return res.json({
        tracking: 0,
        hydration: 0,
        selfCare: 0,
        education: 0,
      });
    }

    let hydration = 0;
    let selfCare = 0;
    let education = 0;

    const uniqueDays = new Set();

    history.forEach((entry) => {
      const d = new Date(entry.date);
      d.setUTCHours(0, 0, 0, 0); // Normalize to date only
      uniqueDays.add(d.toISOString());

      if (entry.hydration) hydration++;
      if (entry.selfCare) selfCare++;
      if (entry.education) education++;
    });

    const sortedDates = [...uniqueDays]
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      if (date.getTime() === currentDate.getTime()) {
        streak++;
      } else {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 1);
        if (date.getTime() === prev.getTime()) {
          streak++;
          currentDate = prev;
        } else {
          break;
        }
      }
    }

    res.json({ tracking: streak, hydration, selfCare, education });
  } catch (err) {
    console.error("getTrackingStreak error:", err.message);
    res.status(500).send("Server error");
  }
};

// Add or update daily tracking entry (once per calendar day)
exports.addDailyTracking = async (req, res) => {
  try {
    const { date, flowIntensity, symptoms, mood, hydration, selfCare, education } = req.body;

    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0); // Ensure consistent date format

    const tracking = await DailyTracking.findOneAndUpdate(
      { userId: req.user.id, date: normalizedDate },
      {
        $set: {
          flowIntensity,
          symptoms,
          mood,
          hydration: hydration || false,
          selfCare: selfCare || false,
          education: education || false,
          updatedAt: Date.now(),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(tracking);
  } catch (err) {
    console.error("addDailyTracking error:", err.message);
    res.status(500).send("Server error");
  }
};

// Get full tracking history for a user
exports.getTrackingHistory = async (req, res) => {
  try {
    const history = await DailyTracking.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error("getTrackingHistory error:", err.message);
    res.status(500).send("Server error");
  }
};

// Predict menstrual cycle
exports.getCyclePredictions = async (req, res) => {
  try {
    const user = req.user;

    if (!user.hasStartedMenstruating) {
      return res.status(400).json({ message: "User has not started menstruating." });
    }

    const lastPeriodDate = new Date(user.lastPeriodDate);
    const cycleLength = user.cycleLength;

    if (!lastPeriodDate || !cycleLength) {
      return res.status(400).json({
        message: "Last period date and cycle length are required.",
      });
    }

    const predictions = predictCycle(lastPeriodDate, cycleLength);
    res.json(predictions);
  } catch (err) {
    console.error("getCyclePredictions error:", err.message);
    res.status(500).send("Server error");
  }
};

// Cycle prediction utility
function predictCycle(lastPeriodDate, cycleLength) {
  const nextPeriodStart = new Date(lastPeriodDate);
  nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);

  const nextPeriodEnd = new Date(nextPeriodStart);
  nextPeriodEnd.setDate(nextPeriodStart.getDate() + 4); // assume 5-day period

  const ovulationDay = new Date(nextPeriodStart);
  ovulationDay.setDate(nextPeriodStart.getDate() - 14);

  const fertileWindowStart = new Date(ovulationDay);
  fertileWindowStart.setDate(ovulationDay.getDate() - 2);

  const fertileWindowEnd = new Date(ovulationDay);
  fertileWindowEnd.setDate(ovulationDay.getDate() + 2);

  return {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDay,
    fertileWindowStart,
    fertileWindowEnd,
  };
}
