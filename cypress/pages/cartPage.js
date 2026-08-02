class cartPage {
  elements = {
    row: () => cy.get("tr.ng-star-inserted"),
    item: () => cy.get('[data-test="product-title"]'),
    quantity: () => cy.get('[data-test="product-quantity"]'),
    price: () => cy.get('[data-test="product-price"]'),
    ProductTotal: () => cy.get('[data-test="line-price"]'),
    cartTotal: () => cy.get('[data-test="cart-total"]'),
    removeProdcut: () => cy.get("a.btn-danger"),
    continuseShopping: () => cy.get('[data-test="continue-shopping"]'),
    proceedToCheckout: () => cy.get('[data-test="proceed-1"]'),
    verifyDeletedMessage: () => cy.get(".overlay-container"),
    backToHome: () => cy.get('[data-test="nav-home"]'),
  };
}
export default new cartPage();
