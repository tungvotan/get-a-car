import react from 'react';
import { TextInput } from '../components/TextInput';
import { NumberInput } from '../components/NumberInput';
import { useNavigate } from 'react-router-dom';

export const LoanDetailsPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log('firszzzzt loan details', data);
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit} className="p-8 max-w-md mx-auto">
      <h1>Personal Details</h1>
      <NumberInput label="Vehicle price" />
      <NumberInput label="Deposit" />
      <TextInput label="Loan Purpose" />
      <NumberInput label="Loan Term" />
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
