/// <reference types="cypress" />

describe('Personal Details Form', () => {
  beforeEach(() => {
    // Replace '/personal-details' with the actual URL if it's different
    cy.visit('localhost:3000/');
  });

  it('should successfully submit the form with valid data', () => {
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

    // Verify that the page navigates to the loan details page
    cy.url().should('include', '/loan-details');
  });

  it('should show validation errors for empty required fields', () => {
    // Submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check for validation errors
    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Date of birth must be in YYYY-MM-DD format').should(
      'be.visible'
    );
    cy.contains('Invalid email address').should('be.visible');
    cy.contains('Invalid phone number').should('be.visible');
    cy.contains('Address is required').should('be.visible');
    cy.contains('Employment status is required').should('be.visible');
    cy.contains('Number must be greater than 0').should('be.visible');
  });
});
