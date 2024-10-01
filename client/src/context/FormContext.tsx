import React, { createContext, useState, ReactNode } from 'react';
import { FormDataProps } from '../models/formModel';

type FormContextType = {
  formData: FormDataProps;
  updateFormData: (data: Partial<FormDataProps>) => void;
  lenderResult: LenderResultProps | undefined;
  setLenderResult: (lenderResult: LenderResultProps | undefined) => void;
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

type LenderResultProps = Array<{
  lender: string;
  monthlyPayment: number;
  fees: number;
  interestRate: number;
}>;

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataProps] = useState<FormDataProps>(defaultFormData);
  const [lenderResult, setLenderResult] = useState<
    LenderResultProps | undefined
  >(undefined);

  const updateFormData = (data: Partial<FormDataProps>) => {
    setFormDataProps((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, lenderResult, setLenderResult }}
    >
      {children}
    </FormContext.Provider>
  );
};
