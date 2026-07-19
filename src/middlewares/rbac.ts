import { Response, NextFunction } from "express";

export const requireRole = (...rolesPermitidos: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const usuario = req.user;

    if (!usuario) {
      return res.status(401).json({
        message: "No autenticado",
      });
    }

    const roles = usuario.roles || [];

    const tieneRol = roles.some((rol: string) =>
      rolesPermitidos.includes(rol)
    );

    if (!tieneRol) {
      return res.status(403).json({
        message: "No tiene permisos",
      });
    }

    next();
  };
};