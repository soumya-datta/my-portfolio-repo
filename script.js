// Dark Mode Toggle
const toggleBtn = document.getElementById("modeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
});

// Snake Game Logic
let canvas = document.getElementById("snakeGame");
let ctx = canvas.getContext("2d");
let snake, dx, dy, food, gameInterval;

function initSnakeGame() {
    snake = [{ x: 100, y: 100 }];
    dx = 20;
    dy = 0;
    food = spawnFood();
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
}

function drawSnake() {
    ctx.fillStyle = "#000";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) return true;

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over!");
        canvas.style.display = "none";
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
}

function startSnakeGame() {
    initSnakeGame();
    canvas.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150);
}

document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp": if (dy === 0) { dx = 0; dy = -20; } break;
        case "ArrowDown": if (dy === 0) { dx = 0; dy = 20; } break;
        case "ArrowLeft": if (dx === 0) { dx = -20; dy = 0; } break;
        case "ArrowRight": if (dx === 0) { dx = 20; dy = 0; } break;
    }
});
// Typing Effect for Roles
const roles = ["UX Designer", "Frontend Developer", "Problem Solver", "Tech Explorer"];
let roleIndex = 0;
let charIndex = 0;
let typingSpan = document.querySelector(".type-text");

function typeRole() {
    if (!typingSpan) return;

    if (charIndex < roles[roleIndex].length) {
        typingSpan.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, 100);
    } else {
        setTimeout(() => {
            typingSpan.textContent = "";
            charIndex = 0;
            roleIndex = (roleIndex + 1) % roles.length;
            typeRole();
        }, 2000);
    }
}
typeRole();
// Scroll-based animation
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  for (let el of revealElements) {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
