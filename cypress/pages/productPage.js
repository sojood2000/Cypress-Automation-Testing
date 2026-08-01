class productPage {
  elements = {
    product: () => cy.get('a[data-test^="product-"]'),
    productNameInProductPage: () => cy.get('h1[data-test="product-name"]'),
    productImage: () => cy.get("img.figure-img"),
    productPrice: () => cy.get('[data-test="unit-price"]'),
    productDescription: () => cy.get('[data-test="product-description"]'),
    addToCartBtn: () => cy.get('[data-test="add-to-cart"]'),
    addToFavoritesBtn: () => cy.get('[data-test="add-to-favorites"]'),
    navigateToCart: () => cy.get('[data-test="nav-cart"]'),
    cartQuantity: () => cy.get('[data-test="product-quantity"]'),
    favoriteUnauthorizedMessage: () => cy.get(".toast-message"),
    increaseQuantityBtn: () => cy.get('[data-test="increase-quantity"]'),
    decreaseQuantityBtn: () => cy.get('[data-test="decrease-quantity"]'),
    quantityValue: () => cy.get('[data-test="quantity"]'),
    specificationTable: () => cy.get('[data-test="product-specs"]'),
    specificationRows: () => cy.get('[data-test="spec-row"]'),
    handelMaterial: () => cy.get('[data-test-spec="handle-material"]'),
    material: () => cy.get('[data-test-spec="material"]'),
    weight: () =>
      cy.get('[data-test-spec="weight"] [data-test="spec-value-text"]'),
  };
}
export default new productPage();
