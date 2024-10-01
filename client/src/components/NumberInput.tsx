import react from 'react';

export const NumberInput = ({ label }: { label: string }) => {
  return (
    <>
      <label className="block mb-2">{label}</label>
      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
    </>
  );
};
