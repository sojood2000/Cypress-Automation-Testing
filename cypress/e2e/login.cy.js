import loginPage from "../pages/loginPage";
import loginData from "../fixtures/loginData.json"

beforeEach( () =>{
    cy.visit('/auth/login'); 
});

describe ('Login form', () =>{
    it('login with valid data', () =>{
        const {email,password}= loginData.validData;
        loginPage.loginFun(email,password);
        //assertion
        cy.url().should('include', '/account');
        loginPage.elements.userName().should('be.visible').and('contain.text','test');

    })

    it('login with invalid Email', () =>{
        const {email,password}= loginData.invalidEmail
        loginPage.loginFun(email,password);
        //assertion
        loginPage.elements.invalidEmailMessage().should('be.visible').and('contain.text','Email format is invalid');
        cy.url().should('include', '/auth/login');

    })
    
    it('login with invalid password', () =>{

        const {email,password}= loginData.invalidPassword
        loginPage.loginFun(email,password);
        //assertion
        loginPage.elements.invalidPasswordMessage().should('be.visible').and('contain.text','Invalid email or password');
        cy.url().should('include', '/auth/login');
    })

    it('login with empty credentials', () =>{
        const {email,password}= loginData.emptyFields
        loginPage.loginFun(null,null);
        //assertion
        loginPage.elements.invalidEmailMessage().should('be.visible').and('contain.text','Email is required');
        loginPage.elements.invalidEmptyFieldsMessage().should('be.visible').and('contain.text','Password is required');

    })

    it('Multiple clicks on the submit button', () =>{
        const {email,password}= loginData.validData;
        const {userName}= loginData.validData;
        loginPage.elements.email().type(email);
        loginPage.elements.password().type(password);
        for(let i=0; i<3; i++){
        loginPage.elements.loginBtn().click();
        }
        //assertion
        cy.contains('Invalid email or password').should('not.exist');
        cy.url().should('include', '/account');
        loginPage.elements.userName().should('be.visible').and('contain.text',userName);
        
    })

});