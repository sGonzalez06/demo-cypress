import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Pasos para la página de recuperación de contraseña
Given('que estoy en la página de recuperación de contraseña', () => {
  cy.visit('/forgot-password');
});

When('ingreso el correo electrónico {string}', (email) => {
  cy.get('[data-cy=email-input]').type(email);
});

When('ingreso un correo electrónico inválido {string}', (email) => {
  cy.get('[data-cy=email-input]').type(email);
});

When('ingreso un texto que no es un correo electrónico {string}', (text) => {
  cy.get('[data-cy=email-input]').type(text);
});

When('hago clic en el botón de enviar', () => {
  cy.get('[data-cy=submit-button]').click();
});

Then('debería ver un mensaje de confirmación', () => {
  cy.get('[data-cy=success-message]').should('be.visible');
});

Then('debería ver un mensaje de error', () => {
  cy.get('[data-cy=error-message]').should('be.visible');
});

Then('el botón de enviar debería estar deshabilitado', () => {
  cy.get('[data-cy=submit-button]').should('be.disabled');
});

Then('debería ver un mensaje de error de formato', () => {
  cy.get('[data-cy=format-error-message]').should('be.visible');
});

Then('debería ser redirigido a la página de login', () => {
  // Esperamos 3 segundos ya que el componente tiene un setTimeout de 3000ms
  cy.wait(3000);
  // Verificamos que la URL sea la del login
  cy.url().should('include', '/login');
});