import cartPage from "../pages/cartPage";
import productPage from "../pages/productPage";

beforeEach(() => {
  cy.visit("/auth/login");
  cy.login(); // common command to login using valid credentials
  //visiting home page
  cy.visit("/");
});

describe("cart and checkout", () => {
  // describe("intaract with the cart", () => {
  //it1
  it("Verify cart details are displayed correctly", () => {
    // add product to cart
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToCartBtn().click();
    productPage.elements.navigateToCart().click();
    //assertions
    // verify product details
    cartPage.elements.item().should("be.visible").and("contain.text", "Hammer");
    // verify quantity
    cartPage.elements.quantity().should("have.value", "1");
    // verify price
    cartPage.elements
      .price()
      .invoke("text")
      .then((price) => {
        expect(price.trim()).to.equal("$13.41");
      });
    // verify product total
    cartPage.elements
      .ProductTotal()
      .invoke("text")
      .then((total) => {
        expect(total.trim()).to.equal("$13.41");
      });
    // verify cart total
    cartPage.elements.cartTotal().should("contain.text", "$13.41");
  });

  //it2
  it("verify user can change the quantity value", () => {
    // Add product to cart and navigate to cart page
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToCartBtn().click();
    productPage.elements.navigateToCart().click();

    // Get product price
    cartPage.elements
      .price()
      .invoke("text")
      .then((priceText) => {
        const price = parseFloat(priceText.replace("$", "").trim());

        //change quantity value
        cartPage.elements
          .quantity()
          .invoke("val", "2")
          .trigger("input")
          .trigger("change");

        // Expected total
        const expectedTotal = Number((price * 2).toFixed(2));

        // Verify product total
        cartPage.elements.ProductTotal().should(($total) => {
          const total = parseFloat($total.text().replace("$", "").trim());

          expect(total).to.equal(expectedTotal);
        });

        // Verify cart total
        cartPage.elements.cartTotal().should(($cartTotal) => {
          const cartTotal = parseFloat(
            $cartTotal.text().replace("$", "").trim(),
          );

          expect(cartTotal).to.equal(expectedTotal);
        });
      });
  });

  describe("remove product from cart", () => {
    //it3 remove product from cart
    it("verify user can remove product from cart", () => {
      // Add product to cart and navigate to cart page
      productPage.elements.product().contains("Hammer").click();
      productPage.elements.addToCartBtn().click();
      productPage.elements.navigateToCart().click();
      //click on remove button
      cartPage.elements.removeProdcut().click();
      //assertion// the product should be hidden and the total and cart total should be changed
      cartPage.elements.row().should("not.exist");
      //verify deleted message is appear
      cartPage.elements.verifyDeletedMessage().should("be.visible");
    });

    //it4 check the cart total after delete product
    it("verify the cart total after deleting product", () => {
      // Add product to cart
      productPage.elements.product().contains("Hammer").click();
      productPage.elements.addToCartBtn().click();
      cy.contains("Product added to shopping cart").should("be.visible");
      //return to home page
      cartPage.elements.backToHome().click();
      // add another product to cart
      productPage.elements.product().contains("Pliers").click();
      productPage.elements.addToCartBtn().click();
      cy.contains("Product added to shopping cart").should("be.visible");
      // navigate to cart page
      productPage.elements.navigateToCart().click();
      cartPage.elements.item().should("have.length", 2);
      // verify the cart total before deleting product
      cartPage.elements
        .cartTotal()
        .invoke("text")
        .then((cartTotalText) => {
          const cartTotalOrigin = parseFloat(
            cartTotalText.replace("$", "").trim(),
          );
          // delete the first product and verify the cart total after deletion
          cartPage.elements
            .ProductTotal()
            .first()
            .invoke("text")
            .then((productTotalText) => {
              const productTotalOrigin = parseFloat(
                productTotalText.replace("$", "").trim(),
              );

              cartPage.elements.removeProdcut().first().click();
              cartPage.elements.item().should("have.length", 1);
              cartPage.elements
                .cartTotal()
                .invoke("text")
                .then((cartTotalAfterDeleteText) => {
                  const cartTotalAfterDelete = parseFloat(
                    cartTotalAfterDeleteText.replace("$", "").trim(),
                  );

                  expect(cartTotalAfterDelete).to.equal(
                    Number((cartTotalOrigin - productTotalOrigin).toFixed(2)),
                  );
                });
            });
        });
    });
  }); //close describe remove product from cart

  //it5 verify user can continue shopping
  it("verify user can continue shopping", () => {
    // Add product to cart and navigate to cart page
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToCartBtn().click();
    productPage.elements.navigateToCart().click();
    //click on continue shopping button
    cartPage.elements.continuseShopping().click();
    //assertion// the user should be redirected to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  //it6 verify user can proceed to checkout
  it("verify user can proceed to checkout", () => {
    // Add product to cart and navigate to cart page
    productPage.elements.product().contains("Hammer").click();
    productPage.elements.addToCartBtn().click();
    productPage.elements.navigateToCart().click();
    //click on proceed to checkout button
    cartPage.elements.proceedToCheckout().click();
    //assertion// the user should be redirected to checkout page
    cy.url().should("eq", Cypress.config().baseUrl + "/checkout");
  });
}); //close describe cart and checkout
