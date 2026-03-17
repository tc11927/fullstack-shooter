const { pool } = require("../db");

function mapUserRow(r) {
    return {
        id: r.id,
        username: r.username,
        passwordHash: r.password_hash,
        createdAt: r.created_at,
    };
}

function mapScoreRow(r) {
    return {
        id: r.id,
        userId: r.user_id,
        username: r.username,
        score: r.score,
        wave: r.wave,
        createdAt: r.created_at,
    };
}

// -----------------------------
// User operations (PostgreSQL)
// -----------------------------
async function getUserById(id) {
    const { rows } = await pool.query(
        `select id, username, password_hash, created_at
         from users
         where id = $1
         limit 1`,
        [id]
    );
    return rows[0] ? mapUserRow(rows[0]) : null;
}

async function getUserByUsername(username) {
    const { rows } = await pool.query(
        `select id, username, password_hash, created_at
         from users
         where lower(username) = lower($1)
         limit 1`,
        [username]
    );
    return rows[0] ? mapUserRow(rows[0]) : null;
}

async function createUser(user) {
    const { rows } = await pool.query(
        `insert into users (id, username, password_hash, created_at)
         values ($1, $2, $3, $4)
         returning id, username, password_hash, created_at`,
        [user.id, user.username, user.passwordHash, user.createdAt]
    );
    return rows[0] ? mapUserRow(rows[0]) : null;
}

// -----------------------------
// Score operations (PostgreSQL)
// -----------------------------
async function addScore(score) {
    const { rows } = await pool.query(
        `insert into scores (id, user_id, username, score, wave, created_at)
         values ($1, $2, $3, $4, $5, $6)
         returning id, user_id, username, score, wave, created_at`,
        [
            score.id,
            score.userId,
            score.username,
            score.score,
            score.wave,
            score.createdAt,
        ]
    );
    return rows[0] ? mapScoreRow(rows[0]) : null;
}

async function getTopScores(limit = 10) {
    const lim = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 10;
    const { rows } = await pool.query(
        `select id, user_id, username, score, wave, created_at
         from scores
         order by score desc, created_at asc
         limit $1`,
        [lim]
    );
    return rows.map(mapScoreRow);
}

async function getUserScores(userId) {
    const { rows } = await pool.query(
        `select id, user_id, username, score, wave, created_at
         from scores
         where user_id = $1
         order by score desc, created_at asc`,
        [userId]
    );
    return rows.map(mapScoreRow);
}

async function getUserHighScore(userId) {
    const { rows } = await pool.query(
        `select score
         from scores
         where user_id = $1
         order by score desc, created_at asc
         limit 1`,
        [userId]
    );
    return rows[0] ? rows[0].score : 0;
}

module.exports = {
    getUserById,
    getUserByUsername,
    createUser,
    addScore,
    getTopScores,
    getUserScores,
    getUserHighScore,
};
