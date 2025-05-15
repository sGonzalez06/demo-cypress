# Demo Cypress con Angular y Cucumber

Este proyecto es una demostración de cómo implementar pruebas end-to-end (E2E) utilizando Cypress y Cucumber en una aplicación Angular.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (normalmente viene con Node.js)
- [Angular CLI](https://angular.io/cli) (para ejecutar la aplicación)

## Instalación

Sigue estos pasos para configurar el proyecto:

1. Clona el repositorio (o descarga los archivos)

2. Instala las dependencias del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo Cypress y los preprocesadores de Cucumber.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

- `/src`: Código fuente de la aplicación Angular
  - `/app/components`: Componentes de la aplicación (login, homepage)
  - `/app/guards`: Guards de Angular para proteger rutas
  - `/app/services`: Servicios de la aplicación

- `/cypress`: Archivos de prueba de Cypress
  - `/e2e`: Archivos de especificación de pruebas
    - `authentication.feature`: Escenarios de prueba escritos en Gherkin
    - `/step_definitions`: Implementación de los pasos de Cucumber
  - `/support`: Archivos de soporte para Cypress
    - `commands.js`: Comandos personalizados de Cypress
    - `e2e.js`: Configuración global para pruebas E2E

## Ejecutar la aplicación

Para ejecutar la aplicación Angular en modo desarrollo:

```bash
npm start
```

Esto iniciará el servidor de desarrollo en `http://localhost:4200`.

**Nota**: Si encuentras el error "This command is not available when running the Angular CLI outside a workspace", asegúrate de que los archivos de configuración de Angular (angular.json, tsconfig.json) estén presentes en la raíz del proyecto.

## Ejecutar las pruebas de Cypress

Hay dos formas de ejecutar las pruebas de Cypress:

### 1. Modo interactivo (con interfaz gráfica)

```bash
npm run cypress:open
```

Esto abrirá la interfaz gráfica de Cypress donde podrás:
- Seleccionar el tipo de prueba (E2E Testing)
- Elegir un navegador
- Ver y ejecutar los archivos de prueba disponibles
- Ver los resultados de las pruebas en tiempo real

### 2. Modo headless (sin interfaz gráfica)

```bash
npm run cypress:run
```

Esto ejecutará todas las pruebas en segundo plano y mostrará los resultados en la terminal.

## Escenarios de prueba

El archivo `authentication.feature` contiene los siguientes escenarios de prueba:

1. **Login exitoso con credenciales válidas**
   - Verifica que un usuario pueda iniciar sesión con credenciales correctas
   - Comprueba la redirección a la página principal
   - Verifica que se muestre el mensaje de bienvenida

2. **Login fallido con credenciales inválidas**
   - Verifica que se muestre un mensaje de error cuando las credenciales son incorrectas
   - Comprueba que el usuario permanezca en la página de login

3. **Cerrar sesión desde la página principal**
   - Verifica que un usuario pueda cerrar sesión correctamente
   - Comprueba la redirección a la página de login
   - Verifica que no se muestre el mensaje de bienvenida

## Comandos personalizados

Se ha implementado un comando personalizado para facilitar el inicio de sesión en las pruebas:

```javascript
Cypress.Commands.add('loginByUI', (username, password) => {
  cy.visit('/login');
  cy.get('[data-cy=username-input]').type(username);
  cy.get('[data-cy=password-input]').type(password);
  cy.get('[data-cy=login-button]').click();
});
```

Este comando puede utilizarse en las pruebas para iniciar sesión rápidamente:

```javascript
cy.loginByUI('test', 'password');
```

## Configuración de Cypress

La configuración de Cypress se encuentra en el archivo `cypress.config.js`. Algunos aspectos importantes:

- `baseUrl`: Configurado como `http://localhost:4200` (la URL de la aplicación Angular)
- `specPattern`: Configurado para buscar archivos `.feature` en el directorio `cypress/e2e`
- Preprocesador de Cucumber configurado para generar informes JSON

## Consejos para ejecutar las pruebas

1. Asegúrate de que la aplicación Angular esté en ejecución antes de iniciar las pruebas de Cypress
2. Si las pruebas fallan, verifica los selectores de elementos en los archivos de definición de pasos
3. Utiliza los atributos `data-cy` para seleccionar elementos en tus pruebas, ya que son más estables que los selectores CSS o XPath
4. Revisa los informes generados por Cucumber para analizar los resultados de las pruebas

## Solución de problemas comunes

- **Error de conexión**: Asegúrate de que la aplicación Angular esté en ejecución en `http://localhost:4200`
- **Elementos no encontrados**: Verifica que los selectores en los archivos de definición de pasos coincidan con los elementos en la aplicación
- **Timeout**: Aumenta el tiempo de espera en la configuración de Cypress si las pruebas fallan por timeout

## Recursos adicionales

- [Documentación de Cypress](https://docs.cypress.io/)
- [Documentación de Cucumber](https://cucumber.io/docs/cucumber/)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)