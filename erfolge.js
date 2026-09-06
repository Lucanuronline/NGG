const alleErfolge = {
    ngg_leicht_1: { titel: "Glückspilz", beschreibung: "In NGG die Zahl auf Leicht im ersten Versuchen erraten", coins: 10, kategorie: "ngg", seltenheit: "bronze" },
    ngg_schwer_5: { titel: "Blitzrater", beschreibung: "In NGG die Zahl auf Schwer in unter 5 Versuchen erraten", coins: 20, kategorie: "ngg", seltenheit: "silber" },
    ngg_alle_schwierigkeiten: { titel: "Vielseitig", beschreibung: "NGG Auf allen drei Schwierigkeiten mindestens einmal gewinnen", coins: 15, kategorie: "ngg", seltenheit: "silber" },

    react_unter_250: { titel: "Blitzreflexe", beschreibung: "IM Reacton Game eine Reaktionszeit unter 250ms haben", coins: 20, kategorie: "react", seltenheit: "silber" },
    react_5_versuche: { titel: "Warmgespielt", beschreibung: "5 Runden Reaction Game gespielt", coins: 10, kategorie: "react", seltenheit: "bronze" },

    snake_score_20: { titel: "Schlangenprofi", beschreibung: "20 Punkte in Snake erreicht", coins: 10, kategorie: "snake", seltenheit: "bronze" },
    snake_score_50: { titel: "Riesenschlange", beschreibung: "50 Punkte in Snake erreicht", coins: 30, kategorie: "snake", seltenheit: "gold" },
    snake_score_70: { titel: "Schlangenexperte", beschreibung: "70 Punkte in Snake erreicht", coins: 40, kategorie: "snake", seltenheit: "platin" },

    aim_score_30: { titel: "Scharfschütze", beschreibung: "30 Treffer im Aim Trainer erzielt", coins: 15, kategorie: "aim", seltenheit: "silber" },
    aim_score_50: { titel: "Adleraugen", beschreibung: "50 Treffer im Aim Trainer erzielt", coins: 30, kategorie: "aim", seltenheit: "gold" },

    breakout_level_3: { titel: "Blockbrecher", beschreibung: "Level 3 in Breakout erreicht", coins: 20, kategorie: "breakout", seltenheit: "silber" },
    breakout_level_10: { titel: "Blockzerstörer", beschreibung: "Level 10 in Breakout erreicht", coins: 35, kategorie: "breakout", seltenheit: "gold" },
    breakout_score_20: { titel: "Punktesammler", beschreibung: "20 Treffer in Breakout erzielt", coins: 10, kategorie: "breakout", seltenheit: "bronze" },

    flappy_score_10: { titel: "Erfahrener Flieger", beschreibung: "10 Punkte in Flappy Neon erreicht", coins: 20, kategorie: "flappy", seltenheit: "silber" },
    flappy_score_25: { titel: "Neon-Ass", beschreibung: "25 Punkte in Flappy Neon erreicht", coins: 35, kategorie: "flappy", seltenheit: "gold" },

    ttt_sieg_ki: { titel: "KI-Bezwinger", beschreibung: "In Tic Tac Toe Einmal gegen die KI gewonnen", coins: 20, kategorie: "ttt", seltenheit: "silber" },
    ttt_5_spiele: { titel: "Vielspieler", beschreibung: "5 Runden Tic Tac Toe gespielt", coins: 10, kategorie: "ttt", seltenheit: "bronze" },

    mines_leicht_gewonnen: { titel: "Minenräumer", beschreibung: "Minesweeper auf Leicht gewonnen", coins: 10, kategorie: "mines", seltenheit: "bronze" },
    mines_schwer_gewonnen: { titel: "Minenexperte", beschreibung: "Minesweeper auf Schwer gewonnen", coins: 30, kategorie: "mines", seltenheit: "gold" },

    hoeher_tiefer_5_siege: { titel: "Kartenglück", beschreibung: "5 Runden Höher/Tiefer gewonnen", coins: 15, kategorie: "hoehertiefer", seltenheit: "silber" },
    hoeher_tiefer_grosser_gewinn: { titel: "Großer Wurf", beschreibung: "Eine Runde Höher/Tiefer mit Einsatz 100+ gewonnen", coins: 30, kategorie: "hoehertiefer", seltenheit: "gold" },

    blackjack_5_siege: { titel: "Kartenprofi", beschreibung: "5 Runden Blackjack gewonnen", coins: 20, kategorie: "blackjack", seltenheit: "silber" },
    blackjack_natuerlich: { titel: "Blackjack!", beschreibung: "Mit den ersten zwei Karten direkt 21 erreicht", coins: 30, kategorie: "blackjack", seltenheit: "gold" },

    memory_gewonnen: { titel: "Gedächtniskünstler", beschreibung: "Eine Runde Memory gewonnen", coins: 15, kategorie: "memory", seltenheit: "silber" },
    memory_wenig_versuche: { titel: "Fotografisches Gedächtnis", beschreibung: "Memory in 12 Versuchen oder weniger gewonnen", coins: 30, kategorie: "memory", seltenheit: "gold" },

    simon_runde_10: { titel: "Mustermeister", beschreibung: "Runde 10 in Simon erreicht", coins: 20, kategorie: "simon", seltenheit: "silber" },
    simon_runde_20: { titel: "Gedächtnisgenie", beschreibung: "Runde 20 in Simon erreicht", coins: 40, kategorie: "simon", seltenheit: "platin" },

    kristall_100_klicks: { titel: "Kristallschürfer", beschreibung: "Den Neon-Kristall 100-mal angeklickt", coins: 25, kategorie: "kristall", seltenheit: "gold" },


        geheim_nacht_eule: {
        titel: "Nachteule",
        beschreibung: "Ein Spiel zwischen 0 und 4 Uhr morgens gespielt",
        coins: 45,
        geheim: true,
        kategorie: "geheim",
        seltenheit: "platin"
    },

        geheim_early_bird: {
        titel: "Frühaufsteher",
        beschreibung: "Ein Spiel zwischen 6 und 9 Uhr morgens gespielt",
        coins: 45,
        geheim: true,
        kategorie: "geheim",
        seltenheit: "platin"
    }
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

    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    gesamtCoins += alleErfolge[erfolgId].coins;
    localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

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

function checkNachtEule() {
    let stunde = new Date().getHours();

    if (stunde >= 0 && stunde < 4) {
        schalteErfolgFrei("geheim_nacht_eule");
    }
}

function checkEarlyBird() {
    let stunde = new Date().getHours();

    if (stunde >= 6 && stunde < 9) {
        schalteErfolgFrei("geheim_early_bird");
    }
}

checkNachtEule();
checkEarlyBird();