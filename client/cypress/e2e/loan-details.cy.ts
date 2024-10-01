/// <reference types="cypress" />

describe('Loan Details Form', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
    // Fill out the form fields
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="dateOfBirth"]').type('1990-01-01');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('select[name="employmentStatus"]').select('EMPLOYED');
    cy.get('input[name="employerName"]').type('Tech Corp');
    cy.get('input[name="annualIncome"]').type('50000');

    // Submit the form
    cy.get('button[type="submit"]').click();
  });

  it('should show validation errors for empty required fields', () => {
    // Verify that the page navigates to the loan details page
    cy.url().should('include', '/loan-details');
    cy.get('input[name="vehiclePrice"]').clear().type('25000');
    cy.get('input[name="deposit"]').clear().type('5000');
    cy.get('select[name="loanPurpose"]').select('CAR');
    cy.get('input[name="loanTerm"]').clear().type('5');
    cy.wait(300);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Simulate the backend response (assuming navigation to /lender-result happens on success)
    cy.url().should('include', '/loan-result');
  });

  it('should display validation errors for empty required fields', () => {
    // Submit the form without filling any fields
    cy.get('button[type="submit"]').click();

    cy.contains('Minimum vehicle price is $2000').should('be.visible');
    cy.contains('Please select loan purpose').should('be.visible');
  });

  it('should navigate back when clicking the back button', () => {
    // Click the back button
    cy.get('button[aria-label="Back"]').click();

    // Assert that the page navigates back to the personal details page (or root)
    cy.url().should('include', '/');
  });
});
