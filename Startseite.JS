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



function ermittleRang() {
    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    let aktuellerRang = alleRaenge[0];

    for (let i = 0; i < alleRaenge.length; i++) {
        if (gesamtCoins >= alleRaenge[i].minCoins) {
            aktuellerRang = alleRaenge[i];
        }
    }

    return aktuellerRang;
}

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





function ermittleRangMitFortschritt() {
    let gesamtCoins = Number(localStorage.getItem("neonarcade_coins_gesamt")) || 0;
    let aktuellerIndex = 0;

    for (let i = 0; i < alleRaenge.length; i++) {
        if (gesamtCoins >= alleRaenge[i].minCoins) {
            aktuellerIndex = i;
        }
    }

    let aktuellerRang = alleRaenge[aktuellerIndex];
    let naechsterRang = alleRaenge[aktuellerIndex + 1];

    return { aktuellerRang, naechsterRang, gesamtCoins, aktuellerIndex };
}


