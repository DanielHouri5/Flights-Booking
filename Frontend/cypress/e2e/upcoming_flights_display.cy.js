describe('Upcoming Flights - Display on HomePage', () => {
  it('should display upcoming flights in two columns when there are many flights', () => {
    // צור 6 טיסות לדוגמה
    const mockFlights = Array.from({ length: 6 }).map((_, i) => ({
      flight_id: `f${i + 1}`,
      origin: `City${i + 1}`,
      destination: `Dest${i + 1}`,
      departure_date: '2025-07-10T08:00:00Z',
      arrival_date: '2025-07-10T12:00:00Z',
      company: `Company${i + 1}`,
      price: 100 + i * 10,
    }));

    cy.intercept('GET', '**/flights/nearest-flights', {
      statusCode: 200,
      body: mockFlights,
    }).as('nearestFlights');

    cy.visit('http://localhost:5173/');

    cy.wait('@nearestFlights');

    // ודא שכל הטיסות מוצגות
    mockFlights.forEach(flight => {
      cy.contains(flight.origin).scrollIntoView().should('be.visible');
      cy.contains(flight.destination).scrollIntoView().should('be.visible');
    });

    // ודא שיש שני טורים (flights-column)
    cy.get('.flights-double-column .flights-column').should('have.length', 2);

    // ודא שכל טור מכיל לפחות טיסה אחת
    cy.get('.flights-double-column .flights-column').each(($col) => {
      cy.wrap($col).find('.flight-card-wrapper, .flight-card').its('length').should('be.gte', 1);
    });
  });
});