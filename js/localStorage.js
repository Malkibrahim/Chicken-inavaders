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
  var userName;
  
  do {
    userName =$('#name').val();
     }while(userName!=null);
 
  
window.localStorage.setItem("Name",userName);
//  window.localStorage.setItem("score",score.text());
//  window.localStorage.setItem("lives",lives.text());
//   localStorage.setItem("rockets",rockets.text());
  localStorage.setItem("deadEnemy",JSON.stringify(arr));
//   console.log(score.text());    

    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');


})
$('#contBtn').click(function(){
    // localStorage.setItem("score",score.text());
    // localStorage.setItem("lives",lives.text());
    // localStorage.setItem("rockets",rockets.text());
    localStorage.setItem("deadEnemy",JSON.stringify(arr));


    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');

})



