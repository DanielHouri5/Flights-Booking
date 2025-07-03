// Cypress E2E test: Flight search with no results scenario

describe('Flight Search - No Results Scenario', () => {
  it('should show message when no flights are found', () => {
    // Mock the flight search API to return an empty array (no flights found)
    cy.intercept('GET', '**/flights/search-flights*', {
      statusCode: 200,
      body: [], // No flights returned
    }).as('searchRequest');

    // Visit the homepage
    cy.visit('http://localhost:5173');

    // Fill in the search form with values that will yield no results
    cy.get('input[name="origin"]').type('Nowhere');
    cy.get('input[name="destination"]').type('Mars');
    cy.get('button').contains('Search Flights').click();

    // Wait for the mocked search API to complete
    cy.wait('@searchRequest');

    // Assert that the 'no flights found' message is visible
    cy.contains(/no flights found/i).should('be.visible');
  });
});
