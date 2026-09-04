const symbole = ["🎮", "🚀", "⭐", "🍎", "🐍", "🎯", "🃏", "💎"];
let kartenListe = [];
let ersteKarte = null;
let zweiteKarte = null;
let versuche = 0;
let gesperrt = false;
let gefundenAnzahl = 0;
let highscore = Number(localStorage.getItem("memory_highscore")) || null;

const grid = document.getElementById("grid");
const versucheAnzeige = document.getElementById("versuche");
const gewinnText = document.getElementById("gewinnText");

document.getElementById("highscore").innerHTML = "Bestwert: " + (highscore || "-");

function mische(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function starteSpiel() {
    grid.innerHTML = "";
    versuche = 0;
    gefundenAnzahl = 0;
    ersteKarte = null;
    zweiteKarte = null;
    gesperrt = false;
    gewinnText.innerHTML = "";
    versucheAnzeige.innerHTML = "Versuche: 0";

    kartenListe = mische(symbole.concat(symbole));

    kartenListe.forEach(function(symbol, index) {
        let karte = document.createElement("div");
        karte.className = "karte";
        karte.dataset.symbol = symbol;
        karte.dataset.index = index;
        karte.addEventListener("click", function() {
            klickKarte(karte);
        });
        grid.appendChild(karte);
    });
}

function klickKarte(karte) {
    if (gesperrt) return;
    if (karte.classList.contains("aufgedeckt") || karte.classList.contains("gefunden")) return;

    karte.classList.add("aufgedeckt");
    karte.innerHTML = karte.dataset.symbol;

    if (!ersteKarte) {
        ersteKarte = karte;
        return;
    }

    zweiteKarte = karte;
    versuche++;
    versucheAnzeige.innerHTML = "Versuche: " + versuche;
    gesperrt = true;

    if (ersteKarte.dataset.symbol === zweiteKarte.dataset.symbol) {
        ersteKarte.classList.add("gefunden");
        zweiteKarte.classList.add("gefunden");
        gefundenAnzahl++;
        ersteKarte = null;
        zweiteKarte = null;
        gesperrt = false;

        checkChallenge("memory", versuche);
        checkWochenChallenge("memory", 1);

        if (gefundenAnzahl === symbole.length) {
            beendeSpiel();
        }
    } else {
        setTimeout(function() {
            ersteKarte.classList.remove("aufgedeckt");
            zweiteKarte.classList.remove("aufgedeckt");
            ersteKarte.innerHTML = "";
            zweiteKarte.innerHTML = "";
            ersteKarte = null;
            zweiteKarte = null;
            gesperrt = false;
        }, 800);
    }
}

function beendeSpiel() {
    gewinnText.innerHTML = "🎉 Geschafft in " + versuche + " Versuchen!";

    if (!highscore || versuche < highscore) {
        highscore = versuche;
        localStorage.setItem("memory_highscore", highscore);
        document.getElementById("highscore").innerHTML = "Bestwert: " + highscore;
    }

    if (versuche <= 12) {
        schalteErfolgFrei("memory_wenig_versuche");
    }

    schalteErfolgFrei("memory_gewonnen");
}

document.getElementById("btnRefresh").addEventListener("click", starteSpiel);

starteSpiel();