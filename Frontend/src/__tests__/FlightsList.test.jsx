// Unit tests for the FlightsList component
// These tests check loading state and rendering with initial flight data

import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightsList from '../pages/FlightsList';

describe('FlightsList', () => {
  // Test: shows loading text when the component is first rendered
  test('shows loading text initially', () => {
    render(<FlightsList />);
    expect(screen.getByText(/Loading flights/i)).toBeInTheDocument();
  });

  // Test: renders without crashing when initialFlights prop is provided
  test('renders without crashing when initialFlights provided', () => {
    const flights = [
      {
        flight_id: 'f1',
        origin: 'Test Origin',
        destination: 'Test Destination',
        departure_date: new Date().toISOString(),
        arrival_date: new Date().toISOString(),
        price: 123,
        company: 'TestCompany',
      },
    ];

    render(<FlightsList initialFlights={flights} />);
    // If no error is thrown, the test passes for now.
  });
});
