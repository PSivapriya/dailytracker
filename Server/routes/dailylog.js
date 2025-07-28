const express = require("express");
const auth = require("../middleware/auth");
const { log, getLogs, logBulk } = require("../Controllers/dailylogController");
const router = express.Router();

router.use(auth);
router.post("/", log);
router.get("/",getLogs);
router.post("/bulk",logBulk);

module.exports = router;