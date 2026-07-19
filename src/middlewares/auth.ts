import { type Request, type Response, type NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secreto-demo-pe23';

function base64UrlDecode(str: string): string {
  return Buffer.from(
    str.replace(/-/g, '+').replace(/_/g, '/'),
    'base64'
  ).toString('utf8');
}

export function requireJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'] ?? '';

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : '';

    if (!token) {
      return res.status(401).json({
        error: 'Token ausente'
      });
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      return res.status(401).json({
        error: 'Token malformado'
      });
    }

    const [headerB64, payloadB64, sigB64] = parts;

    // Validar algoritmo
    const header = JSON.parse(base64UrlDecode(headerB64));

    if (header.alg !== 'HS256') {
      return res.status(401).json({
        error: 'Algoritmo no permitido'
      });
    }

    // Recalcular firma esperada
    const expectedSig = createHmac('sha256', JWT_SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    // Comparar firmas
    if (
      sigB64.length !== expectedSig.length ||
      !timingSafeEqual(
        Buffer.from(sigB64),
        Buffer.from(expectedSig)
      )
    ) {
      return res.status(401).json({
        error: 'Firma invalida'
      });
    }

    // Decodificar claims
    const claims = JSON.parse(base64UrlDecode(payloadB64));

    const now = Math.floor(Date.now() / 1000);

    if (claims.exp && claims.exp < now) {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }

    if (!claims.sub) {
      return res.status(401).json({
        error: 'Claim sub ausente'
      });
    }

    // Guardar usuario en la request
(req as Request & { user?: unknown }).user = {
  sub: claims.sub,

  scope: claims.scope ?? '',

  roles: claims.roles ?? []
};
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalido'
    });
  }
}


