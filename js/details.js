const propertyId = new URLSearchParams(window.location.search).get("id");
const propertyExists = propertyId
  && Object.prototype.hasOwnProperty.call(window.SEQURE_PROPERTIES, propertyId);
const property = propertyExists ? window.SEQURE_PROPERTIES[propertyId] : null;
const propertyContent = document.getElementById("property-content");
const notFoundMessage = document.getElementById("property-not-found");

if (!property) {
  document.title = "Property Not Found | SequreHomes";
  document.getElementById("property-heading").hidden = true;
  document.getElementById("property-title").textContent = "Property Not Found";
  propertyContent.hidden = true;
  notFoundMessage.hidden = false;
} else {
  document.title = `${property.title} | SequreHomes`;
  document.getElementById("property-status").textContent = property.status;
  if (property.status === "For Rent") {
    document.getElementById("properties-back-link").href = "index.html#rent";
  }
  document.getElementById("property-title").textContent = property.title;
  document.getElementById("property-location").textContent = property.location;
  document.getElementById("property-description").textContent = property.description;
  document.getElementById("property-type").textContent = property.type;
  document.getElementById("property-area").textContent = property.area;
  document.getElementById("property-bedrooms").textContent = property.bedrooms;
  document.getElementById("property-bathrooms").textContent = property.bathrooms;
  document.getElementById("property-parking").textContent = property.parking;
  document.getElementById("property-price").textContent = property.price;

  const propertyImage = document.getElementById("property-image");
  const imageUrl = new URL(property.image);
  imageUrl.searchParams.set("auto", "format");
  imageUrl.searchParams.set("fit", "crop");
  imageUrl.searchParams.set("w", "1200");
  imageUrl.searchParams.set("q", "80");
  propertyImage.src = imageUrl.toString();
  propertyImage.alt = property.title;

  const featuresList = document.getElementById("property-features");
  property.features.forEach((feature) => {
    const featureItem = document.createElement("li");
    featureItem.textContent = feature;
    featuresList.appendChild(featureItem);
  });

  document.getElementById("contact-owner-link").href =
    `payment.html?id=${encodeURIComponent(propertyId)}`;
  propertyContent.hidden = false;
}
