const express = require("express");
const router = express.Router();
const { pushUpTracker } = require("../controllers/track.controller");

router.post("/pushups", pushUpTracker);

module.exports = router;
