console.log('helloooooo')
function ReapetImage (howManyTimes){
    var picture = document.getElementById('pic')
    for (var i = 0; i < howManyTimes; i++) {
        picture.innerHTML += "<img src='chicken.png' alt='chicken' width='60px' height='55px'>"
    }
}
ReapetImage(30);
