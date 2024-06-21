import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/openCart/LoginPage';

beforeEach(function() {
    cy.fixture('userCredentials').then(credentials => {
        this.credentials = credentials;
    })
});
Given('the user is on the login page', () => {
    LoginPage.visit();
});

When('the user fills the login form with valid credentials', function() {
    LoginPage.login(this.credentials.email, this.credentials.password);
});

When('the user clicks the Login button', () => {
    LoginPage.elements.loginButton().should('exist').and('be.visible').click();
});

Then('the user should be redirect to his account', () => {
    cy.url().should('include', '/index.php?route=account/account');
    cy.contains('My Account').should('be.visible');
});
