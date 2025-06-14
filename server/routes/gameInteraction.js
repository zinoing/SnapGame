const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/gameInteractionController");

router.post("/like", ctrl.like);
router.post("/unlike", ctrl.unlike);
router.post("/favorite", ctrl.favorite);
router.post("/unfavorite", ctrl.unfavorite);
router.get("/:userId/likes", ctrl.getLikes);
router.get("/:userId/favorites", ctrl.getFavorites);

module.exports = router;