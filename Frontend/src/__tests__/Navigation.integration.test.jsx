import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import api from '../services/api';

jest.mock('../services/api', () => ({
  get: jest.fn(),
}));

test('navigates to create order with flight state when clicking Book Flight', async () => {
  const mockFlight = {
    flight_id: 202,
    company: 'DemoAir',
    origin: 'Rome',
    destination: 'Berlin',
    departure_date: '2025-07-02T09:00:00Z',
    arrival_date: '2025-07-02T13:00:00Z',
    price: 250,
  };

  api.get.mockResolvedValueOnce({ data: [mockFlight] });

  render(<App />); // ללא עטיפה נוספת של Router

  // חכה לכפתור ואז לחץ
  const bookBtn = await screen.findByTestId('book-button');
  fireEvent.click(bookBtn);

  // ודא שהועבר לדף עם פרטי הטיסה
  expect(await screen.findByText(/Book your flight/i)).toBeInTheDocument();
  expect(screen.getByTestId('departure-city')).toHaveTextContent('Rome');
  expect(screen.getByTestId('arrival-city')).toHaveTextContent('Berlin');
  expect(screen.getByTestId('flight-price')).toHaveTextContent('$250');
});
