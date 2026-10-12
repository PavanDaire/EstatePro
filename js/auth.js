import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth, firebaseReady } from "./firebase-config.js";

export function getAuthSetupMessage() {
  return "Firebase is not configured yet. Add your Firebase web app settings in js/firebase-config.js.";
}

export function getFriendlyAuthError(error, context = "auth") {
  if (!firebaseReady) {
    return getAuthSetupMessage();
  }

  const messages = {
    "auth/email-already-in-use": "This email is already registered. Please log in.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/missing-email": "Please enter your email address.",
    "auth/invalid-request": "Please check the email address and try again.",
    "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/user-disabled": "This account has been disabled. Please contact support.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again later.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase Console.",
    "auth/configuration-not-found": "Firebase Authentication setup is incomplete. In Firebase Console, open Authentication, click Get started, then enable Email/Password under Sign-in method.",
    "auth/unauthorized-domain": "This website domain is not authorized in Firebase Console.",
    "auth/invalid-api-key": "Firebase configuration is invalid. Check js/firebase-config.js.",
    "auth/project-not-found": "Firebase project was not found. Check js/firebase-config.js."
  };

  if (context === "reset" && error.code === "auth/user-not-found") {
    return "No account was found for that email address. Check the email or sign up.";
  }

  if (error.code === "permission-denied" || error.code === "firestore/permission-denied") {
    return "Your account was created, but the profile could not be saved. Check that Firestore is enabled and firestore.rules are published.";
  }

  return messages[error.code] || "Something went wrong. Please try again.";
}

export function setFormMessage(element, message, state = "success") {
  element.textContent = message;
  element.dataset.state = state;
  element.hidden = false;
}

export function watchAuthState(callback) {
  if (!firebaseReady || !auth) {
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export function requireAuthenticatedUser(onAuthenticated, onError) {
  if (!firebaseReady || !auth) {
    onError(getAuthSetupMessage());
    return () => {};
  }

  return onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        onAuthenticated(user);
      } else {
        window.location.replace("login.html");
      }
    },
    (error) => {
      console.error("Firebase authentication state check failed:", error);
      onError("Unable to verify your sign-in. Please refresh the page and try again.");
    }
  );
}
