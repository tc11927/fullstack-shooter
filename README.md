## Robotron

Node.js + Express arcade shooter with EJS pages and a canvas game.

### Prereqs

-   Node.js
-   PostgreSQL
-   `psql` CLI available (for `npm run db:init`)

### Setup

1. Copy env

```bash
cp .env.example .env
```

2. **Supabase** (users & scores): Create a project at [supabase.com](https://supabase.com), then run `scripts/supabase-init.sql` in the SQL Editor. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env`.

3. **PostgreSQL** (sessions): Create a database, set `DATABASE_URL` in `.env`, then:

```bash
npm run db:init
```

4. Run

```bash
npm run dev
```

Open `http://localhost:3001`.
