describe('Navigation Links', () => {
  it('should navigate between Home, My Orders, Terms, and Privacy pages', () => {
    cy.visit('http://localhost:5173/');

    // Home page
    cy.contains('Find your perfect flight').should('be.visible');

    // Terms
    cy.contains('Terms').click();
    cy.contains('Terms and Conditions').should('be.visible');

    // Privacy
    cy.contains('Privacy').click();
    cy.contains('Privacy Policy').should('be.visible');

    // Home (חזרה לדף הבית)
    cy.contains('Home').click();
    cy.contains('Find your perfect flight').should('be.visible');

    // My Orders (בודק שהמודל נפתח)
    cy.contains('My Orders').click();
    cy.contains('Search by User ID').should('be.visible');
    cy.get('input[placeholder="ID Number"]').should('be.visible');
  });
});