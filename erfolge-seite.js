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
