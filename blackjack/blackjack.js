const werte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const farben = [
    { symbol: "♠", rot: false },
    { symbol: "♣", rot: false },
    { symbol: "♥", rot: true },
    { symbol: "♦", rot: true }
];

let coins = ladeCoins();
let aktuellerEinsatz = 0;
let spielerKarten = [];
let dealerKarten = [];
let dealerVerdeckt = true;
let spielAktiv = false;

const coinsAnzeige = document.getElementById("coinsAnzeige");
const einsatzInput = document.getElementById("einsatzInput");
const spielerKartenElement = document.getElementById("spielerKarten");
const dealerKartenElement = document.getElementById("dealerKarten");
const spielerSummeElement = document.getElementById("spielerSumme");
const dealerSummeElement = document.getElementById("dealerSumme");
const ergebnisText = document.getElementById("ergebnisText");
const einsatzBereich = document.getElementById("einsatzBereich");
const spielButtons = document.getElementById("spielButtons");

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 500);
});

function aktualisiereCoinsAnzeige() {
    coinsAnzeige.innerHTML = "🪙 " + coins + " Coins";
}

function setzeEinsatz(betrag) {
    einsatzInput.value = betrag;
}

function setzeEinsatzAlles() {
    einsatzInput.value = coins;
}

function ziehKarte() {
    let wertIndex = Math.floor(Math.random() * 13);
    let farbe = farben[Math.floor(Math.random() * farben.length)];
    return { wert: werte[wertIndex], farbe: farbe };
}

function kartenWert(karte) {
    if (karte.wert === "A") return 11;
    if (karte.wert === "J" || karte.wert === "Q" || karte.wert === "K") return 10;
    return Number(karte.wert);
}

function summeBerechnen(hand) {
    let summe = 0;
    let assAnzahl = 0;

    for (let i = 0; i < hand.length; i++) {
        summe += kartenWert(hand[i]);
        if (hand[i].wert === "A") assAnzahl++;
    }

    while (summe > 21 && assAnzahl > 0) {
        summe -= 10;
        assAnzahl--;
    }

    return summe;
}

function erstelleKartenElement(karte, verdeckt) {
    let element = document.createElement("div");
    element.className = "karte" + (karte.farbe.rot ? " rot" : "") + (verdeckt ? " verdeckt" : "");
    element.innerHTML = verdeckt ? "?" : karte.wert + "<br>" + karte.farbe.symbol;
    return element;
}

function zeichneHaende() {
    spielerKartenElement.innerHTML = "";
    for (let i = 0; i < spielerKarten.length; i++) {
        spielerKartenElement.appendChild(erstelleKartenElement(spielerKarten[i], false));
    }
    spielerSummeElement.innerHTML = "(" + summeBerechnen(spielerKarten) + ")";

    dealerKartenElement.innerHTML = "";
    for (let i = 0; i < dealerKarten.length; i++) {
        let verdeckt = dealerVerdeckt && i === 1;
        dealerKartenElement.appendChild(erstelleKartenElement(dealerKarten[i], verdeckt));
    }
    dealerSummeElement.innerHTML = dealerVerdeckt ? "" : "(" + summeBerechnen(dealerKarten) + ")";
}

function starteRunde() {
    let einsatz = Number(einsatzInput.value);

    if (isNaN(einsatz) || einsatz <= 0) {
        ergebnisText.innerHTML = "⚠️ Ungültiger Einsatz!";
        return;
    }

    if (einsatz > coins) {
        ergebnisText.innerHTML = "⚠️ Nicht genug Coins!";
        return;
    }

    aktuellerEinsatz = einsatz;
    spielerKarten = [ziehKarte(), ziehKarte()];
    dealerKarten = [ziehKarte(), ziehKarte()];
    dealerVerdeckt = true;
    spielAktiv = true;
    ergebnisText.innerHTML = "";

    einsatzBereich.style.display = "none";
    spielButtons.style.display = "block";

    zeichneHaende();

    if (summeBerechnen(spielerKarten) === 21) {
        beendeRunde();
    }
}

function hit() {
    if (!spielAktiv) return;

    spielerKarten.push(ziehKarte());
    zeichneHaende();

    if (summeBerechnen(spielerKarten) > 21) {
        beendeRunde();
    }
}

function stand() {
    if (!spielAktiv) return;
    beendeRunde();
}

function beendeRunde() {
    spielAktiv = false;
    dealerVerdeckt = false;

    let spielerSumme = summeBerechnen(spielerKarten);

    if (spielerSumme <= 21) {
        while (summeBerechnen(dealerKarten) < 17) {
            dealerKarten.push(ziehKarte());
        }
    }

    zeichneHaende();

    let dealerSumme = summeBerechnen(dealerKarten);
    let ergebnis = "";
    let gewinn = 0;

    if (spielerSumme > 21) {
        ergebnis = "❌ Überkauft! -" + aktuellerEinsatz + " 🪙";
        gewinn = -aktuellerEinsatz;
    } else if (dealerSumme > 21) {
        ergebnis = "✅ Dealer überkauft! +" + aktuellerEinsatz + " 🪙";
        gewinn = aktuellerEinsatz;
    } else if (spielerSumme > dealerSumme) {
        ergebnis = "✅ Gewonnen! +" + aktuellerEinsatz + " 🪙";
        gewinn = aktuellerEinsatz;
    } else if (spielerSumme < dealerSumme) {
        ergebnis = "❌ Verloren! -" + aktuellerEinsatz + " 🪙";
        gewinn = -aktuellerEinsatz;
    } else {
        ergebnis = "🤝 Unentschieden! Einsatz zurück.";
        gewinn = 0;
    }

    coins += gewinn;
    localStorage.setItem("neonarcade_coins", coins);
    aktualisiereCoinsAnzeige();
    ergebnisText.innerHTML = ergebnis;

    if (gewinn > 0) {
        let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
        gesamtCoins += gewinn;
        localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

        let siegeGesamt = Number(localStorage.getItem("blackjack_siege")) || 0;
        siegeGesamt++;
        localStorage.setItem("blackjack_siege", siegeGesamt);

        if (siegeGesamt >= 5) {
            schalteErfolgFrei("blackjack_5_siege");
        }

        if (spielerSumme === 21 && spielerKarten.length === 2) {
            schalteErfolgFrei("blackjack_natuerlich");
        }
    }

    setTimeout(function() {
        einsatzBereich.style.display = "block";
        spielButtons.style.display = "none";
    }, 1500);
}

document.getElementById("btnStart").addEventListener("click", starteRunde);
document.getElementById("btnHit").addEventListener("click", hit);
document.getElementById("btnStand").addEventListener("click", stand);
document.getElementById("btnRefresh").addEventListener("click", function() {
    window.location.reload();
});

aktualisiereCoinsAnzeige();