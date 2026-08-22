const alleErfolge = {
    ngg_schwer_5: { titel: "Blitzrater", beschreibung: "Zahl auf Schwer in unter 5 Versuchen erraten", coins: 20 },
    ngg_alle_schwierigkeiten: { titel: "Vielseitig", beschreibung: "Auf allen drei Schwierigkeiten mindestens einmal gewonnen", coins: 15 },

    react_unter_250: { titel: "Blitzreflexe", beschreibung: "Reaktionszeit unter 250ms", coins: 20 },
    react_5_versuche: { titel: "Warmgespielt", beschreibung: "5 Runden Reaction Game gespielt", coins: 10 },

    snake_score_20: { titel: "Schlangenprofi", beschreibung: "20 Punkte in Snake erreicht", coins: 15 },
    snake_score_50: { titel: "Riesenschlange", beschreibung: "50 Punkte in Snake erreicht", coins: 30 },

    aim_score_30: { titel: "Scharfschütze", beschreibung: "30 Treffer im Aim Trainer erzielt", coins: 15 },
    aim_score_50: { titel: "Adleraugen", beschreibung: "50 Treffer im Aim Trainer erzielt", coins: 30 },

    breakout_level_3: { titel: "Blockbrecher", beschreibung: "Level 3 in Breakout erreicht", coins: 20 },
    breakout_score_20: { titel: "Punktesammler", beschreibung: "20 Treffer in Breakout erzielt", coins: 15 },

    flappy_score_10: { titel: "Erfahrener Flieger", beschreibung: "10 Punkte in Flappy Neon erreicht", coins: 20 },
    flappy_score_25: { titel: "Neon-Ass", beschreibung: "25 Punkte in Flappy Neon erreicht", coins: 35 },

    ttt_sieg_ki: { titel: "KI-Bezwinger", beschreibung: "Einmal gegen die KI gewonnen", coins: 25 },
    ttt_5_spiele: { titel: "Vielspieler", beschreibung: "5 Runden Tic Tac Toe gespielt", coins: 10 },

    mines_leicht_gewonnen: { titel: "Minenräumer", beschreibung: "Minesweeper auf Leicht gewonnen", coins: 15 },
    mines_schwer_gewonnen: { titel: "Minenexperte", beschreibung: "Minesweeper auf Schwer gewonnen", coins: 35 }
};

function ladeFreigeschalteteErfolge() {
    return JSON.parse(localStorage.getItem("neonarcade_erfolge") || "[]");
}

function ladeCoins() {
    return Number(localStorage.getItem("neonarcade_coins")) || 0;
}

function schalteErfolgFrei(erfolgId) {
    let freigeschaltet = ladeFreigeschalteteErfolge();

    if (freigeschaltet.includes(erfolgId)) return;

    freigeschaltet.push(erfolgId);
    localStorage.setItem("neonarcade_erfolge", JSON.stringify(freigeschaltet));

    let coins = ladeCoins();
    coins += alleErfolge[erfolgId].coins;
    localStorage.setItem("neonarcade_coins", coins);

    zeigeErfolgBenachrichtigung(erfolgId);
}

function zeigeErfolgBenachrichtigung(erfolgId) {
    let erfolg = alleErfolge[erfolgId];

    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";
    benachrichtigung.innerHTML =
        "🏆 <strong>" + erfolg.titel + "</strong><br>" +
        erfolg.beschreibung + " (+" + erfolg.coins + " 🪙)";

    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() {
            benachrichtigung.remove();
        }, 500);
    }, 3000);
}