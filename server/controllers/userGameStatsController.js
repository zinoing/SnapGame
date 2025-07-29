const UserGameStatsRepository = require('../repositories/userGameStatsRepository');
const GameRepository = require('../repositories/gameRepository');

const UserGameStatsController = {
    getUserLikedGames: async (req, res) => {
        try {
            const { userId } = req.params;
            const games = await UserGameStatsRepository.getUserLikedGames(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve liked games.' });
        }
    },

    getUserBookmarkedGames: async (req, res) => {
        try {
            const { userId } = req.params;
            const games = await UserGameStatsRepository.getUserBookmarkedGames(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookmarked games.' });
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
    },

    deleteGameHistory: async (req, res) => {
        try {
            const { userId, gameId } = req.params;
            const result = await UserGameStatsRepository.deleteGameHistory(userId, gameId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete game history.' });
        }
    },

    getGameResult: async (req, res) => {
        try {
            const { userId, gameId } = req.params;
            const gameResult = await UserGameStatsRepository.getGameResult(userId, gameId);
            res.json(gameResult);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve game result.' });
        }
    },
    
    submitGameResult: async (req, res) => {
        try {
            const { sessionId, userId, gameId, custom } = req.body;

            await GameRepository.endGame(sessionId);
            const resultId = await UserGameStatsRepository.submitGameResult(sessionId, userId, gameId, custom);

            res.status(201).json({ resultId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit game result.' });
        }
    }
};

module.exports = UserGameStatsController;