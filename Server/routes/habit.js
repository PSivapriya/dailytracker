const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const auth = require("../middleware/auth");

// create habit
router.post("/",auth,async(req,res) =>{
    try{
        const {name, description, frequency,time} = req.body;
        const habit = new Habit({name, description, frequency,time, userId:req.user.id});
        await habit.save();
        console.log("habit created");
        res.status(201).json(habit);
    }catch (err){
        res.status(500).json({message: "Error creating habit"});
    }
});

router.get("/", auth, async (req,res) =>{
    try{
        const getHabit = await Habit.find({userId: req.user.id});
        res.status(200).json({getHabit});
    }catch (err){
        res.status(500).json({message:"Error fetching habits"});
    }
})

router.put("/:id", auth, async(req,res)=>{
    try{
        const {name,description,frequency,time}=req.body;
        const updateHabit = await Habit.findByIdAndUpdate( req.params.id,
            {name,description,frequency,time},{new:true}
        );
        res.json(updateHabit);
    }catch(err){
        res.status(500).json({message: "Error in updating"});
    }
})

router.delete("/:id", auth,async(req,res)=>{
    try{
        await Habit.findByIdAndDelete(req.params.id);
        res.json({message:"Habit deleted"});
    }catch(err){
        res.status(500).json({message:"Error in deleting habit"});
    }
})

router.post("/mark", auth, async(req,res) =>{
    try{
        const {habitId, date, status} = req.body;
        const habit = await Habit.findOne({_id: habitId, userId:req.user.id});
        if(!habit) 
            return res.status(404).json({message:"Habit not found"});

        if(!habit.completionHistory)
            habit.completionHistory = [];

        habit.completionHistory = habit.completionHistory.filter(
            (entry) => !entry.startsWith(`${date}-`)
        )
        habit.completionHistory.push(`${date}-${status}`);

        await habit.save();
        res.json({message: "Status updated"});
    }catch (err){
        res.status(500).json({message:"Error updating status"});
    }
})

router.get("/history", auth, async(req,res) =>{
    try{
        const habits = await Habit.find({userId: req.user.id});
        res.json(habits);
    }catch (err){
        res.status(500).json({message:"Error fetching history"});
    }
})
module.exports = router;