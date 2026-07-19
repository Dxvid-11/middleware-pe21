-- ==========================================
-- GTA-11
-- Actividad 2
-- Diseño de Vistas MySQL y Permisos
-- ==========================================

USE api_calificaciones_db;

-- Vista completa de calificaciones
CREATE OR REPLACE VIEW v_calificaciones AS
SELECT
    id,
    estudiante_id,
    estudiante_nombre,
    materia,
    calificacion,
    periodo
FROM calificaciones;

-- Vista pública con proyección de columnas
CREATE OR REPLACE VIEW v_calificaciones_publicas AS
SELECT
    id,
    estudiante_nombre,
    materia,
    calificacion,
    periodo
FROM calificaciones;

-- Usuario utilizado por la API
CREATE USER IF NOT EXISTS 'api_user'@'localhost'
IDENTIFIED BY 'api123';

-- Revocar acceso directo a la tabla
REVOKE SELECT
ON api_calificaciones_db.calificaciones
FROM 'api_user'@'localhost';

-- Permitir acceso únicamente mediante las vistas
GRANT SELECT
ON api_calificaciones_db.v_calificaciones
TO 'api_user'@'localhost';

GRANT SELECT
ON api_calificaciones_db.v_calificaciones_publicas
TO 'api_user'@'localhost';

FLUSH PRIVILEGES;