const db = require("../db/mysql");
const redis = require("../db/redis");

exports.createLevel = async (gameId, levelIndex) => {
  const sql = `INSERT INTO levels (game_id, level_index) VALUES (?, ?)`;
  await db.execute(sql, [gameId, levelIndex]);
};

exports.incrementDoubleAttempt = async (gameId, levelIndex, success = false) => {
  const sql = success
    ? `UPDATE levels SET double_attempts = double_attempts + 1, double_successes = double_successes + 1
       WHERE game_id = ? AND level_index = ?`
    : `UPDATE levels SET double_attempts = double_attempts + 1
       WHERE game_id = ? AND level_index = ?`;

  await db.execute(sql, [gameId, levelIndex]);
};

exports.getLevelStats = async (gameId, levelIndex) => {
  const sql = `SELECT * FROM levels WHERE game_id = ? AND level_index = ?`;
  const [rows] = await db.execute(sql, [gameId, levelIndex]);
  return rows[0];
};
