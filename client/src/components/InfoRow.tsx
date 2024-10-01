import React from 'react';

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex justify-between">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
};
