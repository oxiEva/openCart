import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import StorePage from '../../../pages/openCart/StorePage';

let totalPrice = 0;
let productPrices = {};

Given('the user is on the home page', () => {
    StorePage.visit();
});

When('the user clicks on the "Add to Cart" button for a product {string}', (productName) => {
    StorePage.getProductPrice(productName).then((price) => {
        productPrices[productName] = price;
    });
    StorePage.addToCart(productName);
});

When('the user adds the following items to the cart:', (dataTable) => {
    totalPrice = 0; 
    productPrices = {}; 
    const products = dataTable.rawTable.slice(1);

    cy.wrap(products).each((row) => {
        const productName = row[0];
        StorePage.getProductPrice(productName).then((price) => {
            totalPrice += price;
            productPrices[productName] = price;
            StorePage.addToCart(productName);
        });
    });
});

Then('the product {string} is added to the cart', (productName) => {
    StorePage.elements.confirmationMessage().should('be.visible').and('contain.text', `Success: You have added ${productName} to your shopping cart!`);
});

Then('a confirmation message {string} is displayed', (message) => {
    StorePage.elements.confirmationMessage().should('be.visible').and('contain.text', message);
});

Then('the cart icon updates the number of items to {int}', (itemCount) => {
    StorePage.elements.cartIcon().should('contain.text', `${itemCount} item(s)`);
});

Then('the cart total price is updated for a single item', () => {
    StorePage.elements.cartIcon().then(($cart) => {
        const cartText = $cart.text();
        const priceText = cartText.match(/(\d+\.\d+)/)[0];
        const cartPrice = parseFloat(priceText);

        expect(cartPrice).to.be.greaterThan(0);
    });
});

Then('the cart contains {int} items', (itemCount) => {
    StorePage.elements.cartIcon().should('contain.text', `${itemCount} item(s)`);
});

Then('the total price is the sum of the prices of the added products', () => {
    StorePage.elements.cartIcon().then(($cart) => {
        const cartText = $cart.text();
        const priceText = cartText.match(/(\d+\.\d+)/)[0];
        
        const cartPrice = parseFloat(priceText);
        const expectedTotalPrice = Object.values(productPrices).reduce((total, price) => total + price, 0);
        const expectedTotalPriceFormatted = parseFloat(expectedTotalPrice.toFixed(1));

        // console.log('Original');
        // console.log(cartPrice);
        // console.log(`Original expectedTotalPrice`);
        // console.log(expectedTotalPriceFormatted);
    
        expect(cartPrice).to.equal(expectedTotalPriceFormatted);   
    });
});
