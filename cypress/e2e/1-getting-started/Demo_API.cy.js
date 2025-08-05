describe('Testing the JSONPlaceholder API', () => {

    const apiUrl = 'https://jsonplaceholder.typicode.com';

    // This test verifies a simple GET request for a single post.
    it('should successfully get a single post by ID and check its status', () => {
        // Use cy.request to send a GET request to the specified URL.
        cy.request('GET', `${apiUrl}/posts/1`)
          .then((response) => {
              // Assert that the HTTP status code is 200 (OK).
              expect(response.status).to.equal(200);
          });
    });

    // This test verifies the creation of a new post using a POST request.
    it('should create a new post and check the response', () => {
        const newPost = {
            title: 'My Verification Post',
            body: 'This post was created and verified by a Cypress test.',
            userId: 1
        };

        // Make the POST request to create the new post.
        cy.request('POST', `${apiUrl}/posts`, newPost)
          .then((postResponse) => {
            expect(postResponse.status).to.eq(201);
            // Verify that the response body contains the data we sent.
            expect(postResponse.body).to.deep.include(newPost);
            // Also check that the API assigned a new ID.
            expect(postResponse.body).to.have.property('id');
          });
    });

    // This test verifies updating an existing post with a PUT request.
    it('should successfully update an existing post', () => {
        const updatedPost = {
            id: 1, // We are updating the post with ID 1
            title: 'Updated Title from Cypress',
            body: 'The body of this post has been updated.',
            userId: 1
        };
        cy.request('PUT', `${apiUrl}/posts/1`, updatedPost)
          .then((response) => {  
            expect(response.status).to.eq(200);
            // Verify that the response body includes the updated data.
            expect(response.body).to.deep.include(updatedPost);
        });
    });

    // This test verifies deleting a post with a DELETE request.
    it('should successfully delete a post', () => {
        // We will delete an existing post, for example, post with ID 1.
        cy.request('DELETE', `${apiUrl}/posts/1`)
          .then((response) => {
            expect(response.status).to.eq(200);     
            // The JSONPlaceholder API returns an empty object on successful deletion.
            // We check for this to confirm the operation was successful.
            expect(response.body).to.be.an('object').and.to.be.empty;
        });
    });

    it('should return 404 for a non-existent post', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/posts/999999`, // Assuming this ID does not exist
        failOnStatusCode: false // Prevent Cypress from failing the test automatically
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
    

});
