class StorePage {
    elements = {
        addToCartButton: (productName) => cy.contains(productName).parents('.product-layout').find('.button-group .fa-shopping-cart'),
        confirmationMessage: () => cy.get('.alert-success'),
        cartIcon: () => cy.get('#cart-total'),
        productPrice: (productName) => cy.contains(productName).parents('.product-layout').find('.price')
    }

    visit() {
        cy.visit('/');
    }
    
    addToCart(productName) {
        this.elements.addToCartButton(productName).click();
    }

    getProductPrice(productName) {
        return this.elements.productPrice(productName).invoke('text').then((text) => {
            return parseFloat(text.replace(/[^0-9.-]+/g, ""));
        });
    }
}

export default new StorePage();
