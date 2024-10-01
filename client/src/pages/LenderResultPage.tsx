import React, { useContext } from 'react';
import { defaultFormData, FormContext } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

export const LenderResultPage = () => {
  const { updateFormData, setLenderResult } = useContext(FormContext)!;
  const navigate = useNavigate();

  const handleResetState = () => {
    updateFormData(defaultFormData);
    setLenderResult(undefined);
    navigate('/');
  };

  return (
    <>
      <button
        onClick={handleResetState}
        type="button"
        className="bg-blue-500 text-white p-2 rounded w-1/2 ml-2"
        aria-label="Next"
      >
        Submit new form
      </button>
    </>
  );
};
