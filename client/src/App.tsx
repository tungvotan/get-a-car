import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersonalDetailsPage } from './pages/PersonalDetailsPage';
import { LoanDetailsPage } from './pages/LoanDetailsPage';
import { LoanResultPage } from './pages/LoanResultPage';
import { FormProvider } from './context/temp';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonalDetailsPage />} />
          <Route path="/loan-details" element={<LoanDetailsPage />} />
          <Route path="/loan-result" element={<LoanResultPage />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
