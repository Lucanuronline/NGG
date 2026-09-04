let challenge = heutigeChallenge();
let erledigt = istChallengeHeuteAbgeschlossen();



document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById("splash").classList.add("ausgeblendet");
    }, 700);
});


document.getElementById("challengeKarte").innerHTML =
    "<h3>🌟 Tages-Challenge</h3>" +
    "<p>" + challenge.text + "</p>" +
    (erledigt ? "<span class='challenge-status erledigt'>✅ Geschafft!</span>" : "<span class='challenge-status'>+25 🪙 bei Erfolg</span>");

let wochenChallenge = heutigeWochenChallenge();
let wochenErledigt = istWochenChallengeAbgeschlossen();
let wochenFortschrittAktuell = wochenFortschritt(wochenChallenge.spiel);

document.getElementById("wochenChallengeKarte").innerHTML =
    "<h3>🏅 Wochen-Challenge</h3>" +
    "<p>" + wochenChallenge.text + "</p>" +
    (wochenErledigt
        ? "<span class='challenge-status erledigt'>✅ Geschafft!</span>"
        : "<span class='challenge-status'>" + wochenFortschrittAktuell + " / " + wochenChallenge.zielwert + " · +75 🪙 bei Erfolg</span>");


const kristallBtn = document.getElementById("kristallBtn");
let kristallSichtbar = false;
let kristallVerschwindenTimeout;

function zufälligePosition() {
    let breite = window.innerWidth;
    let hoehe = window.innerHeight;

    let x = Math.random() * (breite - 100) + 10;
    let y = Math.random() * (hoehe - 100) + 10;

    kristallBtn.style.left = x + "px";
    kristallBtn.style.top = y + "px";
}

function zeigeKristall() {
    zufälligePosition();
    kristallBtn.classList.add("sichtbar");
    kristallSichtbar = true;

    kristallVerschwindenTimeout = setTimeout(function() {
        versteckeKristall();
    }, 6000);
}

function versteckeKristall() {
    kristallBtn.classList.remove("sichtbar");
    kristallSichtbar = false;

    let naechsteWartezeit = Math.random() * 20000 + 15000;
    setTimeout(zeigeKristall, naechsteWartezeit);
}

kristallBtn.addEventListener("click", function(event) {
    if (!kristallSichtbar) return;

    clearTimeout(kristallVerschwindenTimeout);

    let coins = ladeCoins();
    coins += 1;
    localStorage.setItem("neonarcade_coins", coins);

    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    gesamtCoins += 1;
    localStorage.setItem("neonarcade_coins_gesamt", gesamtCoins);

    let klicksGesamt = Number(localStorage.getItem("kristall_klicks")) || 0;
    klicksGesamt++;
    localStorage.setItem("kristall_klicks", klicksGesamt);

    zeigePlusEins(event);

    kristallBtn.classList.add("geklickt");
    setTimeout(function() {
        kristallBtn.classList.remove("geklickt");
    }, 100);

    versteckeKristall();

    if (klicksGesamt >= 100) {
        schalteErfolgFrei("kristall_100_klicks");
    }
});

function zeigePlusEins(event) {
    let plusEins = document.createElement("div");
    plusEins.className = "kristall-plus";
    plusEins.innerHTML = "+1";
    plusEins.style.left = event.clientX + "px";
    plusEins.style.top = event.clientY + "px";
    document.body.appendChild(plusEins);

    setTimeout(function() {
        plusEins.remove();
    }, 800);
}

setTimeout(zeigeKristall, 5000);



function ladeFavoriten() {
    let gespeichert = localStorage.getItem("favoriten");
    return gespeichert ? JSON.parse(gespeichert) : [];
}

function speichereFavoriten(favoriten) {
    localStorage.setItem("favoriten", JSON.stringify(favoriten));
}

function aktualisiereSterne() {
    let favoriten = ladeFavoriten();

    document.querySelectorAll(".favorit-btn").forEach(function(btn) {
        let spiel = btn.dataset.spiel;

        if (favoriten.includes(spiel)) {
            btn.textContent = "★";
            btn.classList.add("aktiv");
        } else {
            btn.textContent = "☆";
            btn.classList.remove("aktiv");
        }
    });
}

document.querySelectorAll(".favorit-btn").forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        let spiel = btn.dataset.spiel;
        let favoriten = ladeFavoriten();

        if (favoriten.includes(spiel)) {
            favoriten = favoriten.filter(function(item) {
                return item !== spiel;
            });
        } else {
            favoriten.push(spiel);
        }

        speichereFavoriten(favoriten);
        aktualisiereSterne();
        sortiereFavoriten();
        
    });
});

const urspruenglicheReihenfolge = Array.from(
    document.querySelectorAll(".spielkarte")
).map(function(karte) {
    return karte.dataset.spiel;
});

function sortiereFavoriten() {
    let favoriten = ladeFavoriten();
    let container = document.querySelector(".games");
    let karten = Array.from(container.querySelectorAll(".spielkarte"));

    karten.sort(function(a, b) {
        let aIstFavorit = favoriten.includes(a.dataset.spiel);
        let bIstFavorit = favoriten.includes(b.dataset.spiel);

        if (aIstFavorit && !bIstFavorit) return -1;
        if (!aIstFavorit && bIstFavorit) return 1;

        let aIndex = urspruenglicheReihenfolge.indexOf(a.dataset.spiel);
        let bIndex = urspruenglicheReihenfolge.indexOf(b.dataset.spiel);
        return aIndex - bIndex;
    });

    karten.forEach(function(karte) {
        container.appendChild(karte);
    });
}

        aktualisiereSterne();
        sortiereFavoriten();





zeigeChangelogModal();


