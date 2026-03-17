## Galaxia

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

2. Create a database (example)

```bash
createdb galaxia
```

3. Set `DATABASE_URL` in `.env`, then initialize schema

```bash
npm run db:init
```

4. Run

```bash
npm run dev
```

Open `http://localhost:3001`.
