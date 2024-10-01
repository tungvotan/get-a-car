import React, { useContext, useEffect } from 'react';
import {
  defaultFormData,
  FormContext,
  LoanOfferProps,
} from '../context/formContext';
import { useNavigate } from 'react-router-dom';
import { InfoRow } from '../components/InfoRow';
import pluralize from '../utils/pluralize';

const LENDER_TEXT_MAP: { [key in keyof LoanOfferProps]: string } = {
  lender: 'Lender name',
  interestRate: 'Interest rate',
  monthlyPayment: 'Monthly payment',
  fees: 'Fees',
};

const LoanOffer = ({ offer }: { offer: LoanOfferProps }) => {
  return (
    <div className="mb-8">
      {Object.entries(offer).map(([key, value]) => (
        <InfoRow
          key={key}
          label={LENDER_TEXT_MAP[key as keyof LoanOfferProps]}
          value={
            typeof value === 'number'
              ? key === 'interestRate'
                ? value + '%'
                : '$' + Math.floor(value)
              : value
          }
        />
      ))}
      <hr />
    </div>
  );
};

export const LoanResultPage = () => {
  const { formData, loanOffers, updateFormData, setLoanOffers } =
    useContext(FormContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loanOffers) {
      navigate('/');
    }
  }, [loanOffers, navigate]);

  const handleResetState = () => {
    updateFormData(defaultFormData);
    setLoanOffers(undefined);
    navigate('/');
  };

  const { vehiclePrice, deposit, loanPurpose, loanTerm } = formData.loanDetails;
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Loan offers
      </h1>

      <InfoRow label="Loan amount" value={'$' + (vehiclePrice - deposit)} />
      <InfoRow label="Loan purpose" value={loanPurpose} />
      <InfoRow label="Loan term" value={pluralize('year', loanTerm)} />

      <h2 className="text-2xl font-semibold text-gray-700 mt-12 mb-8">
        List of lenders
      </h2>

      {loanOffers?.map((offer: LoanOfferProps) => (
        <LoanOffer offer={offer} />
      ))}
      <button
        onClick={handleResetState}
        type="button"
        className="bg-blue-500 text-white p-2 rounded mt-4 w-full uppercase"
        aria-label="Next"
      >
        Submit new form
      </button>
    </div>
  );
};
