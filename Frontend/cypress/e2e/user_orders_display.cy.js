describe('User Orders - Display Orders', () => {
  it('should display user orders and flight details', () => {
    // Mock להזמנות של המשתמש
    cy.intercept('GET', '**/orders/read-orders/123456789', {
      statusCode: 200,
      body: [
        {
          order_id: 1,
          user_id: '123456789',
          user_name: 'John Doe',
          user_email: 'john@example.com',
          flight_id: 'MOCK123',
          order_date: '2025-07-01T10:00:00Z',
          price: 360,
          num_passengers: 2,
        },
      ],
    }).as('getOrders');

    // Mock לטיסה עבור OrderCard
    cy.intercept('GET', '**/flights/read-flight/MOCK123', {
      statusCode: 200,
      body: {
        flight_id: 'MOCK123',
        origin: 'London',
        destination: 'Madrid',
        departure_date: '2025-07-10T08:00:00Z',
        arrival_date: '2025-07-10T12:00:00Z',
        company: 'MockAir',
        price: 180,
        passengers: 2,
      },
    }).as('getFlight');

    cy.visit('http://localhost:5173/');

    // פתח את המודל של "My Orders"
    cy.contains('My Orders').click();

    // הזן ת"ז ולחץ Submit
    cy.get('input[placeholder="ID Number"]').type('123456789');
    cy.contains('Submit').click();

    cy.wait('@getOrders');
    cy.wait('@getFlight');

    // בדוק שמוצגים פרטי ההזמנה
    cy.contains(/Order id: #1/i).should('be.visible');
    cy.contains(/John Doe/i).should('be.visible');
    cy.contains(/john@example.com/i).should('be.visible');
    cy.get('[data-testid="order-passengers"]').should('contain.text', '2');
    cy.get('[data-testid="order-total-price"]').should('contain.text', '360');

    // בדוק שמוצגים פרטי הטיסה
    cy.contains(/London/i).should('be.visible');
    cy.contains(/Madrid/i).should('be.visible');
    cy.contains(/\$180/).should('be.visible');
    cy.get('img[alt="MockAir logo"]').should('be.visible');
  });
});
