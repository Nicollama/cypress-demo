// This test is intentionally designed to fail to demonstrate a broken CI pipeline.

describe("demo", () => {
  it("tests demo", () => {
    // Visit the login page of the OrangeHRM demo application
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Enter the correct username
    cy.get("form > div:nth-of-type(1) input").type("Admin");
    
    // *** INTENTIONALLY INCORRECT PASSWORD ***
    // This line uses the wrong password ("admin12" instead of the correct "admin123")
    // which will prevent a successful login and cause the test to fail.
    cy.get("form > div:nth-of-type(2) input").type("admin12");

    // Click the login button
    cy.get("button").click();

    // *** EXPECTED FAILURE POINT ***
    // The test will try to find an element on the dashboard page,
    // but because the login failed, this element will not be found,
    // causing the test to time out and fail.
    cy.url().should('include', '/dashboard'); 
  });
});
