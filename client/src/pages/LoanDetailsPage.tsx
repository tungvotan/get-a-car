import React, { useContext, useEffect } from 'react';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/temp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectInput } from '../components/SelectInput';
import { submitForm } from '../services/formService';
import { LoanDetailsFormProps, loanDetailsSchema } from '../models/formModel';

const loanPurposeOptions = [
  { value: 'CAR', label: 'Car' },
  { value: 'BIKE', label: 'Motorbike' },
  { value: 'PERSONAL', label: 'Personal' },
];

export const LoanDetailsPage = () => {
  const { formData, updateFormData, loanOffers, setLoanOffers } =
    useContext(FormContext)!;
  const navigate = useNavigate();
  useEffect(() => {
    console.log('useEffect', loanOffers);
    if (loanOffers) {
      navigate('/loan-result');
    }
  }, [loanOffers, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanDetailsFormProps>({
    defaultValues: formData.loanDetails,
    resolver: zodResolver(loanDetailsSchema),
  });

  const onSubmit = (data: LoanDetailsFormProps) => {
    const updatedFormData = { ...formData, loanDetails: data };

    updateFormData(updatedFormData);
    submitForm(updatedFormData).then((res) => {
      if (res.outcome === 'SUCCESS') {
        setLoanOffers(res.data.loanOffers);
      }
      // TODO: add error message
    });
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Loan detail page
      </h1>
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
