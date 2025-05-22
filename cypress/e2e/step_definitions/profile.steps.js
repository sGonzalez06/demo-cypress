import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';



Given('que estoy en la pagina de perfil', () => {
  cy.visit('/login');
  cy.get('[data-cy=username-input]').type('test');
  cy.get('[data-cy=password-input]').type('password');
  cy.get('[data-cy=login-button]').click();
  cy.get('[data-cy=profile-button]').click();
  cy.url().should('include', '/profile');
});

// Pasos para navegar a la página de perfil
When('navego a la pagina de perfil', () => {
  cy.get('[data-cy=profile-button]').click();
  cy.url().should('include', '/profile');
  });

// Edit profile button
When('hago click en el boton {string}', (buttonText) => {
  if (buttonText === 'Editar Perfil') {
    cy.get('[data-cy=edit-profile-button]').click();
  } else if (buttonText === 'Guardar Cambios') {
    cy.get('[data-cy=save-profile-button]').click();
  } else if (buttonText === 'Cancelar') {
    cy.get('[data-cy=cancel-button]').click();
  }
});

// Pasos para visualizar información del perfil
Then('deberia ver mi información de perfil', () => {
  cy.get('[data-cy=profile-view]').should('be.visible');
  cy.contains('Perfil de Usuario').should('be.visible');
});

Then('deberia ver mi nombre completo {string}', (nombre) => {
  cy.get('[data-cy=profile-view]').within(() => {
    cy.contains('h2', nombre).should('be.visible');
  });
});

// Pasos para editar el perfil
When('actualizo mi nombre completo a {string}', (nombre) => {
  cy.get('[data-cy=fullname-input]').clear().type(nombre);
});

When('actualizo mi email a {string}', (email) => {
  cy.get('[data-cy=email-input]').clear().type(email);
});

When('actualizo mi biografia a {string}', (bio) => {
  cy.get('[data-cy=bio-input]').clear().type(bio);
});

When('borro el campo de nombre completo', () => {
  cy.get('[data-cy=fullname-input]').clear();
});

// Pasos para verificar mensajes y estados
Then('deberia ver el mensaje de éxito {string}', (mensaje) => {
  cy.get('[data-cy=success-message]').should('contain', mensaje);
});

Then('deberia ver el mensaje de error en perfil {string}', (mensaje) => {
  cy.get('[data-cy=error-message]').should('contain', mensaje);
});

Then('no deberia ver el formulario de edición', () => {
  cy.get('[data-cy=profile-edit]').should('not.exist');
});