import react from 'react';

export const DateInput = ({ label }: { label: string }) => {
  return (
    <>
      <label className="block mb-2">{label}</label>
      <input
        type="date"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
    </>
  );
};
