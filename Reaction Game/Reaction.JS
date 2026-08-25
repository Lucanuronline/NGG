let versucheGesamt = Number(localStorage.getItem('reactionVersuche')) || 0;
let startZeit;
let kannKlicken = false;
let highscore = Number(localStorage.getItem('highscore')) || Infinity;

if (!highscore || highscore < 50) {
    localStorage.removeItem('highscore');
    highscore = Infinity;
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 1200);
});

function startGame() {
    kannKlicken = false;
    document.getElementById('text').innerHTML = 'Warte...';
    feld.style.background = "radial-gradient(circle at 35% 35%, #ffb3b3, #ff5c5c 60%, #a93a3a)";
    feld.style.boxShadow = "0 0 25px rgba(255, 92, 92, 0.7)";
    feld.style.animation = "pulse 1.2s infinite";
    document.getElementById('highscore').innerHTML =
    '🏆 Highscore: ' +
    (highscore === Infinity ? '-' : highscore + ' ms');

    let zufall = Math.random() * 3000 + 2000;

setTimeout(function () {
    kannKlicken = true;
    feld.style.background = "radial-gradient(circle at 35% 35%, #b3ffd9, #5ee6a4 60%, #2f8f5f)";
    feld.style.boxShadow = "0 0 25px rgba(94, 230, 164, 0.7)";
    feld.style.animation = "none";
    document.getElementById('text').innerHTML = 'Klick!';
    startZeit = Date.now();
}, zufall);
    
}

document.getElementById('feld').onclick = function () {

    if (!kannKlicken) {
        document.getElementById('zeit').innerHTML =
            '❌ Zu früh/spät geklickt!';
        return;
    }

    let reaktion = Date.now() - startZeit;

    checkChallenge("react", reaktion);

    versucheGesamt++;
localStorage.setItem('reactionVersuche', versucheGesamt);

if (versucheGesamt >= 5) {
    schalteErfolgFrei("react_5_versuche");
}

    document.getElementById('zeit').innerHTML =
        'Deine Zeit: ' + reaktion + ' ms';

    if (reaktion < highscore) {
        highscore = reaktion;
        localStorage.setItem('highscore', highscore);

        document.getElementById('highscore').innerHTML =
    '🏆 Highscore: ' + (highscore === Infinity ? '-' : highscore + ' ms');
    }
    if (reaktion < 250) {
        schalteErfolgFrei("react_unter_250");
    }

    kannKlicken = false;
};