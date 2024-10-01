import React, { useContext } from 'react';
import { TextInput } from '../components/TextInput';
import { DateInput } from '../components/DateInput';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/formContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectInput } from '../components/SelectInput';
import { PersonalDetailsFormProps, personalDetailsSchema } from '../models/formModel';

export const PersonalDetailsPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsFormProps>({
    defaultValues: formData.personalDetails,
    resolver: zodResolver(personalDetailsSchema),
  });

  const onSubmit = (data: PersonalDetailsFormProps) => {
    updateFormData({ personalDetails: data });
    navigate('/loan-details');
  };

  // TODO: get the value from constants
  const employmentStatusOptions = [
    { value: 'EMPLOYED', label: 'Employed' },
    { value: 'SELF_EMPLOYED', label: 'Self-Employed' },
    { value: 'UNEMPLOYED', label: 'Unemployed' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-md mx-auto">
      <h1>Personal Details</h1>
      <TextInput
        label="First name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <TextInput
        label="Last name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />
      <DateInput
        label="Date of Birth"
        {...register('dateOfBirth')}
        error={errors.dateOfBirth?.message}
      />
      <TextInput
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <NumberInput
        label="Mobile"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <TextInput
        label="Address"
        {...register('address')}
        error={errors.address?.message}
      />

      <SelectInput
        id="employmentStatus"
        label="Employment Status"
        options={employmentStatusOptions}
        error={errors.employmentStatus?.message}
        {...register('employmentStatus')}
      />
      <TextInput
        label="Employer Name"
        {...register('employerName')}
        error={errors.employerName?.message}
      />
      <NumberInput
        label="Annual Income"
        {...register('annualIncome', { valueAsNumber: true })}
        error={errors.annualIncome?.message}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
        aria-label="Next"
      >
        Next
      </button>
    </form>
  );
};
