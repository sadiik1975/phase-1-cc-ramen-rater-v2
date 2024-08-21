// index.js

// Function to fetch and display all ramens
export function displayRamens() {
  // Mock fetch call to get ramen data
  const ramenData = [
      {
          id: 1,
          name: 'Shoyu Ramen',
          image: 'shoyu-ramen.jpg'
      },
      {
          id: 2,
          name: 'Miso Ramen',
          image: 'miso-ramen.jpg'
      },
      // Add more ramen data as needed
  ];

  const ramenMenuDiv = document.getElementById('ramen-menu');
  ramenMenuDiv.innerHTML = ''; // Clear any existing content

  ramenData.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id; // Store the ramen id in the dataset for reference
      img.addEventListener('click', (event) => handleClick(ramen, event));
      ramenMenuDiv.appendChild(img);
  });
}

// Function to handle click on a ramen image
export function handleClick(ramen, event) {
  const detailImg = document.querySelector("#ramen-detail .detail-image");
  const detailName = document.querySelector("#ramen-detail .name");
  
  // Update the detail section with the selected ramen's data
  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
}

// Function to attach a submit listener to the form
export function addSubmitListener(form) {
  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const newRamen = {
          name: form.elements['name'].value,
          image: form.elements['image'].value
      };

      // Add the new ramen to the menu
      const ramenMenuDiv = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.addEventListener('click', (event) => handleClick(newRamen, event));
      ramenMenuDiv.appendChild(img);

      // Clear form
      form.reset();
  });
}

// Run the displayRamens function to populate the initial ramen menu
document.addEventListener('DOMContentLoaded', () => {
  displayRamens();

  // Add event listener to the form on page load
  const ramenForm = document.getElementById('new-ramen');
  addSubmitListener(ramenForm);
});
