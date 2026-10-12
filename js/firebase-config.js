import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBU0y-0bEOYwSHOF9muNHTkuT5gPhoTczQ",
  authDomain: "realestate-2dd4b.firebaseapp.com",
  projectId: "realestate-2dd4b",
  storageBucket: "realestate-2dd4b.firebasestorage.app",
  messagingSenderId: "834723979731",
  appId: "1:834723979731:web:ac989034c13fd1b00a8f26",
  measurementId: "G-CBSHFC2SJZ"
};

export const firebaseReady = Object.values(firebaseConfig).every(
  (value) => value && !value.startsWith("YOUR_")
);

const app = firebaseReady ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
