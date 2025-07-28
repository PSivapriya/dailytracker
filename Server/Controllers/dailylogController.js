const DailyLog = require("../models/DailyLog");

// Save single log (instant update)
exports.log = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "User not authenticated" });

        const { habitId, habitName, status, type = "habit" } = req.body;
        const date = new Date().toISOString().split("T")[0];

        const log = await DailyLog.findOneAndUpdate(
            { userId: req.userId, habitId, date },
            { status, type ,habitName },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.json(log);
    } catch (error) {
        console.error("Single log error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Bulk save logs (Finish button)
exports.logBulk = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "User not authenticated" });

        const { logs } = req.body;
        if (!Array.isArray(logs) || logs.length === 0) {
            return res.status(400).json({ error: "No logs provided" });
        }

        const date = new Date().toISOString().split("T")[0];

        const results = await Promise.all(
            logs.map(log =>
                DailyLog.findOneAndUpdate(
                    { userId: req.userId, habitId: log.habitId, date },
                    { status: log.status, type: log.type || "habit", habitName: log.habitName },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                )
            )
        );

        res.json({ message: "Logs saved", results });
    } catch (error) {
        console.error("Bulk log error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get logs for user
exports.getLogs = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "User not authenticated" });

        const logs = await DailyLog.find({ userId: req.userId }).populate("habitId", "name time") // populate habit name & time
      .sort({ date: 1 });

    const formatted = logs.map(log => ({
      _id: log._id,
      habitId: log.habitId?._id || null,
      habitName: log.habitName || log.habitId?.name || log.scheduleName || "Unnamed",
      time: log.habitId?.time || "N/A",
      status: log.status,
      date: log.date,
      type: log.type
    }));
        res.json(formatted);
    } catch (error) {
        console.error("Get logs error:", error.message);
        res.status(500).json({ error: error.message });
    }
};
