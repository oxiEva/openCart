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
        continueButtonShippingAddress: () => cy.get('#button-shipping-address'),
        existingBillingAddressCheckbox: () => cy.get('input[name="payment_address"][value="existing"]'),
        continueButtonBillingAddress: () => cy.get('#button-payment-address'),
        existingDeliveryAddressCheckbox: () => cy.get('input[name="shipping_address"][value="existing"]'),
        orderSubtotal: () => cy.get('tr:contains("Sub-Total:") td:nth-child(2)'),
        orderTotal: () => cy.get('tr:contains("Total:") td:nth-child(2)'),
        flatShippingRate: () => cy.get('tr:contains("Flat Shipping Rate:") td:nth-child(2)'),
        orderVAT: () => cy.get('tr:contains("VAT (20%):") td:nth-child(2)'),
        warningMessage: () => cy.get('.alert.alert-danger')
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
        this.elements.continueButtonShippingAddress().should('be.visible').click();
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

    fillPaymentMethodWithoutAgreeing() {
        this.elements.paymentMethodForm().within(() => {
            cy.get('textarea[name="comment"]').should('be.visible').and('exist').type('Please leave the package at the front door');
        });
        cy.get('#button-payment-method').should('be.visible').click();
    }

    agreeToTermsAndConditions() {
        this.elements.agreeCheckbox().check();
    }

    clickConfirmOrderButton() {
        this.elements.confirmOrderButton().should('be.visible').click();
    }

    checkExistingBillingAddress() {
        this.elements.existingBillingAddressCheckbox().should('be.checked');
        this.elements.continueButtonBillingAddress().should('be.visible').click();
    }

    checkExistingDeliveryAddress() {
        this.elements.existingDeliveryAddressCheckbox().should('be.checked');
        this.elements.continueButtonShippingAddress().should('be.visible').click();
    }

    verifyWarningMessage(expectedWarningMessage) {
        this.elements.warningMessage().should('contain.text', expectedWarningMessage);
    }

    verifyOrderSubtotal(expectedSubtotal) {
        this.elements.orderSubtotal().should('have.text', expectedSubtotal);
    }

    verifyOrderTotal(expectedTotal) {
        this.elements.orderTotal().should('be.visible').and('have.text', expectedTotal);
    }

    verifyFlatShippingRate(expectedFlatShippingRate) {
        this.elements.flatShippingRate().should('have.text', expectedFlatShippingRate);
    }

    verifyOrderVAT(expectedVAT) {
        this.elements.orderVAT().should('have.text', expectedVAT);
    }

    verifyTotalCalculation() {
        const getSubtotal = () => parseFloat(this.elements.orderSubtotal().invoke('text').then(text => text.replace('$', '')));
        const getFlatShippingRate = () => parseFloat(this.elements.flatShippingRate().invoke('text').then(text => text.replace('$', '')));
        const getVAT = () => parseFloat(this.elements.orderVAT().invoke('text').then(text => text.replace('$', '')));
        const getTotal = () => parseFloat(this.elements.orderTotal().invoke('text').then(text => text.replace('$', '')));

        cy.wrap(null).then(() => {
            return Promise.all([getSubtotal(), getFlatShippingRate(), getVAT(), getTotal()]);
        }).then(([subtotal, flatShippingRate, vat, total]) => {
            expect(total).to.equal(subtotal + flatShippingRate + vat);
        });
    }
}

export default new CheckoutPage();
