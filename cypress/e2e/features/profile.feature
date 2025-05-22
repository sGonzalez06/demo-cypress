# profile.feature
Feature: Perfil de Usuario
  Como un usuario del sistema
  Quiero poder ver y editar mi perfil
  Para mantener mi información actualizada

  Scenario: Visualizar información del perfil
    Given que he iniciado sesion con credenciales validas
    When navego a la pagina de perfil
    Then deberia ver mi información de perfil
    And deberia ver mi nombre completo "Usuario de Prueba"

  Scenario: Editar perfil con datos válidos
    Given que estoy en la pagina de perfil
    When hago click en el boton "Editar Perfil"
    And actualizo mi nombre completo a "Nuevo Nombre"
    And actualizo mi email a "nuevo@example.com"
    And actualizo mi biografia a "Esta es mi nueva biografía"
    And hago click en el boton "Guardar Cambios"
    Then deberia ver el mensaje de éxito "Perfil actualizado correctamente"
    And deberia ver mi nombre completo "Nuevo Nombre"

  Scenario: Validación de campos obligatorios
    Given que estoy en la pagina de perfil
    When hago click en el boton "Editar Perfil"
    And borro el campo de nombre completo
    And hago click en el boton "Guardar Cambios"
    Then deberia ver el mensaje de error en perfil "El nombre completo es obligatorio"

  Scenario: Validación de formato de email
    Given que estoy en la pagina de perfil
    When hago click en el boton "Editar Perfil"
    And actualizo mi email a "correo-invalido"
    And hago click en el boton "Guardar Cambios"
    Then deberia ver el mensaje de error en perfil "El formato del email no es válido"

  Scenario: Cancelar edición de perfil
    Given que estoy en la pagina de perfil
    When hago click en el boton "Editar Perfil"
    And actualizo mi nombre completo a "Nombre Temporal"
    And hago click en el boton "Cancelar"
    Then deberia ver mi nombre completo "Usuario de Prueba"
    And no deberia ver el formulario de edición