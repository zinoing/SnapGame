const express = require('express');
const router = express.Router();
const UserGameStatsController = require('../controllers/userGameStatsController');

router.get('/like/:userId', UserGameStatsController.getUserLikedGames);
router.get('/bookmark/:userId', UserGameStatsController.getUserBookmarkedGames);
router.get('/history/:userId', UserGameStatsController.getUserGameHistory);

module.exports = router;