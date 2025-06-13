const redis = require("../db/redis");

const LEVEL_THRESHOLDS = {
  1: 5,
  2: 10,
  3: 15
};

async function updateGameResult(userId, score, level) {
  const threshold = LEVEL_THRESHOLDS[level] || 100;
  const success = score >= threshold;

  const userKey = `user:${userId}`;
  const currentCoins = parseInt(await redis.hGet(userKey, "coins")) || 0;

  if (success) {
    const reward = 100 * Math.pow(2, level - 1);
    await redis.hSet(userKey, "coins", currentCoins + reward);
  } else {
    await redis.hSet(userKey, "coins", 0); 
  }

  return { success };
}

module.exports = { updateGameResult };
