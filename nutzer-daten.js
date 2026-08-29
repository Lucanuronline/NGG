import { auth, db } from "./firebase-config.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let aktuellerNutzer = null;
let nutzerDaten = null;

function warteAufNutzer() {
    return new Promise(function(resolve) {
        onAuthStateChanged(auth, async function(nutzer) {
            if (!nutzer) {
                window.location.href = "login.html";
                return;
            }
            aktuellerNutzer = nutzer;

            let ref = doc(db, "users", nutzer.uid);
            let snapshot = await getDoc(ref);
            nutzerDaten = snapshot.data();

            resolve(nutzerDaten);
        });
    });
}

async function speichereNutzerDaten(neueDaten) {
    let ref = doc(db, "users", aktuellerNutzer.uid);
    await updateDoc(ref, neueDaten);
    Object.assign(nutzerDaten, neueDaten);
}

export { warteAufNutzer, speichereNutzerDaten, aktuellerNutzer, nutzerDaten };