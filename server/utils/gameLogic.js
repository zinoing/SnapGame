const redis = require("../db/redis/redis");
const userRepo = require("../repositories/userRepository");
const gameRepo = require("../repositories/gameRepository");

async function updateGameResult(userId, reward) {
  const userKey = `user:${userId}`;
  let coinStr = await redis.hGet(userKey, "coins");

  if (coinStr === null) {
    const coins = await userRepo.getUserCoins(userId);
    coinStr = coins?.toString() ?? "0";
    await redis.hSet(userKey, "coins", coinStr);
  }
  
  let newCoins = parseInt(coinStr, 10);
  newCoins += reward;

  await userRepo.setUserCoins(userId, newCoins); 

  return { success: true, coins: newCoins, reward };
}

module.exports = { updateGameResult };
