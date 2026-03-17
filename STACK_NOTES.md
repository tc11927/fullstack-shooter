# Stack notes (how this project works)

This repo is a **Node.js + Express** server that renders pages with **EJS** templates and serves a browser game written in **vanilla JavaScript** that draws to a **`<canvas>`**.  
Scores/users are stored in **PostgreSQL** (not local JSON files).

---

## HTML (what gets sent to the browser)

-   **Where it lives**: `views/**/*.ejs`
-   **What happens**: when you hit a route like `GET /game`, Express calls `res.render('game', data)` which turns `views/game.ejs` into plain HTML and sends it to the browser.
-   **Partials**: `views/partials/header.ejs` and `views/partials/footer.ejs` are included into pages using:
    -   `<%- include('partials/header') %>`
    -   `<%- include('partials/footer') %>`

### In this project

-   **Home**: `views/index.ejs`
-   **Game page**: `views/game.ejs` contains:
    -   `<canvas id="gameCanvas"></canvas>` (the entire game is drawn inside this)
    -   `<script src="/js/game.js"></script>` (loads the game engine)
-   **Auth pages**: `views/login.ejs`, `views/signup.ejs`
-   **Scoreboard**: `views/scoreboard.ejs`

---

## CSS (how pages look)

-   **Where it lives**:
    -   Global site styles: `public/css/styles.css`
    -   Game-page-specific styles: `public/css/game.css`
-   **How it’s served**: Express serves `public/` as static files:
    -   `app.use(express.static(path.join(__dirname, 'public')));` in `server.js`
-   **How it’s used**:
    -   HTML links CSS via `<link rel="stylesheet" href="/css/styles.css">`
    -   The browser downloads it from `public/css/styles.css`

### In this project

-   `styles.css` defines a **neon theme** via CSS variables (`:root { --neon-cyan: ... }`) and styles the navbar, buttons, auth forms, scoreboard, etc.
-   `game.css` positions the canvas fullscreen and overlays the HUD + menus.

---

## JavaScript (browser/game code)

-   **Where it lives**: `public/js/game.js`
-   **How it runs**: the browser loads it from the `<script>` tag in `views/game.ejs`.
-   **What it does**:
    -   Gets the canvas: `document.getElementById('gameCanvas')`
    -   Runs a loop with `requestAnimationFrame(gameLoop)`
    -   Each frame:
        -   **`update(deltaTime)`**: moves objects, ticks timers, checks collisions, spawns enemies/powerups
        -   **`draw()`**: clears the canvas then draws stars, particles, powerups, bullets, enemies, player

### Canvas vs SVG in this project

-   You’re still using a **canvas renderer**, but sprites come from **SVG files** in `public/assets/*.svg`.
-   The code preloads SVGs into `Image()` objects, then draws them onto the canvas via `ctx.drawImage(...)`.
-   If an SVG fails to load, it falls back to the older “draw shapes” code so the game doesn’t break.

---

## Node.js + Express (server-side routing)

-   **Entry point**: `server.js`
-   **Main responsibilities**:
    -   Creates an Express app (`const app = express()`)
    -   Parses request bodies (`express.json()`, `express.urlencoded(...)`)
    -   Serves static files from `public/`
    -   Configures sessions (`express-session`)
    -   Mounts route modules from `routes/`
    -   Renders EJS pages with `res.render(...)`

### Routing in this project

-   `routes/auth.js`
    -   `GET /signup`, `POST /signup`
    -   `GET /login`, `POST /login`
    -   `GET/POST /logout`
-   `routes/game.js`
    -   `GET /game` (requires login)
-   `routes/scores.js`
    -   `GET /scoreboard` (HTML)
    -   `GET /api/scores` (JSON)
    -   `POST /api/scores` (JSON, requires login)

### Sessions (how login “sticks”)

-   When you log in/sign up successfully, the server sets:
    -   `req.session.user = { id, username }`
-   Later requests from the same browser send the session cookie back, so:
    -   `requireAuth` can check `req.session.user` to allow/deny access.
-   Middleware:
    -   `middleware/auth.js` has `requireAuth` (must be logged in) and `requireGuest` (must be logged out).

---

## EJS (server-side templates)

EJS is basically HTML with embedded JavaScript.

### Key syntax you’ll see

-   **Print escaped value** (safe for HTML): `<%= user.username %>`
-   **Run JS without printing**: `<% if (user) { %> ... <% } %>`
-   **Include another template** (raw output): `<%- include('partials/header') %>`

### In this project

-   `server.js` sets EJS as the view engine:
    -   `app.set('view engine', 'ejs')`
    -   `app.set('views', path.join(__dirname, 'views'))`
-   Also in `server.js`, this middleware makes the user available to _all_ templates:
    -   `res.locals.user = req.session.user || null;`
    -   That’s why `header.ejs` can show “Welcome, username” without each route passing `user`.

---

## PostgreSQL in this project

### Current status: **using PostgreSQL**

Persistence now goes through Postgres:

-   **Schema**: `scripts/init-db.sql`
-   **Connection pool**: `db.js`
-   **Data access layer**: `utils/storage.js` (runs SQL queries via `pg`)

### How it fits (conceptually)

Routes still validate inputs the same way, but instead of reading/writing JSON,
they now `await` async storage functions that execute SQL queries.

-   **Tables** (example):
    -   `users(id uuid primary key, username text unique, password_hash text, created_at timestamptz)`
    -   `scores(id uuid primary key, user_id uuid references users(id), score int, wave int, created_at timestamptz)`
-   **Server flow stays the same**:
    -   Routes still validate input
    -   Instead of `readJSON/writeJSON`, routes would run SQL queries
-   **Typical Node library**:
    -   `pg` (node-postgres) with a connection pool
-   **Why it’s better**:
    -   Real concurrency, proper indexing, safe querying, easy leaderboards, multi-user support without file locking issues

### How to run it locally

1. Create a database and set `DATABASE_URL` in your `.env` (see `.env.example`).
2. Initialize tables:
    - `npm run db:init`
3. Start the server:
    - `npm run dev`

### Migration note (old JSON data)

If you had existing data in `data/users.json` / `data/scores.json`, it will no longer be used.
If you want, I can add a one-time import script to migrate that JSON into Postgres.
