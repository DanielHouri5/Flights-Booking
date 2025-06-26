// src/__tests__/UserOrdersPage.integration.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserOrdersPage from '../pages/UserOrdersPage';
import api from '../services/api';

jest.mock('../services/api');

describe('UserOrdersPage Integration', () => {
  test('displays user orders from API', async () => {
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

    render(
      <MemoryRouter initialEntries={['/user-orders/5']}>
        <Routes>
          <Route path="/user-orders/:user_id" element={<UserOrdersPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Order id: #1/)).toBeInTheDocument();
      expect(screen.getByText(/Alice/)).toBeInTheDocument();
    });
  });
});
