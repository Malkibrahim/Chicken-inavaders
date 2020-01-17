const keyCodeLeft = 37;
const keyCodeRight = 39;
const keyCodeSpace = 32;

const gameWidth = 800;
const gameHieght = 600;

const shapeWidth = 50;
const shapeSpeed = 600.0;
const laserSpeed = 300.0;
const laserSlowing = 0.5;

const chickenPerRow = 10;
const chickenHorizntalPadding = 80;
const chickenVirticalPadding = 70;
const chickenSpace = 80;
const chickenSlowDown = 5.0;

const generalState = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  shipX: 0,
  shipY: 0,
  shipCooldown: 0,
  lasers: [],
  chickens: [],
  chickenLasers: [],
  gameOver: false
};

function intersection(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function maxAndMin(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
} 

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function createShip($container) {
  generalState.shipX = gameWidth / 2;
  generalState.shipY = gameHieght - 50;
  const $ship = document.createElement("img");
  $ship.src = "img/player.png";
  $ship.className = "ship";
  $ship.width = shapeWidth;
  $container.appendChild($ship);
  setPosition($ship, generalState.shipX, generalState.shipY);
}

function destroyShip($container, ship) {
  $container.removeChild(ship);
  generalState.gameOver = true;
  const audio = new Audio("sound/sfx-lose.ogg");
  audio.play();
}

function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/fire.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  generalState.lasers.push(laser);
  const audio = new Audio("sound/sfx-laser1.ogg");
  audio.play();
  setPosition($element, x, y);
}

function updateship(dt, $container) {
  if (generalState.leftPressed) {
    generalState.shipX -= dt * shapeSpeed;
  }  
  if (generalState.rightPressed) {
    generalState.shipX += dt * shapeSpeed;
  }  

  generalState.shipX = maxAndMin(
    generalState.shipX,
    shapeWidth,
    gameWidth - shapeWidth
  );  

  if (generalState.spacePressed && generalState.shipCooldown <= 0) {
    createLaser($container, generalState.shipX, generalState.shipY);
    generalState.shipCooldown = laserSlowing;
  }  
  if (generalState.shipCooldown > 0) {
    generalState.shipCooldown -= dt;
  }  

  const ship = document.querySelector(".ship");
  setPosition(ship, generalState.shipX, generalState.shipY);
}  

function updateLasers(dt, $container) {
  const lasers = generalState.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * laserSpeed;
    if (laser.y < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const chickens = generalState.chickens;
    for (let j = 0; j < chickens.length; j++) {
      const enemy = chickens[j];
      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();
      if (intersection(r1, r2)) {
        // Enemy was hit
        destroyEnemy($container, enemy);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  generalState.lasers = generalState.lasers.filter(e => !e.isDead);
}

function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

function createChicken($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/chicken.png";
  $element.className = "enemy";
  $container.appendChild($element);
  const chicken = {
    x,
    y,
    cooldown: rand(0.5, chickenSlowDown),
    $element
  };
  generalState.chickens.push(chicken);
  setPosition($element, x, y);
}

function updateChicken(dt, $container) {
  const dx = Math.sin(generalState.lastTime / 1000.0) * 50;
  const dy = Math.cos(generalState.lastTime / 1000.0) * 10;

  const chickens = generalState.chickens;
  for (let i = 0; i < chickens.length; i++) {
    const enemy = chickens[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);
    enemy.cooldown -= dt;
    if (enemy.cooldown <= 0) {
      createChickenLaser($container, x, y);
      enemy.cooldown = chickenSlowDown;
    }
  }
  generalState.chickens = generalState.chickens.filter(e => !e.isDead);
}

function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element);
  enemy.isDead = true;
}

function createChickenLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/egg3.png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  generalState.chickenLasers.push(laser);
  setPosition($element, x, y);
}

function updateEnemyLasers(dt, $container) {
  const lasers = generalState.chickenLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * laserSpeed;
    if (laser.y > gameHieght) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const ship = document.querySelector(".ship");
    const r2 = ship.getBoundingClientRect();
    if (intersection(r1, r2)) {
      // ship was hit
      destroyShip($container, ship);
      break;
    }
  }
  generalState.chickenLasers = generalState.chickenLasers.filter(e => !e.isDead);
}


function init() {
  const $container = document.querySelector(".game");
  createShip($container);

  const enemySpacing = (gameWidth - chickenHorizntalPadding * 2) / (chickenPerRow - 1);
  for (let j = 0; j < 3; j++) {
    const y = chickenVirticalPadding + j * chickenSpace;
    for (let i = 0; i < chickenPerRow; i++) {
      const x = i * enemySpacing + chickenHorizntalPadding;
      createChicken($container, x, y);
    }
  }
}

function shipHasWon() {
  return generalState.chickens.length === 0;
}

function update(e) {
  // console.log
  const currentTime = Date.now();
  const dt = (currentTime - generalState.lastTime) / 1000.0;
  console.log(dt);
  if (generalState.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    return;
  }

  if (shipHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }

  const $container = document.querySelector(".game");
  updateship(dt, $container);
  updateLasers(dt, $container);
  updateChicken(dt, $container);
  updateEnemyLasers(dt, $container);

  generalState.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === keyCodeLeft) {
    generalState.leftPressed = true;
  } else if (e.keyCode === keyCodeRight) {
    generalState.rightPressed = true;
  } else if (e.keyCode === keyCodeSpace) {
    generalState.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === keyCodeLeft) {
    generalState.leftPressed = false;
  } else if (e.keyCode === keyCodeRight) {
    generalState.rightPressed = false;
  } else if (e.keyCode === keyCodeSpace) {
    generalState.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
