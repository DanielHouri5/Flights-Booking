import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateOrderPage from '../pages/CreateOrderPage';
import api from '../services/api';

// mock ל־useLocation ו־useNavigate
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      flight: {
        flight_id: 'FL123',
        price: 100,
        passengers: 2,
      },
    },
  }),
  useNavigate: () => jest.fn(),
}));

// mock לרכיב BookingFlightCard
jest.mock('../components/BookingFlightCard', () => () => (
  <div>Mocked BookingFlightCard</div>
));

jest.mock('../services/api');

describe('CreateOrderPage', () => {
  test('renders flight data and form inputs', () => {
    render(<CreateOrderPage />);
    expect(screen.getByText(/Book your flight/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked BookingFlightCard/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your full name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your ID number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element.textContent === 'Total price: $200.00'
      )
    ).toBeInTheDocument();
  });

  test('shows error if required fields are empty', () => {
    render(<CreateOrderPage />);
    fireEvent.click(screen.getByText(/Confirm Booking/i));
    expect(
      screen.getByText(/Please fill in all fields correctly./i)
    ).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    api.post.mockResolvedValueOnce({
      data: { message: 'Order created successfully' },
    });

    render(<CreateOrderPage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your ID number/i), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'john@example.com' },
    });

    fireEvent.click(screen.getByText(/Confirm Booking/i));

    await waitFor(() =>
      expect(screen.getByTestId('order-success-title')).toBeInTheDocument()
    );
  });

  test('handles error response from server', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { error: 'Server error' } },
    });

    render(<CreateOrderPage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your ID number/i), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'john@example.com' },
    });

    fireEvent.click(screen.getByText(/Confirm Booking/i));

    await waitFor(() =>
      expect(screen.getByText(/Server error/i)).toBeInTheDocument()
    );
  });
});
