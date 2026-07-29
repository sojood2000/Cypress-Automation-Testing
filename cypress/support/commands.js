import loginPage from "../pages/loginPage";
import loginData from "../fixtures/loginData.json"



Cypress.Commands.add('login', (email, password) => {
    cy.fixture('loginData.json').then((loginData) => {
        const { email: validEmail, password: validPassword } = loginData.validData;
        const emailToUse = email;
        const passwordToUse = password;
        
        loginPage.loginFun(emailToUse, passwordToUse);
    });
    });