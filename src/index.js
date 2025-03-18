document.addEventListener("DOMContentLoaded", () => {
  loadRamens();
  setupForm();
  setupDeleteButton();
});

function loadRamens() {
  fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => data.forEach(addRamenToMenu))
    .catch(console.error);
}

function addRamenToMenu(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  img.onclick = () => showRamenDetails(ramen);
  document.getElementById("ramen-menu").appendChild(img);
}

function showRamenDetails(ramen) {
  document.querySelector(".detail-image").src = ramen.image;
  document.getElementById("ramen-name").textContent = ramen.name;
  document.getElementById("restaurant-name").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
  document.getElementById("delete-button").dataset.id = ramen.id;
}

function setupForm() {
  document.getElementById("new-ramen").addEventListener("submit", event => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
      id: Date.now()
    };

    addRamenToMenu(newRamen);
    showRamenDetails(newRamen);
    event.target.reset();
  });
}

function setupDeleteButton() {
  document.getElementById("delete-button").addEventListener("click", () => {
    const ramenId = document.getElementById("delete-button").dataset.id;
    if (!ramenId) {
      alert("Select a ramen first!");
      return;
    }

    // Remove from the UI only
    const ramenImage = document.querySelector(`#ramen-menu img[data-id='${ramenId}']`);
    if (ramenImage) {
      ramenImage.remove();
    }

    // Reset details so that deleted ramen is no longer shown
    resetDetails();

    // No DELETE request is sent, so the ramen will come back on page refresh.
  });
}

function resetDetails() {
  document.querySelector(".detail-image").src = "./assets/image-placeholder.jpg";
  document.getElementById("ramen-name").textContent = "Select a Ramen";
  document.getElementById("restaurant-name").textContent = "Restaurant Name";
  document.getElementById("rating-display").textContent = "0";
  document.getElementById("comment-display").textContent = "No comment yet";
}

export { loadRamens, showRamenDetails, setupForm };
