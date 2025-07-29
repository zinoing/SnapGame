const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:userId', UserController.getUserInfo);
router.post('/upgrade', UserController.upgradeGuestToUser);

module.exports = router;