const express = require("express");
const session = require("express-session");
const path = require("path");

// Load local env early (before any config reads env vars)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const scoresRoutes = require("./routes/scores");
const { pool } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

// Needed on Vercel (secure cookies behind a proxy)
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const isProd = process.env.NODE_ENV === "production";

// Session configuration
app.use(
    session({
        store: (() => {
            // Vercel/serverless can't use MemoryStore for auth; persist sessions in Postgres.
            if (!process.env.DATABASE_URL) {
                // In local dev you might not need a DB-backed session store.
                if (!isProd) return undefined;
                throw new Error(
                    "DATABASE_URL is required in production for session storage."
                );
            }
            const PgSession = require("connect-pg-simple")(session);
            return new PgSession({
                pool,
                tableName: "session",
                createTableIfMissing: true,
            });
        })(),
        secret:
            process.env.SESSION_SECRET ||
            "robotron-secret-key-change-in-production",
        resave: false,
        saveUninitialized: false,
        proxy: isProd,
        cookie: {
            secure: isProd,
            sameSite: "lax",
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
    console.error(err);
    const message =
        err && typeof err.message === "string"
            ? err.message
            : "An unexpected error occurred.";
    res.status(500).render("error", { error: message });
});

// Log any unhandled promise rejections to help debugging
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
});

async function start() {
    app.listen(PORT, () => {
        console.log(`Robotron server running on http://localhost:${PORT}`);
    });
}

start();
