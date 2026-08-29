import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC3RrkrbMAu22YjzIdlJzwozyl1GiMth94",
    authDomain: "neonarcade-1.firebaseapp.com",
    projectId: "neonarcade-1",
    storageBucket: "neonarcade-1.firebasestorage.app",
    messagingSenderId: "677260370344",
    appId: "1:677260370344:web:5f8809a0394cd1b2ca7d9d"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
