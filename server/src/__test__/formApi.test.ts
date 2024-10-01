import request from 'supertest';
import app from '../app'; // Import the Express app

describe('Form API Endpoints', () => {
  // Test case for valid form submission
  it('should submit form data successfully', async () => {
    const response = await request(app)
      .post('/api/forms')
      .send({
        personalDetails: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          email: 'john.doe@example.com',
          phone: '1234567890',
          address: '123 Main St',
          employmentStatus: 'EMPLOYED',
          annualIncome: 50000,
        },
        loanDetails: {
          vehiclePrice: 30000,
          deposit: 5000,
          loanPurpose: 'CAR',
          loanTerm: 5,
          interestRate: 5.5,
          loanAmount: 25000,
        },
      });

    expect(response.status).toBe(200); // Expect the status code to be 200
    expect(response.body).toHaveProperty('data'); // Check if the returned data is correct
    console.log('firszzzzzt', response.body);
  });

  // Test case for invalid form submission
  it('should fail when form data is invalid', async () => {
    const response = await request(app)
      .post('/api/forms')
      .send({
        personalDetails: {
          firstName: '',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          email: 'not-an-email',
          phone: '123',
          address: '',
          employmentStatus: '',
          annualIncome: -5000,
        },
        loanDetails: {
          vehiclePrice: 0,
          deposit: -1000,
          loanPurpose: '',
          loanTerm: 10, // Invalid loan term (max 7 years)
        },
      });

    expect(response.status).toBe(400); // Expect the status code to be 400 for validation error
    expect(response.body).toHaveProperty('outcome', 'FAILED_TO_PARSE_FORM'); // Validation error message
  });
});
