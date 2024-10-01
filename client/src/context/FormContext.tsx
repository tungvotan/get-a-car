import React, { createContext, useState, ReactNode } from 'react';
import * as z from 'zod';

type FormContextType = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
};

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Invalid phone number')
    .max(11, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
  // TODO: make it enum
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employerName: z.string().optional(),
  annualIncome: z.number().gt(0),
});

export const loanDetailsSchema = z.object({
  vehiclePrice: z.number().min(2000, 'Minimum vehicle price is $2000'),
  deposit: z.number().min(0, 'Deposit cannot be negative'),
  // TODO: make it enum
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  loanTerm: z
    .number()
    .min(1, 'Minimum loan term is 1 year')
    .max(7, 'Maximum loan term is 7 years'),
});

export type PersonalDetailsFormProps = z.infer<typeof personalDetailsSchema>;
export type LoanDetailsFormProps = z.infer<typeof loanDetailsSchema>;

type FormData = {
  personalDetails: PersonalDetailsFormProps;
  loanDetails: LoanDetailsFormProps;
};

const defaultFormData: FormData = {
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
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
