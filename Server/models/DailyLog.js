const mongoose = require("mongoose");

const dailylogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
   // habitId: {type: mongoose.Schema.Types.ObjectId, ref:"Habit", required: true},
    habitId: {type: String, required: true},
    habitName: { type: String, required: true},
    type: {type: String, enum: ["habit", "schedule"], default:"habit"},
    date: {type: Date, required: true },
    status: {type: String, enum:["Completed","Cancelled","Missed",],default: "Missed"},
    scheduleName:{type: String}

}, {timestamps: true});

module.exports = mongoose.model("DailyLog", dailylogSchema);