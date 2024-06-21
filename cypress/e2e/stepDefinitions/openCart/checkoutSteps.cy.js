import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import StorePage from '../../../pages/openCart/StorePage';
import CartPage from '../../../pages/openCart/CartPage';
import CheckoutPage from '../../../pages/openCart/CheckoutPage';
import LoginPage from '../../../pages/openCart/LoginPage';

Given('the guest customer has a iPhone in the cart', () => {
    cy.visit('/index.php?route=product/category&path=24');
    StorePage.addToCart('iPhone');
    CartPage.openCartDropdown();
    CartPage.viewCart();
    cy.url().should('include', '/index.php?route=checkout/cart');
});

Given('the guest customer has the following items in the cart:', (dataTable) => {
    cy.visit('/index.php?route=product/category&path=24');
    dataTable.rawTable.slice(1).forEach(([productName]) => {
        StorePage.addToCart(productName);
    });
    CartPage.openCartDropdown();
    CartPage.viewCart();
    cy.url().should('include', '/index.php?route=checkout/cart');
});

Given('the registered customer has the following items in the cart:', (dataTable) => {
    cy.visit('/index.php?route=account/login');
    LoginPage.login('oxieva@gmail.cat', 'oxieva');
    LoginPage.elements.loginButton().should('exist').and('be.visible').click();
    cy.url().should('include', '/index.php?route=account/account');

    cy.visit('/index.php?route=product/category&path=24');
    dataTable.rawTable.slice(1).forEach(([productName]) => {
        StorePage.addToCart(productName);
    });
    CartPage.openCartDropdown();
    CartPage.viewCart();
    cy.url().should('include', '/index.php?route=checkout/cart');
});

When('the guest customer clicks on the checkout button', () => {
    CartPage.clickCheckoutButton();
});

When('the registered customer clicks on the checkout button', () => {
    CartPage.clickCheckoutButton();
});

Then('the guest customer should be redirected to the checkout page', () => {
    cy.url().should('include', '/index.php?route=checkout/checkout');
});

Then('the guest customer should choose Guest Checkout and click Continue', () => {
    CheckoutPage.selectGuestCheckout();
});

Then('the guest customer should fill the form billing details', () => {
    CheckoutPage.fillBillingDetails();
});

Then('the guest customer should fill the form delivery method', () => {
    CheckoutPage.fillDeliveryMethod();
});


Then('the guest customer should fill the form payment method', () => {
    CheckoutPage.fillPaymentMethod();
});

Then('the guest customer should be able to click Confirm order', () => {
    CheckoutPage.clickConfirmOrderButton();
});

Then('the order subtotal should be {string}', (expectedSubtotal) => {
    CheckoutPage.verifyOrderSubtotal(expectedSubtotal);
});

Then('the order total should be {string}', (expectedTotal) => {
    CheckoutPage.verifyOrderTotal(expectedTotal);
});

Then('the flat shipping rate should be {string}', (expectedFlatShippingRate) => {
    CheckoutPage.verifyFlatShippingRate(expectedFlatShippingRate);
});

Then('the order VAT should be {string}', (expectedVAT) => {
    CheckoutPage.verifyOrderVAT(expectedVAT);
});

Then('the total should be the sum of subtotal, flat shipping rate, and VAT', () => {
    CheckoutPage.verifyTotalCalculation();
});

Then('the guest customer should fill the form payment method without agreeing to terms and conditions', () => {
    CheckoutPage.fillPaymentMethodWithoutAgreeing();
});

Then('the guest customer should see the warning message {string}', (expectedWarningMessage) => {
    CheckoutPage.verifyWarningMessage(expectedWarningMessage);
});

Then('the guest customer should be redirected to the Success page with the message "Your order has been placed!"', () => {
    cy.url().should('include', '/index.php?route=checkout/success');
    cy.contains('Your order has been placed!').should('be.visible');
});

Then('the registered customer should be redirected to the checkout page', () => {
    cy.url().should('include', '/index.php?route=checkout/checkout');
});

Then('the registered customer should see the form billing details with the checkbox "I want to use an existing address" checked and clicks Continue', () => {
    CheckoutPage.checkExistingBillingAddress();
});

Then('the registered customer should see the form delivery details with the checkbox "I want to use an existing address" checked and clicks Continue', () => {
    CheckoutPage.checkExistingDeliveryAddress();
});

Then('the registered customer should fill the form delivery method', () => {
    CheckoutPage.fillDeliveryMethod();
});

Then('the registered customer should fill the form payment method', () => {
    CheckoutPage.fillPaymentMethod();
});

Then('the registered customer should be able to click Confirm order', () => {
    CheckoutPage.clickConfirmOrderButton();
});

Then('the registered customer should be redirected to the Success page with the message "Your order has been placed!"', () => {
    cy.url().should('include', '/index.php?route=checkout/success');
    cy.contains('Your order has been placed!').should('be.visible');
});
