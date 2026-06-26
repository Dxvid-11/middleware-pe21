import { type Request, type Response, Router } from "express";

const router = Router();

const METODO_PAGO = [
  'Efectivo',
  'Transferencia',
  'Debito',
  'Credito'
];

// POST: registrar matrícula
router.post('/', (req: Request, res: Response) => {

  const {
    estudianteId,
    materias,
    periodoId,
    metodo_pago
  } = req.body;

  // Validar campos obligatorios
  if (
    !estudianteId ||
    !materias ||
    !materias.length ||
    !periodoId ||
    !metodo_pago
  ) {
    return res.status(400).json({
      error:
        'Campos requeridos: estudianteId, materias, periodoId, metodo_pago'
    });
  }

  // Validar método de pago
  if (!METODO_PAGO.includes(metodo_pago)) {
    return res.status(400).json({
      error:
        'El metodo de pago debe ser: Efectivo, Transferencia, Debito o Credito'
    });
  }

  // Respuesta exitosa
  return res.status(201).json({
    version: 'v2',
    estudianteId,
    materias,
    periodoId,
    metodo_pago
  });
});

export default router;