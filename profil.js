const alleRaenge = [
    { name: "Neuling", minCoins: 0 },
    { name: "Gelegenheitsspieler", minCoins: 100 },
    { name: "Arcade-Fan", minCoins: 250 },
    { name: "Bronze Arcade-Spieler", minCoins: 500 },
    { name: "Silber Arcade-Spieler", minCoins: 1000 },
    { name: "Gold Arcade-Spieler", minCoins: 2000 },
    { name: "Neon-Legende", minCoins: 4000 }
];

function ermittleRangMitFortschritt() {
    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    let aktuellerIndex = 0;

    for (let i = 0; i < alleRaenge.length; i++) {
        if (gesamtCoins >= alleRaenge[i].minCoins) {
            aktuellerIndex = i;
        }
    }

    return {
        aktuellerRang: alleRaenge[aktuellerIndex],
        naechsterRang: alleRaenge[aktuellerIndex + 1],
        gesamtCoins: gesamtCoins
    };
}

let rangDaten = ermittleRangMitFortschritt();
document.getElementById("rangTitel").innerHTML = "🎖️ " + rangDaten.aktuellerRang.name;

if (rangDaten.naechsterRang) {
    let spanne = rangDaten.naechsterRang.minCoins - rangDaten.aktuellerRang.minCoins;
    let fortschritt = rangDaten.gesamtCoins - rangDaten.aktuellerRang.minCoins;
    let prozent = Math.min(100, (fortschritt / spanne) * 100);

    document.getElementById("rangBalkenFill").style.width = prozent + "%";
    document.getElementById("rangInfo").innerHTML =
        rangDaten.gesamtCoins + " / " + rangDaten.naechsterRang.minCoins + " 🪙 bis " + rangDaten.naechsterRang.name;
} else {
    document.getElementById("rangBalkenFill").style.width = "100%";
    document.getElementById("rangInfo").innerHTML = "Höchster Rang erreicht! 🎉";
}

document.getElementById("statCoins").innerHTML = ladeCoins();
document.getElementById("statGesamtCoins").innerHTML = rangDaten.gesamtCoins;

let freigeschalteteErfolge = ladeFreigeschalteteErfolge();
let anzahlErfolgeGesamt = Object.keys(alleErfolge).filter(function(id) {
    return !alleErfolge[id].geheim || freigeschalteteErfolge.includes(id);
}).length;
document.getElementById("statErfolge").innerHTML = freigeschalteteErfolge.length + " / " + anzahlErfolgeGesamt;

document.getElementById("statSkins").innerHTML = ladeGekaufteSkins().length;

let challenge = heutigeChallenge();
let erledigt = istChallengeHeuteAbgeschlossen();
document.getElementById("challengeKarteProfil").innerHTML =
    "<h2 class='karten-titel'>🌟 Heutige Challenge</h2>" +
    "<p>" + challenge.text + "</p>" +
    (erledigt ? "<span class='challenge-status erledigt'>✅ Geschafft!</span>" : "<span class='challenge-status'>+25 🪙 bei Erfolg</span>");