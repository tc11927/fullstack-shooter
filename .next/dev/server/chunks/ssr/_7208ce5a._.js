module.exports = [
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/space-shooter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpaceShooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 12;
const ENEMY_WIDTH = 36;
const ENEMY_HEIGHT = 28;
function SpaceShooter() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("menu");
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [highScore, setHighScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lives, setLives] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const gameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        player: {
            x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
            y: GAME_HEIGHT - 60
        },
        enemies: [],
        playerBullets: [],
        enemyBullets: [],
        stars: [],
        keys: {},
        lastShot: 0,
        enemyDirection: 1,
        enemySpeed: 0.5,
        animationId: 0
    });
    const initStars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const stars = [];
        for(let i = 0; i < 50; i++){
            stars.push({
                x: Math.random() * GAME_WIDTH,
                y: Math.random() * GAME_HEIGHT,
                speed: 0.5 + Math.random() * 1.5,
                size: 1 + Math.random() * 2
            });
        }
        return stars;
    }, []);
    const initEnemies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((lvl)=>{
        const enemies = [];
        const rows = Math.min(3 + Math.floor(lvl / 2), 5);
        const cols = 8;
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                enemies.push({
                    x: col * 45 + 30,
                    y: row * 40 + 50,
                    width: ENEMY_WIDTH,
                    height: ENEMY_HEIGHT,
                    type: row % 3,
                    alive: true
                });
            }
        }
        return enemies;
    }, []);
    const startGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const game = gameRef.current;
        game.player = {
            x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
            y: GAME_HEIGHT - 60
        };
        game.enemies = initEnemies(1);
        game.playerBullets = [];
        game.enemyBullets = [];
        game.stars = initStars();
        game.enemyDirection = 1;
        game.enemySpeed = 0.5;
        setScore(0);
        setLives(3);
        setLevel(1);
        setGameState("playing");
    }, [
        initEnemies,
        initStars
    ]);
    const nextLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const game = gameRef.current;
        const newLevel = level + 1;
        game.enemies = initEnemies(newLevel);
        game.playerBullets = [];
        game.enemyBullets = [];
        game.enemySpeed = 0.5 + newLevel * 0.15;
        game.enemyDirection = 1;
        setLevel(newLevel);
    }, [
        level,
        initEnemies
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState !== "playing") return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const game = gameRef.current;
        const handleKeyDown = (e)=>{
            game.keys[e.key.toLowerCase()] = true;
            if (e.key === " ") e.preventDefault();
        };
        const handleKeyUp = (e)=>{
            game.keys[e.key.toLowerCase()] = false;
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        const checkCollision = (a, b)=>{
            return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
        };
        const gameLoop = ()=>{
            // Clear
            ctx.fillStyle = "#0a0a1a";
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            // Update and draw stars
            game.stars.forEach((star)=>{
                star.y += star.speed;
                if (star.y > GAME_HEIGHT) {
                    star.y = 0;
                    star.x = Math.random() * GAME_WIDTH;
                }
                ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.size / 3})`;
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });
            // Player movement
            const playerSpeed = 5;
            if ((game.keys["arrowleft"] || game.keys["a"]) && game.player.x > 0) {
                game.player.x -= playerSpeed;
            }
            if ((game.keys["arrowright"] || game.keys["d"]) && game.player.x < GAME_WIDTH - PLAYER_WIDTH) {
                game.player.x += playerSpeed;
            }
            // Player shooting
            const now = Date.now();
            if (game.keys[" "] && now - game.lastShot > 250) {
                game.playerBullets.push({
                    x: game.player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
                    y: game.player.y,
                    width: BULLET_WIDTH,
                    height: BULLET_HEIGHT,
                    isPlayerBullet: true
                });
                game.lastShot = now;
            }
            // Update player bullets
            game.playerBullets = game.playerBullets.filter((bullet)=>{
                bullet.y -= 8;
                return bullet.y > -BULLET_HEIGHT;
            });
            // Draw player bullets
            game.playerBullets.forEach((bullet)=>{
                ctx.fillStyle = "#00ff88";
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                ctx.shadowColor = "#00ff88";
                ctx.shadowBlur = 10;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                ctx.shadowBlur = 0;
            });
            // Update enemies
            let shouldReverse = false;
            let allDead = true;
            game.enemies.forEach((enemy)=>{
                if (!enemy.alive) return;
                allDead = false;
                enemy.x += game.enemySpeed * game.enemyDirection;
                if (enemy.x <= 0 || enemy.x >= GAME_WIDTH - ENEMY_WIDTH) {
                    shouldReverse = true;
                }
            });
            if (shouldReverse) {
                game.enemyDirection *= -1;
                game.enemies.forEach((enemy)=>{
                    if (enemy.alive) enemy.y += 20;
                });
            }
            // Enemy shooting
            const aliveEnemies = game.enemies.filter((e)=>e.alive);
            if (aliveEnemies.length > 0 && Math.random() < 0.02) {
                const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                game.enemyBullets.push({
                    x: shooter.x + ENEMY_WIDTH / 2 - BULLET_WIDTH / 2,
                    y: shooter.y + ENEMY_HEIGHT,
                    width: BULLET_WIDTH,
                    height: BULLET_HEIGHT,
                    isPlayerBullet: false
                });
            }
            // Update enemy bullets
            game.enemyBullets = game.enemyBullets.filter((bullet)=>{
                bullet.y += 5;
                return bullet.y < GAME_HEIGHT;
            });
            // Draw enemy bullets
            game.enemyBullets.forEach((bullet)=>{
                ctx.fillStyle = "#ff4444";
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            });
            // Draw enemies
            const colors = [
                "#ff6b6b",
                "#4ecdc4",
                "#ffe66d"
            ];
            game.enemies.forEach((enemy)=>{
                if (!enemy.alive) return;
                ctx.fillStyle = colors[enemy.type];
                // Draw alien body
                ctx.beginPath();
                ctx.ellipse(enemy.x + ENEMY_WIDTH / 2, enemy.y + ENEMY_HEIGHT / 2, ENEMY_WIDTH / 2, ENEMY_HEIGHT / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Draw eyes
                ctx.fillStyle = "#000";
                ctx.beginPath();
                ctx.arc(enemy.x + 12, enemy.y + 12, 4, 0, Math.PI * 2);
                ctx.arc(enemy.x + 24, enemy.y + 12, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(enemy.x + 13, enemy.y + 11, 2, 0, Math.PI * 2);
                ctx.arc(enemy.x + 25, enemy.y + 11, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            // Check bullet-enemy collisions
            game.playerBullets.forEach((bullet, bi)=>{
                game.enemies.forEach((enemy)=>{
                    if (!enemy.alive) return;
                    if (checkCollision(bullet, {
                        x: enemy.x,
                        y: enemy.y,
                        width: ENEMY_WIDTH,
                        height: ENEMY_HEIGHT
                    })) {
                        enemy.alive = false;
                        game.playerBullets.splice(bi, 1);
                        const points = (3 - enemy.type) * 10;
                        setScore((s)=>{
                            const newScore = s + points;
                            setHighScore((h)=>Math.max(h, newScore));
                            return newScore;
                        });
                    }
                });
            });
            // Check enemy bullet-player collision
            const playerHitbox = {
                x: game.player.x,
                y: game.player.y,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT
            };
            game.enemyBullets.forEach((bullet, bi)=>{
                if (checkCollision(bullet, playerHitbox)) {
                    game.enemyBullets.splice(bi, 1);
                    setLives((l)=>{
                        if (l <= 1) {
                            setGameState("gameover");
                            return 0;
                        }
                        return l - 1;
                    });
                }
            });
            // Check if enemy reached player
            game.enemies.forEach((enemy)=>{
                if (enemy.alive && enemy.y + ENEMY_HEIGHT >= game.player.y) {
                    setGameState("gameover");
                }
            });
            // Draw player ship
            ctx.fillStyle = "#00d4ff";
            ctx.beginPath();
            ctx.moveTo(game.player.x + PLAYER_WIDTH / 2, game.player.y);
            ctx.lineTo(game.player.x, game.player.y + PLAYER_HEIGHT);
            ctx.lineTo(game.player.x + PLAYER_WIDTH, game.player.y + PLAYER_HEIGHT);
            ctx.closePath();
            ctx.fill();
            // Ship details
            ctx.fillStyle = "#0099cc";
            ctx.beginPath();
            ctx.moveTo(game.player.x + PLAYER_WIDTH / 2, game.player.y + 8);
            ctx.lineTo(game.player.x + 8, game.player.y + PLAYER_HEIGHT);
            ctx.lineTo(game.player.x + PLAYER_WIDTH - 8, game.player.y + PLAYER_HEIGHT);
            ctx.closePath();
            ctx.fill();
            // Engine glow
            ctx.fillStyle = "#ff6600";
            ctx.beginPath();
            ctx.moveTo(game.player.x + 12, game.player.y + PLAYER_HEIGHT);
            ctx.lineTo(game.player.x + PLAYER_WIDTH / 2, game.player.y + PLAYER_HEIGHT + 8 + Math.random() * 4);
            ctx.lineTo(game.player.x + PLAYER_WIDTH - 12, game.player.y + PLAYER_HEIGHT);
            ctx.closePath();
            ctx.fill();
            // Draw HUD
            ctx.fillStyle = "#fff";
            ctx.font = "16px monospace";
            ctx.fillText(`SCORE: ${score}`, 10, 25);
            ctx.fillText(`LEVEL: ${level}`, GAME_WIDTH / 2 - 35, 25);
            ctx.fillText(`LIVES: ${"♥".repeat(lives)}`, GAME_WIDTH - 100, 25);
            // Check level complete
            if (allDead) {
                nextLevel();
            }
            game.animationId = requestAnimationFrame(gameLoop);
        };
        game.animationId = requestAnimationFrame(gameLoop);
        return ()=>{
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(game.animationId);
        };
    }, [
        gameState,
        score,
        lives,
        level,
        nextLevel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-screen bg-[#050510] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-cyan-400 mb-4 tracking-wider",
                children: "SPACE BLASTER"
            }, void 0, false, {
                fileName: "[project]/components/space-shooter.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        width: GAME_WIDTH,
                        height: GAME_HEIGHT,
                        className: "border-2 border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                    }, void 0, false, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    gameState === "menu" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-white mb-6",
                                children: "READY TO PLAY?"
                            }, void 0, false, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-400 text-sm mb-6 text-center space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Arrow Keys or A/D to move"
                                    }, void 0, false, {
                                        fileName: "[project]/components/space-shooter.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Spacebar to shoot"
                                    }, void 0, false, {
                                        fileName: "[project]/components/space-shooter.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: startGame,
                                className: "bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3",
                                children: "START GAME"
                            }, void 0, false, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, this),
                            highScore > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-yellow-400 mt-4",
                                children: [
                                    "High Score: ",
                                    highScore
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 407,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    gameState === "gameover" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-red-500 mb-4",
                                children: "GAME OVER"
                            }, void 0, false, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-xl mb-2",
                                children: [
                                    "Score: ",
                                    score
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-yellow-400 mb-6",
                                children: [
                                    "High Score: ",
                                    highScore
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: startGame,
                                className: "bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3",
                                children: "PLAY AGAIN"
                            }, void 0, false, {
                                fileName: "[project]/components/space-shooter.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/space-shooter.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex gap-4 md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-16 h-16 text-2xl bg-cyan-500/20 border border-cyan-500",
                        onTouchStart: ()=>gameRef.current.keys["a"] = true,
                        onTouchEnd: ()=>gameRef.current.keys["a"] = false,
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-16 h-16 text-2xl bg-red-500/20 border border-red-500",
                        onTouchStart: ()=>gameRef.current.keys[" "] = true,
                        onTouchEnd: ()=>gameRef.current.keys[" "] = false,
                        children: "FIRE"
                    }, void 0, false, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-16 h-16 text-2xl bg-cyan-500/20 border border-cyan-500",
                        onTouchStart: ()=>gameRef.current.keys["d"] = true,
                        onTouchEnd: ()=>gameRef.current.keys["d"] = false,
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/space-shooter.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/space-shooter.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/space-shooter.tsx",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_7208ce5a._.js.map