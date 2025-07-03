// Cypress E2E test: Responsive layout for mobile and tablet devices

describe('Responsive Layout', () => {
  it('should display main elements correctly on mobile', () => {
    // Set the viewport to a mobile device (iPhone 6)
    cy.viewport('iphone-6');
    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Assert that the main title and search box are visible
    cy.contains('Find your perfect flight').should('be.visible');
    cy.get('.search-box').should('be.visible');

    // Assert that the navigation menu is visible (if present)
    cy.contains('Home').should('be.visible');
    cy.contains('My Orders').should('be.visible');
  });

  it('should display main elements correctly on tablet', () => {
    // Set the viewport to a tablet device (iPad 2)
    cy.viewport('ipad-2');
    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Assert that the main title and search box are visible
    cy.contains('Find your perfect flight').should('be.visible');
    cy.get('.search-box').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.contains('My Orders').should('be.visible');
  });
});
