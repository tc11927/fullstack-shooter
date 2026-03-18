const { Pool } = require("pg");

// Postgres connection uses a single DATABASE_URL or individual PG* env vars.
// Example:
//   DATABASE_URL=postgres://user:pass@localhost:5432/robotron
// Or:
//   PGHOST=localhost PGPORT=5432 PGDATABASE=robotron PGUSER=... PGPASSWORD=...

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              // Heroku-style providers often require SSL; local dev usually doesn't.
              ssl:
                  process.env.PGSSLMODE === "require"
                      ? { rejectUnauthorized: false }
                      : undefined,
          }
        : undefined
);

module.exports = { pool };
