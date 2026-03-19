const { createClient } = require("@supabase/supabase-js");

function resolveSupabaseEnv() {
    // Prefer server-only env var names; fall back to existing names used in this repo.
    const url =
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "";
    const serviceKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
        "";

    return { url, serviceKey };
}

let _client = null;

function getSupabase() {
    if (_client) return _client;

    const { url, serviceKey } = resolveSupabaseEnv();
    if (!url || !serviceKey) {
        const missing = [
            !url ? "SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)" : null,
            !serviceKey
                ? "SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY)"
                : null,
        ].filter(Boolean);

        // Don't crash the whole serverless function on import; throw when used so
        // the error surfaces in runtime logs and the Express error handler.
        throw new Error(`Supabase env vars missing: ${missing.join(", ")}`);
    }

    _client = createClient(url, serviceKey, {
        auth: { persistSession: false },
    });
    return _client;
}

module.exports = { getSupabase };
