const UserRepository = require('../repositories/userRepository');

const UserController = {
    register: async (req, res) => {
        try {
            const { username, email, passwordHash, isGuest, expiresAt} = req.body;

            if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
            }

            const userId = await UserRepository.createUser(username, email || null, passwordHash || null, isGuest, expiresAt);
            res.status(201).json({ userId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user.' });
        }
    },

    login: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UserRepository.getUserByEmail(email);
            if (!user) return res.status(404).json({ error: 'User not found.' });
            await UserRepository.updateLastLogin(user.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Login failed.' });
        }
    },

    upgradeGuestToUser: async (req, res) => {
        try {
            const { userId, email, passwordHash } = req.body;
            const result = await UserRepository.upgradeGuestToUser(userId, email, passwordHash);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Upgrade failed.' });
        }
    }
};

module.exports = UserController;