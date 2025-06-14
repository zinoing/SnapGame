const userRepo = require("../../repositories/userRepository");

exports.saveUserCoinsLogic = async (userId, coins) => {
  if (!userId || coins === undefined) throw new Error("Invalid input");
  await userRepo.setUserCoins(userId, coins);
};