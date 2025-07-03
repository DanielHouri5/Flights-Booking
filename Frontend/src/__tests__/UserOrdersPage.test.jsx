// Unit tests for the UserOrdersPage component
// These tests cover loading state, error handling, empty results, and rendering order cards

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserOrdersPage from '../pages/UserOrdersPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import api from '../services/api';

// Mock the API service
jest.mock('../services/api');
// Mock the OrderCard component to isolate UserOrdersPage logic
jest.mock('../components/OrderCard', () => ({ order }) => (
  <div>Mocked OrderCard - {order.order_id}</div>
));

// Helper function to render UserOrdersPage with router context and userId param
const renderWithRouter = (userId) => {
  return render(
    <MemoryRouter initialEntries={[`/orders/${userId}`]}>
      <Routes>
        <Route path="/orders/:userId" element={<UserOrdersPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('UserOrdersPage', () => {
  // Test: shows loading state when the API call is pending
  test('shows loading state initially', async () => {
    api.get.mockReturnValueOnce(new Promise(() => {})); // never resolves
    renderWithRouter('123');

    expect(screen.getByText(/Loading orders/i)).toBeInTheDocument();
  });

  // Test: shows error message when the API call fails
  test('shows error message on API failure', async () => {
    api.get.mockRejectedValueOnce(new Error('API error'));
    renderWithRouter('123');

    await waitFor(() =>
      expect(
        screen.getByText(/No orders found for your id number/i)
      ).toBeInTheDocument()
    );
  });

  // Test: shows 'no orders' message when the API returns an empty array
  test('shows no orders message when response is empty', async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    renderWithRouter('123');

    await waitFor(() =>
      expect(
        screen.getByText(/No orders found for this ID/i)
      ).toBeInTheDocument()
    );
  });

  // Test: renders order cards when orders exist
  test('renders order cards when orders exist', async () => {
    api.get.mockResolvedValueOnce({
      data: [{ order_id: '1' }, { order_id: '2' }],
    });
    renderWithRouter('123');

    await waitFor(() =>
      expect(screen.getByText(/Mocked OrderCard - 1/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/Mocked OrderCard - 2/i)).toBeInTheDocument();
  });
});
