const db = require("../db/mysql");

exports.createGame = async ({ gameId, gameName, levelCount, genre }) => {
  const sql = `
    INSERT INTO games (game_id, game_name, level_count, genre)
    VALUES (?, ?, ?, ?)
  `;
  await db.execute(sql, [gameId, gameName, levelCount, genre]);
};

exports.getGameById = async (gameId) => {
  const sql = `SELECT * FROM games WHERE game_id = ?`;
  const [rows] = await db.execute(sql, [gameId]);
  return rows[0];
};

exports.incrementPlayCount = async (gameId) => {
  const sql = `UPDATE games SET play_count = play_count + 1 WHERE game_id = ?`;
  await db.execute(sql, [gameId]);
};

exports.getTopGames = async (limit = 10) => {
  const sql = `SELECT * FROM games ORDER BY play_count DESC LIMIT ?`;
  const [rows] = await db.execute(sql, [limit]);
  return rows;
};
