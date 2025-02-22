const express = require("express");
const router = express.Router();
const {
  curlTracker,
  pushUpTracker,
  squatTracker,
} = require("../controllers/track.controller");

router.post("/curls", curlTracker);
router.post("/pushups", pushUpTracker);
router.post("/squats", squatTracker);

module.exports = router;
