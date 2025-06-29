const redis = require("../db/redis/redis");

const RANK_KEY = "users:coin_rank";

exports.updateCoinRanking = async (userId, coin) => {
  await redis.zAdd(RANK_KEY, [
    { score: coin, value: userId }
  ]);
};
