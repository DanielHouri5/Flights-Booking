import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
    price: 250.0,
  };

  api.get.mockResolvedValueOnce({ data: [mockFlight] });

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const bookBtn = await screen.findByText(/Book Flight/i);
  fireEvent.click(bookBtn);

  expect(await screen.findByText(/Create Your Order/i)).toBeInTheDocument();
  expect(screen.getByText(/Rome/)).toBeInTheDocument();
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
  expect(screen.getByText(/\$250\.00/)).toBeInTheDocument();
});
