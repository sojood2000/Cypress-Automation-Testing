class loginPage{
    elements={
        email: () => cy.get('[data-test="email"]'),
        password: () => cy.get('[data-test="password"]'),
        loginBtn: () => cy.get('[data-test="login-submit"]'),
        userName: () => cy.get('[data-test="nav-menu"]'),
        invalidEmailMessage: () => cy.get('[data-test="email-error"]'),
        invalidPasswordMessage: () => cy.get('[data-test="login-error"]'),
        invalidEmptyFieldsMessage: () => cy.get('[data-test="password-error"]')


    };

    loginFun(email,password){
        if(email){
            this.elements.email().type(email);
        }

        if(password){
            this.elements.password().type(password);
        } 

        this.elements.loginBtn().click();
    }

}

export default new loginPage();