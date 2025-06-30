describe('Responsive Layout', () => {
  it('should display main elements correctly on mobile', () => {
    cy.viewport('iphone-6');
    cy.visit('http://localhost:5173/');

    // ודא שהכותרת והחיפוש מוצגים
    cy.contains('Find your perfect flight').should('be.visible');
    cy.get('.search-box').should('be.visible');

    // ודא שהתפריט מוצג (אם יש תפריט מותאם מובייל)
    // אפשר לבדוק גם שהניווט לא נשבר
    cy.contains('Home').should('be.visible');
    cy.contains('My Orders').should('be.visible');
  });

  it('should display main elements correctly on tablet', () => {
    cy.viewport('ipad-2');
    cy.visit('http://localhost:5173/');

    cy.contains('Find your perfect flight').should('be.visible');
    cy.get('.search-box').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.contains('My Orders').should('be.visible');
  });
});