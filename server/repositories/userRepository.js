const db = require('../config/db/mysql.js');

const UserRepository = {
    createUser: async (username, email, passwordHash) => {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        return result.insertId;
    },

    getUserByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    updateLastLogin: async (userId) => {
        await db.execute('UPDATE users SET last_login = NOW() WHERE id = ?', [userId]);
    }
};

module.exports = UserRepository;