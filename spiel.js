const spiele = {
    ngg: {
        titel: "NGG (Number Guessing Game)",
        beschreibung: "Errate die zufällig generierte Zahl in möglichst wenigen Versuchen. Wähle zwischen verschiedenen Schwierigkeitsgraden, sammle Highscores und verfolge deine Statistiken.",
        bild: "img/icon.webp",
        link: "Number Guessing Game/index.html"
    },
    react: {
        titel: "Reaction Game",
        beschreibung: "Warte auf das Signal und klicke so schnell wie möglich. Zu frühes Klicken zählt als Fehler. Versuche, deinen Highscore zu schlagen.",
        bild: "img/reacticon.webp",
        link: "Reaction Game/index.html"
    },
    snake: {
        titel: "Snake",
        beschreibung: "Steuere die Schlange, sammle Äpfel und werde immer länger. Vermeide Kollisionen mit deinem eigenen Körper und stelle einen neuen Highscore auf.",
        bild: "img/snake.webp",
        link: "snake/index.html"
    },
    aim: {
        titel: "Aim Trainer",
        beschreibung: "Trainiere deine Zielgenauigkeit und Reaktionsgeschwindigkeit. Triff die zufällig erscheinenden Ziele innerhalb der Zeit und sammle möglichst viele Punkte.",
        bild: "img/aim.webp",
        link: "Aim Trainer/Index.html"
    },
    breakout: {
        titel: "Breakout",
        beschreibung: "Zerstöre mit deinem Schläger alle Blöcke und bahn dir deinen Weg durch immer neue Level.",
        bild: "img/breakout_icon.webp",
        link: "breakout/index.html"
    },
    flappy: {
        titel: "Flappy Neon",
        beschreibung: "Flieg mit deinem kleinen Vogel durch den Neon-Nachthimmel und weiche geschickt den Röhren aus.",
        bild: "img/flappyneon_icon.webp",
        link: "fly arcade/index.html"
    },
    ttt: {
        titel: "Tic Tac Toe",
        beschreibung: "Fordere einen Freund am selben Gerät heraus, oder tritt gegen die NeonArcade-KI an.",
        bild: "img/tictactoe_icon.webp",
        link: "tic tac toe/index.html"
    },
    mines: {
        titel: "Minesweeper",
        beschreibung: "Deck vorsichtig Feld für Feld auf, ohne auf eine Mine zu treffen! Wähle zwischen drei Schwierigkeitsgraden und versuche, deine Bestzeit zu unterbieten.",
        bild: "img/minesweeper_icon.webp",
        link: "mineswepper/index.html"
    },

    hoehertiefer: {
    titel: "Höher Tiefer",
    beschreibung: "Ziehe eine Karte und wette, ob die nächste höher oder tiefer ist. Setze deine Coins ein und versuche, eine möglichst lange Gewinnserie hinzulegen!",
    bild: "img/hoeher_tiefer_icon.png",
    link: "hoeher-tiefer/hoeher-tiefer.html"
},

    blackjack: {
    titel: "Blackjack",
    beschreibung: "Spiele gegen den Dealer und versuche, mit deinen Karten möglichst nah an 21 Punkte zu kommen. Aber Vorsicht: Wer über 21 kommt, verliert die Runde!",
    bild: "img/blackjack_icon.png",
    link: "blackjack/blackjack.html"
}
};

const params = new URLSearchParams(window.location.search);
const spielId = params.get("spiel");
const spiel = spiele[spielId];

if (spiel) {
    document.getElementById("spielTitel").textContent = spiel.titel;
    document.getElementById("spielBeschreibung").textContent = spiel.beschreibung;
    document.getElementById("spielIcon").style.backgroundImage = "url(" + spiel.bild + ")";
    document.getElementById("spielenBtn").href = spiel.link;
}

function ladeFavoriten() {
    let gespeichert = localStorage.getItem("favoriten");
    return gespeichert ? JSON.parse(gespeichert) : [];
}

function speichereFavoriten(favoriten) {
    localStorage.setItem("favoriten", JSON.stringify(favoriten));
}

const favoritBtn = document.getElementById("favoritBtnDetail");

function aktualisiereStern() {
    let favoriten = ladeFavoriten();
    if (favoriten.includes(spielId)) {
        favoritBtn.textContent = "★";
        favoritBtn.classList.add("aktiv");
    } else {
        favoritBtn.textContent = "☆";
        favoritBtn.classList.remove("aktiv");
    }
}

favoritBtn.addEventListener("click", function() {
    let favoriten = ladeFavoriten();
    if (favoriten.includes(spielId)) {
        favoriten = favoriten.filter(function(item) { return item !== spielId; });
    } else {
        favoriten.push(spielId);
    }
    speichereFavoriten(favoriten);
    aktualisiereStern();
});

aktualisiereStern();