import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzt0NZ3gPUm6vUwrsO_Khc0ltjx_G0M34",
  authDomain: "fancamtests.firebaseapp.com",
  databaseURL: "https://fancamtests-default-rtdb.firebaseio.com",
  projectId: "fancamtests",
  storageBucket: "fancamtests.firebasestorage.app",
  messagingSenderId: "827180605140",
  appId: "1:827180605140:web:0c05447c4831320ef3a541"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);