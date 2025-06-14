const express = require("express");
const router = express.Router();
const controller = require("../controllers/userGameStatsController");

router.post("/", controller.submitGameStats);
router.get("/:userId/:gameId", controller.getGameStats);

module.exports = router;
