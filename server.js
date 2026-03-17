const express = require("express");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const { pool } = require("./db");

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const scoresRoutes = require("./routes/scores");

const app = express();
const PORT = process.env.PORT || 3001;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            "galaxia-secret-key-change-in-production",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// Make user available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use("/", authRoutes);
app.use("/", gameRoutes);
app.use("/", scoresRoutes);

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("404");
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", { error: err.message });
});

async function start() {
    // Fail fast with a helpful message if Postgres is not configured/running.
    try {
        await pool.query("select 1");
    } catch (err) {
        console.error("PostgreSQL connection failed.");
        console.error(
            "Set DATABASE_URL in your .env (see .env.example) and run: npm run db:init"
        );
        console.error("Then start Postgres and re-run: npm run dev");
        console.error(err?.message || err);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Galaxia server running on http://localhost:${PORT}`);
    });
}

start();
