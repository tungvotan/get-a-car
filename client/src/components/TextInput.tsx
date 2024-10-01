import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};


export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
