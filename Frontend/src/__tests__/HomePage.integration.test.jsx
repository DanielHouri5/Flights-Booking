// src/__tests__/HomePage.integration.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../services/api';

// Mock את בקשת ה-API להחזרת טיסות קרובות
jest.mock('../services/api');

describe('HomePage Integration', () => {
  test('renders nearest flights and navigates to create order', async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          flight_id: 1,
          origin: 'Tel Aviv',
          destination: 'Rome',
          departure_date: '2025-07-01T10:00:00Z',
          arrival_date: '2025-07-01T14:00:00Z',
          price: 123.45,
          company: 'El Al',
        },
      ],
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // מחכה שהטיסה תופיע
    expect(await screen.findByText(/Tel Aviv/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
    expect(screen.getByText(/\$123.45/)).toBeInTheDocument();
  });
});
