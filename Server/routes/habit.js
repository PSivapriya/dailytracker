const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createHabit, getHabits, updateHabit, deleteHabit, markHabit, getHistory } = require("../Controllers/habitController");

router.use(auth);

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/mark", markHabit);
router.get("/history", getHistory);

module.exports =router;
