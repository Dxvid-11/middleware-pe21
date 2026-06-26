import express, {
  type Request,
  type Response,
  type NextFunction
} from 'express';

import { requestLogger } from './middlewares/logger.js';
import { requireJwt } from './middlewares/auth.js';
import { rateLimiter } from './middlewares/rateLimiter.js';

import v1Inscripciones from './routes/v1/inscripciones.js';
import v2Inscripciones from './routes/v2/inscripciones.js';

const app = express();

// 1. Parseo del cuerpo
app.use(express.json());

// 2. Logger
app.use(requestLogger);

// 3. Autenticación JWT
app.use(requireJwt);

// 4. Rate Limiting
app.use(rateLimiter);

// Rutas
app.use('/v1/inscripciones', v1Inscripciones);
app.use('/v2/inscripciones', v2Inscripciones);

// Middleware global de errores
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
);

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});