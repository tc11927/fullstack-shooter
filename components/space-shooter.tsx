"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface Entity {
  x: number
  y: number
  width: number
  height: number
}

interface Enemy extends Entity {
  type: number
  alive: boolean
}

interface Bullet extends Entity {
  isPlayerBullet: boolean
}

interface Star {
  x: number
  y: number
  speed: number
  size: number
}

const GAME_WIDTH = 400
const GAME_HEIGHT = 600
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 30
const BULLET_WIDTH = 4
const BULLET_HEIGHT = 12
const ENEMY_WIDTH = 36
const ENEMY_HEIGHT = 28

export default function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)

  const gameRef = useRef({
    player: { x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - 60 },
    enemies: [] as Enemy[],
    playerBullets: [] as Bullet[],
    enemyBullets: [] as Bullet[],
    stars: [] as Star[],
    keys: {} as Record<string, boolean>,
    lastShot: 0,
    enemyDirection: 1,
    enemySpeed: 0.5,
    animationId: 0,
  })

  const initStars = useCallback(() => {
    const stars: Star[] = []
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
      })
    }
    return stars
  }, [])

  const initEnemies = useCallback((lvl: number) => {
    const enemies: Enemy[] = []
    const rows = Math.min(3 + Math.floor(lvl / 2), 5)
    const cols = 8

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        enemies.push({
          x: col * 45 + 30,
          y: row * 40 + 50,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
          type: row % 3,
          alive: true,
        })
      }
    }
    return enemies
  }, [])

  const startGame = useCallback(() => {
    const game = gameRef.current
    game.player = { x: GAME_WIDTH / 2 - PLAYER_WIDTH / 2, y: GAME_HEIGHT - 60 }
    game.enemies = initEnemies(1)
    game.playerBullets = []
    game.enemyBullets = []
    game.stars = initStars()
    game.enemyDirection = 1
    game.enemySpeed = 0.5
    setScore(0)
    setLives(3)
    setLevel(1)
    setGameState("playing")
  }, [initEnemies, initStars])

  const nextLevel = useCallback(() => {
    const game = gameRef.current
    const newLevel = level + 1
    game.enemies = initEnemies(newLevel)
    game.playerBullets = []
    game.enemyBullets = []
    game.enemySpeed = 0.5 + newLevel * 0.15
    game.enemyDirection = 1
    setLevel(newLevel)
  }, [level, initEnemies])

  useEffect(() => {
    if (gameState !== "playing") return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const game = gameRef.current

    const handleKeyDown = (e: KeyboardEvent) => {
      game.keys[e.key.toLowerCase()] = true
      if (e.key === " ") e.preventDefault()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      game.keys[e.key.toLowerCase()] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    const checkCollision = (a: Entity, b: Entity) => {
      return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
    }

    const gameLoop = () => {
      // Clear
      ctx.fillStyle = "#0a0a1a"
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Update and draw stars
      game.stars.forEach((star) => {
        star.y += star.speed
        if (star.y > GAME_HEIGHT) {
          star.y = 0
          star.x = Math.random() * GAME_WIDTH
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + star.size / 3})`
        ctx.fillRect(star.x, star.y, star.size, star.size)
      })

      // Player movement
      const playerSpeed = 5
      if ((game.keys["arrowleft"] || game.keys["a"]) && game.player.x > 0) {
        game.player.x -= playerSpeed
      }
      if ((game.keys["arrowright"] || game.keys["d"]) && game.player.x < GAME_WIDTH - PLAYER_WIDTH) {
        game.player.x += playerSpeed
      }

      // Player shooting
      const now = Date.now()
      if (game.keys[" "] && now - game.lastShot > 250) {
        game.playerBullets.push({
          x: game.player.x + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
          y: game.player.y,
          width: BULLET_WIDTH,
          height: BULLET_HEIGHT,
          isPlayerBullet: true,
        })
        game.lastShot = now
      }

      // Update player bullets
      game.playerBullets = game.playerBullets.filter((bullet) => {
        bullet.y -= 8
        return bullet.y > -BULLET_HEIGHT
      })

      // Draw player bullets
      game.playerBullets.forEach((bullet) => {
        ctx.fillStyle = "#00ff88"
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        ctx.shadowColor = "#00ff88"
        ctx.shadowBlur = 10
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        ctx.shadowBlur = 0
      })

      // Update enemies
      let shouldReverse = false
      let allDead = true

      game.enemies.forEach((enemy) => {
        if (!enemy.alive) return
        allDead = false

        enemy.x += game.enemySpeed * game.enemyDirection

        if (enemy.x <= 0 || enemy.x >= GAME_WIDTH - ENEMY_WIDTH) {
          shouldReverse = true
        }
      })

      if (shouldReverse) {
        game.enemyDirection *= -1
        game.enemies.forEach((enemy) => {
          if (enemy.alive) enemy.y += 20
        })
      }

      // Enemy shooting
      const aliveEnemies = game.enemies.filter((e) => e.alive)
      if (aliveEnemies.length > 0 && Math.random() < 0.02) {
        const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]
        game.enemyBullets.push({
          x: shooter.x + ENEMY_WIDTH / 2 - BULLET_WIDTH / 2,
          y: shooter.y + ENEMY_HEIGHT,
          width: BULLET_WIDTH,
          height: BULLET_HEIGHT,
          isPlayerBullet: false,
        })
      }

      // Update enemy bullets
      game.enemyBullets = game.enemyBullets.filter((bullet) => {
        bullet.y += 5
        return bullet.y < GAME_HEIGHT
      })

      // Draw enemy bullets
      game.enemyBullets.forEach((bullet) => {
        ctx.fillStyle = "#ff4444"
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
      })

      // Draw enemies
      const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d"]
      game.enemies.forEach((enemy) => {
        if (!enemy.alive) return

        ctx.fillStyle = colors[enemy.type]
        
        // Draw alien body
        ctx.beginPath()
        ctx.ellipse(
          enemy.x + ENEMY_WIDTH / 2,
          enemy.y + ENEMY_HEIGHT / 2,
          ENEMY_WIDTH / 2,
          ENEMY_HEIGHT / 2,
          0,
          0,
          Math.PI * 2
        )
        ctx.fill()

        // Draw eyes
        ctx.fillStyle = "#000"
        ctx.beginPath()
        ctx.arc(enemy.x + 12, enemy.y + 12, 4, 0, Math.PI * 2)
        ctx.arc(enemy.x + 24, enemy.y + 12, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.arc(enemy.x + 13, enemy.y + 11, 2, 0, Math.PI * 2)
        ctx.arc(enemy.x + 25, enemy.y + 11, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Check bullet-enemy collisions
      game.playerBullets.forEach((bullet, bi) => {
        game.enemies.forEach((enemy) => {
          if (!enemy.alive) return
          if (
            checkCollision(bullet, {
              x: enemy.x,
              y: enemy.y,
              width: ENEMY_WIDTH,
              height: ENEMY_HEIGHT,
            })
          ) {
            enemy.alive = false
            game.playerBullets.splice(bi, 1)
            const points = (3 - enemy.type) * 10
            setScore((s) => {
              const newScore = s + points
              setHighScore((h) => Math.max(h, newScore))
              return newScore
            })
          }
        })
      })

      // Check enemy bullet-player collision
      const playerHitbox = {
        x: game.player.x,
        y: game.player.y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }

      game.enemyBullets.forEach((bullet, bi) => {
        if (checkCollision(bullet, playerHitbox)) {
          game.enemyBullets.splice(bi, 1)
          setLives((l) => {
            if (l <= 1) {
              setGameState("gameover")
              return 0
            }
            return l - 1
          })
        }
      })

      // Check if enemy reached player
      game.enemies.forEach((enemy) => {
        if (enemy.alive && enemy.y + ENEMY_HEIGHT >= game.player.y) {
          setGameState("gameover")
        }
      })

      // Draw player ship
      ctx.fillStyle = "#00d4ff"
      ctx.beginPath()
      ctx.moveTo(game.player.x + PLAYER_WIDTH / 2, game.player.y)
      ctx.lineTo(game.player.x, game.player.y + PLAYER_HEIGHT)
      ctx.lineTo(game.player.x + PLAYER_WIDTH, game.player.y + PLAYER_HEIGHT)
      ctx.closePath()
      ctx.fill()

      // Ship details
      ctx.fillStyle = "#0099cc"
      ctx.beginPath()
      ctx.moveTo(game.player.x + PLAYER_WIDTH / 2, game.player.y + 8)
      ctx.lineTo(game.player.x + 8, game.player.y + PLAYER_HEIGHT)
      ctx.lineTo(game.player.x + PLAYER_WIDTH - 8, game.player.y + PLAYER_HEIGHT)
      ctx.closePath()
      ctx.fill()

      // Engine glow
      ctx.fillStyle = "#ff6600"
      ctx.beginPath()
      ctx.moveTo(game.player.x + 12, game.player.y + PLAYER_HEIGHT)
      ctx.lineTo(game.player.x + PLAYER_WIDTH / 2, game.player.y + PLAYER_HEIGHT + 8 + Math.random() * 4)
      ctx.lineTo(game.player.x + PLAYER_WIDTH - 12, game.player.y + PLAYER_HEIGHT)
      ctx.closePath()
      ctx.fill()

      // Draw HUD
      ctx.fillStyle = "#fff"
      ctx.font = "16px monospace"
      ctx.fillText(`SCORE: ${score}`, 10, 25)
      ctx.fillText(`LEVEL: ${level}`, GAME_WIDTH / 2 - 35, 25)
      ctx.fillText(`LIVES: ${"♥".repeat(lives)}`, GAME_WIDTH - 100, 25)

      // Check level complete
      if (allDead) {
        nextLevel()
      }

      game.animationId = requestAnimationFrame(gameLoop)
    }

    game.animationId = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(game.animationId)
    }
  }, [gameState, score, lives, level, nextLevel])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050510] p-4">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4 tracking-wider">SPACE BLASTER</h1>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border-2 border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        />

        {gameState === "menu" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">READY TO PLAY?</h2>
            <div className="text-gray-400 text-sm mb-6 text-center space-y-1">
              <p>Arrow Keys or A/D to move</p>
              <p>Spacebar to shoot</p>
            </div>
            <Button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3"
            >
              START GAME
            </Button>
            {highScore > 0 && <p className="text-yellow-400 mt-4">High Score: {highScore}</p>}
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
            <h2 className="text-3xl font-bold text-red-500 mb-4">GAME OVER</h2>
            <p className="text-white text-xl mb-2">Score: {score}</p>
            <p className="text-yellow-400 mb-6">High Score: {highScore}</p>
            <Button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3"
            >
              PLAY AGAIN
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4 md:hidden">
        <Button
          className="w-16 h-16 text-2xl bg-cyan-500/20 border border-cyan-500"
          onTouchStart={() => (gameRef.current.keys["a"] = true)}
          onTouchEnd={() => (gameRef.current.keys["a"] = false)}
        >
          ←
        </Button>
        <Button
          className="w-16 h-16 text-2xl bg-red-500/20 border border-red-500"
          onTouchStart={() => (gameRef.current.keys[" "] = true)}
          onTouchEnd={() => (gameRef.current.keys[" "] = false)}
        >
          FIRE
        </Button>
        <Button
          className="w-16 h-16 text-2xl bg-cyan-500/20 border border-cyan-500"
          onTouchStart={() => (gameRef.current.keys["d"] = true)}
          onTouchEnd={() => (gameRef.current.keys["d"] = false)}
        >
          →
        </Button>
      </div>
    </div>
  )
}
