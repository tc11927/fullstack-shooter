const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { requireAuth } = require('../middleware/auth');
const { getTopScores, addScore, getUserScores } = require('../utils/storage');

const router = express.Router();

// GET /scoreboard - Show scoreboard page
router.get('/scoreboard', (req, res) => {
  const scores = getTopScores(10);
  const userScores = req.session.user ? getUserScores(req.session.user.id) : [];
  res.render('scoreboard', { scores, userScores });
});

// GET /api/scores - Get top scores (JSON)
router.get('/api/scores', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const scores = getTopScores(limit);
  res.json(scores);
});

// POST /api/scores - Submit new score (requires auth)
router.post('/api/scores', requireAuth, (req, res) => {
  try {
    const { score, wave } = req.body;

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    const newScore = {
      id: uuidv4(),
      userId: req.session.user.id,
      username: req.session.user.username,
      score: Math.floor(score),
      wave: wave || 1,
      createdAt: new Date().toISOString()
    };

    addScore(newScore);
    
    // Get updated rankings
    const topScores = getTopScores(10);
    const rank = topScores.findIndex(s => s.id === newScore.id) + 1;

    res.json({ 
      success: true, 
      score: newScore,
      rank: rank > 0 ? rank : null,
      isTopTen: rank > 0 && rank <= 10
    });
  } catch (error) {
    console.error('Score submission error:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

// GET /api/scores/user - Get current user's scores
router.get('/api/scores/user', requireAuth, (req, res) => {
  const scores = getUserScores(req.session.user.id);
  res.json(scores);
});

module.exports = router;
