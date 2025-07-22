const express = require('express');
const router = express.Router();
const GameInteractionController = require('../controllers/gameInteractionController');

router.post('/like', GameInteractionController.likeGame);
router.delete('/users/:userId/games/:gameId/like', GameInteractionController.unlikeGame);
router.get('/user/:userId/likes', GameInteractionController.getLikedGamesByUser);

router.post('/bookmark', GameInteractionController.bookmarkGame);
router.delete('/users/:userId/games/:gameId/bookmark', GameInteractionController.unbookmarkGame);
router.get('/user/:userId/bookmarks', GameInteractionController.getBookmarkedGamesByUser);

module.exports = router;