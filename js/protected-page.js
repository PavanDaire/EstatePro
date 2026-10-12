import { requireAuthenticatedUser } from "./auth.js";

const protectedContent = document.getElementById("protected-content");
const authStatus = document.getElementById("auth-status");

requireAuthenticatedUser(
  () => {
    authStatus.hidden = true;
    protectedContent.hidden = false;
  },
  (message) => {
    authStatus.textContent = message;
    authStatus.dataset.state = "error";
  }
);
