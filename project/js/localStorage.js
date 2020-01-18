import {generalState ,score,lives,rockets} from './game.mjs'

var i=0;
var arr=[];

console.log('hii');
$("#newPlayer").hover(function(){
    $("#newPlayer").css("color","white")
    
}, function(){
    $("#newPlayer").css("color","rgba(255, 255, 255, 0.596)")
    
})
$("#contBtn").hover(function(){
    $("#contBtn").css("color","white")
}, function(){
    $("#contBtn").css("color","rgba(255, 255, 255, 0.596)")
    
})
$("#newPlayer").click(function(){
  arr=   generalState.destroyEnemys;
    console.log(score.text());    
    var userName =$('#name').val();
   
 
    localStorage.setItem("Name",userName);
    localStorage.setItem("score",score.text());
    localStorage.setItem("lives",lives.text());
    localStorage.setItem("rockets",rockets.text());
    localStorage.setItem("deadEnemy",JSON.stringify(arr));


    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');


})
$('#contBtn').click(function(){
    localStorage.setItem("score",score.text());
    localStorage.setItem("lives",lives.text());
    localStorage.setItem("rockets",rockets.text());
    localStorage.setItem("deadEnemy",JSON.stringify(arr));


    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');

})

///////////////////Level ups ///////////////////////
function LevelUp(){
    
}


