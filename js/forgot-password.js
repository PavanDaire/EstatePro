import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth, firebaseReady } from "./firebase-config.js";
import { getAuthSetupMessage, getFriendlyAuthError, setFormMessage } from "./auth.js";

const resetForm = document.getElementById("forgot-password-form");
const resetMessage = document.getElementById("forgot-password-message");
const resetSubmit = document.getElementById("reset-submit");

resetForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!resetForm.reportValidity()) {
    return;
  }

  if (!firebaseReady || !auth) {
    setFormMessage(resetMessage, getAuthSetupMessage(), "error");
    return;
  }

  resetSubmit.disabled = true;

  try {
    const email = document.getElementById("email").value.trim();
    await sendPasswordResetEmail(auth, email);
    setFormMessage(resetMessage, "Password reset email has been sent. Please check your inbox.");
    resetForm.reset();
  } catch (error) {
    setFormMessage(resetMessage, getFriendlyAuthError(error, "reset"), "error");
  } finally {
    resetSubmit.disabled = false;
  }
});
