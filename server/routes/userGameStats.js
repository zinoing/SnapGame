const express = require('express');
const router = express.Router();
const UserGameStatsController = require('../controllers/userGameStatsController');

router.get('/like/:userId', UserGameStatsController.getUserLikedGames);
router.get('/bookmark/:userId', UserGameStatsController.getUserBookmarkedGames);
router.get('/history/:userId', UserGameStatsController.getUserGameHistory);

router.delete('/history/:userId/:gameId', UserGameStatsController.deleteGameHistory);

router.get('/result/:userId/:gameId', UserGameStatsController.getGameResult);
router.post('/result', UserGameStatsController.submitGameResult);

module.exports = router;