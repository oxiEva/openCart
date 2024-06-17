class HomePage {
    elements = {
        logolink: () => cy.get('#logo'),

    }

    visit() {
        cy.visit('/');
    }

    logolink() {
        return this.elements.logolink();
    }
}

export default new HomePage();
