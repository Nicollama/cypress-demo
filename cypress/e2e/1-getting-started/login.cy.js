describe("demo", () => {
    it("tests demo", () => {
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      cy.get("form > div:nth-of-type(1) input").type("Admin");
      cy.get("form > div:nth-of-type(2) input").type("admin123");
      cy.get("button").click();
    });
  });
  