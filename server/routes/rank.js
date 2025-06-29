const express = require("express");
const router = express.Router();
const rankController = require("../controllers/rankController");

router.get("/coin", rankController.getTotalCoinRanking);
router.get("/coin/:userId", rankController.getUserCoinRank);

module.exports = router;
