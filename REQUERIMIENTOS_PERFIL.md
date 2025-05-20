# Requerimientos Funcionales: Página de Perfil de Usuario

## Descripción General
La página de perfil de usuario permite a los usuarios autenticados ver y editar su información personal. Esta funcionalidad es esencial para que los usuarios puedan mantener actualizada su información en el sistema.

## Casos de Uso

### 1. Visualización del Perfil
- **Descripción**: El usuario debe poder ver su información de perfil actual.
- **Precondiciones**: El usuario debe estar autenticado en el sistema.
- **Flujo Principal**:
  1. El usuario navega a la página de perfil desde la página principal.
  2. El sistema muestra la información actual del perfil: nombre completo, nombre de usuario, email y biografía.
- **Postcondiciones**: La información del perfil se muestra correctamente.

### 2. Edición del Perfil
- **Descripción**: El usuario debe poder editar su información personal.
- **Precondiciones**: El usuario debe estar autenticado y visualizando su perfil.
- **Flujo Principal**:
  1. El usuario hace clic en el botón "Editar Perfil".
  2. El sistema muestra un formulario con los campos editables precargados con la información actual.
  3. El usuario modifica los campos deseados.
  4. El usuario hace clic en "Guardar Cambios".
  5. El sistema valida la información ingresada.
  6. Si la validación es exitosa, el sistema actualiza la información del perfil.
  7. El sistema muestra un mensaje de éxito y vuelve a la vista de perfil con la información actualizada.
- **Flujos Alternativos**:
  - Si la validación falla, el sistema muestra mensajes de error específicos para cada campo inválido.
  - El usuario puede cancelar la edición haciendo clic en "Cancelar", lo que devuelve a la vista de perfil sin realizar cambios.
- **Postcondiciones**: La información del perfil se actualiza en el sistema (en caso de éxito).

### 3. Navegación
- **Descripción**: El usuario debe poder navegar entre la página de perfil y la página principal.
- **Precondiciones**: El usuario debe estar autenticado.
- **Flujo Principal**:
  1. Desde la página principal, el usuario puede acceder a su perfil haciendo clic en "Ver Perfil".
  2. Desde la página de perfil, el usuario puede volver a la página principal haciendo clic en "Volver al Inicio".
- **Postcondiciones**: El usuario navega correctamente entre las páginas.

## Validaciones y Restricciones

### Campos Obligatorios
- **Nombre Completo**: No puede estar vacío.
- **Email**: No puede estar vacío y debe tener un formato válido (xxx@xxx.xxx).

### Restricciones de Formato
- **Email**: Debe seguir el patrón estándar de correo electrónico.
- **Biografía**: No puede exceder los 200 caracteres.

### Restricciones de Edición
- El nombre de usuario no puede ser modificado por el usuario.

## Mensajes del Sistema

### Mensajes de Éxito
- **Actualización de Perfil**: "Perfil actualizado correctamente"

### Mensajes de Error
- **Nombre Completo Vacío**: "El nombre completo es obligatorio"
- **Email Vacío**: "El email es obligatorio"
- **Formato de Email Inválido**: "El formato del email no es válido"
- **Biografía Demasiado Larga**: "La biografía no puede exceder los 200 caracteres"

## Elementos de Interfaz

### Vista de Perfil
- Título "Perfil de Usuario"
- Información del perfil (nombre completo, usuario, email, biografía)
- Botón "Editar Perfil"
- Botón "Volver al Inicio"

### Formulario de Edición
- Campo de texto para Nombre Completo
- Campo de texto para Email
- Área de texto para Biografía
- Botón "Guardar Cambios"
- Botón "Cancelar"

## Atributos para Pruebas Cypress

Para facilitar las pruebas automatizadas con Cypress, se han incluido los siguientes atributos `data-cy`:

- `profile-title`: Título de la página de perfil
- `profile-view`: Contenedor de la vista de perfil
- `profile-edit`: Contenedor del formulario de edición
- `edit-profile-button`: Botón para editar el perfil
- `back-button`: Botón para volver a la página principal
- `fullname-input`: Campo de entrada para el nombre completo
- `email-input`: Campo de entrada para el email
- `bio-input`: Campo de entrada para la biografía
- `save-profile-button`: Botón para guardar los cambios
- `cancel-button`: Botón para cancelar la edición
- `fullname-error`: Mensaje de error para el nombre completo
- `email-error`: Mensaje de error para el email
- `bio-error`: Mensaje de error para la biografía
- `success-message`: Mensaje de éxito al actualizar el perfil

## Escenarios de Prueba

Los escenarios de prueba para esta funcionalidad están definidos en el archivo `profile.feature` y cubren los siguientes casos:

1. Visualización correcta de la información del perfil
2. Edición exitosa del perfil con datos válidos
3. Validación de campos obligatorios (nombre completo)
4. Validación del formato de email
5. Cancelación de la edición del perfil

Estos escenarios aseguran que todas las funcionalidades y validaciones del perfil de usuario funcionan correctamente.