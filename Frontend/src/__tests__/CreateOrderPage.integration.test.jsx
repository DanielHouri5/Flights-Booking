// src/__tests__/CreateOrderPage.integration.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateOrderPage from '../pages/CreateOrderPage';

describe('CreateOrderPage Integration', () => {
  test('renders flight details from navigation state', () => {
    const mockFlight = {
      flight_id: 1,
      origin: 'Paris',
      destination: 'Berlin',
      departure_date: new Date().toISOString(),
      arrival_date: new Date(Date.now() + 2 * 3600000).toISOString(),
      company: 'MockAir',
      price: 250,
      passengers: 2,
    };

    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/create-order', state: { flight: mockFlight } },
        ]}
      >
        <Routes>
          <Route path="/create-order" element={<CreateOrderPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Paris/)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/)).toBeInTheDocument();
    expect(screen.getByText(/\$250/)).toBeInTheDocument();
  });
});
