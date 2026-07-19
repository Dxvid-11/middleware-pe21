import { Router } from "express";
import { requireRole } from "../../middlewares/rbac.js";
import { queryAsUser } from "../../db/pool.js";

const router = Router();

// ==========================================
// GET /v1/calificaciones
// Roles permitidos:
// - estudiante
// - docente
// - coordinador_academico
// ==========================================
router.get(
  "/",
  requireRole(
    "estudiante",
    "docente",
    "coordinador_academico"
  ),
  async (req: any, res) => {
    try {
      const calificaciones = await queryAsUser(
        req.user.sub,
        "SELECT * FROM v_calificaciones WHERE estudiante_id = ?",
        [req.user.sub]
      );

      return res.status(200).json(calificaciones);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error consultando calificaciones"
      });
    }
  }
);

// ==========================================
// POST /v1/calificaciones
// Solo docente
// ==========================================
router.post(
  "/",
  requireRole("docente"),
  (req: any, res) => {
    return res.status(201).json({
      message: "Calificación registrada",
      usuario: req.user
    });
  }
);

// ==========================================
// GET /v1/calificaciones/reporte
// Solo coordinador académico
// ==========================================
router.get(
  "/reporte",
  requireRole("coordinador_academico"),
  (req: any, res) => {
    return res.status(200).json({
      message: "Reporte académico generado",
      usuario: req.user
    });
  }
);

export default router;