// Cypress E2E test: Navigation between main pages and modals

describe('Navigation Links', () => {
  it('should navigate between Home, My Orders, Terms, and Privacy pages', () => {
    // Visit the homepage
    cy.visit('http://localhost:5173/');

    // Assert that the Home page is visible
    cy.contains('Find your perfect flight').should('be.visible');

    // Navigate to the Terms page and check its content
    cy.contains('Terms').click();
    cy.contains('Terms and Conditions').should('be.visible');

    // Navigate to the Privacy page and check its content
    cy.contains('Privacy').click();
    cy.contains('Privacy Policy').should('be.visible');

    // Navigate back to the Home page and check its content
    cy.contains('Home').click();
    cy.contains('Find your perfect flight').should('be.visible');

    // Open the My Orders modal and check for the search field
    cy.contains('My Orders').click();
    cy.contains('Search by User ID').should('be.visible');
    cy.get('input[placeholder="ID Number"]').should('be.visible');
  });
});
