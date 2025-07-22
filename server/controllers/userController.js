const UserRepository = require('../repositories/userRepository');

const UserController = {
    register: async (req, res) => {
        try {
            const { username, email, passwordHash } = req.body;
            const userId = await UserRepository.createUser(username, email, passwordHash);
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
    }
};

module.exports = UserController;