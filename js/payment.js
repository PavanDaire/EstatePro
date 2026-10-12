const selectedPropertyId = new URLSearchParams(window.location.search).get("id");
const selectedPropertyExists = selectedPropertyId
  && Object.prototype.hasOwnProperty.call(window.SEQURE_PROPERTIES, selectedPropertyId);
const selectedProperty = selectedPropertyExists
  ? window.SEQURE_PROPERTIES[selectedPropertyId]
  : null;

document.getElementById("selected-property-name").textContent = selectedProperty
  ? selectedProperty.title
  : "No property selected";

document.getElementById("selected-property-status").textContent = selectedProperty
  ? `${selectedProperty.type} · ${selectedProperty.price}`
  : "Property details unavailable";

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const contactName = document.getElementById("contact-name").value.trim();
  const contactMethod = document.getElementById("contact-method").value;
  contactStatus.textContent = `Thanks, ${contactName}. Your ${contactMethod.toLowerCase()} contact preference is ready, but this demo has not sent it to the property owner.`;
  contactStatus.hidden = false;
});
