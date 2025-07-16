const repo = require("../repositories/levelRepository");

exports.incrementLevelAttempt = async (req, res) => {
  const { gameId, levelIndex } = req.body;
  if (!gameId || levelIndex === undefined) {
    return res.status(400).json({ error: "Missing gameId or levelIndex" });
  }

  try {
    await repo.incrementLevelAttempt(gameId, levelIndex);
    res.status(200).json({ message: "Level attempt incremented" });
  } catch (err) {
    console.error("Error incrementing level attempt:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.incrementLevelSuccess = async (req, res) => {
  const { gameId, levelIndex } = req.body;
  if (!gameId || levelIndex === undefined) {
    return res.status(400).json({ error: "Missing gameId or levelIndex" });
  }

  try {
    await repo.incrementLevelSuccess(gameId, levelIndex);
    res.status(200).json({ message: "Level success incremented" });
  } catch (err) {
    console.error("Error incrementing level success:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLevelStats = async (req, res) => {
  const { gameId, levelIndex } = req.body;

  if (!gameId || levelIndex === undefined) {
    return res.status(400).json({ error: "Missing gameId or levelIndex" });
  }

  try {
    const stats = await repo.getLevelStats(gameId, parseInt(levelIndex));
    if (!stats) {
      return res.status(404).json({ error: "Level not found" });
    }
    res.status(200).json(stats);
  } catch (err) {
    console.error("Error fetching level stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLevelMissionDescription = async (req, res) => {
  const { gameId, levelIndex } = req.body;

  if (!gameId || levelIndex === undefined) {
    return res.status(400).json({ error: "Missing gameId or levelIndex" });
  }

  try {
    const description = await repo.getLevelMissionDescription(gameId, parseInt(levelIndex));
    if (!description) {
      return res.status(404).json({ error: "Level not found" });
    }
    res.status(200).json(description);
  } catch (err) {
    console.error("Error fetching level mission description:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};