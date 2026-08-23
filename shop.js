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



function ladeGekaufteSkins() {
    return JSON.parse(localStorage.getItem("neonarcade_skins") || "[]");
}

function ladeAktiverSkin(spiel) {
    return localStorage.getItem("aktiver_skin_" + spiel) || "standard";
}

function kaufeSkin(skinId) {
    let skin = alleSkins[skinId];
    let coins = ladeCoins();
    let gekauft = ladeGekaufteSkins();

    if (gekauft.includes(skinId)) return false;
    if (coins < skin.preis) return false;

    coins -= skin.preis;
    localStorage.setItem("neonarcade_coins", coins);

    gekauft.push(skinId);
    localStorage.setItem("neonarcade_skins", JSON.stringify(gekauft));

    return true;
}

function aktiviereSkin(skinId) {
    let skin = alleSkins[skinId];
    localStorage.setItem("aktiver_skin_" + skin.spiel, skinId);
}