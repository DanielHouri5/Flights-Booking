// Cypress E2E test: Search for flights and display mocked results

describe('Flight Search - E2E Test', () => {
  it('should search and display mocked flight results', () => {
    // Intercept and mock the API call for flight search
    cy.intercept('GET', '**/flights/search*', {
      statusCode: 200,
      body: [
        {
          flight_id: 'MOCK123',
          origin: 'London',
          destination: 'Madrid',
          departure_date: '2025-07-10T08:00:00Z',
          arrival_date: '2025-07-10T12:00:00Z',
          company: 'MockAir',
          price: 180,
        },
      ],
    }).as('mockSearch');

    // Visit the local site
    cy.visit('http://localhost:5173/');

    // Fill in the flight search form fields
    cy.get('input[placeholder="From"]').type('London');
    cy.get('input[placeholder="To"]').type('Madrid');
    cy.get('input[type="date"]').type('2025-07-10');
    cy.get('select[name="passengers"]').select('1');

    // Click the search button
    cy.contains('Search Flights').click();

    // Wait for the mocked API response
    cy.wait('@mockSearch');

    // Assert that the results are displayed according to the mocked data
    cy.get('[data-testid="departure-city"]').should('contain.text', 'London');
    cy.get('[data-testid="arrival-city"]').should('contain.text', 'Madrid');
    cy.get('[data-testid="flight-price"]').should('contain.text', '$180');
    cy.get('[data-testid="book-button"]').should('be.visible');
  });
});
