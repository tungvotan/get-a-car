import React from 'react';

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <label className="block mb-2">{label}</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          {...props} // Spread input props
          ref={ref} // Pass ref to input
        />
      </>
    );
  }
);
