// Integration test for flight search on the HomePage
// This test mocks API calls and checks that search results are displayed correctly

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../services/api';

// Mock the API service (get and post methods)
jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Flight Search Integration', () => {
  // Test: search for flights and display the results
  test('searches and displays results', async () => {
    // Mock the nearest flights API call to return an empty array (so the component loads)
    api.get.mockResolvedValueOnce({ data: [] });

    // Mock the search API call to return a single flight result
    api.get.mockImplementation((url) => {
      if (url.includes('/flights/search')) {
        return Promise.resolve({
          data: [
            {
              flight_id: 1,
              origin: 'London',
              destination: 'Madrid',
              departure_date: '2025-07-01T08:00:00Z',
              arrival_date: '2025-07-01T12:00:00Z',
              price: 180,
              company: 'TestAir',
            },
          ],
        });
      }
      // Default: return empty array for other GET requests
      return Promise.resolve({ data: [] });
    });

    // Render the HomePage inside a MemoryRouter
    render(<HomePage />, { wrapper: MemoryRouter });

    // Fill in the search form fields
    fireEvent.change(screen.getByPlaceholderText(/From/i), {
      target: { value: 'London' },
    });
    fireEvent.change(screen.getByPlaceholderText(/To/i), {
      target: { value: 'Madrid' },
    });

    // Click the search button
    fireEvent.click(screen.getByText(/Search Flights/i));

    // Wait for the flight card to appear and check its content
    expect(await screen.findByTestId('departure-city')).toHaveTextContent(
      'London'
    );
    expect(screen.getByTestId('arrival-city')).toHaveTextContent('Madrid');
    expect(screen.getByTestId('flight-price')).toHaveTextContent('$180');
    expect(screen.getByTestId('book-button')).toBeInTheDocument();
  });
});
