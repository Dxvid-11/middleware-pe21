# API-ALEJANDRO

## Seguridad JWT (PE-2.3)

Este laboratorio implementa autenticación JWT utilizando el algoritmo **HS256**, validación de firmas mediante **HMAC-SHA256**, comparación segura con `timingSafeEqual` y limitación de peticiones mediante un middleware de **Rate Limiting**.

### Generar un token de prueba

```bash
# Con el secreto por defecto del laboratorio
node generate-token.mjs

# Con un secreto personalizado
JWT_SECRET=mi-secreto-largo node generate-token.mjs
```

### Ejecutar el servidor

```bash
JWT_SECRET=secreto-demo-pe23 npm run dev
```

### Probar el servicio

#### Petición válida (esperado: HTTP 201)

```bash
curl -X POST http://localhost:3000/v2/inscripciones \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"estudianteId":"uuid-123","materias":["LTI_05A_458"],"periodoId":"2026-1","metodo_pago":"Credito"}'
```

#### Token inválido (esperado: HTTP 401)

```bash
curl -X POST http://localhost:3000/v2/inscripciones \
  -H "Authorization: Bearer token.invalido.xxx"
```

### Variables de entorno

Crear un archivo `.env` a partir de `.env.example` y configurar:

```env
JWT_SECRET=secreto-demo-pe23
```

---

## Evidencias de funcionamiento

### Prueba 1 - Token válido (HTTP 201 Created)

La API acepta un JWT firmado correctamente y registra la inscripción.

![Prueba 1 - 201 Created](./Captura%20de%20pantalla%202026-06-26%20105037.png)

---

### Prueba 2 - Validación de datos (HTTP 400 Bad Request)

La API rechaza solicitudes con campos obligatorios incompletos.

![Prueba 2 - 400 Bad Request](./Captura%20de%20pantalla%202026-06-26%20110114.png)

---

### Prueba 3 - Firma inválida (HTTP 401 Unauthorized)

La API detecta una firma JWT adulterada y rechaza la petición.

![Prueba 3 - 401 Unauthorized](./Captura%20de%20pantalla%202026-06-25%20192033.png)

---

## Tecnologías utilizadas

* Node.js
* Express
* TypeScript
* JWT (HS256)
* HMAC-SHA256
* Postman
* Nodemon
