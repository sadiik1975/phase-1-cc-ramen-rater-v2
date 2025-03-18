document.addEventListener("DOMContentLoaded", () => {
  loadRamens();
  setupForm();
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

export { loadRamens, showRamenDetails, setupForm };
