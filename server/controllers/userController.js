const userRepo = require("../repositories/userRepository");

exports.createUser = async (req, res) => {
  const { userId, nickname } = req.body;

  if (!userId || !nickname) {
    return res.status(400).json({ error: "Missing userId or nickname" });
  }

  try {
    await userRepo.createUser({ userId, nickname });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Failed to create user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userRepo.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Failed to get user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCoins = async (req, res) => {
  const userId = req.params.id;

  try {
    const coins = await userRepo.getUserCoins(userId);
    res.json({ coins });
  } catch (err) {
    console.error("Failed to get user coins:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.saveUserCoins = async (req, res) => {
  const userId = req.params.id;
  const { coins } = req.body;

  if (!userId || coins === undefined) {
    return res.status(400).json({ error: "Missing userId or coins" });
  }

  try {
    await userRepo.setUserCoins(userId, coins);
    res.status(200).json({ message: "Coins updated successfully" });
  } catch (err) {
    console.error("Error saving user coins:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
