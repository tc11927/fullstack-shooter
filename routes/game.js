const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getUserHighScore } = require("../utils/storage");

const router = express.Router();

// GET /game - Show game page (requires auth)
router.get("/game", requireAuth, async (req, res, next) => {
    try {
        const highScore = await getUserHighScore(req.session.user.id);
        res.render("game", { highScore });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
