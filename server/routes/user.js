const express = require("express");
const router = express.Router();
const redis = require("../db/redis");

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userKey = `user:${userId}`;

  try {
    const [coins, level] = await Promise.all([
      redis.hGet(userKey, "coins"),
      redis.hGet(userKey, "currentLevel")
    ]);

    res.json({
      userId,
      coins: parseInt(coins) || 0,
      currentLevel: parseInt(level) || 1
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
