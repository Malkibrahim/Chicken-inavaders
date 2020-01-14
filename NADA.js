console.log('helloooooo')
function ReapetImage (howManyTimes){
    let picture = document.getElementById('pic')
    for (let i = 0; i < howManyTimes; i++) {
        picture.innerHTML += "<img src='chicken.png' alt='chicken' width='60px' height='55px'>"
    }
}

ReapetImage(45);

