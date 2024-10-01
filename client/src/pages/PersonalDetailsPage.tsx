import react from 'react';
import { TextInput } from '../components/TextInput';
import { DateInput } from '../components/DateInput';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';

export const PersonalDetailsPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log('firszzzzzzt', data);
    navigate('/loan-details');
  };

  return (
    <form onSubmit={onSubmit} className="p-8 max-w-md mx-auto">
      <h1>Personal Details</h1>
      <TextInput label="First name" />
      <TextInput label="Last name" />
      <DateInput label="Date of Birth" />
      <TextInput label="Email" />
      <NumberInput label="Mobile" />
      <TextInput label="Address" />
      {/* Update this to use select dropdown */}
      <TextInput label="Employment Status" />
      <TextInput label="Employer Name" />
      <NumberInput label="Annual Income" />
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
