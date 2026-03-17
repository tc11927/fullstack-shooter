const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getUserByUsername, createUser } = require('../utils/storage');
const { requireGuest } = require('../middleware/auth');

const router = express.Router();

// GET /signup - Show signup form
router.get('/signup', requireGuest, (req, res) => {
  res.render('signup', { error: null });
});

// POST /signup - Create new user
router.post('/signup', requireGuest, async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validation
    if (!username || !password) {
      return res.render('signup', { error: 'Username and password are required' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.render('signup', { error: 'Username must be 3-20 characters' });
    }

    if (password.length < 6) {
      return res.render('signup', { error: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match' });
    }

    // Check if username exists
    const existingUser = getUserByUsername(username);
    if (existingUser) {
      return res.render('signup', { error: 'Username already taken' });
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      username: username.trim(),
      passwordHash,
      createdAt: new Date().toISOString()
    };

    createUser(newUser);

    // Auto-login after signup
    req.session.user = {
      id: newUser.id,
      username: newUser.username
    };

    res.redirect('/game');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { error: 'An error occurred. Please try again.' });
  }
});

// GET /login - Show login form
router.get('/login', requireGuest, (req, res) => {
  res.render('login', { error: null });
});

// POST /login - Authenticate user
router.post('/login', requireGuest, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('login', { error: 'Username and password are required' });
    }

    const user = getUserByUsername(username);
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    // Set session
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect('/game');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred. Please try again.' });
  }
});

// POST /logout - Destroy session
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// GET /logout - Also support GET for convenience
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;
