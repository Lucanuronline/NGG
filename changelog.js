const changelog = [
    {
        version: "1.0",
        datum: "05.09.2026",
        neuerungen: [
            "Die Erste Vollversion von Neonarcade ist Draußen!!!",
            "🔥 Streak-System: Tage in Folge Challenges schaffen für Coin-Bonus",
            "🎉 Konfetti-Effekt beim Erreichen eines neuen Rangs im Profil",
            "🏅 Wöchentliche Challenge zusätzlich zur täglichen",
            "📋 Changelog-Seite mit Übersicht aller Neuerungen",
            "👁️ Live-Vorschau für Skins im Shop",
            "🧠 Neues Spiel: Memory – finde alle Kartenpaare mit möglichst wenigen Versuchen",
            "🎨 Neues Spiel: Simon – merk dir die wachsende Farbsequenz",
            "Bugfixes"
        ]
    }
];

function zeigeChangelogModal() {
    let letzteGesehenVersion = localStorage.getItem("letzte_gesehene_changelog_version");
    let neuesteVersion = changelog[0].version;

    if (letzteGesehenVersion === neuesteVersion) return;

    erstelleChangelogModal();
}

function erstelleChangelogModal() {
    let overlay = document.createElement("div");
    overlay.className = "changelog-overlay";
    overlay.id = "changelogOverlay";

    let inhalt = "<div class='changelog-modal'>";
    inhalt += "<h2 class='changelog-titel'>📋 Was ist neu?</h2>";

    for (let i = 0; i < changelog.length; i++) {
        let eintrag = changelog[i];
        inhalt += "<div class='changelog-version'>";
        inhalt += "<h3>Version " + eintrag.version + " · " + eintrag.datum + "</h3>";
        inhalt += "<ul>";
        for (let j = 0; j < eintrag.neuerungen.length; j++) {
            inhalt += "<li>" + eintrag.neuerungen[j] + "</li>";
        }
        inhalt += "</ul></div>";
    }

    inhalt += "<button class='changelog-schliessen-btn' id='changelogSchliessenBtn'>Verstanden!</button>";
    inhalt += "</div>";

    overlay.innerHTML = inhalt;
    document.body.appendChild(overlay);

    document.getElementById("changelogSchliessenBtn").addEventListener("click", function() {
        localStorage.setItem("letzte_gesehene_changelog_version", changelog[0].version);
        overlay.remove();
    });
}

function oeffneChangelogManuell() {
    erstelleChangelogModal();
}