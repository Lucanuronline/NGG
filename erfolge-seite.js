const liste = document.getElementById("erfolgeListe");
const freigeschaltet = ladeFreigeschalteteErfolge();

document.getElementById("coinsAnzeige").innerHTML = "🪙 " + ladeCoins() + " Coins";

for (let id in alleErfolge) {
    let erfolg = alleErfolge[id];
    let istFreigeschaltet = freigeschaltet.includes(id);
    let istVersteckt = erfolg.geheim && !istFreigeschaltet;

    let karte = document.createElement("div");
    karte.className = "erfolg-karte" + (istFreigeschaltet ? " freigeschaltet" : "");

    let titel = istVersteckt ? "Geheimer Erfolg" : erfolg.titel;
    let beschreibung = istVersteckt ? "Noch nicht entdeckt" : erfolg.beschreibung;
    let coinsText = istVersteckt ? "? 🪙" : "+" + erfolg.coins + " 🪙";
    let icon = istFreigeschaltet ? "🏆" : (istVersteckt ? "❓" : "🔒");

    karte.innerHTML =
        "<div class='erfolg-icon'>" + icon + "</div>" +
        "<div class='erfolg-info'>" +
            "<h3>" + titel + "</h3>" +
            "<p>" + beschreibung + "</p>" +
        "</div>" +
        "<div class='erfolg-coins'>" + coinsText + "</div>";

    liste.appendChild(karte);
}

const kategorieNamen = {
    alle: "Alle",
    ngg: "NGG",
    react: "Reaction",
    snake: "Snake",
    aim: "Aim Trainer",
    breakout: "Breakout",
    flappy: "Flappy Neon",
    ttt: "Tic Tac Toe",
    mines: "Minesweeper",
    hoehertiefer: "Höher Tiefer",
    blackjack: "Blackjack",
    geheim: "Geheim"
};

let aktuelleKategorie = "alle";

function erzeugeTabs() {
    let tabsContainer = document.getElementById("kategorieTabs");
    tabsContainer.innerHTML = "";

    for (let key in kategorieNamen) {
        let tab = document.createElement("button");
        tab.className = "kategorie-tab" + (key === aktuelleKategorie ? " aktiv" : "");
        tab.innerHTML = kategorieNamen[key];
        tab.addEventListener("click", function() {
            aktuelleKategorie = key;
            erzeugeTabs();
            renderErfolge();
        });
        tabsContainer.appendChild(tab);
    }
}

function renderErfolge() {
    liste.innerHTML = "";
    let freigeschaltet = ladeFreigeschalteteErfolge();

    for (let id in alleErfolge) {
        let erfolg = alleErfolge[id];

        if (aktuelleKategorie !== "alle" && erfolg.kategorie !== aktuelleKategorie) {
            continue;
        }

        let istFreigeschaltet = freigeschaltet.includes(id);
        let istVersteckt = erfolg.geheim && !istFreigeschaltet;

        let karte = document.createElement("div");
        karte.className = "erfolg-karte" + (istFreigeschaltet ? " freigeschaltet" : "");

        let titel = istVersteckt ? "Geheimer Erfolg" : erfolg.titel;
        let beschreibung = istVersteckt ? "??? Noch nicht entdeckt" : erfolg.beschreibung;
        let coinsText = istVersteckt ? "? 🪙" : "+" + erfolg.coins + " 🪙";
        let icon = istFreigeschaltet ? "🏆" : (istVersteckt ? "❓" : "🔒");

        karte.innerHTML =
            "<div class='erfolg-icon'>" + icon + "</div>" +
            "<div class='erfolg-info'>" +
                "<h3>" + titel + "</h3>" +
                "<p>" + beschreibung + "</p>" +
            "</div>" +
            "<div class='erfolg-coins'>" + coinsText + "</div>";

        liste.appendChild(karte);
    }
}

erzeugeTabs();
renderErfolge();
