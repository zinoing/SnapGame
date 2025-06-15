const gameRepo = require("../repositories/gameRepository");
const { updateGameResult } = require("../utils/gameLogic");

exports.createGame = async (req, res) => {
  const { gameId, gameName, levelCount, genre } = req.body;
  if (!gameId || !gameName || !levelCount || !genre) {
    return res.status(400).json({ error: "Missing game info" });
  }

  try {
    await gameRepo.createGame({ gameId, gameName, levelCount, genre });
    res.status(201).json({ message: "Game created successfully" });
  } catch (err) {
    console.error("Error creating game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await gameRepo.getGameById(id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error("Error getting game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTopGames = async (req, res) => {
  try {
    const topGames = await gameRepo.getTopGames(10);
    res.json(topGames);
  } catch (err) {
    console.error("Error getting top games:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.submitGameResult = async (req, res) => {
  const { userId, level, gameId } = req.body;
  console.log("Game result for user:", userId);

  try {
    const result = await updateGameResult(userId, level, gameId);
    res.json(result);
  } catch (err) {
    console.error("Error updating game result:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};