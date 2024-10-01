import * as z from 'zod';

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format') // Ensure correct date format
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()); // Check if the date is valid
    }, 'Invalid date')
    .refine((date) => {
      const today = new Date();
      const dob = new Date(date);
      return dob < today; // Ensure the date is in the past
    }, 'Date of birth must be in the past'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Invalid phone number')
    .max(11, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
  employmentStatus: z.enum(['EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED']),
  employerName: z.string().min(1).optional(),
  annualIncome: z.number().gt(0),
});

export const loanDetailsSchema = z.object({
  vehiclePrice: z.number().min(2000, 'Minimum vehicle price is $2000'),
  deposit: z.number().min(0, 'Deposit cannot be negative'),
  loanPurpose: z.enum(['CAR', 'BIKE', 'PERSONAL']),
  loanTerm: z
    .number()
    .min(1, 'Minimum loan term is 1 year')
    .max(7, 'Maximum loan term is 7 years'),
});

export type PersonalDetailsFormProps = z.infer<typeof personalDetailsSchema>;
export type LoanDetailsFormProps = z.infer<typeof loanDetailsSchema>;

export type FormDataProps = {
  personalDetails: PersonalDetailsFormProps;
  loanDetails: LoanDetailsFormProps;
};
