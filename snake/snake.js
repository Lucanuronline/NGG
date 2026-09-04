const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const refreshBtn = document.getElementById("btnRefresh");

let feldAnzahl = 20;
let feldGroesse = 20;

let score = 0
let highscore = localStorage.getItem('highscore');

if (highscore === null) {
    highscore = 0;
}

document.getElementById('highscore').innerHTML =
    'highscore: ' + (localStorage.getItem('highscore') || '-');

function resizeCanvas() {
    let groesse = Math.min(window.innerWidth - 40, 400);
    canvas.width = groesse;
    canvas.height = groesse;
    feldGroesse = canvas.width / feldAnzahl;
}

resizeCanvas();


let direction = "right";
let snake = [
    { x: 10, y: 10 }
];
let food = {
    x: 5,
    y: 5
};

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 500);
});

function handleClick() {
  window.location.reload();
}

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up"
        event.preventDefault();
    }

    if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
        event.preventDefault();
    }

    if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
        event.preventDefault();
    }

    if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
        event.preventDefault();
    }

});

function up() {
    if (direction !== "down") {
        direction = "up";
    }
}

function down() {
    if (direction !== "up") {
        direction = "down";
    }
}

function left() {
    if (direction !== "right") {
        direction = "left";
    }
}

function right() {
    if (direction !== "left") {
        direction = "right";
    }
}

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchend", function(event) {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) {
            right();
        } else if (deltaX < -30) {
            left();
        }
    } else {
        if (deltaY > 30) {
            down();
        } else if (deltaY < -30) {
            up();
        }
    }
});

function moveSnake() {

    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    if (direction === "right") {
        head.x++;
    }

    if (direction === "left") {
        head.x--;
    }

    if (direction === "up") {
        head.y--;
    }

    if (direction === "down") {
        head.y++;
    }

if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerHTML = "Punkte: " + score;
    snake.unshift(head);
    food.x = Math.floor(Math.random() * (feldAnzahl - 1)) + 1;
    food.y = Math.floor(Math.random() * (feldAnzahl - 1)) + 1;

    if(score > highscore) {


    highscore = score;

    localStorage.setItem("highscore", score );

    document.getElementById("highscore").innerHTML =
        "Highscore: " + highscore;


}

    checkChallenge("snake", score);
    checkWochenChallenge("snake", 1);

    if (score >= 20) {
    schalteErfolgFrei("snake_score_20");
}

if (score >= 50) {
    schalteErfolgFrei("snake_score_50");
}

if (score >= 70) {
    schalteErfolgFrei("snake_score_70");
}
}

    for (let i = 1; i < snake.length; i++) {

    if (head.x === snake[i].x && head.y === snake[i].y) {

        clearInterval(game);
        document.getElementById("gg").innerHTML = "❌ Game Over!";
        return;

    }

}

if (
    head.x < 0 ||
    head.x >= feldAnzahl ||
    head.y < 0 ||
    head.y >= feldAnzahl
) {
    clearInterval(game);
    document.getElementById("gg").innerHTML = "❌ Game Over!";
    return;
}
    snake.unshift(head);
    snake.pop();
}

drawSnake();

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

let aktiverSkin = ladeAktiverSkin("snake");
let kopfFarbe = aktiverSkin === "standard" ? "#5ee6a4" : findeSkinDaten(aktiverSkin).kopfFarbe;
let koerperFarbe = aktiverSkin === "standard" ? "#34d6ff" : findeSkinDaten(aktiverSkin).koerperFarbe;


    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? kopfFarbe : koerperFarbe;
        ctx.beginPath();
        ctx.roundRect(
            snake[i].x * feldGroesse + 1,
            snake[i].y * feldGroesse + 1,
            feldGroesse - 2,
            feldGroesse - 2,
            4
        );
        ctx.fill();
    }

    ctx.fillStyle = "#ff5c5c";
    ctx.beginPath();
    ctx.roundRect(
        food.x * feldGroesse + 1,
        food.y * feldGroesse + 1,
        feldGroesse - 2,
        feldGroesse - 2,
        6
    );
    ctx.fill();
}

setInterval(function () {
    moveSnake();
    drawSnake();
}, 120);

refreshBtn.addEventListener("click", handleClick);