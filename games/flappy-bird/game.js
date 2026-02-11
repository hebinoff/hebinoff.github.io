// Flappy Bird Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

// Game state
let gameState = 'menu'; // menu, playing, paused, gameover
let score = 0;
let highScore = localStorage.getItem('flappyHighScore') || 0;
let animationId;
let frameCount = 0;

// Bird object
const bird = {
    x: 100,
    y: 250,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.25,
    jumpStrength: -6,
    rotation: 0,
    
    jump() {
        this.velocity = this.jumpStrength;
    },
    
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Rotation based on velocity
        this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));
        
        // Ground collision
        if (this.y + this.height > canvas.height - 100) {
            this.y = canvas.height - 100 - this.height;
            gameOver();
        }
        
        // Ceiling collision
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Bird body
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(0, 0, 17, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Bird eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(6, -4, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(7, -4, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bird beak
        ctx.fillStyle = '#FF6347';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(18, 3);
        ctx.lineTo(10, 6);
        ctx.closePath();
        ctx.fill();
        
        // Bird wing
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.ellipse(-5, 2, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    },
    
    reset() {
        this.y = 250;
        this.velocity = 0;
        this.rotation = 0;
    }
};

// Pipes array
let pipes = [];
const pipeWidth = 60;
const pipeGap = 150;
const pipeSpeed = 2;

class Pipe {
    constructor() {
        this.x = canvas.width;
        this.topHeight = Math.random() * (canvas.height - 300) + 50;
        this.bottomY = this.topHeight + pipeGap;
        this.passed = false;
    }
    
    update() {
        this.x -= pipeSpeed;
        
        // Check if bird passed the pipe
        if (!this.passed && this.x + pipeWidth < bird.x) {
            this.passed = true;
            score++;
            scoreElement.textContent = score;
        }
    }
    
    draw() {
        // Top pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, 0, pipeWidth, this.topHeight);
        
        // Top pipe cap
        ctx.fillStyle = '#1a6b1a';
        ctx.fillRect(this.x - 3, this.topHeight - 30, pipeWidth + 6, 30);
        
        // Bottom pipe
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, this.bottomY, pipeWidth, canvas.height - this.bottomY);
        
        // Bottom pipe cap
        ctx.fillStyle = '#1a6b1a';
        ctx.fillRect(this.x - 3, this.bottomY, pipeWidth + 6, 30);
        
        // Pipe highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(this.x + 5, 0, 5, this.topHeight);
        ctx.fillRect(this.x + 5, this.bottomY, 5, canvas.height - this.bottomY);
    }
}

// Background elements
let clouds = [];

class Cloud {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * 200;
        this.speed = Math.random() * 0.5 + 0.1;
        this.size = Math.random() * 30 + 20;
    }
    
    update() {
        this.x -= this.speed;
        if (this.x + this.size * 2 < 0) {
            this.x = canvas.width + this.size;
            this.y = Math.random() * 200;
        }
    }
    
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.6, this.y - this.size * 0.2, this.size * 0.8, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 1.2, this.y, this.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize clouds
for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud());
}

// Draw background
function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clouds
    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });
    
    // Ground
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    
    // Grass
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 20);
    
    // Ground texture
    ctx.fillStyle = '#D2691E';
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 80, 5, 80);
    }
}

// Check collision
function checkCollision() {
    for (let pipe of pipes) {
        // Check if bird is within pipe's x range
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
            // Check if bird hits top or bottom pipe
            if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                return true;
            }
        }
    }
    return false;
}

// Game loop
function gameLoop() {
    if (gameState !== 'playing') return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    // Spawn pipes
    frameCount++;
    if (frameCount % 120 === 0) {
        pipes.push(new Pipe());
    }
    
    // Update and draw pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].draw();
        
        // Remove off-screen pipes
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    }
    
    // Update and draw bird
    bird.update();
    bird.draw();
    
    // Check collision
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    if (gameState === 'playing') return;
    
    gameState = 'playing';
    overlay.classList.add('hidden');
    gameLoop();
}

// Pause game
function pauseGame() {
    if (gameState === 'playing') {
        gameState = 'paused';
        cancelAnimationFrame(animationId);
        overlayTitle.textContent = '游戏暂停';
        overlayText.textContent = '点击继续游戏';
        overlay.classList.remove('hidden');
    } else if (gameState === 'paused') {
        gameState = 'playing';
        overlay.classList.add('hidden');
        gameLoop();
    }
}

// Game over
function gameOver() {
    gameState = 'gameover';
    cancelAnimationFrame(animationId);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('flappyHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    overlayTitle.textContent = '游戏结束';
    overlayText.textContent = `得分: ${score}  最高分: ${highScore}`;
    overlay.classList.remove('hidden');
}

// Restart game
function restartGame() {
    gameState = 'menu';
    score = 0;
    frameCount = 0;
    scoreElement.textContent = score;
    pipes = [];
    bird.reset();
    overlayTitle.textContent = '准备开始';
    overlayText.textContent = '点击开始游戏按钮';
    
    // Clear canvas and draw initial state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    bird.draw();
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
            bird.jump();
        } else if (gameState === 'menu' || gameState === 'gameover') {
            restartGame();
            startGame();
        } else if (gameState === 'paused') {
            pauseGame();
        }
    }
});

canvas.addEventListener('click', () => {
    if (gameState === 'playing') {
        bird.jump();
    }
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState === 'playing') {
        bird.jump();
    }
});

// Initialize
drawBackground();
bird.draw();
highScoreElement.textContent = highScore;
