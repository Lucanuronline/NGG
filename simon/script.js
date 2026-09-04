const farben = ["gruen", "rot", "gelb", "blau"];
let sequenz = [];
let spielerSequenz = [];
let runde = 0;
let spielAktiv = false;
let hoechsteRunde = Number(localStorage.getItem("simon_highscore")) || 0;

const statusText = document.getElementById("statusText");
const rundeAnzeige = document.getElementById("runde");

document.getElementById("highscore").innerHTML = "Bestwert: " + (hoechsteRunde || "-");

function starteSpiel() {
    sequenz = [];
    runde = 0;
    spielAktiv = true;
    statusText.innerHTML = "";
    naechsteRunde();
}

function naechsteRunde() {
    spielerSequenz = [];
    runde++;
    rundeAnzeige.innerHTML = "Runde: " + runde;
    sequenz.push(farben[Math.floor(Math.random() * farben.length)]);

    checkChallenge("simon", runde);
    checkWochenChallenge("simon", 1);

    if (runde >= 10) schalteErfolgFrei("simon_runde_10");
    if (runde >= 20) schalteErfolgFrei("simon_runde_20");

    zeigeSequenz();
}

function zeigeSequenz() {
    let i = 0;
    let interval = setInterval(function() {
        leuchteFeld(sequenz[i]);
        i++;
        if (i >= sequenz.length) clearInterval(interval);
    }, 700);
}

function leuchteFeld(farbe) {
    let feld = document.querySelector(".simon-feld." + farbe);
    feld.classList.add("aktiv");
    setTimeout(function() {
        feld.classList.remove("aktiv");
    }, 400);
}

document.querySelectorAll(".simon-feld").forEach(function(feld) {
    feld.addEventListener("click", function() {
        if (!spielAktiv) return;

        let farbe = feld.dataset.farbe;
        leuchteFeld(farbe);
        spielerSequenz.push(farbe);

        let aktuellerIndex = spielerSequenz.length - 1;

        if (spielerSequenz[aktuellerIndex] !== sequenz[aktuellerIndex]) {
            beendeSpiel();
            return;
        }

        if (spielerSequenz.length === sequenz.length) {
            setTimeout(naechsteRunde, 900);
        }
    });
});

function beendeSpiel() {
    spielAktiv = false;
    statusText.innerHTML = "❌ Game Over! Runde " + runde + " erreicht.";

    if (runde - 1 > hoechsteRunde) {
        hoechsteRunde = runde - 1;
        localStorage.setItem("simon_highscore", hoechsteRunde);
        document.getElementById("highscore").innerHTML = "Bestwert: " + hoechsteRunde;
    }
}

document.getElementById("btnStart").addEventListener("click", starteSpiel);