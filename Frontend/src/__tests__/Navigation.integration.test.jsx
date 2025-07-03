// Integration test for navigation from flight list to create order page
// This test checks that clicking 'Book Flight' navigates to the order page with the correct flight details

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import api from '../services/api';

// Mock the API service (get method)
jest.mock('../services/api', () => ({
  get: jest.fn(),
}));

test('navigates to create order with flight state when clicking Book Flight', async () => {
  // Mock flight data to be returned by the API
  const mockFlight = {
    flight_id: 202,
    company: 'DemoAir',
    origin: 'Rome',
    destination: 'Berlin',
    departure_date: '2025-07-02T09:00:00Z',
    arrival_date: '2025-07-02T13:00:00Z',
    price: 250,
  };

  // Mock the API call to return the mock flight
  api.get.mockResolvedValueOnce({ data: [mockFlight] });

  // Render the App (which includes routing)
  render(<App />); // No need for extra Router wrapper

  // Wait for the book button to appear and click it
  const bookBtn = await screen.findByTestId('book-button');
  fireEvent.click(bookBtn);

  // Assert that the user is navigated to the order page with the correct flight details
  expect(await screen.findByText(/Book your flight/i)).toBeInTheDocument();
  expect(screen.getByTestId('departure-city')).toHaveTextContent('Rome');
  expect(screen.getByTestId('arrival-city')).toHaveTextContent('Berlin');
  expect(screen.getByTestId('flight-price')).toHaveTextContent('$250');
});
