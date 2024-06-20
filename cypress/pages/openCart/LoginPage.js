class LoginPage {
    elements = {
        inputEmail: () => cy.get('#input-email'),
        inputPassword: () => cy.get('#input-password'),
        loginButton: () => cy.get('input[type=submit][value="Login"]'),
    }

    visit() {
        cy.visit('/index.php?route=account/login');
    }

    login(email, password) {
        this.elements.inputEmail().type(email, { delay: 0 });
        this.elements.inputPassword().type(password, { delay: 0 });
    }
}

export default new LoginPage();
