import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD36wU7dXJSivL2FMLIt4PyLSy5HtlVQ5A",
  authDomain: "mes-fancam.firebaseapp.com",
  databaseURL: "https://mes-fancam-default-rtdb.firebaseio.com",
  projectId: "mes-fancam",
  storageBucket: "mes-fancam.firebasestorage.app",
  messagingSenderId: "1091345682482",
  appId: "1:1091345682482:web:eb8e8ea08d7a952c022c2b"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);