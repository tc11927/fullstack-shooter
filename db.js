const { Pool } = require("pg");

// Postgres connection uses a single DATABASE_URL or individual PG* env vars.
// Example:
//   DATABASE_URL=postgres://user:pass@localhost:5432/robotron
// Or:
//   PGHOST=localhost PGPORT=5432 PGDATABASE=robotron PGUSER=... PGPASSWORD=...

// Cloud Postgres (Supabase, Neon, etc.) typically require SSL in production
const useSsl =
    process.env.NODE_ENV === "production" || process.env.PGSSLMODE === "require";

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: useSsl ? { rejectUnauthorized: false } : undefined,
          }
        : undefined
);

module.exports = { pool };
