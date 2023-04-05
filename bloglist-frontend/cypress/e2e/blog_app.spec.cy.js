/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Eric Pastor',      username: 'Eric',      password: 'Como siempre'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.login({ username:'Eric', password:'Como siempre' })
      cy.contains('Create new blog')
    })

    it('fails with wrong credentials', function() {
      cy.get('[placeholder="login-username"]').type('Eric')
      cy.get('[placeholder="login-password"]').type('sdfsdfs')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Eric Pastor logged in')
    })


  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'Eric', password:'Como siempre' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('[id="title"]').type('a blog created in cypress')
      cy.get('[id="author"]').type('Arnd Dew')
      cy.get('[id="url"]').type('https://www.invetedForCypress.com')
      cy.contains('save').click()
      cy.contains('a blog created in cypress')
    })

    it('Creator of a blog can delete blog', function() {
      cy.contains('Create new blog').click()
      cy.get('[id="title"]').type('a blog created in cypress')
      cy.get('[id="author"]').type('Arnd Dew')
      cy.get('[id="url"]').type('https://www.invetedForCypress.com')
      cy.contains('save').click()
      cy.contains('a blog created in cypress')
      cy.contains('delete').click()
    })

    describe('When creating blogs and adding likes', function() {
      beforeEach(function (){
        cy.createBlog({
          title: 'trying who sees blogs FIRST',
          author: 'Arnt Dw ',
          url: 'https://sees-test/',
          likes:8
        })
        cy.createBlog({
          title: 'trying who sees blogs SECOND',
          author: 'Arnt Dw ',
          url: 'https://sees-test/',
          likes:7
        })
        cy.createBlog({
          title: 'trying who sees blogs THIRD',
          author: 'Arnt Dw ',
          url: 'https://sees-test/',
          likes:5
        })
      })
      it('can add one more like', () => {
        cy.contains('view').click()
        cy.get('#buttonForLikes').click()
      })

      it('blogs are ordered according to most liked',  () => {
        cy.get('.blog').eq(0).should('contain', 'trying who sees blogs FIRST')
        cy.get('.viewMore').eq(0).contains('view').click()
        cy.get('.blog').eq(1).should('contain', 'trying who sees blogs SECOND')
        cy.get('.viewMore').eq(1).contains('view').click()
        cy.get('.blog').eq(2).should('contain', 'trying who sees blogs THIRD')
        cy.get('.viewMore').eq(2).contains('view').click()

        cy.get('.toClickLike').eq(0).contains('like').click()

        cy.get('.toClickLike').eq(1).contains('like').click()
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500)

        cy.get('.blog').eq(1).should('contain', 'trying who sees blogs FIRST')
        cy.get('.blog').eq(0).should('contain', 'trying who sees blogs SECOND')
        cy.get('.blog').eq(2).should('contain', 'trying who sees blogs THIRD')

      })
    })
  })
})


