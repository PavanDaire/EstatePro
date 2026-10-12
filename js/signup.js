import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, serverTimestamp, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-config.js";
import { getAuthSetupMessage, getFriendlyAuthError, setFormMessage } from "./auth.js";

const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");
const signupSubmit = document.getElementById("signup-submit");
const signupDialog = document.getElementById("signup-dialog");
const signupDialogTitle = document.getElementById("signup-dialog-title");
const signupDialogMessage = document.getElementById("signup-dialog-message");

function showLoginDialog(title, message) {
  signupDialogTitle.textContent = title;
  signupDialogMessage.textContent = message;
  signupMessage.hidden = true;

  if (!signupDialog.open) {
    signupDialog.showModal();
  }
}

document.getElementById("signup-dialog-dismiss").addEventListener("click", () => {
  signupDialog.close();
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!signupForm.reportValidity()) {
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!name) {
    setFormMessage(signupMessage, "Please enter your name.", "error");
    return;
  }

  if (password !== confirmPassword) {
    setFormMessage(signupMessage, "Passwords do not match.", "error");
    return;
  }

  if (!firebaseReady || !auth) {
    setFormMessage(signupMessage, getAuthSetupMessage(), "error");
    return;
  }

  signupSubmit.disabled = true;

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    signupForm.reset();
    showLoginDialog(
      "Account created",
      "Your account was created successfully. Please log in now to continue."
    );

    let profileSaved = true;
    try {
      await updateProfile(credential.user, { displayName: name });
    } catch (profileError) {
      profileSaved = false;
      console.error("Firebase display name update failed:", profileError);
    }

    if (db) {
      try {
        await setDoc(doc(db, "users", credential.user.uid), {
          name,
          email: credential.user.email,
          createdAt: serverTimestamp()
        });
      } catch (profileError) {
        profileSaved = false;
        console.error("Firebase profile document save failed:", profileError);
      }
    } else {
      profileSaved = false;
    }

    if (!profileSaved) {
      signupDialogMessage.textContent =
        "Your account was created, but some profile information could not be saved. You can still log in; check that Firestore is enabled and its rules are published.";
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showLoginDialog(
        "Email already registered",
        "An account already uses this email address. Please log in instead."
      );
    } else {
      setFormMessage(signupMessage, getFriendlyAuthError(error), "error");
    }
  } finally {
    signupSubmit.disabled = false;
  }
});
