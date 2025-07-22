const UserGameStatsRepository = require('../repositories/userGameStatsRepository');

const UserGameStatsController = {
    logGameSession: async (req, res) => {
        try {
            const { userId, gameId, score } = req.body;
            await UserGameStatsRepository.logGameSession(userId, gameId, score);
            res.status(201).json({ message: 'Session logged.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to log game session.' });
        }
    },

    getUserGameHistory: async (req, res) => {
        try {
            const { userId } = req.params;
            const sessions = await UserGameStatsRepository.getUserGameHistory(userId);
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve game history.' });
        }
    }
};

module.exports = UserGameStatsController;