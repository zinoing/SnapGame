const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");

router.post("/", gameController.createGame);
router.post("/result", gameController.submitGameResult);
router.get("/:id", gameController.getGame);
router.get("/", gameController.getTopGames);

module.exports = router;