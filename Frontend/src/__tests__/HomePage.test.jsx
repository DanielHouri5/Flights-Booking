import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import React from 'react';
import * as apiModule from '../services/api';

// נשתמש ב-mock לרכיב FlightsList
jest.mock('../pages/FlightsList', () => () => <div>Mocked FlightsList</div>);

// נשתמש ב-mock לקריאת axios
jest.mock('../services/api');

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('renders the header and search inputs', () => {
    render(<HomePage />);
    expect(screen.getByText(/Find your perfect flight/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/From/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/To/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Search Flights/i })
    ).toBeInTheDocument();
  });

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
      expect(flights.length).toBe(2); // שני טורים
    });

    expect(apiModule.default.get).toHaveBeenCalledWith(
      '/flights/nearest-flights'
    );
  });

  test('shows search flights view after clicking search', async () => {
    const mockFlights = []; // נדרש כדי למנוע שגיאה של undefined.data
    apiModule.default.get.mockResolvedValueOnce({ data: mockFlights });

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/From/i), {
      target: { value: 'Tel Aviv' },
    });
    fireEvent.change(screen.getByPlaceholderText(/To/i), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByTestId('passengers'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Search Flights/i }));

    expect(await screen.findByText(/Mocked FlightsList/i)).toBeInTheDocument();
  });
});
