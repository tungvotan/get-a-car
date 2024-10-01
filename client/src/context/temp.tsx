import React, { createContext, useState, ReactNode } from 'react';
import { FormDataProps } from '../models/formModel';

type FormContextType = {
  formData: FormDataProps;
  updateFormData: (data: Partial<FormDataProps>) => void;
  loanOffers: LoanResultProps | undefined;
  setLoanOffers: (loanOffers: LoanResultProps | undefined) => void;
};
type LoanResultProps = Array<LoanOfferProps>;

export type LoanOfferProps = {
  lender: string;
  monthlyPayment: number;
  fees: number;
  interestRate: number;
};

export const defaultFormData: FormDataProps = {
  personalDetails: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    employmentStatus: '',
    annualIncome: 0,
  },
  loanDetails: {
    vehiclePrice: 0,
    deposit: 0,
    loanPurpose: '',
    loanTerm: 1,
  },
};

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataProps] = useState<FormDataProps>(defaultFormData);
  const [loanOffers, setLoanOffers] = useState<LoanResultProps | undefined>(
    undefined
  );

  const updateFormData = (data: Partial<FormDataProps>) => {
    setFormDataProps((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, loanOffers, setLoanOffers }}
    >
      {children}
    </FormContext.Provider>
  );
};
