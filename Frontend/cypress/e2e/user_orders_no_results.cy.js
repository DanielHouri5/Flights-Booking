describe('User Orders - No Results', () => {
  it('should show message when no orders found for this ID', () => {
    // Mock להזמנות ריקות
    cy.intercept('GET', '**/orders/read-orders/000000000', {
      statusCode: 200,
      body: [],
    }).as('getOrders');

    cy.visit('http://localhost:5173/');

    // פתח את המודל של "My Orders"
    cy.contains('My Orders').click();

    // הזן ת"ז ולחץ Submit
    cy.get('input[placeholder="ID Number"]').type('000000000');
    cy.contains('Submit').click();

    cy.wait('@getOrders');

    // בדוק שמופיעה הודעה מתאימה
    cy.contains(/No orders found for this ID/i).should('be.visible');
  });
});