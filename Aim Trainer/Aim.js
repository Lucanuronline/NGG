let score = 0;
let miss = 0;
const refreshBtn = document.getElementById("btnRefresh");
const spielfeld = document.getElementById("spielfeld");
const target = document.getElementById("target");

let x = 0;
let y = 0;
let highscore = localStorage.getItem('highscore');
let time = 30;
let timer = setInterval(function () {
    time--;
    document.getElementById('timer').innerHTML = 'Zeit: ' + time;
}, 1000);

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 1200);
});

function handleClick() {
  window.location.reload();
}

function neuesZiel() {
    x = Math.random() * (spielfeld.clientWidth - target.offsetWidth);
    y = Math.random() * (spielfeld.clientHeight - target.offsetHeight);
    target.style.left = x + "px";
    target.style.top = y + "px";

        let aktiverSkin = ladeAktiverSkin("aim");
    if (aktiverSkin !== "standard") {
        let skin = findeSkinDaten(aktiverSkin);
        target.style.background = "radial-gradient(circle at 35% 35%, #ffffff, " + skin.zielFarbe + " 60%, #000)";
    }

}

neuesZiel();

if (highscore === null) {
    highscore = 0;
}

if (!highscore || highscore > 250) {
    localStorage.removeItem('highscore');
    highscore = 0;
}

document.getElementById('highscore').innerHTML =
    'highscore: ' + (localStorage.getItem('highscore') || '-');

function treffer() {

    if(time <= 0) {
        clearInterval(timer);
        document.getElementById('timer').innerHTML = 'Zeit: ' + 'Abgelaufen!'
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        return;
    }

    score++;
    document.getElementById('score').innerHTML = ('Treffer: ' + score);

    checkChallenge("aim", score);
    checkWochenChallenge("aim", 1);

    if(score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", score);
        document.getElementById("highscore").innerHTML = "Highscore: " + score;
    }

    if(score >= 30) {
        schalteErfolgFrei("aim_score_30");
    }

    if(score >= 50) {
        schalteErfolgFrei("aim_score_50");
    }

    neuesZiel();
}

target.addEventListener("click", treffer);
refreshBtn.addEventListener("click", handleClick);