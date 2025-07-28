const express = require('express');
const router = express.Router();
const UserGameStatsController = require('../controllers/userGameStatsController');

router.get('/like/:userId', UserGameStatsController.getUserLikedGames);
router.get('/bookmark/:userId', UserGameStatsController.getUserBookmarkedGames);
router.get('/history/:userId', UserGameStatsController.getUserGameHistory);

router.delete('/history/:userId/:gameId', UserGameStatsController.deleteGameHistory);

router.get('/result/:sessionId', UserGameStatsController.getGameResult);
router.post('/result/:sessionId', UserGameStatsController.submitGameResult);

module.exports = router;