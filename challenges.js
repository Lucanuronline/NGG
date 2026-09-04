const alleChallenges = [
    { spiel: "snake", spielName: "Snake", zielwert: 10, text: "Erreiche 10 Punkte in Snake" },
    { spiel: "snake", spielName: "Snake", zielwert: 15, text: "Erreiche 15 Punkte in Snake" },
    { spiel: "snake", spielName: "Snake", zielwert: 25, text: "Erreiche 25 Punkte in Snake" },

    { spiel: "aim", spielName: "Aim Trainer", zielwert: 15, text: "Erziele 15 Treffer im Aim Trainer" },
    { spiel: "aim", spielName: "Aim Trainer", zielwert: 20, text: "Erziele 20 Treffer im Aim Trainer" },
    { spiel: "aim", spielName: "Aim Trainer", zielwert: 30, text: "Erziele 30 Treffer im Aim Trainer" },

    { spiel: "breakout", spielName: "Breakout", zielwert: 10, text: "Erziele 10 Treffer in Breakout" },
    { spiel: "breakout", spielName: "Breakout", zielwert: 15, text: "Erziele 15 Treffer in Breakout" },
    { spiel: "breakout", spielName: "Breakout", zielwert: 25, text: "Erziele 25 Treffer in Breakout" },

    { spiel: "flappy", spielName: "Flappy Neon", zielwert: 5, text: "Erreiche 5 Punkte in Flappy Neon" },
    { spiel: "flappy", spielName: "Flappy Neon", zielwert: 8, text: "Erreiche 8 Punkte in Flappy Neon" },
    { spiel: "flappy", spielName: "Flappy Neon", zielwert: 12, text: "Erreiche 12 Punkte in Flappy Neon" },

    { spiel: "react", spielName: "Reaction Game", zielwert: 400, text: "Reagiere unter 400ms im Reaction Game" },
    { spiel: "react", spielName: "Reaction Game", zielwert: 300, text: "Reagiere unter 300ms im Reaction Game" },
    { spiel: "react", spielName: "Reaction Game", zielwert: 220, text: "Reagiere unter 220ms im Reaction Game" },

    { spiel: "memory", spielName: "Memory", zielwert: 14, text: "Gewinne Memory in 14 Versuchen oder weniger" },

    { spiel: "simon", spielName: "Simon", zielwert: 6, text: "Erreiche Runde 6 in Simon" },
];

const alleWochenChallenges = [
    { spiel: "snake", spielName: "Snake", zielwert: 40, text: "Erreiche insgesamt 40 Punkte in Snake diese Woche" },
    { spiel: "aim", spielName: "Aim Trainer", zielwert: 80, text: "Erziele insgesamt 80 Treffer im Aim Trainer diese Woche" },
    { spiel: "breakout", spielName: "Breakout", zielwert: 50, text: "Erziele insgesamt 50 Treffer in Breakout diese Woche" },
    { spiel: "flappy", spielName: "Flappy Neon", zielwert: 30, text: "Erreiche insgesamt 30 Punkte in Flappy Neon diese Woche" },
    { spiel: "react", spielName: "Reaction Game", zielwert: 10, text: "Spiele diese Woche 10 Runden im Reaction Game" },
    { spiel: "memory", spielName: "Memory", zielwert: 3, text: "Gewinne diese Woche 3 Runden Memory" },
    { spiel: "simon", spielName: "Simon", zielwert: 5, text: "Spiele diese Woche 5 Runden in Simon" },
];


function heutigerSeed() {
    let heute = new Date();
    return heute.getFullYear() * 10000 + (heute.getMonth() + 1) * 100 + heute.getDate();
}

function heutigeChallenge() {
    let seed = heutigerSeed();
    let index = seed % alleChallenges.length;
    return alleChallenges[index];
}

function istChallengeHeuteAbgeschlossen() {
    let letzterAbschluss = Number(localStorage.getItem("challenge_abgeschlossen_tag"));
    return heutigerSeed() === letzterAbschluss;
}

function gestrigerSeed() {
    let gestern = new Date();
    gestern.setDate(gestern.getDate() - 1);
    return gestern.getFullYear() * 10000 + (gestern.getMonth() + 1) * 100 + gestern.getDate();
}

function aktualisiereStreak() {
    let heute = heutigerSeed();
    let letzterAbschlussTag = Number(localStorage.getItem("challenge_letzter_tag")) || 0;
    let streak = Number(localStorage.getItem("challenge_streak")) || 0;

    if (letzterAbschlussTag === gestrigerSeed()) {
        streak++;
    } else {
        streak = 1;
    }

    localStorage.setItem("challenge_streak", streak);
    localStorage.setItem("challenge_letzter_tag", heute);

    return streak;
}

function ermittleMultiplikator(streak) {
    if (streak >= 7) return 2;
    if (streak >= 3) return 1.5;
    return 1;
}

function checkChallenge(spiel, wert) {
    if (istChallengeHeuteAbgeschlossen()) return;
    let challenge = heutigeChallenge();
    if (challenge.spiel !== spiel) return;

    let erfuellt = false;
    if (spiel === "react" || spiel === "memory") {
        erfuellt = wert <= challenge.zielwert;
    } else {
        erfuellt = wert >= challenge.zielwert;
    }

    if (erfuellt) {
        localStorage.setItem("challenge_abgeschlossen_tag", heutigerSeed());

        let streak = aktualisiereStreak();
        let multiplikator = ermittleMultiplikator(streak);
        let bonusCoins = Math.round(25 * multiplikator);

        let coins = ladeCoins();
        coins += bonusCoins;
        localStorage.setItem("neonarcade_coins", coins);

        let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
        gesamtCoins += bonusCoins;
        localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

        zeigeErfolgBenachrichtigung_challenge(bonusCoins, streak, multiplikator);
    }
}

function zeigeErfolgBenachrichtigung_challenge(bonusCoins, streak, multiplikator) {
    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";

    let streakText = multiplikator > 1
        ? "🔥 " + streak + " Tage Streak (x" + multiplikator + ")<br>"
        : "";

    benachrichtigung.innerHTML =
        "🌟 <strong>Tages-Challenge geschafft!</strong><br>" +
        streakText +
        "+" + bonusCoins + " 🪙";

    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() { benachrichtigung.remove(); }, 500);
    }, 3000);
}


function heutigeWochenNummer() {
    let heute = new Date();
    let jahresBeginn = new Date(heute.getFullYear(), 0, 1);
    let tageSeitJahresbeginn = Math.floor((heute - jahresBeginn) / (1000 * 60 * 60 * 24));
    let woche = Math.ceil((tageSeitJahresbeginn + jahresBeginn.getDay() + 1) / 7);
    return heute.getFullYear() * 100 + woche;
}

function heutigeWochenChallenge() {
    let seed = heutigeWochenNummer();
    let index = seed % alleWochenChallenges.length;
    return alleWochenChallenges[index];
}

function istWochenChallengeAbgeschlossen() {
    let letzteAbgeschlosseneWoche = Number(localStorage.getItem("wochenchallenge_abgeschlossen_woche"));
    return heutigeWochenNummer() === letzteAbgeschlosseneWoche;
}

function wochenFortschritt(spiel) {
    let aktuelleWoche = heutigeWochenNummer();
    let gespeicherteWoche = Number(localStorage.getItem("wochenchallenge_woche"));
    let gespeichertesSpiel = localStorage.getItem("wochenchallenge_spiel");

    if (gespeicherteWoche !== aktuelleWoche || gespeichertesSpiel !== spiel) {
        localStorage.setItem("wochenchallenge_woche", aktuelleWoche);
        localStorage.setItem("wochenchallenge_spiel", spiel);
        localStorage.setItem("wochenchallenge_fortschritt", 0);
        return 0;
    }

    return Number(localStorage.getItem("wochenchallenge_fortschritt")) || 0;
}

function checkWochenChallenge(spiel, zuwachs) {
    if (istWochenChallengeAbgeschlossen()) return;

    let challenge = heutigeWochenChallenge();
    if (challenge.spiel !== spiel) return;

    let bisherigerFortschritt = wochenFortschritt(spiel);
    let neuerFortschritt = bisherigerFortschritt + zuwachs;

    localStorage.setItem("wochenchallenge_fortschritt", neuerFortschritt);

    if (neuerFortschritt >= challenge.zielwert) {
        localStorage.setItem("wochenchallenge_abgeschlossen_woche", heutigeWochenNummer());

        let coins = ladeCoins();
        coins += 75;
        localStorage.setItem("neonarcade_coins", coins);

        let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
        gesamtCoins += 75;
        localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

        zeigeWochenChallengeBenachrichtigung();
    }
}

function zeigeWochenChallengeBenachrichtigung() {
    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";
    benachrichtigung.innerHTML = "🏅 <strong>Wochen-Challenge geschafft!</strong><br>+75 🪙";
    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() { benachrichtigung.remove(); }, 500);
    }, 3500);
}