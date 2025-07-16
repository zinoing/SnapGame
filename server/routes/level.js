const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

router.post("/incrementLevelAttempt", levelController.incrementLevelAttempt);
router.post("/incrementLevelSuccess", levelController.incrementLevelSuccess);
router.post("/missionDescription", levelController.getLevelMissionDescription);
router.get("/:gameId/:levelIndex", levelController.getLevelStats);

module.exports = router;
