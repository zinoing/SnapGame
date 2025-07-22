const db = require('../config/db/mysql.js');

const UserGameStatsRepository = {
    logGameSession: async (userId, gameId, score) => {
        await db.execute(
            'INSERT INTO game_sessions (user_id, game_id, score, ended_at) VALUES (?, ?, ?, NOW())',
            [userId, gameId, score]
        );
    },

    getUserGameHistory: async (userId) => {
        const [rows] = await db.execute(
            'SELECT * FROM game_sessions WHERE user_id = ? ORDER BY started_at DESC',
            [userId]
        );
        return rows;
    }
};

module.exports = UserGameStatsRepository;