## Evidencias de funcionamiento

### Prueba 1 - Token válido (HTTP 201 Created)

La API acepta un JWT firmado correctamente y registra la inscripción.

![Prueba 1 - 201 Created](docs/screenshots/Captura%20de%20pantalla%202026-06-26%20105037.png)

---

### Prueba 2 - Validación de datos (HTTP 400 Bad Request)

La API rechaza solicitudes con campos obligatorios incompletos.

![Prueba 2 - 400 Bad Request](docs/screenshots/Captura%20de%20pantalla%202026-06-26%20110114.png)

---

### Prueba 3 - Firma inválida (HTTP 401 Unauthorized)

La API detecta una firma JWT adulterada y rechaza la petición.

![Prueba 3 - 401 Unauthorized](docs/screenshots/Captura%20de%20pantalla%202026-06-25%20192033.png)

---

## Tecnologías utilizadas

* Node.js
* Express
* TypeScript
* JWT (HS256)
* HMAC-SHA256
* Postman
* Nodemon

