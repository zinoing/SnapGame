const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id/coins", userController.getUserCoins);
router.post("/", userController.createUser);
router.get("/:id", userController.getUser);
router.post("/:id/coins", userController.saveUserCoins);

module.exports = router;
