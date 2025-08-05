describe('Testing the JSONPlaceholder API', () => {

    const apiUrl = 'https://jsonplaceholder.typicode.com';

    it('should create and verify a new post using aliases', () => {
        cy.request('Get','https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('equal',200);
    });

});