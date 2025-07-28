const express = require('express');
const router = express.Router();
const GameController = require('../controllers/gameController');

router.post('/', GameController.createGame);
router.get('/list', GameController.listGames);
router.post('/start/:userId/:gameId', GameController.startGame);
router.post('/end/:sessionId', GameController.endGame);
router.get('/:gameId', GameController.getGame);

module.exports = router;