const werte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const farben = ["♠", "♥", "♦", "♣"];

let aktuellerWert = 0;
let siegeInFolge = 0;
let coins = ladeCoins();

const kartenElement = document.getElementById("aktuelleKarte");
const coinsAnzeige = document.getElementById("coinsAnzeige");
const ergebnisText = document.getElementById("ergebnisText");
const siegeAnzeige = document.getElementById("siegeAnzeige");
const einsatzInput = document.getElementById("einsatzInput");

function zeigeKarte(wertIndex) {
    let farbe = farben[Math.floor(Math.random() * farben.length)];
    kartenElement.innerHTML = werte[wertIndex] + "<br>" + farbe;
}

function neueKarte() {
    aktuellerWert = Math.floor(Math.random() * 13);
    zeigeKarte(aktuellerWert);
}

function aktualisiereCoinsAnzeige() {
    coinsAnzeige.innerHTML = "🪙 " + coins + " Coins";
}

function setzeEinsatz(betrag) {
    einsatzInput.value = betrag;
}

function setzeEinsatzAlles() {
    einsatzInput.value = coins;
}

function holeEinsatz() {
    let einsatz = Number(einsatzInput.value);

    if (isNaN(einsatz) || einsatz <= 0) {
        ergebnisText.innerHTML = "⚠️ Ungültiger Einsatz!";
        return null;
    }

    if (einsatz > coins) {
        ergebnisText.innerHTML = "⚠️ Nicht genug Coins!";
        return null;
    }

    return einsatz;
}

function raten(richtung) {
    let einsatz = holeEinsatz();
    if (einsatz === null) return;

    let alterWert = aktuellerWert;
    let neuerWert = Math.floor(Math.random() * 13);

    zeigeKarte(neuerWert);

    if (neuerWert === alterWert) {
        ergebnisText.innerHTML = "🤝 Unentschieden! Einsatz zurück.";
        aktuellerWert = neuerWert;
        return;
    }

    let tatsaechlichHoeher = neuerWert > alterWert;
    let richtigGeraten = (richtung === "hoeher" && tatsaechlichHoeher) ||
                          (richtung === "tiefer" && !tatsaechlichHoeher);

    if (richtigGeraten) {
        coins += einsatz;
        siegeInFolge++;

        let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
        gesamtCoins += einsatz;
        localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

        let siegeGesamt = Number(localStorage.getItem("hoeher_tiefer_siege")) || 0;
        siegeGesamt++;
        localStorage.setItem("hoeher_tiefer_siege", siegeGesamt);

        ergebnisText.innerHTML = "✅ Richtig! +" + einsatz + " 🪙";

        if (siegeGesamt >= 5) {
            schalteErfolgFrei("hoeher_tiefer_5_siege");
        }

        if (einsatz >= 100) {
            schalteErfolgFrei("hoeher_tiefer_grosser_gewinn");
        }
    } else {
        coins -= einsatz;
        siegeInFolge = 0;
        ergebnisText.innerHTML = "❌ Falsch! -" + einsatz + " 🪙";
    }

    localStorage.setItem("neonarcade_coins", coins);
    aktualisiereCoinsAnzeige();
    siegeAnzeige.innerHTML = "Siege in Folge: " + siegeInFolge;

    aktuellerWert = neuerWert;
}

document.getElementById("btnHoeher").addEventListener("click", function() {
    raten("hoeher");
});

document.getElementById("btnTiefer").addEventListener("click", function() {
    raten("tiefer");
});

document.getElementById("btnRefresh").addEventListener("click", function() {
    window.location.reload();
});

aktualisiereCoinsAnzeige();
neueKarte();