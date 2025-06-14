const db = require("../db/mysql");
const redis = require("../db/redis");

exports.upsertStats = async (userId, gameId, score, cleared) => {
  const updateSql = `
    INSERT INTO user_game_stats (user_id, game_id, high_score, clear_count, fail_count)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      high_score = GREATEST(high_score, VALUES(high_score)),
      clear_count = clear_count + VALUES(clear_count),
      fail_count = fail_count + VALUES(fail_count)
  `;
  const clear = cleared ? 1 : 0;
  const fail = cleared ? 0 : 1;

  await db.execute(updateSql, [userId, gameId, score, clear, fail]);
};

exports.getStats = async (userId, gameId) => {
  const sql = `SELECT * FROM user_game_stats WHERE user_id = ? AND game_id = ?`;
  const [rows] = await db.execute(sql, [userId, gameId]);
  return rows[0];
};
