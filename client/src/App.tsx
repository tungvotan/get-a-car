import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersonalDetailsPage } from './pages/PersonalDetailsPage';
import { LoanDetailsPage } from './pages/LoanDetailsPage';
import { LenderResultPage } from './pages/LenderResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalDetailsPage />} />
        <Route path="/loan-details" element={<LoanDetailsPage />} />
        <Route path="/lender-result" element={<LenderResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
