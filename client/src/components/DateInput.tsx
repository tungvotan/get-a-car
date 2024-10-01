import React from 'react';

type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <label className="block mb-2">{label}</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          {...props} // Spread input props
          ref={ref} // Pass ref to input
        />
      </>
    );
  }
);
