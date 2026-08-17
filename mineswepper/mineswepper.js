let reihen = 9;
let spalten = 9;
let anzahlMinen = 10;
let flaggenGesetzt = 0;

let feld = [];
let spielVorbei = false;
let aufgedeckteZellen = 0;


let startZeit = 0;
let timerLaeuft = false;
let aktuelleSchwierigkeit = "leicht";


const grid = document.getElementById("grid");
const refreshBtn = document.getElementById("btnRefresh");

document.getElementById("btnLeicht").addEventListener("click", function() {
    document.body.style.background = "#38CC1D";
    aktuelleSchwierigkeit = "leicht";
    setzeSchwierigkeit(9, 9, 10);
});

document.getElementById("btnMittel").addEventListener("click", function() {
    document.body.style.background = "#c4a733";
    aktuelleSchwierigkeit = "mittel";
    setzeSchwierigkeit(12, 12, 20);
});

document.getElementById("btnSchwer").addEventListener("click", function() {
    document.body.style.background = "#a93a3a";
    aktuelleSchwierigkeit = "schwer";
    setzeSchwierigkeit(16, 16, 40);
});

function setzeSchwierigkeit(r, s, minen) {
    reihen = r;
    spalten = s;
    anzahlMinen = minen;
    erstelleFeld();
}

document.getElementById("btnLeicht").addEventListener("click", function() {
    setzeSchwierigkeit(9, 9, 10);
});

document.getElementById("btnMittel").addEventListener("click", function() {
    setzeSchwierigkeit(12, 12, 20);
});

document.getElementById("btnSchwer").addEventListener("click", function() {
    setzeSchwierigkeit(16, 16, 40);
});

function erstelleFeld() {
    feld = [];
    spielVorbei = false;
    aufgedeckteZellen = 0;
    flaggenGesetzt = 0;
    timerLaeuft = false;
    document.getElementById("statusText").innerHTML = "";
    document.getElementById("minenAnzeige").innerHTML = "💣 Minen: " + anzahlMinen;
    "🏆 Bestzeit: " + (localStorage.getItem("highscore_" + aktuelleSchwierigkeit) || "-");

    for (let r = 0; r < reihen; r++) {
        let zeile = [];
        for (let s = 0; s < spalten; s++) {
            zeile.push({
                istMine: false,
                nachbarMinen: 0,
                aufgedeckt: false,
                geflaggt: false
            });
        }
        feld.push(zeile);
    }

    platziereMinen();
    berechneNachbarn();
    renderFeld();
}

function platziereMinen() {
    let platziert = 0;

    while (platziert < anzahlMinen) {
        let r = Math.floor(Math.random() * reihen);
        let s = Math.floor(Math.random() * spalten);

        if (!feld[r][s].istMine) {
            feld[r][s].istMine = true;
            platziert++;
        }
    }
}

function berechneNachbarn() {
    for (let r = 0; r < reihen; r++) {
        for (let s = 0; s < spalten; s++) {
            if (feld[r][s].istMine) continue;

            let anzahl = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let ds = -1; ds <= 1; ds++) {
                    let nr = r + dr;
                    let ns = s + ds;
                    if (nr >= 0 && nr < reihen && ns >= 0 && ns < spalten) {
                        if (feld[nr][ns].istMine) {
                            anzahl++;
                        }
                    }
                }
            }
            feld[r][s].nachbarMinen = anzahl;
        }
    }
}

function renderFeld() {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = "repeat(" + spalten + ", 1fr)";

    for (let r = 0; r < reihen; r++) {
        for (let s = 0; s < spalten; s++) {
            let zelle = document.createElement("div");
            zelle.className = "zelle";
            zelle.dataset.row = r;
            zelle.dataset.col = s;

            zelle.addEventListener("click", function() {
                klickZelle(r, s);
            });

            zelle.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                flaggeZelle(r, s);
            });

            grid.appendChild(zelle);
        }
    }
}

function klickZelle(r, s) {
    if (spielVorbei) return;


    if (!timerLaeuft) {
        startZeit = Date.now();
        timerLaeuft = true;
    }

    let zelle = feld[r][s];
    if (zelle.aufgedeckt || zelle.geflaggt) return;

    if (zelle.istMine) {
        zelle.aufgedeckt = true;
        aktualisiereZelle(r, s);
        gameOver(false);
        return;
    }

    deckeAuf(r, s);
    aktualisiereGrid();
    checkSieg();
}

function deckeAuf(r, s) {
    if (r < 0 || r >= reihen || s < 0 || s >= spalten) return;

    let zelle = feld[r][s];
    if (zelle.aufgedeckt || zelle.geflaggt) return;

    zelle.aufgedeckt = true;
    aufgedeckteZellen++;

    if (zelle.nachbarMinen === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let ds = -1; ds <= 1; ds++) {
                if (dr === 0 && ds === 0) continue;
                deckeAuf(r + dr, s + ds);
            }
        }
    }
}

function flaggeZelle(r, s) {
    if (spielVorbei) return;

    let zelle = feld[r][s];
    if (zelle.aufgedeckt) return;

    zelle.geflaggt = !zelle.geflaggt;

    if (zelle.geflaggt) {
        flaggenGesetzt++;
    } else {
        flaggenGesetzt--;
    }

    document.getElementById("minenAnzeige").innerHTML = "💣 Minen: " + (anzahlMinen - flaggenGesetzt);

    aktualisiereZelle(r, s);
}

function aktualisiereGrid() {
    for (let r = 0; r < reihen; r++) {
        for (let s = 0; s < spalten; s++) {
            aktualisiereZelle(r, s);
        }
    }
}

function aktualisiereZelle(r, s) {
    let zelle = feld[r][s];
    let element = grid.querySelector('.zelle[data-row="' + r + '"][data-col="' + s + '"]');

    if (zelle.geflaggt && !zelle.aufgedeckt) {
        element.textContent = "🚩";
        element.classList.remove("aufgedeckt");
        return;
    }

    if (!zelle.aufgedeckt) {
        element.textContent = "";
        element.classList.remove("aufgedeckt");
        return;
    }

    element.classList.add("aufgedeckt");

    if (zelle.istMine) {
        element.textContent = "💣";
        element.classList.add("mine");
    } else if (zelle.nachbarMinen > 0) {
        element.textContent = zelle.nachbarMinen;
        element.classList.add("zahl-" + zelle.nachbarMinen);
    } else {
        element.textContent = "";
    }
}

function gameOver(gewonnen) {
    spielVorbei = true;

    for (let r = 0; r < reihen; r++) {
        for (let s = 0; s < spalten; s++) {
            if (feld[r][s].istMine) {
                feld[r][s].aufgedeckt = true;
            }
        }
    }
    aktualisiereGrid();

    if (gewonnen) {
        let zeit = Math.floor((Date.now() - startZeit) / 1000);
        document.getElementById("statusText").innerHTML = "🎉 Gewonnen! Zeit: " + zeit + "s";

        let bisherigerHighscore = Number(localStorage.getItem("highscore_" + aktuelleSchwierigkeit));

        if (!bisherigerHighscore || zeit < bisherigerHighscore) {
            localStorage.setItem("highscore_" + aktuelleSchwierigkeit, zeit);
            document.getElementById("highscore").innerHTML = "🏆 Bestzeit: " + zeit + "s";
        }
    } else {
        document.getElementById("statusText").innerHTML = "❌ Game Over!";
    }
}

function checkSieg() {
    let gesamtZellen = reihen * spalten;
    if (aufgedeckteZellen === gesamtZellen - anzahlMinen) {
        gameOver(true);
    }
}

function handleClick() {
    erstelleFeld();
}

refreshBtn.addEventListener("click", handleClick);
setzeSchwierigkeit(9, 9, 10);
