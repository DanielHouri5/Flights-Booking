describe('Flight Booking - Successful Order', () => {
  it('should allow user to book a flight successfully', () => {
    // Mock תוצאת חיפוש טיסה
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

    // Mock יצירת הזמנה מוצלחת
    cy.intercept('POST', '**/orders/create-order', {
      statusCode: 200,
      body: { message: 'Order created successfully' },
    }).as('createOrder');

    cy.visit('http://localhost:5173/');

    // חיפוש טיסה
    cy.get('input[placeholder="From"]').type('London');
    cy.get('input[placeholder="To"]').type('Madrid');
    cy.get('input[type="date"]').type('2025-07-10');
    cy.get('select[name="passengers"]').select('1');
    cy.contains('Search Flights').click();

    cy.wait('@searchFlights');

    // מעבר להזמנה
    cy.get('[data-testid="book-button"]').click();

    // מילוי טופס הזמנה
    cy.get('input[placeholder="Enter your full name"]').type('John Doe');
    cy.get('input[placeholder="Enter your ID number"]').type('123456789');
    cy.get('input[placeholder="Enter your email"]').type('john@example.com');

    // שליחת טופס
    cy.contains('Confirm Booking').click();

    cy.wait('@createOrder');

    // בדיקת הודעת הצלחה
    cy.contains(/Order successfully placed!/i).should('be.visible');
  });
});