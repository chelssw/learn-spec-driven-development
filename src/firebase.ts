import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpWO78fYcnKm-LS_Vy6l4WiUa_eCdathA",
  authDomain: "spec-driven-development-663e5.firebaseapp.com",
  databaseURL: "https://spec-driven-development-663e5-default-rtdb.firebaseio.com",
  projectId: "spec-driven-development-663e5",
  storageBucket: "spec-driven-development-663e5.firebasestorage.app",
  messagingSenderId: "817802771238",
  appId: "1:817802771238:web:f9a1ad93e05df864689fe7",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
