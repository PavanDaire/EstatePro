import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth, firebaseReady } from "./firebase-config.js";
import { getFriendlyAuthError, getAuthSetupMessage, setFormMessage } from "./auth.js";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginSubmit = document.getElementById("login-submit");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!loginForm.reportValidity()) {
    return;
  }

  if (!firebaseReady || !auth) {
    setFormMessage(loginMessage, getAuthSetupMessage(), "error");
    return;
  }

  loginSubmit.disabled = true;

  try {
    const persistence = document.getElementById("remember-me").checked
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("index.html");
  } catch (error) {
    setFormMessage(loginMessage, getFriendlyAuthError(error), "error");
  } finally {
    loginSubmit.disabled = false;
  }
});
