// Cypress E2E test: Booking a flight successfully

describe('Flight Booking - Successful Order', () => {
  it('should allow user to book a flight successfully', () => {
    // Mock the flight search API response
    cy.intercept('GET', '**/flights/search-flights*', {
      statusCode: 200,
      body: [
        {
          flight_id: 'MOCK123',
          origin: 'London',
          destination: 'Madrid',
          departure_date: '2025-07-10T08:00:00Z',
          arrival_date: '2025-07-10T12:00:00Z',
          company: 'MockAir',
          price: 180.0,
        },
      ],
    }).as('searchFlights');

    // Mock a successful order creation API response
    cy.intercept('POST', '**/orders/create-order', {
      statusCode: 200,
      body: { message: 'Order created successfully' },
    }).as('createOrder');

    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Fill in the flight search form
    cy.get('input[placeholder="From"]').type('London');
    cy.get('input[placeholder="To"]').type('Madrid');
    cy.get('input[type="date"]').type('2025-07-10');
    cy.get('select[name="passengers"]').select('1');
    cy.contains('Search Flights').click();

    // Wait for the mocked search API to complete
    cy.wait('@searchFlights');

    // Click the booking button for the found flight
    cy.get('[data-testid="book-button"]').click();

    // Fill in the booking form with valid data
    cy.get('input[placeholder="Enter your full name"]').type('John Doe');
    cy.get('input[placeholder="Enter your ID number"]').type('123456789');
    cy.get('input[placeholder="Enter your email"]').type('john@example.com');

    // Submit the booking form
    cy.contains('Confirm Booking').click();

    // Wait for the mocked create order API to complete
    cy.wait('@createOrder');

    // Assert that a success message is shown after booking
    cy.contains(/Order successfully placed!/i).should('be.visible');
  });
});
