const db = require("../db/mysql");

exports.likeGame = async (userId, gameId) => {
  const sql = `INSERT IGNORE INTO game_likes (user_id, game_id) VALUES (?, ?)`;
  await db.execute(sql, [userId, gameId]);
};

exports.unlikeGame = async (userId, gameId) => {
  const sql = `DELETE FROM game_likes WHERE user_id = ? AND game_id = ?`;
  await db.execute(sql, [userId, gameId]);
};

exports.getUserLikes = async (userId) => {
  const sql = `SELECT game_id FROM game_likes WHERE user_id = ?`;
  const [rows] = await db.execute(sql, [userId]);
  return rows;
};
