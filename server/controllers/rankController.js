const rankRepo = require("../repositories/rankRepository");

exports.getTotalCoinRanking = async (req, res) => {
  try {
    const topUsers = await rankRepo.getTopCoinUsersFromRedis();
    res.status(200).json(topUsers);
  } catch (err) {
    console.error("Redis coin ranking error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCoinRank = async (userId) => {
  const rank = await redis.zrevrank("users:coin_rank", userId); // 0-based
  const score = await redis.zscore("users:coin_rank", userId);

  return {
    rank: rank !== null ? rank + 1 : null,
    coin: score !== null ? parseInt(score) : null,
  };
};