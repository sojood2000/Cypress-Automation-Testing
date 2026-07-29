class homePage {
  elements = {
    sortFilter: () => cy.get('[data-test="sort"]'),
    searchInput: () => cy.get('[data-test="search-query"]'),
    searchBtn: () => cy.get('[data-test="search-submit"]'),
    priceSliderMax: () => cy.get(".ngx-slider-pointer-max"),
    productPrice: () => cy.get('[data-test="product-price"]'),
    category: () =>
      cy.contains("label", "Hammer").find('input[type="checkbox"]'),
    productName: () => cy.get('[data-test="product-name"]'),
    productCardS: () => cy.get('a.card[data-test^="product-"]:visible'),
    startWithProductInCard: () => cy.get('a[data-test^="product-"]'),
  };
}

export default new homePage();
