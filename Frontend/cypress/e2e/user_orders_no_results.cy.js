// Cypress E2E test: User orders search with no results scenario
describe('User Orders - No Results', () => {
  it('should show message when no orders found for this ID', () => {
    // Mock the API response for empty orders list
    cy.intercept('GET', '**/orders/read-orders/000000000', {
      statusCode: 200,
      body: [], // No orders returned
    }).as('getOrders');

    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Open the "My Orders" modal
    cy.contains('My Orders').click();

    // Enter the user ID and submit the form
    cy.get('input[placeholder="ID Number"]').type('000000000');
    cy.contains('Submit').click();

    // Wait for the mocked orders API response
    cy.wait('@getOrders');

    // Assert that the 'no orders found' message is visible
    cy.contains(/No orders found for this ID/i).should('be.visible');
  });
});
