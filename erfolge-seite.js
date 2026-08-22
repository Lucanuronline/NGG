const liste = document.getElementById("erfolgeListe");
const freigeschaltet = ladeFreigeschalteteErfolge();

document.getElementById("coinsAnzeige").innerHTML = "🪙 " + ladeCoins() + " Coins";

for (let id in alleErfolge) {
    let erfolg = alleErfolge[id];
    let istFreigeschaltet = freigeschaltet.includes(id);

    let karte = document.createElement("div");
    karte.className = "erfolg-karte" + (istFreigeschaltet ? " freigeschaltet" : "");

    karte.innerHTML =
        "<div class='erfolg-icon'>" + (istFreigeschaltet ? "🏆" : "🔒") + "</div>" +
        "<div class='erfolg-info'>" +
            "<h3>" + erfolg.titel + "</h3>" +
            "<p>" + erfolg.beschreibung + "</p>" +
        "</div>" +
        "<div class='erfolg-coins'>+" + erfolg.coins + " 🪙</div>";

    liste.appendChild(karte);
}