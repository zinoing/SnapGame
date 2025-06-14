const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

router.post("/track", levelController.trackDoubleAttempt);
router.get("/:gameId/:levelIndex", levelController.getLevelStats);

module.exports = router;
