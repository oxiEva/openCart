class CartPage {
    elements = {
        cartButton: () => cy.get('#cart-total'),
        dropdown: () => cy.get('.dropdown-menu'),
        viewCartButton: () => cy.contains('View Cart'),
        checkoutButton: () => cy.contains('Checkout'),
        productList: () => cy.get('.table.table-bordered tbody tr'),
        productName: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) td:nth-child(2) a`),
        productImage: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) td:nth-child(1) img`),
        productPrice: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) td:nth-child(5)`),
        productQuantity: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) td:nth-child(4) .form-control`),
        productSubtotal: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) td:nth-child(6)`),
        totalItems: () => cy.get('#cart-total'),
        totalPrice: () => cy.get('td:contains("Total") + td'),
        removeButton: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) button[type='button']`),
        updateButton: (index) => cy.get(`.table.table-bordered tbody tr:nth-child(${index}) button[type='submit']`),
    }

    openCartDropdown() {
        this.elements.cartButton().click();
    }

    viewCart() {
        this.elements.dropdown().should('be.visible');
        this.elements.viewCartButton().click();
    }

    getProductDetails(index) {
        return cy.wrap({
            name: this.elements.productName(index).invoke('text'),
            image: this.elements.productImage(index).invoke('attr', 'src'),
            price: this.elements.productPrice(index).invoke('text'),
            quantity: this.elements.productQuantity(index).invoke('val'),
            subtotal: this.elements.productSubtotal(index).invoke('text')
        });
    }

    getTotalItems() {
        return this.elements.totalItems().invoke('text');
    }

    getTotalPrice() {
        return this.elements.totalPrice().invoke('text').then((text) => parseFloat(text.replace(/[^0-9.-]+/g, "")));
    }

    removeProduct(index) {
        this.elements.removeButton(index).should('be.visible').and('exist').click();
    }

    clickUpdateButton(index) {
        this.elements.updateButton(index).click();
    }

    clickCheckoutButton() {
        this.elements.checkoutButton().should('be.visible').click();
    }

    updateQuantity(index, quantity){
        this.elements.totalItems().its('length').should('eq', 1);
        this.elements.productQuantity(index).clear().type(quantity);
    }
}

export default new CartPage();
