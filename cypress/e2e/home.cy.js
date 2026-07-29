import homePage from "../pages/homePage";
import loginPage from "../pages/loginPage";

beforeEach(() => {
  cy.visit("/auth/login");
  cy.login(); // common command to login using valid credentials
  //visiting home page
  cy.visit("/");
});

describe("Filters", () => {
  //it1 sort by pricig range
  it("Verify products are filtered based on selected price range", () => {
    // Move slider
    homePage.elements
      .priceSliderMax()
      .focus()
      .type("{leftArrow}".repeat(70), { delay: 100 });
    // Verify slider value
    homePage.elements
      .priceSliderMax()
      .invoke("attr", "aria-valuenow")
      .then((value) => {
        cy.log("Slider value: " + value);
        expect(Number(value)).to.be.at.most(30);
      });
    cy.wait(3000); // Wait for products update
    homePage.elements.productPrice().should("exist");

    //assertion// Verify displayed products prices
    homePage.elements.productPrice().each(($price) => {
      const price = Number($price.text().replace("$", "").trim());
      expect(price).to.be.at.most(30);
    });
  });

  //it2 search for product
  it("Search", () => {
    //search for a product using the search input and verify the results
    homePage.elements.searchInput().type("Hammer{enter}");
    homePage.elements.searchBtn().click();
    cy.wait(1000); //wait for the search results to load
    //log the product names in the search results
    homePage.elements.productName().each(($product) => {
      cy.log($product.text().trim());
    });
    //Assertion
    homePage.elements.productCardS().each(($product) => {
      cy.wrap($product)
        .find('[data-test="product-name"]')
        .invoke("text")
        .then((productName) => {
          expect(productName.trim().toLowerCase()).to.contain("hammer");
        });
    });
  });

  //it3 category checkbox
  it("category", () => {
    //select the category checkbox and verify the displayed products belong to the selected category
    homePage.elements.category().click({ force: true });
    // verify checkbox is selected
    homePage.elements.category().should("be.checked");
    cy.wait(2000); //wait for the products to be filtered based on the selected category
    //assertion
    homePage.elements.startWithProductInCard().each(($product) => {
      const productName = $product
        .find('[data-test="product-name"]')
        .text()
        .trim();
      expect(productName.toLowerCase()).to.contain("hammer");
    });
  });
});
