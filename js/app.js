// let hero = { top: 640, left: 640 };
// let fire = [];
// let dgag=[];
// let input = document.getElementById("hero");
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
const player_width=20;

const GAME_WIDTH = 900;
const GAME_HEIGHT = 650;
var container = document.getElementById('hero');

var gameState ={
    lastTime: Date.now(),

    playerX:0,
    playery:0,
    leftPressed:false,
    rightPressed:false,
    spacePressed:false

}
function setPosition(el,x,y){
    el.style.transform = `translate(${x}px, ${y}px)`;
}
function creatSpace(){
    gameState.playerX= GAME_WIDTH/2;
    gameState.playery=GAME_HEIGHT -50;
    setPosition(container,gameState.playerX,gameState.playery);

}
function keyPressed(e){
    if(e.keyCode==KEY_CODE_LEFT){
        gameState.leftPressed=true;
    }else if(e.keyCode==KEY_CODE_RIGHT){
        gameState.rightPressed=true;
    }else if(e.keyCode==KEY_CODE_SPACE){
        gameState.spacePressed=true;
    }
}
function keyUp(e){
    if (e.keyCode === KEY_CODE_LEFT) {
        gameState.leftPressed = false;
      } else if (e.keyCode === KEY_CODE_RIGHT) {
        gameState.rightPressed = false;
      } else if (e.keyCode === KEY_CODE_SPACE) {
        gameState.spacePressed = false;
      }
    }
    function limits(v, min, max) {
        if (v < min) {
          return min;
        } else if (v > max) {
          return max;
        } else {
          return v;
        }
      }
    
function updateShip(dt){
console.log(gameState.l);
    if(gameState.leftPressed){
console.log('aaaaa');
        gameState.playerX-=dt*600.0;

    }else if(gameState.rightPressed){
        gameState.playerX+=dt*600.0;
    }
    limits(gameState.playerX,GAME_WIDTH,GAME_WIDTH-player_width);
        setPosition(container,gameState.playerX,gameState.playery);


}
function init(){
    // debugger;
creatSpace();

}
init();
function update(){
    console.log('aaaa');
    const currentTime = Date.now();
  const dt = (currentTime - gameState.lastTime) / 1000.0;
  updateShip(dt);

  gameState.lastTime = currentTime;
  window.requestAnimationFrame(update);
}
window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyUp);
requestAnimationFrame(update);

// function ReapetImage(howManyTimes) {
//     let picture = document.getElementById('pic')
//     dgag.length=howManyTimes;
//     for (let i = 0; i < howManyTimes; i++) {
//         picture.innerHTML += "<img src='images/chicken.png' alt='chicken' id='chicken'>"
//     }
// }
// // console.log(input);
// // $( document).keydown(function(e) {
// //     console.log(e.keycode);
// //   });
// document.addEventListener("keydown", function (e) {
//     if (e.keyCode == 37) {
//         hero.left = hero.left - 50;
//         input.style.left = hero.left + "px";
//     }
//     if (e.keyCode == 39) {
//         hero.left = hero.left + 50;
//         input.style.left = hero.left + "px";
//     }
//     if (e.keyCode == 32) {
//         fire.push({ left: hero.left + 43, top: hero.top })
//         drawFires()
//     }
    
// })
// function drawFires() {
//     document.getElementById("fires").innerHTML = " ";
//     for (let i = 0; i < fire.length; i++) {
//         document.getElementById("fires").innerHTML +=
//         `<div class="fire" style="left:${fire[i].left}px;top:${fire[i].top}px;"></div>`;
//     }
    
// }
// function moveFires(params) {
//     for (let i = 0; i < fire.length; i++) {
//         fire[i].top = fire[i].top - 20;
//     }
// }
// ReapetImage(15);
// function killChicken() {
//     for (let i = 0; i < dgag.length; i++) {
//         for (let j = 0; j < fire.length; j++) {
            
//         } 
//     }
    
// }
// function loop() {
//     setTimeout(loop, 80);
//     moveFires();
//     drawFires();
//     killChicken();
// }
// loop();