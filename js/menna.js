const leftKey = 37;
const rightKey = 39;
const space= 32;

const gameWidth = 900;
const gameHeight = 800;

const playerWidth = 20;
const playerMaxSpeed = 600.0;
const fireMaxSpeed = 300.0;
const LASER_COOLDOWN = 0.3;

const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  playerCooldown: 0,
  lasers: [],
};

function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  } else {
    return value;
  }
}

function drawHero($container) {
  GAME_STATE.playerX = gameWidth/ 2;
  GAME_STATE.playerY = gameHeight - 50;
  const $player = document.createElement("img");
  $player.src = "images/player.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function moveHero(dt, $container) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * playerMaxSpeed;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * playerMaxSpeed;
  }

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    -700,
   700
  );

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    drawFire($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const $player = document.querySelector(".player");
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function drawFire($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "images/fire.png";
  $element.className = "fire";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
//   const audio = new Audio("sound/sfx-laser1.ogg");
//   audio.play();
  setPosition($element, x, y);
}

function moveFire(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * fireMaxSpeed;
    setPosition(laser.$element, laser.x, laser.y);
  }
}

function init() {
  const $container = document.querySelector(".game");
  drawHero($container);
}

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  const $container = document.querySelector(".game");
  moveHero(dt, $container);
  moveFire(dt, $container);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === leftKey) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === rightKey) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === space) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === leftKey) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === rightKey) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === space) {
    GAME_STATE.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);