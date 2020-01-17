console.log('connected')

const game_width = 900;
const game_height = 800;

const chicken_width = 50;
const chicken_horizontal_padding = 40;
const chicken_height = 70;
const chicken_vertical_padding = 20;
var chicken_per_row = 12;
var row = 3;

const State = {
 chickens :[],
 lastTime : Date.now(),

}
export function first(){
    console.log("yarb t4t8l")
}
const currentTime = Date.now();
const dt = (currentTime - State.lastTime) / 1000;
console.log(dt);
GameStart();
UpdateChichen(dt);
window.requestAnimationFrame(UpdateChichen);
// update();
function SetPosition(el , x, y){
    el.style.transform = `translate${x}px,${y}px`;
}

export function CreateChicken($container , x , y){
    let $elemnt= document.createElement( "img");
    $elemnt.src = 'chicken.png';
    $elemnt.className='chichen';
    $container.appendChild($elemnt);
    const chicken = { 
        x, 
        y,
        $elemnt
    }
    State.chickens.push(chicken);
    SetPosition($elemnt , x ,y);
}
function UpdateChichen (dt){
    const dx = Math.sin(State.lastTime / 1000) *50;
    const dy = Math.cos(State.lastTime / 1000) *20;

    const chickens = State.chickens;
    for (let i = 0; i < chickens.length; i++) {
        const chichen = chickens[i];
        const x = chichen.x + dx;
        const y = chichen.y + dy; 
        SetPosition (chichen.$elemnt , x, y);       
    }
}

// function update(){
//     UpdateChichen(dt);
//     window.requestAnimationFrame(update)
// }

function GameStart (){
const $container = document.querySelector('.game');

//const chicken_width =
//game_width - (chicken_horizontal_padding *2) / (chicken_per_row - 1);
for(let i = 0 ; i < row ; i++)
{
    const y = i * chicken_height + chicken_vertical_padding;
    for(let j=0 ; j < chicken_per_row ; j++ )
    {
        const x = j * (chicken_width + chicken_horizontal_padding); 
        CreateChicken($container , x ,y);
    }
}

}