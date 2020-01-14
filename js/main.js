// class User{
//     constructor(name ,score,lives){
//         this.name=name;
//         this.score=score;
//         this.lives=lives;
//     }
// }
var score=$('#score').html();
var lives =$('#lives').html();
var rockets=$('#rocket').html();
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
    
    var userName =$('.username').val();
    var score=$('#score').html(0);
    var lives =$('#lives').html(0);
    var rockets=$('#rocket').html(0);
    // var user =new User(userName,score,lives,rockets);
 //   console.log(userName);
 
    localStorage.setItem("Name",userName);
    localStorage.setItem("score",score);
    localStorage.setItem("lives",lives);
    localStorage.setItem("rockets",rockets);

})
$('#contBtn').click(function(){
    localStorage.setItem("score",score);
    localStorage.setItem("lives",lives);
    localStorage.setItem("rockets",rockets);


})
