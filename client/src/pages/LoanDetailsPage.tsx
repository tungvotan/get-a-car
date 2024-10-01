import React, { useContext } from 'react';
import { TextInput } from '../components/TextInput';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';
import {
  FormContext,
  LoanDetailsFormProps,
  loanDetailsSchema,
} from '../context/FormContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectInput } from '../components/SelectInput';

export const LoanDetailsPage = () => {
  const { formData, updateFormData } = useContext(FormContext)!;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanDetailsFormProps>({
    defaultValues: formData.loanDetails,
    resolver: zodResolver(loanDetailsSchema),
  });

  const onSubmit = (data: LoanDetailsFormProps) => {
    updateFormData({ loanDetails: data });
    navigate('/summary');
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  // TODO: get the value from constants
  const loanPurposeOptions = [
    { value: 'CAR', label: 'Car' },
    { value: 'BIKE', label: 'Motorbike' },
    { value: 'PERSONAL', label: 'Personal' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-md mx-auto">
      <h1>Personal Details</h1>
      <NumberInput
        label="Vehicle price"
        {...register('vehiclePrice', { valueAsNumber: true })}
        error={errors.vehiclePrice?.message}
      />
      <NumberInput
        label="Deposit"
        {...register('deposit', { valueAsNumber: true })}
        error={errors.deposit?.message}
      />
      <SelectInput
        id="loanPurpose"
        label="Loan Purpose"
        options={loanPurposeOptions}
        error={errors.loanPurpose?.message}
        {...register('loanPurpose')}
      />
      <NumberInput
        label="Loan Term"
        {...register('loanTerm', { valueAsNumber: true })}
        error={errors.loanTerm?.message}
      />
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleNavigateBack}
          className="bg-blue-500 text-white p-2 rounded w-1/2 mr-2"
          aria-label="Back"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-1/2 ml-2"
          aria-label="Next"
        >
          Next
        </button>
      </div>
    </form>
  );
};
