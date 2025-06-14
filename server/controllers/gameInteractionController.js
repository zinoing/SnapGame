const repo = require("../repositories/gameInteractionRepository");

exports.like = async (req, res) => {
  const { userId, gameId } = req.body;
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
  try {
    await repo.unlikeGame(userId, gameId);
    res.status(200).json({ message: "Game unliked" });
  } catch (err) {
    console.error("Error unliking game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.favorite = async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    await repo.favoriteGame(userId, gameId);
    res.status(200).json({ message: "Game favorited" });
  } catch (err) {
    console.error("Error favoriting game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unfavorite = async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    await repo.unfavoriteGame(userId, gameId);
    res.status(200).json({ message: "Game unfavorited" });
  } catch (err) {
    console.error("Error unfavoriting game:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLikes = async (req, res) => {
  const { userId } = req.params;
  try {
    const games = await repo.getUserLikes(userId);
    res.status(200).json(games);
  } catch (err) {
    console.error("Error fetching likes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const games = await repo.getUserFavorites(userId);
    res.status(200).json(games);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};