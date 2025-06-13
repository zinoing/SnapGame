const express = require("express");
const router = express.Router();
const { updateGameResult } = require("../utils/gameLogic");

router.post("/result", async (req, res) => {
  const { userId, score, currentLevel } = req.body;
  const result = await updateGameResult(userId, score, currentLevel);
  res.json(result);
});

module.exports = router;
