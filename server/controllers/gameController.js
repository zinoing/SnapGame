const GameRepository = require('../repositories/gameRepository');

const GameController = {
    createGame: async (req, res) => {
        try {
            const { title, description, thumbnailUrl, gameUrl, createdBy } = req.body;
            const gameId = await GameRepository.createGame(title, description, thumbnailUrl, gameUrl, createdBy);
            res.status(201).json({ gameId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create game.' });
        }
    },

    startGame: async (req, res) => {
        try {
            const { userId, gameId } = req.params;
            const { sessionId } = await GameRepository.startGame(userId, gameId);

            if (!sessionId) {
                return res.status(500).json({ error: 'Failed to create session.' });
            }

            res.status(201).json({ sessionId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to start game.' });
        }
    },

    endGame: async (req, res) => {
        try {
            const { sessionId } = req.params;
            const game = await GameRepository.endGame(sessionId);
            if (!game) return res.status(404).json({ error: 'Game not found.' });
            res.json(game);
        } catch (error) {
            res.status(500).json({ error: 'Failed to end game.' });
        }
    },

    getGame: async (req, res) => {
        try {
            const { gameId } = req.params;
            const game = await GameRepository.getGameById(gameId);
            if (!game) return res.status(404).json({ error: 'Game not found.' });
            res.json(game);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch game.' });
        }
    },

    listGames: async (req, res) => {
        try {
            const games = await GameRepository.listGames();
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list games.' });
        }
    }
};

module.exports = GameController;