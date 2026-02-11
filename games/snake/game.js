// Snake Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

// Game configuration
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

// Game state
let gameState = 'menu'; // menu, playing, paused, gameover
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let gameSpeed = 100; // milliseconds

// Snake
let snake = [];
let dx = 0;
let dy = 0;
let nextDx = 0;
let nextDy = 0;

// Food
let food = { x: 0, y: 0 };

// Particles for effects
let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.color = color;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
        this.vy += 0.1; // gravity
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 4, 4);
        ctx.restore();
    }
}

// Initialize game
function initGame() {
    // Create initial snake
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    
    // Reset direction
    dx = 1;
    dy = 0;
    nextDx = 1;
    nextDy = 0;
    
    // Reset score
    score = 0;
    scoreElement.textContent = score;
    
    // Place food
    placeFood();
    
    // Clear particles
    particles = [];
}

// Place food at random position
function placeFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * tileCountX);
        food.y = Math.floor(Math.random() * tileCountY);
        
        // Make sure food doesn't appear on snake
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                validPosition = false;
                break;
            }
        }
    }
}

// Create explosion effect
function createExplosion(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(
            x * gridSize + gridSize / 2,
            y * gridSize + gridSize / 2,
            color
        ));
    }
}

// Update game
function update() {
    if (gameState !== 'playing') return;
    
    // Update direction
    dx = nextDx;
    dy = nextDy;
    
    // Calculate new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        createExplosion(food.x, food.y, '#FF6B6B');
        placeFood();
        
        // Increase speed slightly
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid (subtle)
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw food with glow effect
    ctx.shadowColor = '#FF6B6B';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);
    ctx.shadowBlur = 0;
    
    // Draw snake
    snake.forEach((segment, index) => {
        // Head is different color
        if (index === 0) {
            ctx.fillStyle = '#4CAF50';
            ctx.shadowColor = '#4CAF50';
            ctx.shadowBlur = 10;
        } else {
            // Gradient from head to tail
            const green = Math.floor(76 + (index * 2));
            ctx.fillStyle = `rgb(${Math.min(green, 150)}, 175, 80)`;
            ctx.shadowBlur = 0;
        }
        
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
        
        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 0;
            
            // Determine eye position based on direction
            let eyeOffsetX = 0, eyeOffsetY = 0;
            if (dx === 1) eyeOffsetX = 4;
            else if (dx === -1) eyeOffsetX = -4;
            if (dy === 1) eyeOffsetY = 4;
            else if (dy === -1) eyeOffsetY = -4;
            
            ctx.fillRect(
                segment.x * gridSize + gridSize / 2 - 3 + eyeOffsetX,
                segment.y * gridSize + gridSize / 2 - 3 + eyeOffsetY,
                2, 2
            );
            ctx.fillRect(
                segment.x * gridSize + gridSize / 2 + 1 + eyeOffsetX,
                segment.y * gridSize + gridSize / 2 - 3 + eyeOffsetY,
                2, 2
            );
        }
    });
    
    // Draw particles
    particles.forEach(particle => particle.draw());
}

// Game step
function gameStep() {
    update();
    draw();
}

// Start game
function startGame() {
    if (gameState === 'playing') return;
    
    if (gameState === 'menu' || gameState === 'gameover') {
        initGame();
    }
    
    gameState = 'playing';
    overlay.classList.add('hidden');
    gameLoop = setInterval(gameStep, gameSpeed);
}

// Pause game
function pauseGame() {
    if (gameState === 'playing') {
        gameState = 'paused';
        clearInterval(gameLoop);
        overlayTitle.textContent = '游戏暂停';
        overlayText.textContent = '点击继续游戏';
        overlay.classList.remove('hidden');
    } else if (gameState === 'paused') {
        gameState = 'playing';
        overlay.classList.add('hidden');
        gameLoop = setInterval(gameStep, gameSpeed);
    }
}

// Game over
function gameOver() {
    gameState = 'gameover';
    clearInterval(gameLoop);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    overlayTitle.textContent = '游戏结束';
    overlayText.textContent = `得分: ${score}  最高分: ${highScore}`;
    overlay.classList.remove('hidden');
}

// Restart game
function restartGame() {
    gameState = 'menu';
    clearInterval(gameLoop);
    gameSpeed = 100;
    initGame();
    draw();
    
    overlayTitle.textContent = '准备开始';
    overlayText.textContent = '点击开始游戏按钮';
    overlay.classList.remove('hidden');
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (gameState !== 'playing' && e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'menu' || gameState === 'gameover') {
            restartGame();
            startGame();
        } else if (gameState === 'paused') {
            pauseGame();
        }
        return;
    }
    
    if (gameState !== 'playing') return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            if (dy !== 1) {
                nextDx = 0;
                nextDy = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            if (dy !== -1) {
                nextDx = 0;
                nextDy = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            if (dx !== 1) {
                nextDx = -1;
                nextDy = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            if (dx !== -1) {
                nextDx = 1;
                nextDy = 0;
            }
            break;
    }
});

// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (gameState !== 'playing') {
        if (gameState === 'menu' || gameState === 'gameover') {
            restartGame();
            startGame();
        } else if (gameState === 'paused') {
            pauseGame();
        }
        return;
    }
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && nextDx !== -1) {
            nextDx = 1;
            nextDy = 0;
        } else if (dx < 0 && nextDx !== 1) {
            nextDx = -1;
            nextDy = 0;
        }
    } else {
        // Vertical swipe
        if (dy > 0 && nextDy !== -1) {
            nextDx = 0;
            nextDy = 1;
        } else if (dy < 0 && nextDy !== 1) {
            nextDx = 0;
            nextDy = -1;
        }
    }
}, { passive: false });

// Prevent scrolling on mobile
document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Initialize
highScoreElement.textContent = highScore;
initGame();
draw();
