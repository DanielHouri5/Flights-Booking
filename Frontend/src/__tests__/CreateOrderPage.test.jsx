// Unit tests for the CreateOrderPage component
// These tests cover form rendering, validation, and API integration

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateOrderPage from '../pages/CreateOrderPage';
import api from '../services/api';

// Mock useLocation and useNavigate from react-router-dom
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

// Mock the BookingFlightCard component
jest.mock('../components/BookingFlightCard', () => () => (
  <div>Mocked BookingFlightCard</div>
));

// Mock the API service
jest.mock('../services/api');

describe('CreateOrderPage', () => {
  // Test: renders the form and flight data
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

  // Test: shows error if required fields are empty
  test('shows error if required fields are empty', () => {
    render(<CreateOrderPage />);
    fireEvent.click(screen.getByText(/Confirm Booking/i));
    expect(
      screen.getByText(/Please fill in all fields correctly./i)
    ).toBeInTheDocument();
  });

  // Test: submits the form successfully and shows success message
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

  // Test: handles error response from the server and shows error message
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
