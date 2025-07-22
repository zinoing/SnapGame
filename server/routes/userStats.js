const express = require('express');
const router = express.Router();
const UserGameStatsController = require('../controllers/userGameStatsController');

router.post('/log', UserGameStatsController.logGameSession);
router.get('/:userId/history', UserGameStatsController.getUserGameHistory);

module.exports = router;