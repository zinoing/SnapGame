const db = require("../db/mysql");
const redis = require("../db/redis/redis");

exports.incrementLevelAttempt = async (gameId, levelIndex) => {
  const sql = `UPDATE levels SET level_attempts = level_attempts + 1
              WHERE game_id = ? AND level_index = ?`;

  await db.execute(sql, [gameId, levelIndex]);
};

exports.incrementLevelSuccess = async (gameId, levelIndex) => {
  const sql = `UPDATE levels SET level_successes = level_successes + 1
              WHERE game_id = ? AND level_index = ?`;
  await db.execute(sql, [gameId, levelIndex]);
};

exports.getLevelStats = async (gameId, levelIndex) => {
  const sql = `SELECT * FROM levels WHERE game_id = ? AND level_index = ?`;
  const [rows] = await db.execute(sql, [gameId, levelIndex]);
  return rows[0];
};

exports.getLevelMissionDescription = async (gameId, levelIndex) => {
  const sql = `SELECT description FROM levels WHERE game_id = ? AND level_index = ?`;
  const [rows] = await db.execute(sql, [gameId, levelIndex]);
  return rows[0];
};
