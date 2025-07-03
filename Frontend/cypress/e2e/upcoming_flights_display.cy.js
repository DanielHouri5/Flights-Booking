// Cypress E2E test: Display of upcoming flights on the HomePage

describe('Upcoming Flights - Display on HomePage', () => {
  it('should display upcoming flights in two columns when there are many flights', () => {
    // Create 6 mock flights for the test
    const mockFlights = Array.from({ length: 6 }).map((_, i) => ({
      flight_id: `f${i + 1}`,
      origin: `City${i + 1}`,
      destination: `Dest${i + 1}`,
      departure_date: '2025-07-10T08:00:00Z',
      arrival_date: '2025-07-10T12:00:00Z',
      company: `Company${i + 1}`,
      price: 100 + i * 10,
    }));

    // Mock the API call for nearest flights
    cy.intercept('GET', '**/flights/nearest-flights', {
      statusCode: 200,
      body: mockFlights,
    }).as('nearestFlights');

    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Wait for the mocked nearest flights API to complete
    cy.wait('@nearestFlights');

    // Assert that all mock flights are displayed (origin and destination)
    mockFlights.forEach((flight) => {
      cy.contains(flight.origin).scrollIntoView().should('be.visible');
      cy.contains(flight.destination).scrollIntoView().should('be.visible');
    });

    // Assert that there are two columns for flights
    cy.get('.flights-double-column .flights-column').should('have.length', 2);

    // Assert that each column contains at least one flight card
    cy.get('.flights-double-column .flights-column').each(($col) => {
      cy.wrap($col)
        .find('.flight-card-wrapper, .flight-card')
        .its('length')
        .should('be.gte', 1);
    });
  });
});
