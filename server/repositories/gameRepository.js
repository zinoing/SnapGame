const db = require("../db/mysql");

exports.createGame = async ({ gameId, gameName, levelCount, genre }) => {
  const sql = `
    INSERT INTO games (game_id, game_name, level_count, genre)
    VALUES (?, ?, ?, ?)
  `;
  await db.execute(sql, [gameId, gameName, levelCount, genre]);
};

exports.getGameList = async () => {
  const sql = `
    SELECT 
      game_id AS gameId,
      name,
      mode,
      level_count AS levels,
      genre_tags AS tags
    FROM games
  `;

  const [rows] = await db.execute(sql);

  return rows.map(game => ({
    ...game,
    tags: Array.isArray(game.tags)
      ? game.tags
      : typeof game.tags === "string"
      ? JSON.parse(game.tags)
      : [],
  }));
};

exports.getGameById = async (gameId) => {
  const sql = `SELECT * FROM games WHERE game_id = ?`;
  const [rows] = await db.execute(sql, [gameId]);
  return rows[0];
};

exports.getTopGames = async (limit = 10) => {
  const sql = `SELECT * FROM games ORDER BY play_count DESC LIMIT ?`;
  const [rows] = await db.execute(sql, [limit]);
  return rows;
};