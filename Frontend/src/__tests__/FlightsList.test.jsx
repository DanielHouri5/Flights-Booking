import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightsList from '../pages/FlightsList';

describe('FlightsList', () => {
  test('shows loading text initially', () => {
    render(<FlightsList />);
    expect(screen.getByText(/Loading flights/i)).toBeInTheDocument();
  });

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
    // אם לא נזרקת שגיאה – זה מספיק כרגע.
  });
});
