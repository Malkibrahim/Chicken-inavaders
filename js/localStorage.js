
var score=$('#score').text();
var lives =$('#lives').text();
var rockets=$('#rocket').text();
var i=0;
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
    // debugger;
    
    var userName =$('#name').val();
   
 
    localStorage.setItem("Name",userName);
    localStorage.setItem("score",0);
    localStorage.setItem("lives",0);
    localStorage.setItem("rockets",0);
    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');


})
$('#contBtn').click(function(){
    localStorage.setItem("score",score);
    localStorage.setItem("lives",lives);
    localStorage.setItem("rockets",rockets);
    $('.intro').addClass('hide')
    $('.whole').removeClass('hide');
})

///////////////////Level ups ///////////////////////
function LevelUp(){
    
}


