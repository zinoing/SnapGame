const db = require('../config/db/mysql.js');

const UserGameStatsRepository = {
    getUserLikedGames: async (userId) => {
        const [rows] = await db.execute(
            'SELECT * FROM game_likes WHERE user_id = ?',
            [userId]
        );
        return rows;
    },

    getUserBookmarkedGames: async (userId) => {
        const [rows] = await db.execute(
            'SELECT * FROM game_bookmarks WHERE user_id = ?',
            [userId]
        );
        return rows;
    },

    getUserGameHistory: async (userId) => {
        const [rows] = await db.execute(
            'SELECT * FROM game_history WHERE user_id = ?',
            [userId]
        );
        return rows;
    },

    deleteGameHistory: async (userId, gameId) => {
        const [result] = await db.execute(
            'DELETE FROM game_history WHERE user_id = ? AND game_id = ?',
            [userId, gameId]
        );
        return result.affectedRows > 0;
    },

    getGameResult: async (sessionId) => {
        const [rows] = await db.execute(
            'SELECT FROM game_results WHERE sessionId = ?',
            [sessionId]
        );
        return rows;
    },

    submitGameResult: async (sessionId, userId, gameId, custom) => {
        const [res] = await db.execute(
            `INSERT INTO game_results (session_id, user_id, game_id, custom_json) 
            VALUES (?, ?, ?, ?)`,
            [sessionId, userId, gameId, JSON.stringify(custom)]
        );
        return res.insertId;
    }
};

module.exports = UserGameStatsRepository;