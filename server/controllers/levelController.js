const levelRepo = require("../repositories/levelRepository");

exports.trackDoubleAttempt = async (req, res) => {
  const { gameId, levelIndex, success } = req.body;

  if (!gameId || levelIndex === undefined) {
    return res.status(400).json({ error: "Missing gameId or levelIndex" });
  }

  try {
    await levelRepo.incrementDoubleAttempt(gameId, levelIndex, success);
    res.status(200).json({ message: "Level stats updated" });
  } catch (err) {
    console.error("Error updating level stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLevelStats = async (req, res) => {
  const { gameId, levelIndex } = req.params;

  try {
    const stats = await levelRepo.getLevelStats(gameId, levelIndex);
    res.json(stats);
  } catch (err) {
    console.error("Error fetching level stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
