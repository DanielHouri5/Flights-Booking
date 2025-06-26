// src/__tests__/FlightsSearch.integration.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../services/api';

jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Flight Search Integration', () => {
  test('searches and displays results', async () => {
    // Mock nearest flights (אם צריך)
    api.get.mockResolvedValueOnce({ data: [] });

    // Mock search results
    api.post.mockResolvedValueOnce({
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

    render(<HomePage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/From/i), { target: { value: 'London' } });
    fireEvent.change(screen.getByPlaceholderText(/To/i), { target: { value: 'Madrid' } });
    fireEvent.click(screen.getByText(/Search Flights/i));

    expect(await screen.findByText(/London/)).toBeInTheDocument();
    expect(screen.getByText(/Madrid/)).toBeInTheDocument();
    expect(screen.getByText(/\$180.00/)).toBeInTheDocument();
  });
});
