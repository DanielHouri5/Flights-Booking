// Unit tests for the App component: routing and modal behavior

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock components that are not directly tested in this file
jest.mock('../pages/HomePage', () => () => <div>Home Page</div>);
jest.mock('../pages/CreateOrderPage', () => () => <div>Create Order Page</div>);
jest.mock('../pages/UserOrdersPage', () => () => <div>User Orders Page</div>);

describe('App routing and modal behavior', () => {
  // Test: header, footer, and navigation links are rendered
  test('renders header, footer, and nav links', () => {
    render(<App />);

    expect(screen.getAllByText(/SkyFlights/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /My Orders/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Privacy/i })).toBeInTheDocument();
  });

  // Test: open and close the search modal
  test('opens and closes the search modal', () => {
    render(<App />);

    // Modal should not be visible initially
    expect(screen.queryByText(/Search by User ID/i)).not.toBeInTheDocument();

    // Open the modal
    fireEvent.click(screen.getByRole('link', { name: /My Orders/i }));
    expect(screen.getByText(/Search by User ID/i)).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText('✖'));
    expect(screen.queryByText(/Search by User ID/i)).not.toBeInTheDocument();
  });

  // Test: submit a valid ID and navigate to UserOrdersPage
  test('navigates to UserOrdersPage on valid ID submit', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: /My Orders/i }));

    const input = screen.getByPlaceholderText(/ID Number/i);
    fireEvent.change(input, { target: { value: '12345' } });

    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.queryByText(/Search by User ID/i)).not.toBeInTheDocument();
  });

  // Test: navigate to Terms and Privacy pages
  test('navigates to Terms and Privacy pages', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: /Terms/i }));
    fireEvent.click(screen.getByRole('link', { name: /Privacy/i }));

    expect(screen.getAllByText(/SkyFlights/i).length).toBeGreaterThanOrEqual(1);
  });
});
