import { signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth, firebaseReady } from "./firebase-config.js";
import { watchAuthState } from "./auth.js";

const accountLink = document.querySelector(".login-link");

if (accountLink && firebaseReady && auth) {
  watchAuthState((user) => {
    if (user) {
      accountLink.textContent = "Log out";
      accountLink.href = "#logout";
      accountLink.setAttribute("aria-label", `Log out ${user.displayName || user.email}`);
    } else {
      accountLink.textContent = "Log in";
      accountLink.href = "login.html";
      accountLink.removeAttribute("aria-label");
    }
  });

  accountLink.addEventListener("click", async (event) => {
    if (accountLink.getAttribute("href") !== "#logout") {
      return;
    }

    event.preventDefault();
    accountLink.textContent = "Logging out...";
    accountLink.setAttribute("aria-disabled", "true");

    try {
      await signOut(auth);
      window.location.replace("login.html");
    } catch (error) {
      console.error("Firebase sign-out failed:", error);
      accountLink.textContent = "Log out";
      accountLink.removeAttribute("aria-disabled");
      window.alert("Unable to log out right now. Please try again.");
    }
  });
}
