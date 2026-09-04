const liste = document.getElementById("skinListe");

const kategorieNamen = {
    alle: "Alle",
    snake: "Snake",
    breakout: "Breakout",
    flappy: "Flappy Neon",
    aim: "Aim Trainer",
    ttt: "Tic Tac Toe",
    mines: "Minesweeper",
    saisonal: "Saisonal"
};

let aktuelleKategorie = "alle";

function erzeugeTabs() {
    let tabsContainer = document.getElementById("kategorieTabs");
    tabsContainer.innerHTML = "";

    for (let key in kategorieNamen) {
        let tab = document.createElement("button");
        tab.className = "kategorie-tab" + (key === aktuelleKategorie ? " aktiv" : "");
        tab.innerHTML = kategorieNamen[key];
        tab.addEventListener("click", function() {
            aktuelleKategorie = key;
            erzeugeTabs();
            renderShop();
        });
        tabsContainer.appendChild(tab);
    }
}

function renderShop() {
    liste.innerHTML = "";
    let coins = ladeCoins();
    let gekauft = ladeGekaufteSkins();

    document.getElementById("coinsAnzeige").innerHTML = "🪙 " + coins + " Coins";

    let alleAnzeigbarenSkins = Object.assign({}, alleSkins);

    for (let id in alleSaisonSkins) {
        let skin = alleSaisonSkins[id];
        let bereitsGekauft = gekauft.includes(id);
        if (istSaisonSkinAktiv(skin) || istSaisonSkinBaldVerfuegbar(skin) || bereitsGekauft) {
            alleAnzeigbarenSkins[id] = skin;
        }
    }

    let angezeigteAnzahl = 0;

    for (let id in alleAnzeigbarenSkins) {
        let skin = alleAnzeigbarenSkins[id];
        let istSaisonal = alleSaisonSkins[id] !== undefined;

        if (aktuelleKategorie === "saisonal" && !istSaisonal) continue;
        if (aktuelleKategorie !== "alle" && aktuelleKategorie !== "saisonal" && skin.spiel !== aktuelleKategorie) continue;

        angezeigteAnzahl++;

        let istGekauft = gekauft.includes(id);
        let istAktiv = ladeAktiverSkin(skin.spiel) === id;
        let baldVerfuegbar = istSaisonal && istSaisonSkinBaldVerfuegbar(skin);

        let karte = document.createElement("div");
        karte.className = "skin-karte" + (istSaisonal ? " saison-skin" : "") + (baldVerfuegbar ? " bald-verfuegbar" : "");




        let buttonHtml = "";
        if (baldVerfuegbar) {
            buttonHtml = "<button class='skin-btn' disabled>Noch nicht verfügbar</button>";
        } else if (istAktiv) {
            buttonHtml = "<button class='skin-btn aktiv-btn' disabled>Aktiv</button>";
        } else if (istGekauft) {
            buttonHtml = "<button class='skin-btn' data-aktion='aktivieren' data-id='" + id + "'>Aktivieren</button>";
        } else {
            buttonHtml = "<button class='skin-btn' data-aktion='kaufen' data-id='" + id + "'" +
                (coins < skin.preis ? " disabled" : "") + ">Kaufen (" + skin.preis + " 🪙)</button>";
        }

        let saisonBadge = "";
        if (baldVerfuegbar) {
            let tage = tageBisStart(skin);
            saisonBadge = "<div class='saison-badge bald'>⏳ Verfügbar in " + tage + " Tag" + (tage === 1 ? "" : "en") + "</div>";
        } else if (istSaisonal && istSaisonSkinAktiv(skin)) {
            let tage = tageBisEnde(skin);
            saisonBadge = "<div class='saison-badge'>🎃 Nur noch " + tage + " Tag" + (tage === 1 ? "" : "e") + " im Shop!</div>";
        } else if (istSaisonal && istGekauft) {
            saisonBadge = "<div class='saison-badge besessen'>✅ Saisonaler Skin</div>";
        }

karte.innerHTML =
    saisonBadge +
    "<div class='skin-vorschau' style='background: linear-gradient(45deg, " + (skin.kopfFarbe || skin.ballFarbe || skin.zielFarbe) + ", " + (skin.koerperFarbe || skin.schlaegerFarbe || skin.kopfFarbe || skin.ballFarbe || skin.zielFarbe) + ")'></div>" +
    "<h3>" + skin.titel + "</h3>" +
    "<p>Für: " + skin.spiel + "</p>" +
    "<button class='vorschau-btn' data-vorschau-id='" + id + "'>👁️ Live-Vorschau</button>" +
    buttonHtml;

        liste.appendChild(karte);
    }

                if (angezeigteAnzahl === 0) {
        liste.innerHTML = "<p class='leer-hinweis'>🕐 Aktuell keine saisonalen Skins verfügbar. Schau später wieder vorbei!</p>";
    }


    liste.querySelectorAll("[data-aktion]").forEach(function(btn) {
        btn.addEventListener("click", function() {
            let id = btn.dataset.id;
            if (btn.dataset.aktion === "kaufen") {
                kaufeSkin(id, alleAnzeigbarenSkins[id]);
            } else {
                aktiviereSkin(id, alleAnzeigbarenSkins[id]);
            }
            renderShop();
        });
    });

    liste.querySelectorAll("[data-vorschau-id]").forEach(function(btn) {
    btn.addEventListener("click", function() {
        let id = btn.dataset.vorschauId;
        oeffneSkinVorschau(alleAnzeigbarenSkins[id]);
    });
});
}



erzeugeTabs();
renderShop();