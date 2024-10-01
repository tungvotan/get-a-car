import React from 'react';

type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <>
        <label className="block mb-2">{label}</label>
        <input
          type="date"
          className={`w-full p-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded mb-2`}
          {...props} // Spread input props
          ref={ref} // Pass ref to input
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </>
    );
  }
);
