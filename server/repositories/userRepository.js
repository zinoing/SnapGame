const db = require('../config/db/mysql.js');

const UserRepository = {
    createUser: async (username, email, passwordHash, isGuest, expiresAt) => {
        const [result] = await db.query(
            `INSERT INTO users (username, email, password_hash, is_guest, expires_at)
            VALUES (?, ?, ?, ?, ?)`,
            [
            username,
            email ?? null,
            passwordHash ?? null,
            isGuest ?? false,
            expiresAt ?? null,
            ]
        );
        return result.insertId;
    },


    upgradeGuestToUser: async (username, email, passwordHash) => {
        const [result] = await db.query(
            `
            UPDATE users
            SET email = ?, password_hash = ?, is_guest = FALSE, expires_at = NULL
            WHERE username = ? AND is_guest = TRUE
            `,
            [email, passwordHash, username]
        );

        return result.affectedRows > 0;
    },

    getUserById: async (userId) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
        return rows[0];
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