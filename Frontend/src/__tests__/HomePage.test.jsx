// Unit tests for the HomePage component
// These tests cover rendering, API integration, and search functionality

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import React from 'react';
import * as apiModule from '../services/api';

// Mock the FlightsList component to isolate HomePage logic
jest.mock('../pages/FlightsList', () => () => <div>Mocked FlightsList</div>);

// Mock the API service (axios instance)
jest.mock('../services/api');

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error output during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Test: renders the header and search input fields
  test('renders the header and search inputs', () => {
    render(<HomePage />);
    expect(screen.getByText(/Find your perfect flight/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/From/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/To/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Search Flights/i })
    ).toBeInTheDocument();
  });

  // Test: loads nearest flights and renders them when available
  test('loads nearest flights and renders them when available', async () => {
    const mockFlights = [
      { flight_id: 'f1', destination: 'Paris' },
      { flight_id: 'f2', destination: 'London' },
    ];

    apiModule.default.get.mockResolvedValueOnce({ data: mockFlights });

    render(<HomePage />);
    expect(screen.getByText(/Loading nearest flights/i)).toBeInTheDocument();

    await waitFor(() => {
      const flights = screen.getAllByText(/Mocked FlightsList/i);
      expect(flights.length).toBe(2); // Two columns
    });

    expect(apiModule.default.get).toHaveBeenCalledWith(
      '/flights/nearest-flights'
    );
  });

  // Test: shows search flights view after clicking search
  test('shows search flights view after clicking search', async () => {
    const mockFlights = []; // Prevents undefined.data error
    apiModule.default.get.mockResolvedValueOnce({ data: mockFlights });

    render(<HomePage />);

    // Fill in the search form
    fireEvent.change(screen.getByPlaceholderText(/From/i), {
      target: { value: 'Tel Aviv' },
    });
    fireEvent.change(screen.getByPlaceholderText(/To/i), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByTestId('passengers'), {
      target: { value: '2' },
    });

    // Click the search button
    fireEvent.click(screen.getByRole('button', { name: /Search Flights/i }));

    // Assert that the FlightsList is rendered for search results
    expect(await screen.findByText(/Mocked FlightsList/i)).toBeInTheDocument();
  });
});
