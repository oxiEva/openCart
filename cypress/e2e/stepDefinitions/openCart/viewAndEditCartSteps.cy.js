import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import StorePage from '../../../pages/openCart/StorePage';
import CartPage from '../../../pages/openCart/CartPage';

Given('the user is on the phones and PDAs page', () => {
    cy.visit('/index.php?route=product/category&path=24');
});

Given('the user has the following items to the cart:', (dataTable) => {
    dataTable.rawTable.slice(1).forEach(([productName]) => {
        StorePage.addToCart(productName);
    });
});

When('the user clicks at the button cart', () => {
    CartPage.openCartDropdown();
});

Then('the user views the cart', () => {
    CartPage.elements.dropdown().should('be.visible');
});

Then('the user clicks at the button view cart', () => {
    CartPage.viewCart();
});

Then('the user should be redirects to the checkout cart', () => {
    cy.url().should('include', '/index.php?route=checkout/cart');
});

Then('the user should see a list of all added products', () => {
    CartPage.getProductDetails(1).then((product) => {
        product.name.should('eq', 'HTC Touch HD');
        product.image.should('eq', 'http://opencart.abstracta.us:80/image/cache/catalog/demo/htc_touch_hd_1-47x47.jpg');
        product.price.should('eq', '$122.00');
        product.quantity.should('eq', '1'); 
        product.subtotal.should('eq', '$122.00'); 
    });

    CartPage.getProductDetails(2).then((product) => {
        product.name.should('eq', 'iPhone');
        product.image.should('eq', 'http://opencart.abstracta.us:80/image/cache/catalog/demo/iphone_1-47x47.jpg');
        product.price.should('eq', '$123.20');
        product.quantity.should('eq', '1'); 
        product.subtotal.should('eq', '$123.20'); 
    });
});

Then('the total number of items and the total price of the cart should be displayed', () => {
    CartPage.getTotalItems().then((totalItems) => {
        expect(totalItems).to.include('2 item(s)');
    });
});

Then('the user should be able to remove a product {string}', (index) => {
    CartPage.removeProduct(1);
});

Then('the user should see only {string}', (remainingProductName) => {
    CartPage.getProductDetails(2).then((product) => {
        product.name.should('eq', remainingProductName);
    });
});

Then('the user shoud be able to add another {string}', () => {
    CartPage.updateQuantity(1, 2);
    CartPage.clickUpdateButton(1);
    CartPage.elements.totalItems().should('have.text', '2 item(s) - $246.40');
});

// Catch uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('pagespeed is not defined')) {
        return false; // prevent Cypress from failing the test
    }
});
