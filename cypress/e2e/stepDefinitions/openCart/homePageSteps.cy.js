import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../../pages/openCart/HomePage';

Given('I am on the home page', () => {
    HomePage.visit();
});

Then('I should see the logo link on the home page', () => {
    HomePage.logolink().should('be.visible');
});
