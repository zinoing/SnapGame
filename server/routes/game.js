const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");

router.post("/", gameController.createGame);
router.post("/result", gameController.submitGameResult);
router.get("/list", gameController.getGameList);
router.get("/top", gameController.getTopGames);
router.get("/:id", gameController.getGame);

module.exports = router;