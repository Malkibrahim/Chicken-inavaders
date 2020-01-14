let hero = { top: 640, left: 640 };
let fire = [];
let dgag=[];
let input = document.getElementById("hero");

function ReapetImage(howManyTimes) {
    let picture = document.getElementById('pic')
    dgag.length=howManyTimes;
    for (let i = 0; i < howManyTimes; i++) {
        picture.innerHTML += "<img src='imgs/chicken.png' alt='chicken' id='chicken'>"
    }
}
// console.log(input);
// $( document).keydown(function(e) {
//     console.log(e.keycode);
//   });
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37) {
        hero.left = hero.left - 50;
        input.style.left = hero.left + "px";
    }
    if (e.keyCode == 39) {
        hero.left = hero.left + 50;
        input.style.left = hero.left + "px";
    }
    if (e.keyCode == 32) {
        fire.push({ left: hero.left + 43, top: hero.top })
        drawFires()
    }
    
})
function drawFires() {
    document.getElementById("fires").innerHTML = " ";
    for (let i = 0; i < fire.length; i++) {
        document.getElementById("fires").innerHTML +=
        `<div class="fire" style="left:${fire[i].left}px;top:${fire[i].top}px;"></div>`;
    }
    
}
function moveFires(params) {
    for (let i = 0; i < fire.length; i++) {
        fire[i].top = fire[i].top - 20;
    }
}
ReapetImage(15);
function killChicken() {
    for (let i = 0; i < dgag.length; i++) {
        for (let j = 0; j < fire.length; j++) {
            
        } 
    }
    
}
function loop() {
    setTimeout(loop, 80);
    moveFires();
    drawFires();
    killChicken();
}
loop();