describe('work of burger constructor using DnD', function () {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'data.json' }).as('api');
        cy.intercept("GET", "/api/auth/user", { fixture: "login.json" }).as("login");
        cy.intercept("POST", "/api/orders", { fixture: "order.json" }).as("order");
        
        const email = 'tark@gmail.com';
        const password = 'Lkjh67';
        cy.visit('http://localhost:3000/')
        cy.contains('Личный кабинет').click()
        cy.get('input:first').type(`${email}`)
        cy.get('input').eq(1).type(`${password}{enter}`)
        cy.contains('Конструктор').click()

        cy.viewport(1300, 800);
        cy.wait(3000)
    })

    it('should create an order', function () {

        cy.get('ul li:first')
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')

        cy.get('button').contains('Оформить заказ').click()
        cy.wait(3000)

        cy.get('[data-testid="orderOverlay"]').then(($el) => {
            Cypress.dom.isVisible($el)
        })
        cy.contains('Идентификатор заказа')

        cy.get('[data-testid="closeIcon"]').click()
        cy.get('[data-testid="orderOverlay"]').should('have.css', 'display', 'none')
    })
})