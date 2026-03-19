// Robotron Game Engine
// - Self-contained canvas game loop (update + draw via requestAnimationFrame)
// - Maintains entity arrays (enemies, bullets, powerups, particles)
// - Uses SVG assets for crisp sprites, drawn onto the canvas via drawImage()
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// -----------------------------
// Assets (SVG sprites -> canvas)
// -----------------------------
// We render on a <canvas>, but ships/bullets/powerups are SVG files loaded into
// Image objects and painted with ctx.drawImage(). If any asset fails to load,
// drawing falls back to the original shape rendering so gameplay still works.
const SPRITES = {
    ready: false,
    player: new Image(),
    enemyBasic: new Image(),
    enemyFast: new Image(),
    enemyTank: new Image(),
    bulletPlayer: new Image(),
    bulletEnemy: new Image(),
    powerShield: new Image(),
    powerRapid: new Image(),
    powerSpeed: new Image(),
    powerLife: new Image(),
};

function loadSprites() {
    // Preload all sprites. We always resolve, even on error, to avoid blocking
    // the game loop (errors will just use fallback rendering).
    const entries = [
        [SPRITES.player, "/assets/player.svg"],
        [SPRITES.enemyBasic, "/assets/enemy-basic.svg"],
        [SPRITES.enemyFast, "/assets/enemy-fast.svg"],
        [SPRITES.enemyTank, "/assets/enemy-tank.svg"],
        [SPRITES.bulletPlayer, "/assets/bullet-player.svg"],
        [SPRITES.bulletEnemy, "/assets/bullet-enemy.svg"],
        [SPRITES.powerShield, "/assets/power-shield.svg"],
        [SPRITES.powerRapid, "/assets/power-rapid.svg"],
        [SPRITES.powerSpeed, "/assets/power-speed.svg"],
        [SPRITES.powerLife, "/assets/power-life.svg"],
    ];

    return new Promise((resolve) => {
        let remaining = entries.length;
        const done = () => {
            remaining--;
            if (remaining <= 0) {
                SPRITES.ready = true;
                resolve();
            }
        };

        for (const [img, src] of entries) {
            img.onload = done;
            img.onerror = done; // fallback to shape rendering if any fail
            img.src = src;
        }
    });
}

// -----------------------------
// Constants (colors / styling)
// -----------------------------
const COLORS = {
    cyan: "#00ffff",
    magenta: "#ff00ff",
    green: "#00ff88",
    red: "#ff3366",
    yellow: "#ffff00",
    blue: "#0088ff",
    white: "#ffffff",
};

// -----------------------------
// Game state (high-level)
// -----------------------------
let gameState = "start"; // start, playing, paused, gameover
let score = 0;
let wave = 1;
let lives = 3;
let highScore =
    parseInt(document.getElementById("hudHighScore").textContent) || 0;

// -----------------------------
// Game objects (entities & effects)
// -----------------------------
let player = null;
let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let powerUps = [];
let particles = [];
let stars = [];

// -----------------------------
// Input state
// -----------------------------
// keys maps KeyboardEvent.code -> boolean, so update() can query held keys.
const keys = {};
let mouseDown = false;

// -----------------------------
// Timing / frame bookkeeping
// -----------------------------
let lastTime = 0;
let enemySpawnTimer = 0;
let powerUpTimer = 0;
let waveTimer = 0;
let shootTimer = 0;

// -----------------------------
// Wave bookkeeping
// -----------------------------
let enemiesRemaining = 0;
let enemiesInWave = 0;
let waveComplete = false;

// -----------------------------
// Canvas sizing + starfield background
// -----------------------------
function resizeCanvas() {
    // Fullscreen canvas; re-init stars so density matches new size.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    // Pre-generate stars for a cheap animated background.
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            brightness: Math.random(),
        });
    }
}

// -----------------------------
// Player entity
// -----------------------------
class Player {
    constructor() {
        // width/height are used for collisions and for scaling the sprite.
        this.width = 50;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 100;
        this.speed = 6;
        this.baseSpeed = 6;
        this.fireRate = 200;
        this.baseFireRate = 200;
        this.lastShot = 0;
        this.shieldActive = false;
        this.shieldTimer = 0;
        this.rapidFireActive = false;
        this.rapidFireTimer = 0;
        this.speedBoostActive = false;
        this.speedBoostTimer = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.blinkTimer = 0;
        this.visible = true;
    }

    update(deltaTime) {
        // Movement
        if (keys["ArrowLeft"] || keys["KeyA"]) {
            this.x -= this.speed;
        }
        if (keys["ArrowRight"] || keys["KeyD"]) {
            this.x += this.speed;
        }
      
        

        // Bounds
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        this.y = Math.max(
            canvas.height / 2,
            Math.min(canvas.height - this.height - 20, this.y)
        );

        // Shooting
        if (
            (keys["Space"] || mouseDown) &&
            Date.now() - this.lastShot > this.fireRate
        ) {
            this.shoot();
            this.lastShot = Date.now();
        }

        // Update power-up timers
        if (this.shieldActive) {
            this.shieldTimer -= deltaTime;
            if (this.shieldTimer <= 0) {
                this.shieldActive = false;
            }
        }

        if (this.rapidFireActive) {
            this.rapidFireTimer -= deltaTime;
            if (this.rapidFireTimer <= 0) {
                this.rapidFireActive = false;
                this.fireRate = this.baseFireRate;
            }
        }

        if (this.speedBoostActive) {
            this.speedBoostTimer -= deltaTime;
            if (this.speedBoostTimer <= 0) {
                this.speedBoostActive = false;
                this.speed = this.baseSpeed;
            }
        }

        // Invincibility blink: after getting hit we toggle visibility to
        // communicate "can't be hit again yet" to the player.
        if (this.invincible) {
            this.invincibleTimer -= deltaTime;
            this.blinkTimer += deltaTime;
            if (this.blinkTimer > 100) {
                this.visible = !this.visible;
                this.blinkTimer = 0;
            }
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
                this.visible = true;
            }
        }
    }

    shoot() {
        // Spawns a bullet from the ship's center; negative speed moves up.
        const bulletX = this.x + this.width / 2 - 3;
        const bulletY = this.y;
        playerBullets.push(
            new Bullet(bulletX, bulletY, -12, COLORS.cyan, true)
        );

        // Muzzle flash particles are purely visual feedback.
        for (let i = 0; i < 5; i++) {
            particles.push(
                new Particle(bulletX + 3, bulletY, COLORS.cyan, "small")
            );
        }
    }

    draw() {
        if (!this.visible) return;

        ctx.save();

        // Shield effect is cosmetic (collisions use the normal player rectangle).
        if (this.shieldActive) {
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                40,
                0,
                Math.PI * 2
            );
            ctx.strokeStyle = COLORS.blue;
            ctx.lineWidth = 3;
            ctx.shadowColor = COLORS.blue;
            ctx.shadowBlur = 20;
            ctx.stroke();
            ctx.closePath();
        }

        // Main rendering path: use the SVG sprite if it loaded successfully.
        if (
            SPRITES.ready &&
            SPRITES.player.complete &&
            SPRITES.player.naturalWidth
        ) {
            ctx.shadowColor = COLORS.cyan;
            ctx.shadowBlur = 18;
            ctx.drawImage(
                SPRITES.player,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            // Fallback: original shape rendering
            ctx.fillStyle = COLORS.cyan;
            ctx.shadowColor = COLORS.cyan;
            ctx.shadowBlur = 15;

            // Ship body (triangle)
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.closePath();
            ctx.fill();

            // Ship details
            ctx.fillStyle = COLORS.magenta;
            ctx.shadowColor = COLORS.magenta;
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y + 10);
            ctx.lineTo(this.x + 10, this.y + this.height - 5);
            ctx.lineTo(this.x + this.width - 10, this.y + this.height - 5);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }

    hit() {
        if (this.shieldActive || this.invincible) return false;

        lives--;
        updateLivesDisplay();

        // Create explosion
        for (let i = 0; i < 30; i++) {
            particles.push(
                new Particle(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    COLORS.cyan,
                    "large"
                )
            );
        }

        if (lives <= 0) {
            gameOver();
            return true;
        }

        // Brief invincibility
        this.invincible = true;
        this.invincibleTimer = 2000;
        return false;
    }
}

// -----------------------------
// Enemy entity
// -----------------------------
class Enemy {
    constructor(x, y, type = "basic") {
        this.type = type;
        // Match player dimensions for consistent size
        this.width = 50;
        this.height = 40;
        this.x = x;
        this.y = y;

        // Type controls speed/health/points and also changes hitbox size.
        switch (type) {
            case "fast":
                this.speed = 3;
                this.health = 1;
                this.points = 150;
                this.color = COLORS.green;
                break;
            case "tank":
                this.speed = 1;
                this.health = 3;
                this.points = 200;
                this.color = COLORS.red;
                break;
            default: // basic
                this.speed = 2;
                this.health = 1;
                this.points = 100;
                this.color = COLORS.magenta;
        }

        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.shootTimer = Math.random() * 2000;
        this.moveTimer = 0;
        this.verticalMove = 0;
    }

    update(deltaTime) {
        // Horizontal movement + wall bounce. On bounce we also move down to
        // increase pressure over time.
        this.x += this.speed * this.direction;

        // Bounce off walls
        if (this.x <= 0 || this.x >= canvas.width - this.width) {
            this.direction *= -1;
            this.y += 20;
        }

        // Slight vertical drift adds unpredictable motion.
        this.moveTimer += deltaTime;
        if (this.moveTimer > 2000) {
            this.verticalMove = Math.random() * 0.5;
            this.moveTimer = 0;
        }
        this.y += this.verticalMove;

        // Shooting: cooldown timer; only shoots while in the upper half.
        this.shootTimer -= deltaTime;
        if (this.shootTimer <= 0 && this.y < canvas.height / 2) {
            this.shoot();
            this.shootTimer = 2000 + Math.random() * 2000;
        }
    }

    shoot() {
        // Spawn a downward bullet from enemy center.
        const bulletX = this.x + this.width / 2 - 3;
        const bulletY = this.y + this.height;
        enemyBullets.push(new Bullet(bulletX, bulletY, 6, this.color, false));
    }

    draw() {
        ctx.save();
        // Preferred rendering: SVG sprite based on enemy type.
        if (SPRITES.ready) {
            const img =
                this.type === "fast"
                    ? SPRITES.enemyFast
                    : this.type === "tank"
                    ? SPRITES.enemyTank
                    : SPRITES.enemyBasic;

            if (img.complete && img.naturalWidth) {
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 18;

                // Draw without distortion: preserve sprite aspect ratio while
                // keeping roughly the same height as the player/enemy logical size.
                const targetHeight = this.height; // match logical enemy/player height
                const aspect = img.naturalWidth / img.naturalHeight;
                const targetWidth = targetHeight * aspect;

                ctx.drawImage(img, this.x, this.y, targetWidth, targetHeight);
                ctx.restore();
                return;
            }
        }

        // Fallback: original shape rendering
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        // Draw inverted triangle (alien ship)
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();

        // Eyes/cockpit
        ctx.fillStyle = COLORS.white;
        ctx.shadowColor = COLORS.white;
        const eyeY = this.y + this.height * 0.3;
        ctx.beginPath();
        ctx.arc(this.x + this.width * 0.35, eyeY, 4, 0, Math.PI * 2);
        ctx.arc(this.x + this.width * 0.65, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    hit() {
        this.health--;
        if (this.health <= 0) {
            // Create explosion
            for (let i = 0; i < 20; i++) {
                particles.push(
                    new Particle(
                        this.x + this.width / 2,
                        this.y + this.height / 2,
                        this.color,
                        "medium"
                    )
                );
            }
            return true;
        }
        // Hit flash
        for (let i = 0; i < 5; i++) {
            particles.push(
                new Particle(
                    this.x + this.width / 2,
                    this.y + this.height / 2,
                    COLORS.white,
                    "small"
                )
            );
        }
        return false;
    }
}

// -----------------------------
// Bullet entity
// -----------------------------
class Bullet {
    constructor(x, y, speed, color, isPlayer) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 15;
        this.speed = speed;
        this.color = color;
        this.isPlayer = isPlayer;
    }

    update() {
        // Bullets only move vertically; sign of speed decides direction.
        this.y += this.speed;
    }

    draw() {
        // Preferred rendering: SVG sprite + a subtle trail for motion feedback.
        ctx.save();
        const img = this.isPlayer ? SPRITES.bulletPlayer : SPRITES.bulletEnemy;
        if (SPRITES.ready && img.complete && img.naturalWidth) {
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 12;
            ctx.drawImage(
                img,
                this.x - 2,
                this.y - 2,
                this.width + 4,
                this.height + 4
            );

            // Trail (keep the same feel)
            ctx.globalAlpha = 0.4;
            const trailH = 12;
            const trailY = this.y + (this.speed > 0 ? -trailH : this.height);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.roundRect(this.x + 1, trailY, this.width - 2, trailH, 2);
            ctx.fill();

            ctx.restore();
            return;
        }

        // Fallback: original shape rendering if the sprite isn't available.
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        // Bullet with trail
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 3);
        ctx.fill();

        // Trail
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.roundRect(
            this.x + 1,
            this.y + (this.speed > 0 ? -10 : 15),
            this.width - 2,
            10,
            2
        );
        ctx.fill();

        ctx.restore();
    }

    isOffScreen() {
        // Used to cleanup bullets when they leave the play area.
        return this.y < -20 || this.y > canvas.height + 20;
    }
}

// -----------------------------
// Power-up entity
// -----------------------------
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = type;
        this.speed = 2;
        this.pulse = 0;

        // Type determines tint color and a fallback symbol (if sprite fails).
        switch (type) {
            case "shield":
                this.color = COLORS.blue;
                this.symbol = "S";
                break;
            case "rapid":
                this.color = COLORS.yellow;
                this.symbol = "R";
                break;
            case "speed":
                this.color = COLORS.green;
                this.symbol = "+";
                break;
            case "life":
                this.color = COLORS.red;
                this.symbol = "♥";
                break;
        }
    }

    update(deltaTime) {
        this.y += this.speed;
        this.pulse += deltaTime * 0.005;
    }

    draw() {
        ctx.save();

        const pulseSize = Math.sin(this.pulse) * 3;

        let img = null;
        if (SPRITES.ready) {
            if (this.type === "shield") img = SPRITES.powerShield;
            else if (this.type === "rapid") img = SPRITES.powerRapid;
            else if (this.type === "speed") img = SPRITES.powerSpeed;
            else if (this.type === "life") img = SPRITES.powerLife;
        }

        if (img && img.complete && img.naturalWidth) {
            const cx = this.x + this.width / 2;
            const cy = this.y + this.height / 2;
            const scale = 1 + pulseSize / 18;

            ctx.translate(cx, cy);
            ctx.scale(scale, scale);
            ctx.translate(-cx, -cy);

            ctx.shadowColor = this.color;
            ctx.shadowBlur = 22 + pulseSize * 2;
            ctx.drawImage(
                img,
                this.x - 3,
                this.y - 3,
                this.width + 6,
                this.height + 6
            );

            ctx.restore();
            return;
        }

        // Fallback: original circle + symbol rendering
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20 + pulseSize * 2;

        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 2,
            15 + pulseSize,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.shadowBlur = 0;
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            this.symbol,
            this.x + this.width / 2,
            this.y + this.height / 2
        );

        ctx.restore();
    }

    isOffScreen() {
        return this.y > canvas.height + 20;
    }

    apply(player) {
        switch (this.type) {
            case "shield":
                player.shieldActive = true;
                player.shieldTimer = 5000;
                showPowerUpNotify("SHIELD ACTIVATED");
                break;
            case "rapid":
                player.rapidFireActive = true;
                player.rapidFireTimer = 5000;
                player.fireRate = 80;
                showPowerUpNotify("RAPID FIRE");
                break;
            case "speed":
                player.speedBoostActive = true;
                player.speedBoostTimer = 5000;
                player.speed = 10;
                showPowerUpNotify("SPEED BOOST");
                break;
            case "life":
                if (lives < 5) {
                    lives++;
                    updateLivesDisplay();
                    showPowerUpNotify("EXTRA LIFE");
                } else {
                    score += 500;
                    showPowerUpNotify("+500 BONUS");
                }
                break;
        }
    }
}

// Particle class
class Particle {
    constructor(x, y, color, size = "medium") {
        this.x = x;
        this.y = y;
        this.color = color;

        const sizeMultiplier =
            size === "large" ? 1.5 : size === "small" ? 0.5 : 1;
        this.radius = (Math.random() * 4 + 2) * sizeMultiplier;
        this.speedX = (Math.random() - 0.5) * 8 * sizeMultiplier;
        this.speedY = (Math.random() - 0.5) * 8 * sizeMultiplier;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// -----------------------------
// Collision detection (AABB)
// -----------------------------
function checkCollision(rect1, rect2) {
    // Axis-aligned bounding-box overlap test using x/y/width/height.
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// -----------------------------
// Spawning / waves
// -----------------------------
function spawnWave() {
    // Spawns a wave by scheduling enemy creation over time (staggered by i*500).
    const baseCount = 5 + wave * 2;
    enemiesInWave = Math.min(baseCount, 20);
    enemiesRemaining = enemiesInWave;
    waveComplete = false;

    // Determine enemy types based on wave
    for (let i = 0; i < enemiesInWave; i++) {
        setTimeout(() => {
            if (gameState !== "playing") return;

            const x = Math.random() * (canvas.width - 50);
            const y = -50 - Math.random() * 100;

            let type = "basic";
            if (wave >= 3 && Math.random() < 0.3) type = "fast";
            if (wave >= 5 && Math.random() < 0.2) type = "tank";

            enemies.push(new Enemy(x, y, type));
        }, i * 500);
    }

    showWaveAnnounce(wave);
}

function spawnPowerUp() {
    // Randomly choose a power-up; allow "life" when player is struggling.
    const types = ["shield", "rapid", "speed"];
    if (lives < 3) types.push("life");

    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * (canvas.width - 30);
    powerUps.push(new PowerUp(x, -30, type));
}

// -----------------------------
// Update step (simulation)
// -----------------------------
function update(deltaTime) {
    // Only simulate when playing; paused/gameover freeze positions.
    if (gameState !== "playing") return;

    // Background starfield scrolls down to imply forward motion.
    stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    // Update entities.
    player.update(deltaTime);

    enemies.forEach((enemy) => enemy.update(deltaTime));

    playerBullets.forEach((bullet) => bullet.update());
    enemyBullets.forEach((bullet) => bullet.update());

    powerUps.forEach((powerUp) => powerUp.update(deltaTime));

    // Update particles
    particles.forEach((particle) => particle.update());

    // Remove off-screen bullets
    playerBullets = playerBullets.filter((b) => !b.isOffScreen());
    enemyBullets = enemyBullets.filter((b) => !b.isOffScreen());

    // Remove dead particles
    particles = particles.filter((p) => !p.isDead());

    // Remove off-screen power-ups
    powerUps = powerUps.filter((p) => !p.isOffScreen());

    // Check player bullet collisions with enemies
    playerBullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (checkCollision(bullet, enemy)) {
                playerBullets.splice(bIndex, 1);
                if (enemy.hit()) {
                    score += enemy.points;
                    enemies.splice(eIndex, 1);
                    enemiesRemaining--;
                    updateScoreDisplay();
                }
            }
        });
    });

    // Check enemy bullet collisions with player
    enemyBullets.forEach((bullet, bIndex) => {
        if (checkCollision(bullet, player)) {
            enemyBullets.splice(bIndex, 1);
            player.hit();
        }
    });

    // Check enemy collisions with player
    enemies.forEach((enemy, eIndex) => {
        if (checkCollision(enemy, player)) {
            if (!player.shieldActive && !player.invincible) {
                enemies.splice(eIndex, 1);
                enemiesRemaining--;
                player.hit();
            }
        }

        // Remove enemies that go too far down
        if (enemy.y > canvas.height) {
            enemies.splice(eIndex, 1);
            enemiesRemaining--;
        }
    });

    // Check power-up collisions with player
    powerUps.forEach((powerUp, pIndex) => {
        if (checkCollision(powerUp, player)) {
            powerUp.apply(player);
            powerUps.splice(pIndex, 1);
        }
    });

    // Wave management
    if (enemiesRemaining <= 0 && enemies.length === 0 && !waveComplete) {
        waveComplete = true;
        score += 500 * wave; // Wave completion bonus
        updateScoreDisplay();

        setTimeout(() => {
            if (gameState === "playing") {
                wave++;
                updateWaveDisplay();
                spawnWave();
            }
        }, 2000);
    }

    // Spawn power-ups periodically
    powerUpTimer += deltaTime;
    if (powerUpTimer > 15000) {
        spawnPowerUp();
        powerUpTimer = 0;
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.brightness * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    if (gameState !== "playing" && gameState !== "paused") return;

    // Draw particles (behind everything)
    particles.forEach((particle) => particle.draw());

    // Draw power-ups
    powerUps.forEach((powerUp) => powerUp.draw());

    // Draw bullets
    playerBullets.forEach((bullet) => bullet.draw());
    enemyBullets.forEach((bullet) => bullet.draw());

    // Draw enemies
    enemies.forEach((enemy) => enemy.draw());

    // Draw player
    player.draw();
}

// Game loop
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameState = "playing";
    score = 0;
    wave = 1;
    lives = 3;

    player = new Player();
    enemies = [];
    playerBullets = [];
    enemyBullets = [];
    powerUps = [];
    particles = [];
    powerUpTimer = 0;

    updateScoreDisplay();
    updateWaveDisplay();
    updateLivesDisplay();

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("gameOverScreen").classList.add("hidden");
    document.getElementById("pauseScreen").classList.add("hidden");

    spawnWave();
}

// Pause game
function pauseGame() {
    if (gameState === "playing") {
        gameState = "paused";
        document.getElementById("pauseScreen").classList.remove("hidden");
    }
}

// Resume game
function resumeGame() {
    if (gameState === "paused") {
        gameState = "playing";
        document.getElementById("pauseScreen").classList.add("hidden");
    }
}

// Game over
function gameOver() {
    gameState = "gameover";

    document.getElementById("finalScore").textContent = score.toLocaleString();
    document.getElementById("finalWave").textContent = wave;

    // Check for new high score
    if (score > highScore) {
        highScore = score;
        document.getElementById("hudHighScore").textContent = highScore;
        document.getElementById("newHighScore").style.display = "block";
    } else {
        document.getElementById("newHighScore").style.display = "none";
    }

    document.getElementById("gameOverScreen").classList.remove("hidden");

    // Submit score to server
    submitScore(score, wave);
}

// Submit score to server
async function submitScore(finalScore, finalWave) {
    try {
        const response = await fetch("/api/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                score: finalScore,
                wave: finalWave,
            }),
        });

        const data = await response.json();

        if (data.isTopTen) {
            // Could show additional UI for top 10 placement
            console.log("Top 10 score!", data.rank);
        }
    } catch (error) {
        console.error("Failed to submit score:", error);
    }
}

// UI Updates
function updateScoreDisplay() {
    document.getElementById("hudScore").textContent = score.toLocaleString();
}

function updateWaveDisplay() {
    document.getElementById("hudWave").textContent = wave;
}

function updateLivesDisplay() {
    const livesContainer = document.getElementById("hudLives");
    let html = "";
    for (let i = 0; i < 5; i++) {
        if (i < lives) {
            html += '<span class="life">&#9829;</span>';
        } else if (i < 3) {
            html += '<span class="life lost">&#9829;</span>';
        }
    }
    livesContainer.innerHTML = html;
}

function showWaveAnnounce(waveNum) {
    const announce = document.getElementById("waveAnnounce");
    document.getElementById("waveNumber").textContent = waveNum;
    announce.classList.remove("hidden");

    setTimeout(() => {
        announce.classList.add("hidden");
    }, 2000);
}

function showPowerUpNotify(text) {
    const notify = document.getElementById("powerupNotify");
    document.getElementById("powerupText").textContent = text;
    notify.classList.remove("hidden");

    setTimeout(() => {
        notify.classList.add("hidden");
    }, 1500);
}

// Event listeners
window.addEventListener("resize", resizeCanvas);

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;

    if (e.code === "KeyP" && gameState === "playing") {
        pauseGame();
    } else if (e.code === "KeyP" && gameState === "paused") {
        resumeGame();
    }

    if (e.code === "Space") {
        e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

canvas.addEventListener("mousedown", () => {
    mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
    mouseDown = false;
});

canvas.addEventListener("mouseleave", () => {
    mouseDown = false;
});

// Button listeners
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resumeBtn").addEventListener("click", resumeGame);
document.getElementById("playAgainBtn").addEventListener("click", startGame);

// Initialize
resizeCanvas();
loadSprites().finally(() => {
    requestAnimationFrame(gameLoop);
});
