import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Pasos para el escenario de login exitoso
Given('que estoy en la pagina de login', () => {
  cy.visit('/login');
});

When('ingreso el nombre de usuario {string} y la contrasena {string}', (username, password) => {
  cy.get('[data-cy=username-input]').type(username);
  cy.get('[data-cy=password-input]').type(password);
});

When('hago clic en el boton {string}', (buttonText) => {
  if (buttonText === 'Ingresar') {
    cy.get('[data-cy=login-button]').click();
  } else if (buttonText === 'Cerrar Sesion') {
    cy.get('[data-cy=logout-button]').click();
  }
});

Then('deberia ser redirigido a la pagina principal', () => {
  cy.url().should('include', '/homepage');
});

Then('deberia ver el mensaje {string}', (message) => {
  cy.get('[data-cy=welcome-message]').should('contain', message);
});

// Pasos para el escenario de login fallido
Then('deberia ver el mensaje de error {string}', (errorMessage) => {
  cy.get('[data-cy=error-message]').should('contain', errorMessage);
});

Then('deberia permanecer en la pagina de login', () => {
  cy.url().should('include', '/login');
});

// Pasos para el escenario de cerrar sesión
Given('que he iniciado sesion con credenciales validas', () => {
  cy.visit('/login');
  cy.get('[data-cy=username-input]').type('test');
  cy.get('[data-cy=password-input]').type('password');
  cy.get('[data-cy=login-button]').click();
  cy.url().should('include', '/homepage');
});

Then('no deberia ver el mensaje {string}', (message) => {
  cy.contains(message).should('not.exist');
});