const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { getUserHighScore } = require('../utils/storage');

const router = express.Router();

// GET /game - Show game page (requires auth)
router.get('/game', requireAuth, (req, res) => {
  const highScore = getUserHighScore(req.session.user.id);
  res.render('game', { highScore });
});

module.exports = router;
