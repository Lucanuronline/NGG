let schlaegerX = 340;
schlager.style.left = schlaegerX + "px";

let blocks = [];

let score = 0;
let highscore = localStorage.getItem('highscore');

let level = 1;
const farben = ["red", "orange", "yellow", "lime", "cyan", "blue", "purple"];
let ballX = 390;
let ballY = 300;
let ballSpeedX = 3;
let ballSpeedY = -3;


let wallSFX = new Audio('sounds/wall.mp3')
let schlagerSFX = new Audio('sounds/schlager.mp3')
let levelUpSFX = new Audio('sounds/level-up.mp3')


const refreshBtn = document.getElementById("btnRefresh");
const ball = document.getElementById("ball");
const spielfeld = document.getElementById("spielfeld");

function handleClick() {
  window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);

if (highscore === null) {
    highscore = 0;
}

if (!highscore || highscore > 250) {
    localStorage.removeItem('highscore');
    highscore = 0;
}

document.getElementById('highscore').innerHTML =
    'highscore: ' + (localStorage.getItem('highscore') || '-');


createBlocks(4);

function createBlocks(reihen){
    for (let reihe = 0; reihe < reihen; reihe++){

    for(let spalte = 0; spalte < 5; spalte++){

        let block = document.createElement("div");
        block.className = "block";

        if (reihe === 0) {
    block.style.backgroundColor = "red";
}

block.style.backgroundColor = farben[reihe % farben.length];

        block.style.left = (0 + spalte * 20) + "%";
        block.style.top = (reihe * 35) + "px";


        spielfeld.appendChild(block);
        blocks.push(block);

    }

}
}



schlager.style.left = "340px";
schlager.style.bottom = "15px";
ball.style.left = "390px";
ball.style.bottom = "40px";

document.addEventListener("keydown", function(event){

    if (event.key === "ArrowLeft") {
        schlaegerX -= 12;
        schlager.style.left = schlaegerX + "px";
    }
    
        if (event.key === "ArrowRight") {
        schlaegerX += 12;
        schlager.style.left = schlaegerX + "px";
    }

    if (schlaegerX < 0) {
        schlaegerX = 0;
    }

        if (schlaegerX > 680) {
        schlaegerX = 680;
    }

});

function moveBall() {
    ballX += ballSpeedX
    ballY += ballSpeedY

    ball.style.left = ballX + "px"
    ball.style.top = ballY + "px"

    if(ballX <= 0){
        ballSpeedX = 3;
        wallSFX.play();
    }

    if(ballX >= spielfeld.clientWidth - ball.offsetWidth){
        ballSpeedX = -3;
        wallSFX.play();
    }

    if(ballY <= 0){
        ballSpeedY = 3;
        wallSFX.play();
    }

    if(ballY >= spielfeld.clientHeight){
        ballSpeedY = 3;
        document.getElementById("h1").innerHTML = "❌ Game Over!";
        ball.remove();
        clearInterval(gameLoop)
    }

    if(ballY >= spielfeld.clientHeight - 15 - schlager.offsetHeight && ballX >= schlaegerX && ballX <= schlaegerX + schlager.offsetWidth){
        ballSpeedY = -3;
        schlagerSFX.play();
    }


    for (let i = 0; i < blocks.length; i++) {

    let block = blocks[i];

    let blockX = block.offsetLeft;
    let blockY = block.offsetTop;

    if (
        ballX >= blockX &&
        ballX <= blockX + block.offsetWidth &&
        ballY >= blockY &&
        ballY <= blockY + block.offsetHeight
    ) {

        block.remove();
        blocks.splice(i, 1);


        ballSpeedY = -ballSpeedY;

        score++;
        document.getElementById('score').innerHTML = ('Treffer: ' + score);
        let blockSFX = new Audio('sounds/blockbreak.mp3')
        blockSFX.play();

            if(score > highscore) {


    highscore = score;

    localStorage.setItem("highscore", score );

    document.getElementById("highscore").innerHTML =
        "Highscore: " + highscore;


}


        break;
    }
}

if(blocks.length === 0) {
    levelUpSFX.play();
    document.getElementById("h1").innerHTML = "🎉 Level geschafft!";
    level++;
    document.getElementById("level").innerHTML = "Level: " + level;

    createBlocks(level + 3);
}




}

spielfeld.addEventListener("touchmove", function(event) {

    event.preventDefault();

    let rect = spielfeld.getBoundingClientRect();

    let fingerX = event.touches[0].clientX - rect.left;

    schlaegerX = fingerX - 60; 

    if (schlaegerX < 0) {
        schlaegerX = 0;
    }

    schlaegerX = Math.max(0, Math.min(
    fingerX - schlager.offsetWidth / 2,
    spielfeld.clientWidth - schlager.offsetWidth
));

    schlager.style.left = schlaegerX + "px";
});

let gameLoop = setInterval(moveBall, 10);