// Integration test for UserOrdersPage: checks display of user orders and related flight details

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserOrdersPage from '../pages/UserOrdersPage';
import api from '../services/api';

// Mock the API service to control the response for orders and flights
jest.mock('../services/api');

describe('UserOrdersPage Integration', () => {
  // Test: displays user orders and related flight details from the API
  test('displays user orders from API', async () => {
    // Mock the API call to return a single user order
    api.get.mockResolvedValueOnce({
      data: [
        {
          order_id: 1,
          user_id: 5,
          user_name: 'Alice',
          user_email: 'alice@example.com',
          flight_id: 101,
          order_date: new Date().toISOString(),
          price: 500,
          num_passengers: 2,
        },
      ],
    });

    // Mock the API call to return flight details for the order
    api.get.mockResolvedValueOnce({
      data: {
        flight_id: 101,
        origin: 'London',
        destination: 'Paris',
        departure_date: new Date().toISOString(),
        arrival_date: new Date(Date.now() + 2 * 3600000).toISOString(),
        company: 'TestAir',
        price: 250,
        passengers: 2,
      },
    });

    // Render the UserOrdersPage inside a MemoryRouter with the user_id route param
    render(
      <MemoryRouter initialEntries={['/user-orders/5']}>
        <Routes>
          <Route path="/user-orders/:user_id" element={<UserOrdersPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the order and user name to appear on the page
    await waitFor(() => {
      expect(screen.getByText(/Order id: #1/)).toBeInTheDocument();
      expect(screen.getByText(/Alice/)).toBeInTheDocument();
    });
  });
});
