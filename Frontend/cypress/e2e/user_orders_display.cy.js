// Cypress E2E test: Display user orders and related flight details

describe('User Orders - Display Orders', () => {
  it('should display user orders and flight details', () => {
    // Mock the API response for fetching user orders
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

    // Mock the API response for fetching flight details for the order
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

    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Open the "My Orders" modal
    cy.contains('My Orders').click();

    // Enter the user ID and submit the form
    cy.get('input[placeholder="ID Number"]').type('123456789');
    cy.contains('Submit').click();

    // Wait for both the orders and flight details API responses
    cy.wait('@getOrders');
    cy.wait('@getFlight');

    // Assert that the order details are displayed
    cy.contains(/Order id: #1/i).should('be.visible');
    cy.contains(/John Doe/i).should('be.visible');
    cy.contains(/john@example.com/i).should('be.visible');
    cy.get('[data-testid="order-passengers"]').should('contain.text', '2');
    cy.get('[data-testid="order-total-price"]').should('contain.text', '360');

    // Assert that the flight details are displayed
    cy.contains(/London/i).should('be.visible');
    cy.contains(/Madrid/i).should('be.visible');
    cy.contains(/\$180/).should('be.visible');
    cy.get('img[alt="MockAir logo"]').should('be.visible');
  });
});
