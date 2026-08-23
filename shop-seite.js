const liste = document.getElementById("skinListe");

function renderShop() {
    liste.innerHTML = "";
    let coins = ladeCoins();
    let gekauft = ladeGekaufteSkins();

    document.getElementById("coinsAnzeige").innerHTML = "🪙 " + coins + " Coins";

    for (let id in alleSkins) {
        let skin = alleSkins[id];
        let istGekauft = gekauft.includes(id);
        let istAktiv = ladeAktiverSkin(skin.spiel) === id;

        let karte = document.createElement("div");
        karte.className = "skin-karte";

        let buttonHtml = "";
        if (istAktiv) {
            buttonHtml = "<button class='skin-btn aktiv-btn' disabled>Aktiv</button>";
        } else if (istGekauft) {
            buttonHtml = "<button class='skin-btn' data-aktion='aktivieren' data-id='" + id + "'>Aktivieren</button>";
        } else {
            buttonHtml = "<button class='skin-btn' data-aktion='kaufen' data-id='" + id + "'" +
                (coins < skin.preis ? " disabled" : "") + ">Kaufen (" + skin.preis + " 🪙)</button>";
        }

        karte.innerHTML =
            "<div class='skin-vorschau' style='background: linear-gradient(45deg, " + skin.kopfFarbe + ", " + skin.koerperFarbe + ")'></div>" +
            "<h3>" + skin.titel + "</h3>" +
            "<p>Für: " + skin.spiel + "</p>" +
            buttonHtml;

        liste.appendChild(karte);
    }

    liste.querySelectorAll("[data-aktion]").forEach(function(btn) {
        btn.addEventListener("click", function() {
            let id = btn.dataset.id;
            if (btn.dataset.aktion === "kaufen") {
                kaufeSkin(id);
            } else {
                aktiviereSkin(id);
            }
            renderShop();
        });
    });
}

renderShop();