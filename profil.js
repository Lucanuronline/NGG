const alleRaenge = [
    { name: "Neuling", minCoins: 0 },
    { name: "Gelegenheitsspieler", minCoins: 100 },
    { name: "Arcade-Fan", minCoins: 500 },
    { name: "Bronze Arcade-Spieler", minCoins: 1000 },
    { name: "Silber Arcade-Spieler", minCoins: 2000 },
    { name: "Gold Arcade-Spieler", minCoins: 4000 },
    { name: "Neon-Legende", minCoins: 10000 }
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

let letzterGesehenerRang = localStorage.getItem("letzter_gesehener_rang");

if (letzterGesehenerRang !== null && letzterGesehenerRang !== rangDaten.aktuellerRang.name) {
    zeigeRangAufstieg(rangDaten.aktuellerRang.name);
}

localStorage.setItem("letzter_gesehener_rang", rangDaten.aktuellerRang.name);

function zeigeRangAufstieg(neuerRang) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();

    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";
    benachrichtigung.innerHTML =
        "🎉 <strong>Neuer Rang!</strong><br>Du bist jetzt: " + neuerRang;
    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() { benachrichtigung.remove(); }, 500);
    }, 4000);
}


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

let wochenChallenge = heutigeWochenChallenge();
let wochenErledigt = istWochenChallengeAbgeschlossen();
let wochenFortschrittAktuell = wochenFortschritt(wochenChallenge.spiel);

let wochenKarte = document.createElement("div");
wochenKarte.className = "profil-karte";
wochenKarte.innerHTML =
    "<h2 class='karten-titel'>🏅 Wochen-Challenge</h2>" +
    "<p>" + wochenChallenge.text + "</p>" +
    (wochenErledigt
        ? "<span class='challenge-status erledigt'>✅ Geschafft!</span>"
        : "<span class='challenge-status'>" + wochenFortschrittAktuell + " / " + wochenChallenge.zielwert + " · +75 🪙 bei Erfolg</span>");

document.getElementById("challengeKarteProfil").insertAdjacentElement("afterend", wochenKarte);

    
    const alleHighscores = [
    { spiel: "Number Guessing Game (Leicht)", schluessel: "highscoreEasy", einheit: " Versuche" },
    { spiel: "Number Guessing Game (Mittel)", schluessel: "highscoreMedium", einheit: " Versuche" },
    { spiel: "Number Guessing Game (Schwer)", schluessel: "highscoreHard", einheit: " Versuche" },
    { spiel: "Reaction Game", schluessel: "highscore", einheit: " ms" },
    { spiel: "Snake", schluessel: "highscore", einheit: " Punkte" },
    { spiel: "Aim Trainer", schluessel: "highscore", einheit: " Treffer" },
    { spiel: "Breakout", schluessel: "highscore", einheit: " Treffer" },
    { spiel: "Flappy Neon", schluessel: "highscore", einheit: " Punkte" },
    { spiel: "Minesweeper (Leicht)", schluessel: "highscore_leicht", einheit: "s" },
    { spiel: "Minesweeper (Mittel)", schluessel: "highscore_mittel", einheit: "s" },
    { spiel: "Minesweeper (Schwer)", schluessel: "highscore_schwer", einheit: "s" }
];

let highscoreListe = document.getElementById("highscoreListe");

for (let i = 0; i < alleHighscores.length; i++) {
    let eintrag = alleHighscores[i];
    let wert = localStorage.getItem(eintrag.schluessel);

    let zeile = document.createElement("div");
    zeile.className = "highscore-zeile";
    zeile.innerHTML =
        "<span class='highscore-spiel'>" + eintrag.spiel + "</span>" +
        "<span class='highscore-wert'>" + (wert ? wert + eintrag.einheit : "–") + "</span>";

    highscoreListe.appendChild(zeile);
}

let streak = Number(localStorage.getItem("challenge_streak")) || 0;
let heute = heutigerSeed();
let letzterTag = Number(localStorage.getItem("challenge_letzter_tag")) || 0;
let streakAktiv = (letzterTag === heute) || (letzterTag === gestrigerSeed());

document.getElementById("challengeKarteProfil").innerHTML += streakAktiv && streak > 0
    ? "<p class='streak-info'>🔥 " + streak + " Tage Streak</p>"
    : "";

