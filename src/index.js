document.addEventListener("DOMContentLoaded", () => {
  displayRamens();
  addSubmitListener();
});

function displayRamens() {
  fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => {
      ramens.forEach(ramen => addRamenToMenu(ramen));
    })
    .catch(err => console.error("Error:", err));
}

function addRamenToMenu(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name || "Ramen";
  img.dataset.id = ramen.id;
  img.addEventListener("click", () => displayRamenDetails(ramen));
  document.getElementById("ramen-menu").appendChild(img);
}

function displayRamenDetails(ramen) {
  document.querySelector(".detail-image").src = ramen.image || "./assets/image-placeholder.jpg";
  document.getElementById("ramen-name").textContent = ramen.name || "No Name";
  document.getElementById("restaurant-name").textContent = ramen.restaurant || "Unknown";
  document.getElementById("rating-display").textContent = ramen.rating || "N/A";
  document.getElementById("comment-display").textContent = ramen.comment || "No comment";

  // Set up delete button
  const deleteButton = document.getElementById("delete-button");
  deleteButton.dataset.id = ramen.id;
  deleteButton.removeEventListener("click", handleDelete); // Remove previous listener
  deleteButton.addEventListener("click", handleDelete);
}

function handleDelete(event) {
  event.preventDefault();
  event.stopPropagation();

  const ramenId = event.target.dataset.id;
  if (!ramenId) {
    alert("No ramen selected!");
    return;
  }

  // Remove ramen from the menu
  const ramenImage = document.querySelector(`#ramen-menu img[data-id='${ramenId}']`);
  if (ramenImage) {
    ramenImage.remove();
    console.log(`Deleted ramen with ID: ${ramenId}`);
  } else {
    console.warn(`Ramen ID ${ramenId} not found!`);
  }

  // Optionally, send a DELETE request to the server
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    console.log(`Ramen with ID: ${ramenId} has been deleted from the server.`);
  })
  .catch(error => {
    console.error('There was a problem with the delete request:', error);
  });

  // Reset ramen details display
  resetRamenDetails();
}

function resetRamenDetails() {
  document.querySelector(".detail-image").src = "./assets/image-placeholder.jpg";
  document.getElementById("ramen-name").textContent = "Select a Ramen";
  document.getElementById("restaurant-name").textContent = "Restaurant Name";
  document.getElementById("rating-display").textContent = "0";
  document.getElementById("comment-display").textContent = "No comment yet";
}

function addSubmitListener() {
  document.getElementById("new-ramen").addEventListener("submit", event => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById("new-name").value.trim(),
      restaurant: document.getElementById("new-restaurant").value.trim(),
      image: document.getElementById("new-image").value.trim(),
      rating: document.getElementById("new-rating").value.trim(),
      comment: document.getElementById("new-comment").value.trim(),
      id: Date.now().toString() // Simple unique ID
    };

    if (!newRamen.name || !newRamen.image) {
      alert("Name and Image are required!");
      return;
    }

    addRamenToMenu(newRamen);
    displayRamenDetails(newRamen);

    // Optionally, send a POST request to the server to add the new ramen
    fetch("http://localhost:3000/ramens", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      console.log('New ramen has been added to the server.');
    })
    .catch(error => {
      console.error('There was a problem with the add request:', error);
    });

    event.target.reset();
  });
}
