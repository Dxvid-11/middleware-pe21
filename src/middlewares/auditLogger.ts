import { Request, Response, NextFunction } from "express";
import { randomInt } from "crypto";
import { pool } from "../db/pool.js";

export async function auditStart(
  req: any,
  res: Response,
  next: NextFunction
) {
  const auditId = randomInt(100000, 999999);

  req.auditId = auditId;

  try {
    await pool.query(
      `INSERT INTO audit_log
      (audit_id, event_type, method, endpoint, user_id)
      VALUES (?, ?, ?, ?, ?)`,
      [
        auditId,
        "REQUEST",
        req.method,
        req.originalUrl,
        req.user?.sub ?? null
      ]
    );
  } catch (error) {
    console.error(error);
  }

  next();
}

export function auditEnd(
  req: any,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json;

  res.json = function (body: any) {

    pool.query(
      `INSERT INTO audit_log
      (audit_id, event_type, method, endpoint, user_id, status_code)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.auditId,
        "RESPONSE",
        req.method,
        req.originalUrl,
        req.user?.sub ?? null,
        res.statusCode
      ]
    ).catch(console.error);

    return originalJson.call(this, body);
  };

  next();
}