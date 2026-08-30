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
    { spiel: "react", spielName: "Reaction Game", zielwert: 220, text: "Reagiere unter 220ms im Reaction Game" }
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
    if (spiel === "react") {
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


