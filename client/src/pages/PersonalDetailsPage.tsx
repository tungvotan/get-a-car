import React, { useContext } from 'react';
import { TextInput } from '../components/TextInput';
import { DateInput } from '../components/DateInput';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';
import {
  FormContext,
  PersonalDetailsFormProps,
  personalDetailsSchema,
} from '../context/FormContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
    console.log('firszzzzzzt', data);
    updateFormData({ personalDetails: data });
    navigate('/loan-details');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-md mx-auto">
      <h1>Personal Details</h1>
      <TextInput
        key="firstname"
        label="First name"
        {...register('firstName')}
      />
      <TextInput key="lastname" label="Last name" {...register('lastName')} />
      <DateInput label="Date of Birth" {...register('dateOfBirth')} />
      <TextInput key="email" label="Email" {...register('email')} />
      <NumberInput key="number" label="Mobile" {...register('phone')} />
      <TextInput key="address" label="Address" {...register('address')} />
      {/* Update this to use select dropdown */}
      <TextInput
        key="ems"
        label="Employment Status"
        {...register('employmentStatus')}
      />
      <TextInput
        key="emn"
        label="Employer Name"
        {...register('employerName')}
      />
      <NumberInput
        key="income"
        label="Annual Income"
        {...register('annualIncome', { valueAsNumber: true })}
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
