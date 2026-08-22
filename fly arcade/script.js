let score = 0
let highscore = localStorage.getItem('highscore');
const refreshBtn = document.getElementById("btnRefresh");

const luecke = 180; 
let roehren = [];
const roehrenSpeed = 3;
let letzteRoehreZeit = 0;
const roehrenAbstand = 1800;

let vogelY = 250;
const vogelX = 60;
let vogelSpeedY = 0;
const gravitation = 0.4;
const sprungKraft = -7;

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 700);
});


function handleClick() {
  window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);


if (highscore === null) {
    highscore = 0;
}



document.getElementById('highscore').innerHTML =
    'highscore: ' + (localStorage.getItem('highscore') || '-');


function jump() {
    vogelSpeedY = sprungKraft;
}

document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        event.preventDefault();
        jump();
    }
});

spielfeld.addEventListener("click", function() {
    jump();
});

function gameLoop(zeitstempel) {
    vogelSpeedY += gravitation;
    vogelY += vogelSpeedY;
    vogel.style.top = vogelY + "px";

    moveRoehren();
    checkScore();
    checkNeueRoehre(zeitstempel);

    if (checkKollision()) {
        document.getElementById("gameOverText").innerHTML = "❌ Game Over!";

        // Game Over - Loop hier stoppen, Text anzeigen etc.
        return;
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function createRoehre() {
    const feldHoehe = spielfeld.clientHeight;
    const feldBreite = spielfeld.clientWidth;

    const minTop = 50;
    const maxTop = feldHoehe - luecke - 50;
    const lueckeTop = Math.floor(Math.random() * (maxTop - minTop)) + minTop;

    const roehreOben = document.createElement("div");
    roehreOben.className = "roehre-oben";
    roehreOben.style.left = feldBreite + "px";
    roehreOben.style.top = "0px";
    roehreOben.style.height = lueckeTop + "px";

    const roehreUnten = document.createElement("div");
    roehreUnten.className = "roehre-unten";
    roehreUnten.style.left = feldBreite + "px";
    roehreUnten.style.top = (lueckeTop + luecke) + "px";
    roehreUnten.style.height = (feldHoehe - lueckeTop - luecke) + "px";

    spielfeld.appendChild(roehreOben);
    spielfeld.appendChild(roehreUnten);

    roehren.push({ oben: roehreOben, unten: roehreUnten, x: feldBreite, gepunktet: false });
}


function moveRoehren() {
    for (let i = roehren.length - 1; i >= 0; i--) {
        const r = roehren[i];
        r.x -= roehrenSpeed;
        r.oben.style.left = r.x + "px";
        r.unten.style.left = r.x + "px";

        if (r.x + r.oben.offsetWidth < 0) {
            r.oben.remove();
            r.unten.remove();
            roehren.splice(i, 1);
        }
    }
}

function checkNeueRoehre(zeitstempel) {
    if (zeitstempel - letzteRoehreZeit > roehrenAbstand) {
        createRoehre();
        letzteRoehreZeit = zeitstempel;
    }
}


function checkKollision() {
    const vogelLinks = vogelX;
    const vogelRechts = vogelLinks + vogel.offsetWidth;
    const vogelOben = vogelY;
    const vogelUnten = vogelY + vogel.offsetHeight;

    for (let i = 0; i < roehren.length; i++) {
        const r = roehren[i];

        const roehreLinks = r.x;
        const roehreRechts = r.x + r.oben.offsetWidth;

        const obenUnten = r.oben.offsetHeight;

        const kollisionX = vogelRechts > roehreLinks && vogelLinks < roehreRechts;
        const kollisionObenY = vogelOben < obenUnten;
        const kollisionUntenY = vogelUnten > (r.oben.offsetHeight + luecke);

        if (kollisionX && (kollisionObenY || kollisionUntenY)) {
            return true;
        }
    }

    if (vogelOben < 0 || vogelUnten > spielfeld.clientHeight) {
        return true;
    }

    return false;
}

function checkScore() {
    for (let i = 0; i < roehren.length; i++) {
        const r = roehren[i];

        if (!r.gepunktet && vogelX >= r.x + r.oben.offsetWidth) {
            r.gepunktet = true;
            score++;
            document.getElementById("score").innerHTML = "Punkte: " + score;
            if(score >= 10){
                schalteErfolgFrei("flappy_score_10");
            }
            if(score >= 25){
                schalteErfolgFrei("flappy_score_25");
            }
        }
        if(score > highscore) {


    highscore = score;

    localStorage.setItem("highscore", score );

    document.getElementById("highscore").innerHTML =
        "Highscore: " + highscore;


}
    }
}