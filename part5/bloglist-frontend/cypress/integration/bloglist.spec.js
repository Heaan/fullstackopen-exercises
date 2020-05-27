/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      password: 'root',
      name: 'Superuser',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('root');
      cy.get('input:last').type('root');
      cy.contains('login').click();

      cy.contains('Superuser logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get('#login').click();
    });

    it('A blog can be create', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('Chief Web Director');
      cy.get('#author').type('Brendan Bode');
      cy.get('#url').type('http://daisy.info');
      cy.get('#create').click();

      cy.get('.blog-item').contains('Chief Web Director Brendan Bode');
    });
  });
});
