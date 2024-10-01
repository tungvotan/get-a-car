import request from 'supertest';
import app from '../app';

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
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.loanOffers).toHaveLength(3);
    // Make sure the calculation is correct
    expect(Math.floor(response.body.data.loanOffers[0].monthlyPayment)).toEqual(
      477
    );
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

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('outcome', 'FAILED_TO_PARSE_FORM');
  });
});
