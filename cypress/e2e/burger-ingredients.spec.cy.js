describe('modal window opens correctly', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'data.json' }).as('api');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
    cy.wait(3000);
  })

  it('should open modal windows and close them when press ESC', function () {
    cy.get('ul li:first').click();
    cy.contains('Детали ингредиента');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="ingredient"]').should('not.exist');
  })

    it('should open modal windows and close them when click on overlay', function () {
    cy.get('li').eq(4).click();
    cy.contains('Детали ингредиента');
    cy.get('[data-testid="overlay"]').click(100,100);
        cy.get('[data-testid="ingredient"]').should('not.exist');
  })

  it('should open modal windows and close them when click on close icon', function () {
    cy.get('li').eq(7).click();
    cy.contains('Детали ингредиента');
    cy.get('[data-testid="closeIcon"]').last().click();
        cy.get('[data-testid="ingredient"]').should('not.exist');
  })
})