const { zRevRange } = require("../db/redis/redisUtils");

exports.getTopCoinUsersFromRedis = async (limit = 100) => {
  const userIds = await zRevRange("users:coin_rank", 0, limit - 1, "WITHSCORES");

  const result = [];
  for (let i = 0; i < userIds.length; i += 2) {
    result.push({
      user_id: userIds[i],
      coin: parseInt(userIds[i + 1]),
    });
  }

  return result;
};
