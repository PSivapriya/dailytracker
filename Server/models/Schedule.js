// models/Schedule.js
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    habitId: { type: String, required: true }, // unique key like "SchoolStud - weekday - 2"
    activity: { type: String, required: true }, // actual readable activity name
    type: { type: String, enum: ["weekday", "weekend", "custom"], default: "weekday" },
    time: { type: String }, // optional: e.g., "07:00 AM"
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);
