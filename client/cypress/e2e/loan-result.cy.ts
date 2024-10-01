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
    cy.url().should('include', '/loan-details');
    cy.get('input[name="vehiclePrice"]').clear().type('25000');
    cy.get('input[name="deposit"]').clear().type('5000');
    cy.get('select[name="loanPurpose"]').select('CAR');
    cy.get('input[name="loanTerm"]').clear().type('5');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Simulate the backend response (assuming navigation to /lender-result happens on success)
    cy.url().should('include', '/loan-result');
  });

  it('should display loan offers when available', () => {
    // Check for Loan amount, Loan purpose, Loan term
    cy.contains('Loan amount').should('exist');
    cy.contains('$20000').should('exist');
    cy.contains('Loan purpose').should('exist');
    cy.contains('CAR').should('exist');
    cy.contains('Loan term').should('exist');
    cy.contains('5 years').should('exist');

    // Check for lender list
    cy.contains('List of lenders').should('exist');

    // Check lender offers are rendered correctly
    cy.contains('Lender A').should('exist');
    cy.contains('5.5%').should('exist');
    cy.contains('$382').should('exist');
    cy.contains('Fees').should('exist');
    cy.contains('$10').should('exist');

    cy.contains('Lender B').should('exist');
    cy.contains('5%').should('exist');
    cy.contains('$377').should('exist');
    cy.contains('Fees').should('exist');
    cy.contains('$15').should('exist');

    cy.contains('Lender C').should('exist');
    cy.contains('6%').should('exist');
    cy.contains('$386').should('exist');
    cy.contains('Fees').should('exist');
    cy.contains('$0').should('exist');
  });

  it('should reset state and redirect to the homepage when clicking "Submit new form"', () => {
    // Ensure the reset button exists and click it
    cy.contains('Submit new form').should('exist').click();

    // Assert that it navigates back to the homepage
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
