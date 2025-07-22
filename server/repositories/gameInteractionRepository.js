const db = require('../config/db/mysql');

const GameInteractionRepository = {
  likeGame: async (userId, gameId) => {
    await db.execute(
      'INSERT IGNORE INTO game_likes (user_id, game_id) VALUES (?, ?)',
      [userId, gameId]
    );
  },

  unlikeGame: async (userId, gameId) => {
    await db.execute(
      'DELETE FROM game_likes WHERE user_id = ? AND game_id = ?',
      [userId, gameId]
    );
  },

  bookmarkGame: async (userId, gameId) => {
    await db.execute(
      'INSERT IGNORE INTO game_bookmarks (user_id, game_id) VALUES (?, ?)',
      [userId, gameId]
    );
  },

  unbookmarkGame: async (userId, gameId) => {
    await db.execute(
      'DELETE FROM game_bookmarks WHERE user_id = ? AND game_id = ?',
      [userId, gameId]
    );
  },

  getLikedGamesByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT g.*
       FROM games g
       JOIN game_likes gl ON g.id = gl.game_id
       WHERE gl.user_id = ?`,
      [userId]
    );
    return rows;
  },

  getBookmarkedGamesByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT g.*
       FROM games g
       JOIN game_bookmarks gb ON g.id = gb.game_id
       WHERE gb.user_id = ?`,
      [userId]
    );
    return rows;
  }
};

module.exports = GameInteractionRepository;
