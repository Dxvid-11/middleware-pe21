-- ==========================================
-- GTA-11
-- Actividad 3
-- Consultas de Auditoría
-- ==========================================

-- =====================================================
-- (a) Accesos denegados (403) durante julio de 2026
-- =====================================================

SELECT *
FROM audit_log
WHERE status = 403
  AND audit_time BETWEEN '2026-07-01 00:00:00'
                     AND '2026-07-31 23:59:59';


-- =====================================================
-- (b) Historial de accesos del usuario est-0042
-- al endpoint /v1/calificaciones
-- =====================================================

SELECT *
FROM audit_log
WHERE user_id = 'est-0042'
  AND path = '/v1/calificaciones'
ORDER BY audit_time DESC;


-- =====================================================
-- (c) Solicitudes exitosas por usuario
-- Semana del 13 al 19 de julio de 2026
-- =====================================================

SELECT
    user_id,
    COUNT(*) AS solicitudes_exitosas
FROM audit_log
WHERE status = 200
  AND audit_time BETWEEN '2026-07-13 00:00:00'
                     AND '2026-07-19 23:59:59'
GROUP BY user_id
ORDER BY solicitudes_exitosas DESC;