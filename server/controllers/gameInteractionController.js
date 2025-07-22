const GameInteractionRepository = require('../repositories/gameInteractionRepository');

const GameInteractionController = {
    likeGame: async (req, res) => {
        try {
            const { userId, gameId } = req.body;
            await GameInteractionRepository.likeGame(userId, gameId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to like game.' });
        }
    },

    unlikeGame: async (req, res) => {
        try {
            const { userId, gameId } = req.params;
            await GameInteractionRepository.unlikeGame(userId, gameId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to unlike game.' });
        }
    },

    getLikedGamesByUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const likedGames = await GameInteractionRepository.getLikedGamesByUser(userId);
            res.json(likedGames);
        } catch (err) {
            res.status(500).json({ error: 'Failed to load liked games' });
        }
    },

    bookmarkGame: async (req, res) => {
        try {
            const { userId, gameId } = req.body;
            await GameInteractionRepository.bookmarkGame(userId, gameId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to bookmark game.' });
        }
    },

    unbookmarkGame: async (req, res) => {
        try {
            const { userId, gameId } = req.params;
            await GameInteractionRepository.unbookmarkGame(userId, gameId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to unbookmark game.' });
        }
    },

    getBookmarkedGamesByUser: async (req, res) => {
    const { userId } = req.params;
        try {
            const bookmarks = await GameInteractionRepository.getBookmarkedGamesByUser(userId);
            res.json(bookmarks);
        } catch (err) {
            res.status(500).json({ error: 'Failed to load bookmarked games' });
        }
    }
};

module.exports = GameInteractionController;