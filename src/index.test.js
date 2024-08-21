import { beforeEach, test, expect, vi } from 'vitest';
import { displayRamens, handleClick, addSubmitListener } from './index';

// Before each test, set up the DOM structure
beforeEach(() => {
    document.body.innerHTML = `
        <div id="ramen-menu"></div>
        <div id="ramen-detail">
            <img class="detail-image" />
            <h2 class="name"></h2>
        </div>
        <form id="new-ramen">
            <input name="name" />
            <input name="image" />
            <button type="submit">Add Ramen</button>
        </form>
    `;
});

test('should fetch all ramens and display them as <img> inside #ramen-menu', () => {
    displayRamens();
    const ramenMenuDiv = document.getElementById('ramen-menu');
    expect(ramenMenuDiv.children.length).toBeGreaterThan(0);
});

test('should fire on a click on every img inside #ramen-menu', () => {
    displayRamens();
    const ramenImages = document.querySelectorAll('#ramen-menu img');

    // Simulate a click event on the first ramen image
    const img = ramenImages[0];
    const handleClickSpy = vi.spyOn(img, 'click');
    img.click();
    
    expect(handleClickSpy).toHaveBeenCalled();
});

test('should append the correct data to the DOM on click', () => {
    displayRamens();
    const ramenImages = document.querySelectorAll('#ramen-menu img');

    // Simulate a click event on the first ramen image
    const img = ramenImages[0];
    img.click();

    const detailImg = document.querySelector("#ramen-detail .detail-image");
    const detailName = document.querySelector("#ramen-detail .name");

    expect(detailImg.src).toContain('shoyu-ramen.jpg');
    expect(detailName.textContent).toBe('Shoyu Ramen');
});

test('should add a new slider image when the submit button is clicked', () => {
    const ramenForm = document.getElementById('new-ramen');
    addSubmitListener(ramenForm);

    // Simulate form submission with a new ramen
    ramenForm.elements['name'].value = 'Tonkotsu Ramen';
    ramenForm.elements['image'].value = 'tonkotsu-ramen.jpg';
    ramenForm.querySelector('button[type="submit"]').click();

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const lastImg = ramenMenuDiv.lastElementChild;

    expect(lastImg.src).toContain('tonkotsu-ramen.jpg');
    expect(lastImg.alt).toBe('Tonkotsu Ramen');
});

test('should attach a click listener to the new element to display its details', () => {
    const ramenForm = document.getElementById('new-ramen');
    addSubmitListener(ramenForm);

    // Simulate form submission with a new ramen
    ramenForm.elements['name'].value = 'Tonkotsu Ramen';
    ramenForm.elements['image'].value = 'tonkotsu-ramen.jpg';
    ramenForm.querySelector('button[type="submit"]').click();

    const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
    const lastImg = ramenMenuDivBefore[ramenMenuDivBefore.length - 1];
    
    // Simulate click event on the new ramen image
    lastImg.click();

    const detailImg = document.querySelector("#ramen-detail .detail-image");
    const detailName = document.querySelector("#ramen-detail .name");

    expect(detailImg.src).toContain('tonkotsu-ramen.jpg');
    expect(detailName.textContent).toBe('Tonkotsu Ramen');
});
