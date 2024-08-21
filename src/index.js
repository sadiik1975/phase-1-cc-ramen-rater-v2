
// Base URL for the API
const BASE_URL = 'http://localhost:3000/ramens';

// Function to display all ramen images in the #ramen-menu div
function displayRamens() {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(ramens => {
            const ramenMenu = document.getElementById('ramen-menu');
            ramenMenu.innerHTML = ''; // Clear the menu before adding images
            ramens.forEach(ramen => {
                const img = document.createElement('img');
                img.src = ramen.image;
                img.alt = ramen.name;
                img.addEventListener('click', () => handleClick(ramen));
                ramenMenu.appendChild(img);
            });
            // Display the first ramen details by default if there are any ramen
            if (ramens.length > 0) {
                handleClick(ramens[0]);
            }
        })
        .catch(error => console.error('Error fetching ramens:', error));
}

// Function to handle the click event on a ramen image and display its details
function handleClick(ramen) {
    const detailImg = document.querySelector("#ramen-detail .detail-image");
    const detailName = document.querySelector("#ramen-detail .name");
    const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    // Display ramen details
    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailsRating.textContent = ramen.rating;
    detailsComment.textContent = ramen.comment;
}

// Function to add a submit event listener to the new-ramen form
function addSubmitListener() {
    const ramenForm = document.getElementById('new-ramen');
    ramenForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the default form submission behavior

        const newRamen = {
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value,
        };

        // Add the new ramen to the DOM
        const ramenMenu = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener('click', () => handleClick(newRamen));
        ramenMenu.appendChild(img);

        // Optionally persist the new ramen to the backend
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRamen),
        })
        .then(response => response.json())
        .then(data => console.log('New ramen added:', data))
        .catch(error => console.error('Error adding ramen:', error));

        ramenForm.reset();  // Clear the form after submission
    });
}

// Main function to start the application logic after the DOM has fully loaded
function main() {
    displayRamens();
    addSubmitListener();
}

// Adding the DOMContentLoaded event listener to run the main function
document.addEventListener('DOMContentLoaded', main);
