import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PriceUpdatePage } from './pages/PriceUpdatePage';
import { CalculationsPage } from './pages/CalculationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-8">
        <Navigation />
        <Routes>
          <Route path="/" element={<PriceUpdatePage />} />
          <Route path="/price-update" element={<PriceUpdatePage />} />
          <Route path="/calculations" element={<CalculationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}