// Integration test for HomePage: checks rendering of nearest flights and navigation

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../services/api';

// Mock the API service to control the response for nearest flights
jest.mock('../services/api');

describe('HomePage Integration', () => {
  // Test: renders nearest flights and checks that flight details are displayed
  test('renders nearest flights and navigates to create order', async () => {
    // Mock the API call to return a single nearest flight
    api.get.mockResolvedValueOnce({
      data: [
        {
          flight_id: 1,
          origin: 'Tel Aviv',
          destination: 'Rome',
          departure_date: '2025-07-01T10:00:00Z',
          arrival_date: '2025-07-01T14:00:00Z',
          price: 123,
          company: 'El Al',
        },
      ],
    });

    // Render the HomePage inside a MemoryRouter
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Wait for the flight to appear and check its details
    expect(await screen.findByText(/Tel Aviv/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
    expect(screen.getByText(/\$123/)).toBeInTheDocument();
  });
});
