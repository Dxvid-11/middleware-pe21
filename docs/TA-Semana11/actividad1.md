# Actividad 1 – Modelo de Control de Acceso

## Tabla de Roles y Permisos

| Herramienta | Roles autorizados | Restricción adicional |
|-------------|-------------------|-----------------------|
| consultar_calificaciones | Estudiante, Docente, Coordinador Académico | El estudiante únicamente puede consultar sus propias calificaciones. El docente solo puede consultar las materias que imparte. El coordinador puede consultar la información académica de su carrera. |
| subir_calificaciones | Docente | Solo puede registrar calificaciones de las asignaturas que tiene asignadas y durante el período académico habilitado. |
| exportar_reporte_academico | Coordinador Académico | Puede generar reportes únicamente de la carrera o facultad bajo su responsabilidad. |
| consultar_pagos | Estudiante, Coordinador Académico | El estudiante únicamente consulta sus propios pagos. El coordinador puede consultar información financiera relacionada con procesos académicos autorizados. |

---

# Justificación del Modelo de Control de Acceso

El sistema de gestión académica de la UIDE Loja administra información académica y administrativa que únicamente debe estar disponible para usuarios autorizados. Para controlar el acceso a las herramientas internas resulta adecuado utilizar un modelo basado principalmente en Roles (RBAC), ya que las funciones de cada usuario dentro de la institución se encuentran claramente definidas. Los estudiantes consultan información personal, los docentes registran y administran calificaciones de sus asignaturas y los coordinadores académicos supervisan la información correspondiente a sus carreras.

No obstante, RBAC por sí solo no cubre todos los escenarios del sistema. Existen situaciones donde dos usuarios poseen el mismo rol, pero únicamente uno debe acceder a determinada información dependiendo del contexto. En estos casos resulta conveniente complementar el modelo mediante ABAC (Attribute-Based Access Control), incorporando atributos del usuario y del recurso.

Por ejemplo, un estudiante debe consultar únicamente las calificaciones asociadas a su identificador institucional; un docente solamente puede registrar notas de las materias que tiene asignadas durante el período académico activo; y un coordinador únicamente puede generar reportes correspondientes a la carrera bajo su responsabilidad. Estas restricciones dependen de atributos como el identificador del estudiante, la asignatura, la carrera, el período académico y la relación existente entre el usuario y el recurso solicitado.

Por lo tanto, el modelo más apropiado para este sistema corresponde a una combinación de RBAC y ABAC. RBAC determina qué herramientas puede utilizar cada rol institucional, mientras que ABAC valida condiciones específicas sobre los recursos para garantizar el principio de mínimo privilegio, proteger la confidencialidad de la información y fortalecer la seguridad del sistema académico.