import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import api from '../services/api';

jest.mock('../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Flight Search Integration', () => {
  test('searches and displays results', async () => {
    // Mock nearest flights כדי שהקומפוננטה תיטען תקין
    api.get.mockResolvedValueOnce({ data: [] });

    // Mock search results (שנה ל-get!)
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
      // ברירת מחדל - טיסות קרובות ריק
      return Promise.resolve({ data: [] });
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/From/i), { target: { value: 'London' } });
    fireEvent.change(screen.getByPlaceholderText(/To/i), { target: { value: 'Madrid' } });

    fireEvent.click(screen.getByText(/Search Flights/i));

    // חכה עד שכרטיס הטיסה יופיע
    expect(await screen.findByTestId('departure-city')).toHaveTextContent('London');
    expect(screen.getByTestId('arrival-city')).toHaveTextContent('Madrid');
    expect(screen.getByTestId('flight-price')).toHaveTextContent('$180.00');
    expect(screen.getByTestId('book-button')).toBeInTheDocument();
  });
});
