const repo = require("../repositories/gameInteractionRepository");

exports.like = async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or gameId" });
  }

  try {
    await repo.likeGame(userId, gameId);
    res.status(200).json({ message: "Game liked" });
  } catch (err) {
    console.error("Error liking game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unlike = async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "Missing userId or gameId" });
  }

  try {
    await repo.unlikeGame(userId, gameId);
    res.status(200).json({ message: "Game unliked" });
  } catch (err) {
    console.error("Error unliking game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLikes = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const likedGames = await repo.getUserLikes(userId);
    res.status(200).json(likedGames);
  } catch (err) {
    console.error("Error fetching likes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
