document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
  const passwordInput = document.getElementById(toggle.getAttribute("aria-controls"));
  const openEye = toggle.querySelector("[data-eye-open]");
  const closedEye = toggle.querySelector("[data-eye-closed]");

  if (!passwordInput || !openEye || !closedEye) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text";
    toggle.setAttribute("aria-label", isPasswordVisible ? "Show password" : "Hide password");
    openEye.hidden = !isPasswordVisible;
    closedEye.hidden = isPasswordVisible;
  });
});
