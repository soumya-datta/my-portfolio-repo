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
// 🎮 Touch Control Direction Setter
function changeDirection(dir) {
  if (dir === "UP" && direction !== "DOWN") direction = "UP";
  else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
  else if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}
let gameRunning = false;

function startGame() {
  gameRunning = true;
  document.querySelector(".touch-controls").style.display = "flex";
  // start game loop here
}

function stopGame() {
  gameRunning = false;
  document.querySelector(".touch-controls").style.display = "none";
  // stop game loop or clear interval
}
// Make sure controls are hidden on first load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".touch-controls").style.display = "none";
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


window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";
  setTimeout(() => loader.style.display = "none", 500);
});

function toggleChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
}

function handleChat(event) {
  if (event.key === "Enter") {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (msg) {
      addMessage("user", msg);
      respond(msg);
      input.value = "";
    }
  }
}

function addMessage(type, text) {
  const chat = document.getElementById("chatMessages");
  const msgEl = document.createElement("div");
  msgEl.className = "chat-msg " + type;
  msgEl.textContent = text;
  chat.appendChild(msgEl);
  chat.scrollTop = chat.scrollHeight;
}

function respond(userMsg) {
  let reply = "I'm still learning! 😅";

  const msg = userMsg.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hey there! 👋";
  } else if (msg.includes("project")) {
    reply = "Check out the Projects section above!";
  } else if (msg.includes("resume")) {
    reply = "You can view my resume in the Resume section 📄";
  } else if (msg.includes("name")) {
    reply = "I'm Soumya Datta's site assistant 🤖";
  } else if (msg.includes("skills")) {
    reply = "I'm skilled in HTML, CSS, JS, C, GitHub & Figma 💻";
  }

  setTimeout(() => typeBotMessage(reply), 500);
}

function typeBotMessage(text) {
  const chat = document.getElementById("chatMessages");
  const msgEl = document.createElement("div");
  msgEl.className = "chat-msg bot";
  chat.appendChild(msgEl);

  let index = 0;
  const typing = setInterval(() => {
    msgEl.textContent += text.charAt(index);
    index++;
    chat.scrollTop = chat.scrollHeight;
    if (index === text.length) {
      clearInterval(typing);
      speakText(text); // 👇 calls speech when done typing
    }
  }, 30); // typing speed
}
// 🚀 Show/hide rocket button
const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
});

toTopBtn.addEventListener("click", () => {
  // Trigger smoke animation
  const smoke = document.getElementById("smokeTrail");
  smoke.classList.add("active");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Remove smoke class after animation
  setTimeout(() => {
    smoke.classList.remove("active");
  }, 800);
});
// 🎯 Scroll the carousel
function scrollCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const scrollAmount = 120;
  track.scrollLeft += direction * scrollAmount;
}

// 👯 Clone items for infinite scroll loop
// Page fade-in on load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

window.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const items = Array.from(track.children);

  // Clone all items to double the track
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  });

  // Pause on hover (desktop)
  track.addEventListener("mouseenter", () => {
    track.classList.add("auto-scroll-paused");
  });
  track.addEventListener("mouseleave", () => {
    track.classList.remove("auto-scroll-paused");
  });

  // Pause on touch (mobile)
  track.addEventListener("touchstart", () => {
    track.classList.add("auto-scroll-paused");
  });
  track.addEventListener("touchend", () => {
    track.classList.remove("auto-scroll-paused");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const items = [...track.children];

  // Clone all items for seamless loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
});
// Animate skill bars on scroll
document.addEventListener("DOMContentLoaded", () => {
  const skillFills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute("data-width");
          fill.style.width = width;
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach(fill => observer.observe(fill));
});
// Reveal sections and animate <h2> when in view
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach(section => observer.observe(section));
});
// 🌐 Page fade-in on load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// 🎯 Reveal elements when in view
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach(section => observer.observe(section));
});
// Timeline reveal on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const revealTimeline = () => {
  timelineItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealTimeline);
window.addEventListener('load', revealTimeline);

