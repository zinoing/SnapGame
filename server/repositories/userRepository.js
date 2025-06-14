const db = require("../db/mysql");
const { hGet, hSet } = require("../db/redis/redisUtils");
const { userKey } = require("../db/redis/redisKeys");

exports.createUser = async ({ userId, nickname, passwordHash = null }) => {
  const sql = `
    INSERT INTO users (user_id, nickname, password_hash)
    VALUES (?, ?, ?)
  `;
  await db.execute(sql, [userId, nickname, passwordHash]);

  await hSet(userKey(userId), {
    coins: 0,
    currentLevel: 1
  });
};

exports.getUserById = async (userId) => {
  const sql = `SELECT * FROM users WHERE user_id = ?`;
  const [rows] = await db.execute(sql, [userId]);
  return rows[0];
};

exports.updateUserStats = async (userId, stats) => {
  const {
    totalPlayTime,
    lastPlayedTime,
    doubleChoiceFrequency,
    levelAttempts,
    clearRate,
    playHourDistribution,
    avgSessionDuration
  } = stats;

  const sql = `
    UPDATE users SET
      total_play_time = ?,
      last_played_time = ?,
      double_choice_frequency = ?,
      level_attempts = ?,
      clear_rate = ?,
      play_hour_distribution = ?,
      avg_session_duration = ?
    WHERE user_id = ?
  `;

  await db.execute(sql, [
    totalPlayTime,
    lastPlayedTime,
    doubleChoiceFrequency,
    levelAttempts,
    clearRate,
    JSON.stringify(playHourDistribution),
    avgSessionDuration,
    userId
  ]);
};

exports.getUserCoins = async (userId) => {
  const key = userKey(userId);
  let coins = await hGet(key, "coins");

  if (coins === null) {
    const sql = `SELECT coins FROM users WHERE user_id = ?`;
    const [rows] = await db.execute(sql, [userId]);
    coins = rows.length > 0 ? rows[0].coins : 0;
    await hSet(key, "coins", coins.toString());
  }

  return parseInt(coins, 10);
};

exports.setUserCoins = async (userId, coins) => {
  const sql = `UPDATE users SET coins = ? WHERE user_id = ?`;
  await db.execute(sql, [coins, userId]);
  await hSet(userKey(userId), "coins", coins.toString());
};