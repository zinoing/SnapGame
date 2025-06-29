const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/gameInteractionController");

router.post("/like", ctrl.like);
router.post("/unlike", ctrl.unlike);
router.get("/:userId/likes", ctrl.getLikes);

module.exports = router;