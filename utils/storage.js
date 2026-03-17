const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

function readJSON(filename) {
  const filePath = getFilePath(filename);
  
  if (!fs.existsSync(filePath)) {
    // Initialize with empty array if file doesn't exist
    writeJSON(filename, []);
    return [];
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

function writeJSON(filename, data) {
  const filePath = getFilePath(filename);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// User operations
function getUsers() {
  return readJSON('users.json');
}

function getUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === id);
}

function getUserByUsername(username) {
  const users = getUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

function createUser(user) {
  const users = getUsers();
  users.push(user);
  return writeJSON('users.json', users);
}

// Score operations
function getScores() {
  return readJSON('scores.json');
}

function getTopScores(limit = 10) {
  const scores = getScores();
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function addScore(score) {
  const scores = getScores();
  scores.push(score);
  writeJSON('scores.json', scores);
  return score;
}

function getUserScores(userId) {
  const scores = getScores();
  return scores
    .filter(s => s.userId === userId)
    .sort((a, b) => b.score - a.score);
}

function getUserHighScore(userId) {
  const userScores = getUserScores(userId);
  return userScores.length > 0 ? userScores[0].score : 0;
}

module.exports = {
  readJSON,
  writeJSON,
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  getScores,
  getTopScores,
  addScore,
  getUserScores,
  getUserHighScore
};
