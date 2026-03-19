const { getSupabase } = require("../supabaseClient");

function mapUserRow(r) {
    return {
        id: r.id,
        username: r.username,
        passwordHash: r.password_hash,
        createdAt: r.created_at,
    };
}

function escapeLikePattern(input) {
    // Escape Postgres LIKE wildcards so usernames like "a_b" don't act as patterns.
    return String(input).replace(/[%_\\\\]/g, "\\$&");
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
// User operations (Supabase)
// -----------------------------
async function getUserById(id) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from("users")
        .select("id, username, password_hash, created_at")
        .eq("id", id)
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data ? mapUserRow(data) : null;
}

async function getUserByUsername(username) {
    const supabase = getSupabase();
    const normalized = escapeLikePattern(String(username).trim());
    const { data, error } = await supabase
        .from("users")
        .select("id, username, password_hash, created_at")
        .ilike("username", normalized)
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data ? mapUserRow(data) : null;
}

async function createUser(user) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from("users")
        .insert({
            id: user.id,
            username: user.username,
            password_hash: user.passwordHash,
            created_at: user.createdAt,
        })
        .select("id, username, password_hash, created_at")
        .maybeSingle();

    if (error) throw error;
    return data ? mapUserRow(data) : null;
}

// -----------------------------
// Score operations (Supabase)
// -----------------------------
async function addScore(score) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from("scores")
        .insert({
            id: score.id,
            user_id: score.userId,
            username: score.username,
            score: score.score,
            wave: score.wave,
            created_at: score.createdAt,
        })
        .select("id, user_id, username, score, wave, created_at")
        .maybeSingle();

    if (error) throw error;
    return data ? mapScoreRow(data) : null;
}

async function getTopScores(limit = 10) {
    const supabase = getSupabase();
    const lim = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 10;

    const { data, error } = await supabase
        .from("scores")
        .select("id, user_id, username, score, wave, created_at")
        .order("score", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(lim);

    if (error) throw error;
    return data.map(mapScoreRow);
}

async function getUserScores(userId) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from("scores")
        .select("id, user_id, username, score, wave, created_at")
        .eq("user_id", userId)
        .order("score", { ascending: false })
        .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map(mapScoreRow);
}

async function getUserHighScore(userId) {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from("scores")
        .select("score")
        .eq("user_id", userId)
        .order("score", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data ? data.score : 0;
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
