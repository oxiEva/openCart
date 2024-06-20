class CheckoutPage {
    elements = {
        billingDetailsForm: () => cy.get('#collapse-payment-address'),
        deliveryMethodForm: () => cy.get('#collapse-shipping-method'),
        paymentMethodForm: () => cy.get('#collapse-payment-method'),
        continueButton: () => cy.get('input[value="Continue"]').first(),
        agreeCheckbox: () => cy.get('input[name="agree"]'),
        confirmOrderButton: () => cy.get('#button-confirm'),
        guestCheckoutRadio: () => cy.get('input[name="account"][value="guest"]'),
        continueButtonGuestCheckout: () => cy.get('#button-account'),
        sameAddressCheckbox: () => cy.get('input[name="shipping_address"][value="1"]'),
        continueButtonShippingAddress: () => cy.get('#button-shipping-address')
    };

    selectGuestCheckout() {
        this.elements.guestCheckoutRadio().check();
        this.elements.continueButtonGuestCheckout().should('be.visible').click();
    }

    fillBillingDetails() {
        this.elements.billingDetailsForm().within(() => {
            cy.get('input[name="firstname"]').should('be.visible').and('exist').type('John');
            cy.get('input[name="lastname"]').should('be.visible').and('exist').type('Doe');
            cy.get('input[name="email"]').type('johndoe@example.com');
            cy.get('input[name="telephone"]').type('555-555-5555');
            cy.get('input[name="address_1"]').type('123 Main St');
            cy.get('input[name="city"]').type('Anytown');
            cy.get('input[name="postcode"]').type('12345');
            cy.get('select[name="country_id"]').select('United Kingdom');
            cy.get('select[name="zone_id"]').select('Cornwall');
        });
        cy.get('#button-guest').should('be.visible').click();
    }

    checkSameAddress() {
        this.elements.sameAddressCheckbox().check();
        this.elements.continueButtonShippingAddress().should('be.visible');
    }

    fillDeliveryMethod() {
        this.elements.deliveryMethodForm().within(() => {
            cy.get('textarea[name="comment"]').should('be.visible').and('exist').type('Please deliver between 9am and 5pm');
        });
        cy.get('#button-shipping-method').should('be.visible').click();
    }

    fillPaymentMethod() {
        this.elements.paymentMethodForm().within(() => {
            cy.get('textarea[name="comment"]').should('be.visible').and('exist').type('Please leave the package at the front door');
        });
        this.agreeToTermsAndConditions();
        cy.get('#button-payment-method').should('be.visible').click();
    }

    agreeToTermsAndConditions() {
        this.elements.agreeCheckbox().check();
    }

    clickConfirmOrderButton() {
        this.elements.confirmOrderButton().should('be.visible').click();
    }
}

export default new CheckoutPage();
