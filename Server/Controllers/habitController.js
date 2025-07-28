const Habit = require("../models/Habit");

exports.createHabit =async (req,res) => {
    try{
        const {name, description, frequency, time} = req.body;
        const habit = new Habit({name,description,frequency,time, userId:req.userId});
        await habit.save();
        res.status(201).json(habit);
    }catch (error){
        res.status(500).json({message: "Error Creating Habit"});
    }
};

exports.getHabits = async(req,res) =>{
    try{
        const habits = await Habit.find({userId: req.userId});
        res.json(habits);
    }catch (error){
        res.status(500).json({message: "Error fetching habits"});
    }
};

exports.updateHabit = async (req,res) =>{
    try{
        const updated = await Habit.findOneAndUpdate(
            {_id: req.params.id, userId: req.userId}, req.body, {new:true}
        );
        if(!updated)
            return res.status(404).json({message: "Habit not found"});
        res.json(updated);
    }catch (error){
        res.status(500).json({message: "Error updating habit"});
    }
};

exports.deleteHabit =async (req,res) =>{
    try{
        await Habit.findOneAndDelete({_id: req.params.id, userId: req.userId});
        res.json({message: "Habit Deleted"});
    }catch (error){
        res.status(500).json({message:"Error deleting habit"});
    }
};

exports.markHabit =async (req,res) =>{
    try{
        const {habitId, date, status} =req.body;
        const habit =await Habit.findOne({_id: habitId, userId: req.userId});
        if(!habit)
            return res.status(404).json({message:"Habit not found"});

        habit.completionHistory = habit.completionHistory.filter(e =>!e.startsWith(`${date}-`));
        habit.completionHistory.push(`${date}-${status}`);
        await habit.save();
        res.json({message: "Status updated"});
    }catch (error){
        res.status(500).json({message: "Error updating habit status"});
    }
};

exports.getHistory = async (req,res) =>{
    try{
        const habits =await Habit.find({userId: req.userId});
        res.json(habits);
    }catch (error){
        res.status(500).json({message: "Error fetching History"});
    }
};