import express, {
  type Request,
  type Response,
  type NextFunction
} from "express";

import { requestLogger } from "./middlewares/logger.js";
import { requireJwt } from "./middlewares/auth.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

import {
  auditStart,
  auditEnd
} from "./middlewares/auditLogger.js";

import v1Inscripciones from "./routes/v1/inscripciones.js";
import v2Inscripciones from "./routes/v2/inscripciones.js";
import calificaciones from "./routes/v1/calificaciones.js";

const app = express();

// Parseo JSON
app.use(express.json());

// Logger
app.use(requestLogger);

// JWT
app.use(requireJwt);

// Auditoría
app.use(auditStart);
app.use(auditEnd);

// Rate Limiting
app.use(rateLimiter);

// Rutas
app.use("/v1/inscripciones", v1Inscripciones);
app.use("/v2/inscripciones", v2Inscripciones);
app.use("/v1/calificaciones", calificaciones);

// Middleware global de errores
app.use((
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  res.status(500).json({
    error: "Error interno del servidor"
  });
});

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});