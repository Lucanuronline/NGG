let start = "X";
let feld = Array(9).fill(null);
let aktuellerModus = null;

const gewinnLinien = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


document.getElementById("grid").style.display = "none";

function startSpiel(modus) {
    aktuellerModus = modus;
    document.getElementById("grid").style.display = "grid";
    document.getElementById("modusAuswahl").style.display = "none";
}

document.getElementById("btnFreund").addEventListener("click", function() {
    startSpiel("freund");
});

document.getElementById("btnKI").addEventListener("click", function() {
    startSpiel("ki");
});

document.querySelectorAll(".zelle").forEach(function(zelle) {
    zelle.addEventListener("click", function() {
        let index = Number(zelle.dataset.index);
        if (feld[index] === null) {
            feld[index] = start;
            zelle.textContent = start;
            checkGewinner();
            if(start === "X"){
                start = "O"
            }
            else {
                start = "X"
            }

if (aktuellerModus === "ki" && start === "O") {
    setTimeout(function() {
        ziehKI();
    }, 150);
}
        }
    });
});

function checkGewinner() {
    for (let i = 0; i < gewinnLinien.length; i++) {
        let linie = gewinnLinien[i];

        if (feld[linie[0]] === feld[linie[1]]
            && feld[linie[0]] === feld[linie[2]]
            && feld[linie[0]] !== null)
        {
            document.getElementById("gewinnerText").innerHTML = feld[linie[0]] + " hat gewonnen";
            return;
        }
    }

    if (!feld.includes(null)) {
        document.getElementById("gewinnerText").innerHTML = "Unentschieden!";
    }
}

function gewinntSpieler(spieler) {
    for (let i = 0; i < gewinnLinien.length; i++) {
        let linie = gewinnLinien[i];
        if (feld[linie[0]] === spieler
            && feld[linie[1]] === spieler
            && feld[linie[2]] === spieler)
        {
            return true;
        }
    }
    return false;
}

function findeFreieFelder() {
    let freieFelder = [];
    for (let i = 0; i < 9; i++) {
        if (feld[i] === null) {
            freieFelder.push(i);
        }
    }
    return freieFelder;
}

function findeBestenZug() {
    if (Math.random() < 0.25) {
        let freieFelder = findeFreieFelder();
        let zufallsIndex = Math.floor(Math.random() * freieFelder.length);
        return freieFelder[zufallsIndex];
    }

    // 1. Kann die KI selbst gewinnen?
    for (let i = 0; i < 9; i++) {
        if (feld[i] === null) {
            feld[i] = "O";
            if (gewinntSpieler("O")) {
                feld[i] = null;
                return i;
            }
            feld[i] = null;
        }
    }

    // 2. Muss die KI den Spieler blocken?
    for (let i = 0; i < 9; i++) {
        if (feld[i] === null) {
            feld[i] = "X";
            if (gewinntSpieler("X")) {
                feld[i] = null;
                return i;
            }
            feld[i] = null;
        }
    }

    // 3. Mitte nehmen, falls frei
    if (feld[4] === null) {
        return 4;
    }

    // 4. Sonst eine freie Ecke
    let ecken = [0, 2, 6, 8];
    for (let i = 0; i < ecken.length; i++) {
        if (feld[ecken[i]] === null) {
            return ecken[i];
        }
    }

    // 5. Sonst irgendein freies Feld
    for (let i = 0; i < 9; i++) {
        if (feld[i] === null) {
            return i;
        }
    }
}

function ziehKI() {
    let index = findeBestenZug();
    feld[index] = "O";

    let zelle = document.querySelector('.zelle[data-index="' + index + '"]');
    zelle.textContent = "O";

    checkGewinner();
    start = "X";
}