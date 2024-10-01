import React, { forwardRef } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  id: string;
  label: string;
  options: SelectOption[];
  error?: string; // Error message, if any
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, label, options, error, ...props }, ref) => {
    return (
      <>
        <label htmlFor={id} className="block mb-2">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          {...props}
          className={`w-full p-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded mb-2`}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </>
    );
  }
);
