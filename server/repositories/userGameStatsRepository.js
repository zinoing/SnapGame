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
    }
};

module.exports = UserGameStatsRepository;