const redis = require("../db/redis/redis");
const userRepo = require("../repositories/userRepository");
const gameRepo = require("../repositories/gameRepository");

async function updateGameResult(userId, level, gameId) {
  const userKey = `user:${userId}`;
  let coinStr = await redis.hGet(userKey, "coins");

  if (coinStr === null) {
    const coins = await userRepo.getUserCoins(userId);
    coinStr = coins?.toString() ?? "0";
    await redis.hSet(userKey, "coins", coinStr);
  }
  
  let newCoins = parseInt(coinStr, 10);
  const base_reward = await gameRepo.getBaseReward(gameId);
  const reward = base_reward * Math.pow(2, level - 1);
  newCoins += reward;

  await redis.hSet(userKey, "coins", newCoins);

  await userRepo.setUserCoins(userId, newCoins); 

  return { success: true, coins: newCoins, reward };
}

module.exports = { updateGameResult };
