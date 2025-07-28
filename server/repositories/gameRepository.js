const db = require('../config/db/mysql.js');

const GameRepository = {
    createGame: async (title, description, thumbnailUrl, gameUrl, createdBy) => {
        const [result] = await db.execute(
            'INSERT INTO games (title, description, thumbnail_url, game_url, created_by) VALUES (?, ?, ?, ?, ?)',
            [title, description, thumbnailUrl, gameUrl, createdBy]
        );
        return result.insertId;
    },

    startGame: async (userId, gameId) => {
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            const [result] = await conn.execute(
                'INSERT INTO game_sessions (user_id, game_id) VALUES (?, ?)',
                [userId, gameId]
            );

            await conn.execute(
                `INSERT INTO game_history (user_id, game_id, total_play_count, last_played_at)
                VALUES (?, ?, 1, NOW())
                ON DUPLICATE KEY UPDATE 
                    total_play_count = total_play_count + 1,
                    last_played_at = NOW();`,
                [userId, gameId]
            );

            await conn.commit();

            return { sessionId: result.insertId };
        } catch (err) {
            await conn.rollback();
            console.error("🔥 gameHistory INSERT 실패:", err); 
            throw err;
        } finally {
            conn.release();
        }
    },

    endGame: async (sessionId, endedAt = new Date()) => {
        const [result] = await db.execute(
            'UPDATE game_sessions SET ended_at = ? WHERE id = ?',
            [endedAt, sessionId]
        );
        return result.affectedRows > 0;
    },

    getGameById: async (gameId) => {
        const [rows] = await db.execute('SELECT * FROM games WHERE id = ?', [gameId]);
        return rows[0];
    },

    listGames: async () => {
        const [rows] = await db.execute('SELECT * FROM games ORDER BY created_at DESC');
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

module.exports = GameRepository;