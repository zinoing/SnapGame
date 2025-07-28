const UserGameStatsRepository = require('../repositories/userGameStatsRepository');

const UserGameStatsController = {
    getUserLikedGames: async (req, res) => {
        try {
            const { userId } = req.params;
            const games = await UserGameStatsRepository.getUserLikedGames(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve game history.' });
        }
    },

    getUserBookmarkedGames: async (req, res) => {
        try {
            const { userId } = req.params;
            const games = await UserGameStatsRepository.getUserBookmarkedGames(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve game history.' });
        }
    },

    getUserGameHistory: async (req, res) => {
        try {
            const { userId } = req.params;
            const games = await UserGameStatsRepository.getUserGameHistory(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve game history.' });
        }
    }
};

module.exports = UserGameStatsController;