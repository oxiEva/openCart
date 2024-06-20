import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import StorePage from '../../../pages/openCart/StorePage';
import CartPage from '../../../pages/openCart/CartPage';
import CheckoutPage from '../../../pages/openCart/CheckoutPage';
import LoginPage from '../../../pages/openCart/LoginPage';

Given('the user is on the login', () => {
    cy.visit('/index.php?route=account/login');
});

When('the user fills login form with email {string} and password {string}', (email, password) => {
    LoginPage.login(email, password);
});

When('the user clicks Login button', () => {
    LoginPage.elements.loginButton().should('exist').and('be.visible').click();
});

Then('the user should be redirected to her account', () => {
    cy.url().should('include', '/index.php?route=account/account');
});

Given('the user is on the phones page', () => {
    cy.visit('/index.php?route=product/category&path=24');
});

Given('the user has the following item to the cart:', (dataTable) => {
    dataTable.rawTable.slice(1).forEach(([productName]) => {
        StorePage.addToCart(productName);
    });
});

When('the user clicks at button cart', () => {
    CartPage.openCartDropdown();
});

When('the user views cart', () => {
    CartPage.elements.dropdown().should('be.visible');
});

When('the user clicks button view cart', () => {
    CartPage.viewCart();
});

Then('the user should be redirected to the checkout cart', () => {
    cy.url().should('include', '/index.php?route=checkout/cart');
});

When('the user clicks on the checkout button', () => {
    CartPage.clickCheckoutButton();
});

Then('the user should be redirected to the checkout page', () => {
    cy.url().should('include', '/index.php?route=checkout/checkout');
});

Then('the user should choose Guest Checkout and click Continue', () => {
    CheckoutPage.selectGuestCheckout();
});

Then('the user should fill the form billing details', () => {
    CheckoutPage.fillBillingDetails();
});

Then('the user should fill the form delivery method', () => {
    CheckoutPage.fillDeliveryMethod();
});

Then('the user should fill the form payment method', () => {
    CheckoutPage.fillPaymentMethod();
});

Then('the user should be able to click Confirm order', () => {
    CheckoutPage.clickConfirmOrderButton();
});

Then('the user should be redirected to the Success page', () => {
    cy.url().should('include', '/index.php?route=checkout/success');
});

Then('the user should check I want to use an existing address from billing details and click Continue', () => {
    CheckoutPage.checkSameAddress();
});

Then('the user should check I want to use an existing address from delivery details and click Continue', () => {
    CheckoutPage.checkSameAddress();
});

Then('the user should see checked the form delivery method and click Continue', () => {
    CheckoutPage.fillDeliveryMethod();
});

Then('the user should see checked Please select the preferred payment method to use on this order...', () => {
    CheckoutPage.fillPaymentMethod();
});

Then('click the checkbox of Terms and Conditions and Continue', () => {
    CheckoutPage.agreeToTermsAndConditions();
    cy.get('#button-payment-method').should('be.visible').click();
});

// Catch uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('pagespeed is not defined')) {
        return false; // prevent Cypress from failing the test
    }
});
