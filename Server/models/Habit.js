const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description : String,
    frequency: String,
    time:String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    streak: {type: Number, default:0},
    completionHistory: [String],
},{timestamps:true});

module.exports = mongoose.model("Habit",habitSchema);