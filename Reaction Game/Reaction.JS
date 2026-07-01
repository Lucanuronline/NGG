let startZeit;
let kannKlicken = false;
let highscore = Number(localStorage.getItem('highscore')) || Infinity;

if (!highscore || highscore < 50) {
    localStorage.removeItem('highscore');
    highscore = Infinity;
}

function startGame() {
    kannKlicken = false;
    document.getElementById('text').innerHTML = 'Warte...';
    document.getElementById('feld').style.backgroundColor = 'red';
    document.getElementById('highscore').innerHTML =
    '🏆 Highscore: ' +
    (highscore === Infinity ? '-' : highscore + ' ms');

    let zufall = Math.random() * 3000 + 2000;

    setTimeout(function () {
        kannKlicken = true;
        document.getElementById('feld').style.backgroundColor = 'green';
        feld.style.boxShadow = "0 0 25px lime";
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

    document.getElementById('zeit').innerHTML =
        'Deine Zeit: ' + reaktion + ' ms';

    if (reaktion < highscore) {
        highscore = reaktion;
        localStorage.setItem('highscore', highscore);

        document.getElementById('highscore').innerHTML =
    '🏆 Highscore: ' + (highscore === Infinity ? '-' : highscore + ' ms');
    }

    kannKlicken = false;
};