import { auth, db } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function benutzernameZuEmail(benutzername) {
    return benutzername.toLowerCase().trim() + "@neonarcade.local";
}

document.getElementById("zuRegistrierung").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("loginBereich").style.display = "none";
    document.getElementById("registrierungBereich").style.display = "block";
});

document.getElementById("zuLogin").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("registrierungBereich").style.display = "none";
    document.getElementById("loginBereich").style.display = "block";
});

document.getElementById("btnRegistrieren").addEventListener("click", async function() {
    let benutzername = document.getElementById("regBenutzername").value.trim();
    let passwort = document.getElementById("regPasswort").value;
    let fehlerElement = document.getElementById("regFehler");

    if (benutzername.length < 3) {
        fehlerElement.innerHTML = "Benutzername muss mind. 3 Zeichen haben.";
        return;
    }

    let email = benutzernameZuEmail(benutzername);

    try {
        let ergebnis = await createUserWithEmailAndPassword(auth, email, passwort);
        let userId = ergebnis.user.uid;

        await setDoc(doc(db, "users", userId), {
            benutzername: benutzername,
            coins: 0,
            coinsGesamt: 0,
            erfolge: [],
            skins: [],
            highscores: {}
        });

        window.location.href = "index.html";
    } catch (fehler) {
        if (fehler.code === "auth/email-already-in-use") {
            fehlerElement.innerHTML = "Benutzername bereits vergeben.";
        } else if (fehler.code === "auth/weak-password") {
            fehlerElement.innerHTML = "Passwort muss mind. 6 Zeichen haben.";
        } else {
            fehlerElement.innerHTML = "Fehler: " + fehler.message;
        }
    }
});

document.getElementById("btnLogin").addEventListener("click", async function() {
    let benutzername = document.getElementById("loginBenutzername").value.trim();
    let passwort = document.getElementById("loginPasswort").value;
    let fehlerElement = document.getElementById("loginFehler");

    let email = benutzernameZuEmail(benutzername);

    try {
        await signInWithEmailAndPassword(auth, email, passwort);
        window.location.href = "index.html";
    } catch (fehler) {
        fehlerElement.innerHTML = "Benutzername oder Passwort falsch.";
    }
});