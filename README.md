# API-ALEJANDRO - PE23
## Práctica de Evaluación - Semana 11
### Seguridad de APIs: RBAC, Vistas MySQL y Auditoría

**Autor:** Alejandro Morocho

---

# Descripción

Este proyecto implementa mecanismos de seguridad para una API REST desarrollada con **Node.js**, **Express** y **TypeScript**.

Como parte de la práctica se incorporaron tres mecanismos principales de protección:

- Autenticación mediante JWT.
- Control de acceso basado en roles (RBAC).
- Control de acceso a datos mediante vistas MySQL.
- Registro de auditoría de todas las solicitudes y respuestas de la API.

---

# Tecnologías utilizadas

- Node.js
- Express 5
- TypeScript
- MySQL 8
- mysql2
- JWT (HS256)
- Postman
- Visual Studio Code

---

# Estructura del proyecto

```text
src
│
├── db
│   └── pool.ts
│
├── middlewares
│   ├── auth.ts
│   ├── auditLogger.ts
│   ├── logger.ts
│   ├── rateLimiter.ts
│   └── rbac.ts
│
├── routes
│   ├── v1
│   │   ├── inscripciones.ts
│   │   └── calificaciones.ts
│   │
│   └── v2
│       └── inscripciones.ts
│
├── index.ts
│
generate-token.mjs
```

---

# Actividad 1 – Guard RBAC

Se implementó el middleware **requireRole()** para controlar el acceso a las rutas de calificaciones según el rol incluido en el token JWT.

## Prueba 1 – GET /v1/calificaciones (200 OK)

Acceso permitido para el rol **estudiante**.

![Prueba 1](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20103022.png)

---

## Prueba 2 – POST /v1/calificaciones (403 Forbidden)

Intento de registrar una calificación utilizando un usuario sin permisos.

![Prueba 2](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20103125.png)

---

## Prueba 3 – GET /v1/calificaciones/reporte (200 OK)

Acceso permitido para el rol **coordinador_academico**.

![Prueba 3](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20103434.png)

---

## Prueba 4 – Validación del rol mediante JWT

Generación de un token JWT con el rol correspondiente para validar el acceso.

![Prueba 4](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20103803.png)

---

# Actividad 2 – Vista MySQL + queryAsUser

Se implementó una base de datos MySQL para almacenar las calificaciones. Además, se crearon las vistas **v_calificaciones** y **v_calificaciones_publicas**, junto con la función **queryAsUser()** para consultar únicamente la información del usuario autenticado.

## Creación de la base de datos y vistas

La siguiente captura muestra la creación de la tabla `calificaciones`, las vistas requeridas y la ejecución del script SQL.

![Base de datos](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20183257.png)

---

## Consulta de calificaciones del usuario autenticado

Se realizó una solicitud **GET** al endpoint:

```
GET /v1/calificaciones
```

La respuesta fue **HTTP 200 OK**, devolviendo las calificaciones correspondientes al usuario autenticado.

![Consulta](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20183955.png)

---

# Actividad 3 – Audit Log

Se implementó el middleware **auditLogger.ts**, encargado de registrar todas las solicitudes (**REQUEST**) y respuestas (**RESPONSE**) de la API dentro de la tabla **audit_log**.

## Prueba 1 – Solicitud exitosa (200 OK)

Consulta realizada correctamente al endpoint **GET /v1/calificaciones**.

![GET 200](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20183955.png)

---

## Prueba 2 – Solicitud denegada (403 Forbidden)

Intento de acceso con un usuario que no posee el rol requerido.

![403](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20184028.png)

---

## Prueba 3 – Consulta del reporte (200 OK)

Consulta realizada correctamente al endpoint **GET /v1/calificaciones/reporte**.

![Reporte](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20184230.png)

---

## Registros almacenados en audit_log

La siguiente captura muestra los registros almacenados en la tabla **audit_log**, incluyendo:

- REQUEST
- RESPONSE
- Método HTTP
- Endpoint
- Usuario autenticado
- Código de respuesta

![Audit Log](docs/screenshots/Captura%20de%20pantalla%202026-07-18%20184338.png)

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Dxvid-11/API-ALEJANDRO.git
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm run dev
```

---

# Funcionalidades implementadas

- Autenticación mediante JWT.
- Validación de firma HS256.
- Middleware de Rate Limiting.
- Control de acceso RBAC.
- Protección de rutas mediante roles.
- Consulta de datos mediante vistas MySQL.
- Registro de auditoría de solicitudes y respuestas.
- API desarrollada con Express y TypeScript.

---

# Repositorio

**GitHub:**

https://github.com/Dxvid-11/API-ALEJANDRO

---

# Autor

**Alejandro Morocho**

Universidad Internacional del Ecuador (UIDE)

Ingeniería en Tecnologías de la Información