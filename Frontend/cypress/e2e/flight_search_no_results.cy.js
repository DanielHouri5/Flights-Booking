describe('Flight Search - No Results Scenario', () => {
  it('should show message when no flights are found', () => {
    cy.intercept('GET', '**/flights/search-flights*', {
      statusCode: 200,
      body: [], // מחזיר שאין טיסות
    }).as('searchRequest');

    cy.visit('http://localhost:5173');

    cy.get('input[name="origin"]').type('Nowhere');
    cy.get('input[name="destination"]').type('Mars');
    cy.get('button').contains('Search Flights').click();

    cy.wait('@searchRequest');

    cy.contains(/no flights found/i).should('be.visible');
  });
});
