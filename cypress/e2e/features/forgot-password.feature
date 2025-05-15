Feature: Recuperación de contraseña
  Como usuario
  Quiero poder recuperar mi contraseña
  Para poder acceder a mi cuenta cuando la he olvidado

  Scenario: Solicitud de recuperación de contraseña con correo válido
    Given que estoy en la página de recuperación de contraseña
    When ingreso el correo electrónico "test@example.com"
    And hago clic en el botón de enviar
    Then debería ver un mensaje de confirmación
    And debería ser redirigido a la página de login

  Scenario: Solicitud de recuperación de contraseña con correo inválido
    Given que estoy en la página de recuperación de contraseña
    When ingreso un correo electrónico inválido "invalid@test.com"
    And hago clic en el botón de enviar
    Then debería ver un mensaje de error

  Scenario: Validación del formato de correo electrónico
    Given que estoy en la página de recuperación de contraseña
    When ingreso un texto que no es un correo electrónico "notanemail"
    Then el botón de enviar debería estar deshabilitado
    And debería ver un mensaje de error de formato