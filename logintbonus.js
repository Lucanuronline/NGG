const loginBelohnungen = [
    5, 5, 5, 10, 10, 10, 15,           // Tag 1-7
    15, 15, 20, 20, 25, 25, 20,         // Tag 8-14
    40, 25, 25, 30, 30, 35, 40,         // Tag 15-21
    30, 35, 35, 40, 40, 45, 50,         // Tag 22-28
    50, 100                              // Tag 29-30
];


function heutigerTagesSeed() {
    let heute = new Date();
    return heute.getFullYear() * 10000 + (heute.getMonth() + 1) * 100 + heute.getDate();
}

function ladeLoginKalenderTag() {
    return Number(localStorage.getItem("login_kalender_tag")) || 0;
}

function istHeuteAbgeholt() {
    let heute = heutigerTagesSeed();
    let letzterAbholtag = Number(localStorage.getItem("login_letzter_abholtag"));
    return letzterAbholtag === heute;
}

function pruefeUndZeigeLoginBonus() {
    if (istHeuteAbgeholt()) return;
    zeigeLoginBonusModal();
}

function holeLoginBonusAb() {
    if (istHeuteAbgeholt()) return;

    let aktuellerTag = ladeLoginKalenderTag();
    aktuellerTag++;
    if (aktuellerTag > 30) aktuellerTag = 1;

    localStorage.setItem("login_kalender_tag", aktuellerTag);
    localStorage.setItem("login_letzter_abholtag", heutigerTagesSeed());

    let belohnung = loginBelohnungen[aktuellerTag - 1];

    let coins = ladeCoins();
    coins += belohnung;
    localStorage.setItem("neonarcade_coins", coins);

    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    gesamtCoins += belohnung;
    localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

    return { tag: aktuellerTag, belohnung: belohnung };
}

function zeigeLoginBonusModal() {
    let overlay = document.createElement("div");
    overlay.className = "login-overlay";
    overlay.id = "loginOverlay";

    renderLoginModalInhalt(overlay);
    document.body.appendChild(overlay);
}

function renderLoginModalInhalt(overlay) {
    let heuteSchonAbgeholt = istHeuteAbgeholt();
    let angezeigterTag = ladeLoginKalenderTag();
    let naechsterTag = angezeigterTag + 1;
    if (naechsterTag > 30) naechsterTag = 1;
    if (heuteSchonAbgeholt) naechsterTag = angezeigterTag || 30;

    let gridHtml = "";
    for (let i = 1; i <= 30; i++) {
        let klasse = "login-feld";
        if (i <= angezeigterTag && heuteSchonAbgeholt) klasse += " abgeholt";
        else if (i < naechsterTag) klasse += " abgeholt";
        if (i === naechsterTag && !heuteSchonAbgeholt) klasse += " heute";
        if ((heuteSchonAbgeholt && i > angezeigterTag) || (!heuteSchonAbgeholt && i > naechsterTag)) klasse += " zukunft";

        gridHtml += "<div class='" + klasse + "'>" +
            "<span class='login-tag'>Tag " + i + "</span>" +
            "<span class='login-belohnung'>🪙 " + loginBelohnungen[i - 1] + "</span>" +
            "</div>";
    }

    let buttonHtml = heuteSchonAbgeholt
        ? "<button class='login-schliessen-btn' id='loginSchliessenBtn'>Schließen</button>"
        : "<button class='login-abholen-btn' id='loginAbholenBtn'>🎁 Tag " + naechsterTag + " abholen (+" + loginBelohnungen[naechsterTag - 1] + " 🪙)</button>";

    overlay.innerHTML =
        "<div class='login-modal'>" +
            "<h2 class='login-titel'>📅 Tages-Login-Bonus</h2>" +
            "<div class='login-grid'>" + gridHtml + "</div>" +
            buttonHtml +
        "</div>";

    if (heuteSchonAbgeholt) {
        overlay.querySelector("#loginSchliessenBtn").addEventListener("click", function() {
            overlay.remove();
        });
    } else {
        overlay.querySelector("#loginAbholenBtn").addEventListener("click", function() {
            let ergebnis = holeLoginBonusAb();
            zeigeAbholBenachrichtigung(ergebnis.belohnung);
            renderLoginModalInhalt(overlay);
        });
    }
}

function zeigeAbholBenachrichtigung(belohnung) {
    let benachrichtigung = document.createElement("div");
    benachrichtigung.className = "erfolg-benachrichtigung";
    benachrichtigung.innerHTML = "📅 <strong>Login-Bonus abgeholt!</strong><br>+" + belohnung + " 🪙";
    document.body.appendChild(benachrichtigung);

    setTimeout(function() {
        benachrichtigung.classList.add("ausblenden");
        setTimeout(function() { benachrichtigung.remove(); }, 500);
    }, 3000);
}

function oeffneLoginKalenderManuell() {
    zeigeLoginBonusModal();
}