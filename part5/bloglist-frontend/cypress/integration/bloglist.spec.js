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
      cy.login({ username: 'root', password: 'root' });
    });

    it('A blog can be create', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('Chief Web Director');
      cy.get('#author').type('Brendan Bode');
      cy.get('#url').type('http://daisy.info');
      cy.get('#create').click();

      cy.get('.blog-item').contains('Chief Web Director Brendan Bode');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Dynamic Implementation Consultant',
          author: 'Reed Flatley',
          url: 'https://lou.info',
        });
        cy.createBlog({
          title: 'Lead Optimization Supervisor',
          author: 'Genevieve McClure',
          url: 'https://jadon.biz',
          likes: 10,
        });
        cy.createBlog({
          title: 'Direct Optimization Executive',
          author: 'Simeon Heathcote',
          url: 'https://helena.com',
          likes: 5,
        });
        cy.visit('http://localhost:3000');
      });

      it('a blog can be liked', function () {
        cy.contains('Dynamic Implementation Consultant').contains('view').click();

        cy.contains('Dynamic Implementation Consultant')
          .parent()
          .find('.blog-details')
          .contains('likes')
          .as('theLikes')
          .find('button')
          .click();

        cy.get('@theLikes').should('contain', 'likes 1');
      });

      it('a blog can be remove by creator', function () {
        cy.contains('Lead Optimization Supervisor').contains('view').click();

        cy.contains('Lead Optimization Supervisor').parent().find('.blog-details').as('theBlog');
        cy.get('@theBlog').get('.remove').click();

        cy.get('html').should('not.contain', 'Lead Optimization Supervisor');
      });

      it('a blog can not be removed by user who is not the creator', function () {
        cy.request('POST', 'http://localhost:3001/api/users', {
          username: 'kale',
          password: 'services',
          name: 'Misty Torp V',
        });

        cy.contains('logout').click();

        cy.login({ username: 'kale', password: 'services' });
        cy.contains('Misty Torp V logged in');

        cy.contains('Direct Optimization Executive').as('theTitle').contains('view').click();

        cy.get('@theTitle').parent().find('.blog-details').as('theBlog');
        cy.get('@theBlog').get('.remove').click();

        cy.get('@theTitle').should('contain', 'Direct Optimization Executive');
      });

      it('blogs are ordered according to likes', function () {
        cy.get('.blog-item').each((value, index) => {
          cy.wrap(value).contains('view').click();
          cy.wrap(value).get('.likes-num').as(`likes_${index}`);
        });

        cy.get('@likes_0').contains('10');
        cy.get('@likes_1').contains('5');
        cy.get('@likes_2').contains('0');
      });
    });
  });
});
