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

function checkChallenge(spiel, wert) {
    if (istChallengeHeuteAbgeschlossen()) return;

    let challenge = heutigeChallenge();
    if (challenge.spiel !== spiel) return;

    localStorage.setItem("neonarcade_coins", coins);

let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
gesamtCoins += 25;
localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

    let erfuellt = false;
    if (spiel === "react") {
        erfuellt = wert <= challenge.zielwert;
    } else {
        erfuellt = wert >= challenge.zielwert;
    }

    if (erfuellt) {
        localStorage.setItem("challenge_abgeschlossen_tag", heutigerSeed());

        let coins = ladeCoins();
        coins += 25;
        localStorage.setItem("neonarcade_coins", coins);

        zeigeErfolgBenachrichtigung_challenge();
    }
}

function zeigeErfolgBenachrichtigung_challenge() {
    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";
    benachrichtigung.innerHTML = "🌟 <strong>Tages-Challenge geschafft!</strong><br>+25 🪙";
    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() { benachrichtigung.remove(); }, 500);
    }, 3000);
}