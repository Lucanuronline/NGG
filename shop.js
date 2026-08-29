const alleSkins = {
    snake_feuer: { titel: "Feuer-Schlange", spiel: "snake", preis: 30, kopfFarbe: "#ffb347", koerperFarbe: "#ff5c5c" },
    snake_pink: { titel: "Pink Neon", spiel: "snake", preis: 40, kopfFarbe: "#ff5cf1", koerperFarbe: "#c77dff" },

    breakout_gold: { titel: "Gold-Ball", spiel: "breakout", preis: 30, ballFarbe: "#ffe066", schlaegerFarbe: "#ffb347" },
    breakout_pink: { titel: "Pink Paddle", spiel: "breakout", preis: 40, ballFarbe: "#ff5cf1", schlaegerFarbe: "#c77dff" },

    flappy_rot: { titel: "Rotvogel", spiel: "flappy", preis: 30, roehreFarbe: "#ff5c5c" },
    flappy_gruen: { titel: "Giftgrün", spiel: "flappy", preis: 40, roehreFarbe: "#5ee6a4" },

    aim_gold: { titel: "Gold-Ziel", spiel: "aim", preis: 30, zielFarbe: "#ffe066" },
    aim_pink: { titel: "Pink Ziel", spiel: "aim", preis: 40, zielFarbe: "#ff5cf1" },

    ttt_gruen: { titel: "Grün-Set", spiel: "ttt", preis: 30, xFarbe: "#5ee6a4", oFarbe: "#ffe066" },
    ttt_pink: { titel: "Pink-Set", spiel: "ttt", preis: 40, xFarbe: "#ff5cf1", oFarbe: "#5ce1ff" },

    mines_rot: { titel: "Rot-Design", spiel: "mines", preis: 30, akzentFarbe: "#ff5c5c" },
    mines_gruen: { titel: "Grün-Design", spiel: "mines", preis: 40, akzentFarbe: "#5ee6a4" }
};

const alleSaisonSkins = {
    // Halloween (Ende Oktober)
    snake_halloween: {
        titel: "Kürbis-Schlange",
        spiel: "snake",
        preis: 35,
        kopfFarbe: "#ff8800",
        koerperFarbe: "#241c52",
        verfuegbarVon: "10-15",
        verfuegbarBis: "11-05"
    },
    aim_halloween: {
        titel: "Geister-Ziel",
        spiel: "aim",
        preis: 35,
        zielFarbe: "#c77dff",
        verfuegbarVon: "10-15",
        verfuegbarBis: "11-05"
    },
    breakout_halloween: {
        titel: "Kürbis-Block",
        spiel: "breakout",
        preis: 35,
        ballFarbe: "#ff8800",
        schlaegerFarbe: "#241c52",
        verfuegbarVon: "10-15",
        verfuegbarBis: "11-05"
    },

    // Weihnachten (Dezember)
    snake_weihnachten: {
        titel: "Festtags-Schlange",
        spiel: "snake",
        preis: 35,
        kopfFarbe: "#ff5c5c",
        koerperFarbe: "#5ee6a4",
        verfuegbarVon: "12-01",
        verfuegbarBis: "12-26"
    },
    aim_weihnachten: {
        titel: "Weihnachtskugel-Ziel",
        spiel: "aim",
        preis: 35,
        zielFarbe: "#5ee6a4",
        verfuegbarVon: "12-01",
        verfuegbarBis: "12-26"
    },
    breakout_weihnachten: {
        titel: "Festtags-Ball",
        spiel: "breakout",
        preis: 35,
        ballFarbe: "#ff5c5c",
        schlaegerFarbe: "#5ee6a4",
        verfuegbarVon: "12-01",
        verfuegbarBis: "12-26"
    },

    // Silvester/Neujahr
    snake_silvester: {
        titel: "Feuerwerk-Schlange",
        spiel: "snake",
        preis: 35,
        kopfFarbe: "#ffe066",
        koerperFarbe: "#ff5cf1",
        verfuegbarVon: "12-27",
        verfuegbarBis: "01-02"
    },
    aim_silvester: {
        titel: "Feuerwerk-Ziel",
        spiel: "aim",
        preis: 35,
        zielFarbe: "#ffe066",
        verfuegbarVon: "12-27",
        verfuegbarBis: "01-02"
    },
    breakout_silvester: {
        titel: "Feuerwerk-Ball",
        spiel: "breakout",
        preis: 35,
        ballFarbe: "#ffe066",
        schlaegerFarbe: "#ff5cf1",
        verfuegbarVon: "12-27",
        verfuegbarBis: "01-02"
    },

    // Valentinstag
    snake_valentin: {
        titel: "Herz-Schlange",
        spiel: "snake",
        preis: 30,
        kopfFarbe: "#ff5cf1",
        koerperFarbe: "#ff8fa3",
        verfuegbarVon: "02-10",
        verfuegbarBis: "02-16"
    },
    aim_valentin: {
        titel: "Liebespfeil-Ziel",
        spiel: "aim",
        preis: 30,
        zielFarbe: "#ff5cf1",
        verfuegbarVon: "02-10",
        verfuegbarBis: "02-16"
    },
    breakout_valentin: {
        titel: "Herz-Ball",
        spiel: "breakout",
        preis: 30,
        ballFarbe: "#ff5cf1",
        schlaegerFarbe: "#ff8fa3",
        verfuegbarVon: "02-10",
        verfuegbarBis: "02-16"
    },

    // Frühling/Ostern
    snake_ostern: {
        titel: "Frühlings-Schlange",
        spiel: "snake",
        preis: 30,
        kopfFarbe: "#ffe066",
        koerperFarbe: "#5ee6a4",
        verfuegbarVon: "03-25",
        verfuegbarBis: "04-15"
    },
    aim_ostern: {
        titel: "Osterei-Ziel",
        spiel: "aim",
        preis: 30,
        zielFarbe: "#ffe066",
        verfuegbarVon: "03-25",
        verfuegbarBis: "04-15"
    },
    breakout_ostern: {
        titel: "Osterei-Block",
        spiel: "breakout",
        preis: 30,
        ballFarbe: "#ffe066",
        schlaegerFarbe: "#5ee6a4",
        verfuegbarVon: "03-25",
        verfuegbarBis: "04-15"
    },

    // Sommer
    snake_sommer: {
        titel: "Sommer-Schlange",
        spiel: "snake",
        preis: 30,
        kopfFarbe: "#34d6ff",
        koerperFarbe: "#ffe066",
        verfuegbarVon: "06-21",
        verfuegbarBis: "07-15"
    },
    aim_sommer: {
        titel: "Sonnen-Ziel",
        spiel: "aim",
        preis: 30,
        zielFarbe: "#ffe066",
        verfuegbarVon: "06-21",
        verfuegbarBis: "07-15"
    },
    breakout_sommer: {
        titel: "Strand-Ball",
        spiel: "breakout",
        preis: 30,
        ballFarbe: "#34d6ff",
        schlaegerFarbe: "#ffe066",
        verfuegbarVon: "06-21",
        verfuegbarBis: "08-01"
    }
};



function ladeGekaufteSkins() {
    return JSON.parse(localStorage.getItem("neonarcade_skins") || "[]");
}

function ladeAktiverSkin(spiel) {
    return localStorage.getItem("aktiver_skin_" + spiel) || "standard";
}

function kaufeSkin(skinId, skinDaten) {
    let coins = ladeCoins();
    let gekauft = ladeGekaufteSkins();

    if (gekauft.includes(skinId)) return false;
    if (coins < skinDaten.preis) return false;

    coins -= skinDaten.preis;
    localStorage.setItem("neonarcade_coins", coins);

    gekauft.push(skinId);
    localStorage.setItem("neonarcade_skins", JSON.stringify(gekauft));

    return true;
}

function aktiviereSkin(skinId, skinDaten) {
    localStorage.setItem("aktiver_skin_" + skinDaten.spiel, skinId);
}

function heutigesDatumMMTT() {
    let heute = new Date();
    let monat = String(heute.getMonth() + 1).padStart(2, "0");
    let tag = String(heute.getDate()).padStart(2, "0");
    return monat + "-" + tag;
}

function istSaisonSkinAktiv(skin) {
    let heute = heutigesDatumMMTT();

    if (skin.verfuegbarVon <= skin.verfuegbarBis) {
        return heute >= skin.verfuegbarVon && heute <= skin.verfuegbarBis;
    } else {
        return heute >= skin.verfuegbarVon || heute <= skin.verfuegbarBis;
    }
}

function tageBisEnde(skin) {
    let heute = new Date();
    let jahr = heute.getFullYear();

    let [endMonat, endTag] = skin.verfuegbarBis.split("-").map(Number);
    let endDatum = new Date(jahr, endMonat - 1, endTag);

    if (endDatum < heute) {
        endDatum = new Date(jahr + 1, endMonat - 1, endTag);
    }

    let differenzMs = endDatum - heute;
    return Math.ceil(differenzMs / (1000 * 60 * 60 * 24));
}

function tageBisStart(skin) {
    let heute = new Date();
    let jahr = heute.getFullYear();

    let [startMonat, startTag] = skin.verfuegbarVon.split("-").map(Number);
    let startDatum = new Date(jahr, startMonat - 1, startTag);

    if (startDatum < heute) {
        startDatum = new Date(jahr + 1, startMonat - 1, startTag);
    }

    let differenzMs = startDatum - heute;
    return Math.ceil(differenzMs / (1000 * 60 * 60 * 24));
}

function istSaisonSkinBaldVerfuegbar(skin) {
    if (istSaisonSkinAktiv(skin)) return false;
    let tage = tageBisStart(skin);
    return tage > 0 && tage <= 30;
}

function findeSkinDaten(skinId) {
    return alleSkins[skinId] || alleSaisonSkins[skinId];
}