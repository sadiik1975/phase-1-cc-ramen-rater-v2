import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/dom';
import { loadRamens, showRamenDetails, setupForm } from './index.js';

// Setup test DOM before each test
beforeEach(() => {
  document.body.innerHTML = `
    <div id="ramen-menu"></div>
    <div id="ramen-detail">
      <img class="detail-image" src="" alt="">
      <h2 id="ramen-name"></h2>
      <h3 id="restaurant-name"></h3>
      <p id="rating-display"></p>
      <p id="comment-display"></p>
      <button id="delete-button"></button> <!-- Added missing delete button -->
    </div>
    <form id="new-ramen">
      <input id="new-name" type="text" required>
      <input id="new-restaurant" type="text" required>
      <input id="new-image" type="text" required>
      <input id="new-rating" type="number" required>
      <input id="new-comment" type="text" required>
      <button id="submit-button" type="submit">Add Ramen</button>
    </form>
  `;
});

// Mock Fetch Data
const mockRamens = [
  { id: 1, name: "Shoyu Ramen", restaurant: "Nonono", image: "http://localhost:3000/assets/ramen/shoyu.jpg", rating: 7, comment: "Classic!" },
  { id: 2, name: "Miso Ramen", restaurant: "Miso House", image: "http://localhost:3000/assets/ramen/miso.jpg", rating: 8, comment: "Rich and tasty!" }
];

global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockRamens) }));

// Test: Load Ramens
describe("loadRamens", () => {
  it("should fetch and display ramen images", async () => {
    loadRamens();
    await waitFor(() => {
      expect(document.querySelectorAll("#ramen-menu img").length).toBe(mockRamens.length);
    });
  });
});

// Test: Click on Ramen Image
describe("showRamenDetails", () => {
  it("should update ramen details", () => {
    showRamenDetails(mockRamens[0]);

    expect(document.getElementById("ramen-name").textContent).toBe(mockRamens[0].name);
    expect(document.getElementById("restaurant-name").textContent).toBe(mockRamens[0].restaurant);
    
    // Ensure delete button is assigned the correct id
    const deleteButton = document.getElementById("delete-button");
    expect(deleteButton).not.toBeNull();
    expect(deleteButton.dataset.id).toBe(String(mockRamens[0].id));
  });
});

// Test: Add New Ramen
describe("setupForm", () => {
  it("should add new ramen when form is submitted", async () => {
    setupForm();

    document.getElementById("new-name").value = "Spicy Tonkotsu";
    document.getElementById("new-restaurant").value = "Tonkotsu Heaven";
    document.getElementById("new-image").value = "http://localhost:3000/assets/ramen/spicy.jpg";
    document.getElementById("new-rating").value = "9";
    document.getElementById("new-comment").value = "Spicy and creamy!";

    fireEvent.submit(document.getElementById("new-ramen"));

    await waitFor(() => {
      expect(document.querySelectorAll("#ramen-menu img").length).toBe(1);
    });
  });
});
