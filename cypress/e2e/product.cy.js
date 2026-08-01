import productPage from "../pages/productPage";
import loginPage from "../pages/loginPage";

beforeEach(() => {
  cy.visit("/auth/login");
  cy.login(); // common command to login using valid credentials
  //visiting home page
  cy.visit("/");
});

describe("interaction on the product", () => {
  //it1 verify the product details page is displayed when a product is clicked
  it("verify product details page", () => {
    //click on the product
    productPage.elements.product().contains("Hammer").click();
    //assertion//verify the product details page is displayed
    productPage.elements.productNameInProductPage().should("be.visible");
    productPage.elements.productImage().should("be.visible");
    productPage.elements.productPrice().should("be.visible");
    productPage.elements.productDescription().should("be.visible");
    productPage.elements.specificationTable().should("be.visible");
    productPage.elements.specificationRows().should("have.length", 6);
    productPage.elements.handelMaterial().should("be.visible");
    productPage.elements.material().should("be.visible");
    productPage.elements.weight().invoke("text").should("match", /^\d+$/);
  });

  //it2 adding to cart
  it("add to cart", () => {
    //click on the product and add it to the cart
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToCartBtn().click();
    cy.wait(1000); //wait for the confirmation message to appear
    //assertion
    cy.contains("Product added to shopping cart.").should("be.visible");
    productPage.elements.navigateToCart().click();
    productPage.elements.cartQuantity().should("have.value", "1");
    cy.get('[data-test="product-title"]')
      .contains("Hammer")
      .should("be.visible");
  });

  //it3 adding to favorite list
  it("add to favorite", () => {
    //click on the product and add it to the favorite list
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToFavoritesBtn().click();
    cy.wait(1000); //wait for the message to appear
    //assertion
    productPage.elements
      .favoriteUnauthorizedMessage()
      .should("be.visible")
      .and("contain", "Unauthorized");
  });

  //it4 and it5 change quantity
  describe("Change quantit", () => {
    //it4 increase quantity
    it("Verify user can increase product quantity", () => {
      productPage.elements.product().contains("Hammer").click();
      productPage.elements
        .quantityValue()
        .invoke("val")
        .then((initialQuantity) => {
          const initialValue = Number(initialQuantity);

          productPage.elements.increaseQuantityBtn().click();

          productPage.elements
            .quantityValue()
            .invoke("val")
            .then((newQuantity) => {
              const newValue = Number(newQuantity);

              expect(newValue).to.be.greaterThan(initialValue);
            });
        });
    });
    //it5 decrease qunatity
    it("Verify user can decrease product quantity", () => {
      productPage.elements.product().contains("Hammer").click();
      productPage.elements
        .quantityValue()
        .invoke("val")
        .then((initialQuantity) => {
          const initialValue = Number(initialQuantity);

          productPage.elements.increaseQuantityBtn().click();
          productPage.elements.decreaseQuantityBtn().click();

          productPage.elements
            .quantityValue()
            .invoke("val")
            .then((newQuantity) => {
              const newValue = Number(newQuantity);

              expect(newValue).to.be.equal(initialValue);
            });
        });
    });
  });
});
