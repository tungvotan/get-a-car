import { ZodError } from 'zod';
import {
  loanDetailsSchema,
  personalDetailsSchema,
  FormDataProps,
} from '../../models/formModel';
import { getFormRepo } from '../../repositories/formRepo';

type SubmitFormSuccessOutcome = {
  outcome: 'SUCCESS';
  data: {
    loanOffers: Array<{
      lender: string;
      monthlyPayment: number;
      fees: number;
      interestRate: number;
    }>;
  };
};

type SubmitFormErrorOutcome = {
  outcome: 'FAILED_TO_PARSE_FORM';
  loanDetailsError?: ZodError; // ZodError type for validation errors
  personalDetailsError?: ZodError;
};

export const submitForm = (
  FormDataProps: FormDataProps
): SubmitFormSuccessOutcome | SubmitFormErrorOutcome => {
  const personalDetailsRes = personalDetailsSchema.safeParse(
    FormDataProps.personalDetails
  );

  const loanDetailsRes = loanDetailsSchema.safeParse(FormDataProps.loanDetails);

  if (loanDetailsRes.error || personalDetailsRes.error) {
    return {
      outcome: 'FAILED_TO_PARSE_FORM',
      loanDetailsError: loanDetailsRes.error,
      personalDetailsError: personalDetailsRes.error,
    };
  }

  // this is just a demo since the requirement does not require to save form
  // in case we replace by saving to DB and fail to save form data
  // here will return respond with the desired outcome
  getFormRepo().saveForm(FormDataProps);

  const { vehiclePrice, deposit, loanTerm } = loanDetailsRes.data;
  const loanAmount = vehiclePrice - deposit;

  const loanOffers = [
    {
      lender: 'Lender A',
      interestRate: 5.5,
      fees: 10,
    },
    {
      lender: 'Lender B',
      interestRate: 5,
      fees: 15,
    },
    {
      lender: 'Lender C',
      interestRate: 6,
      fees: 0,
    },
  ].map((lender) => ({
    ...lender,
    monthlyPayment: calculateMonthlyPayment(
      loanAmount,
      lender.interestRate,
      loanTerm
    ),
  }));

  return {
    outcome: 'SUCCESS',
    data: { loanOffers },
  };
};

function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number {
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to dec
  const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments
  // Calculate monthly payment using the formula
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
}
