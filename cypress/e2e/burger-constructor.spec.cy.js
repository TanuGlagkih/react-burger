describe('work of burger constructor using DnD', function () {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'data.json' }).as('api')
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
        cy.wait(3000);
    })

    it('should add buns to constructor, replace them and increase counter of bun', function () {
        cy.get('ul li:first')
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')
        cy.contains('верх')
        cy.contains('низ')
        cy.get('ul li:first').contains('1')

        cy.get('li').eq(1)
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')
        cy.contains('верх')
        cy.contains('низ')
        cy.get('li').eq(1).contains('1')
    })
        it('should add bunsingredients to constructor, increase counters and change their order', function () {
        cy.get('li').eq(4)
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')
        cy.get('li').eq(4).contains('1')
        cy.get('#dropContainer').find('ul').should('have.length', 1)

        cy.get('#dropContainer').find('li').click(500, 40)
        cy.contains('Добавьте начинки')

        cy.get('li').eq(-3)
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')
        cy.get('li').eq(-3).contains('1')
        cy.get('#dropContainer').find('ul').should('have.length', 1)

        cy.get('li').eq(-4)
        .trigger('mousedown')
        .trigger('dragstart')
    cy.get('#dropContainer')
        .trigger('drop')
        cy.get('li').eq(-5)
            .trigger('mousedown')
            .trigger('dragstart')
        cy.get('#dropContainer')
            .trigger('drop')

            cy.get('#dropContainer').find('li:first').as('item')
            cy.get('@item')
            .trigger('mousedown')
            .trigger('dragstart')
            cy.get('#dropContainer').find('li').eq(2).trigger('drop')
            cy.get('#dropContainer').find('li').eq(2).contains('Филе')

    })

})