const statsRepo = require("../repositories/userGameStatsRepository");

exports.submitGameStats = async (req, res) => {
  const { userId, gameId, score, cleared } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or gameId" });
  }

  try {
    await statsRepo.upsertStats(userId, gameId, score, cleared);
    res.status(200).json({ message: "Game stats updated" });
  } catch (err) {
    console.error("Error updating stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getGameStats = async (req, res) => {
  const { userId, gameId } = req.params;

  try {
    const stats = await statsRepo.getStats(userId, gameId);
    res.json(stats);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
