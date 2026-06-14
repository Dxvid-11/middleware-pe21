# Middleware PE-2.1

## Descripción

Este proyecto implementa una API REST básica utilizando Express y TypeScript. La aplicación incluye middlewares personalizados para el registro de solicitudes (logger) y la autenticación mediante API Key.

## Tecnologías utilizadas

* Node.js
* Express
* TypeScript
* Jest
* ts-jest

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

## Testing

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Salida obtenida:

```text
> api-alejandro@1.0.0 test
> jest

PASS  src/middlewares/auth.test.ts
PASS  src/middlewares/logger.test.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        5.344 s
Ran all test suites.
```

Las pruebas verifican:

* Funcionamiento del middleware de autenticación mediante API Key.
* Validación de API Key ausente.
* Validación de API Key incorrecta.
* Validación de API Key correcta.
* Funcionamiento del middleware logger y registro de solicitudes.

## Autor

Alejandro David Morocho
