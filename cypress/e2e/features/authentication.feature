# authentication.feature
Feature: Autenticacion de Usuario
  Como un usuario del sistema
  Quiero poder ingresar y salir de mi cuenta
  Para acceder al contenido privado

  Scenario: Login exitoso con credenciales validas
    Given que estoy en la pagina de login
    When ingreso el nombre de usuario "test" y la contrasena "password"
    And hago clic en el boton "Ingresar"
    Then deberia ser redirigido a la pagina principal
    And deberia ver el mensaje "¡Bienvenido!"

  Scenario: Login fallido con credenciales invalidas
    Given que estoy en la pagina de login
    When ingreso el nombre de usuario "usuarioInvalido" y la contrasena "contrasenaInvalida"
    And hago clic en el boton "Ingresar"
    Then deberia ver el mensaje de error "Credenciales invalidas"
    And deberia permanecer en la pagina de login

  Scenario: Cerrar sesion desde la pagina principal
    Given que he iniciado sesion con credenciales validas
    When hago clic en el boton "Cerrar Sesion"
    Then deberia ser redirigido a la pagina de login
    And no deberia ver el mensaje "¡Bienvenido!"