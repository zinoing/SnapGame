const redis = require("../db/redis");
const userService = require("../utils/services/userService");

const LEVEL_THRESHOLDS = { 1: 5, 2: 10, 3: 15 };

async function updateGameResult(userId, score, level) {
  const threshold = LEVEL_THRESHOLDS[level] || 100;
  const success = score >= threshold;

  const userKey = `user:${userId}`;
  let coinStr = await redis.hGet(userKey, "coins");

  if (coinStr === null) {
    const coinsFromDB = await getUserCoinsFromDB(userId);
    coinStr = coinsFromDB ?? "0";
    await redis.hSet(userKey, "coins", coinStr);
  }
  
  let newCoins = parseInt(coinStr, 10);

  if (success) {
    const reward = 100 * Math.pow(2, level - 1);
    newCoins += reward;
  } else {
    newCoins = 0;
  }

  await redis.hSet(userKey, "coins", newCoins);

  await userService.saveUserCoinsLogic(userId, newCoins); 

  return { success };
}

module.exports = { updateGameResult };
