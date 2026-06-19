 /*                                                                         |
| -------------------------------------------------------------------------- |
| OBJETIVO DEL ALUMNO                                                        |
| -------------------------------------------------------------------------- |
|                                                                            |
| Historial de objetivos planteados.                                         |
|                                                                            |
| Un objetivo nunca debería eliminarse.                                      |
| Simplemente puede marcarse como:                                           |
|                                                                            |
| - activo                                                                   |
| - cumplido                                                                 |
| - cancelado                                                                |
|                                                                            |
| */                                                                         

export type ObjetivoAlumno = {

id: string;

titulo: string;

descripcion: string;

fechaCreacion: string;

creadoPor:
| "alumno"
| "instructor"
| "admin";

estado:
| "activo"
| "cumplido"
| "cancelado";
};

/*                                                                         |
| -------------------------------------------------------------------------- |
| ARCHIVO ADJUNTO                                                            |
| -------------------------------------------------------------------------- |
|                                                                            |
| Archivos asociados al perfil.                                              |
|                                                                            |
| Ejemplos:                                                                  |
|                                                                            |
| - análisis clínicos                                                        |
| - radiografías                                                             |
| - resonancias                                                              |
| - certificados                                                             |
| - fotos                                                                    |
|                                                                            |
| */                                                                         

export type ArchivoAlumno = {

id: string;

nombre: string;

tipo:
| "analisis"
| "radiografia"
| "resonancia"
| "certificado"
| "foto"
| "otro";

fechaSubida: string;

url: string;

observaciones?: string;
};

/*                                                                         |
| -------------------------------------------------------------------------- |
| MEDICIÓN                                                                   |
| -------------------------------------------------------------------------- |
|                                                                            |
| Preparado para futuras gráficas.                                           |
|                                                                            |
| */                                                                         

export type MedicionAlumno = {

id: string;

fecha: string;

peso: number | null;

pliegues: number | null;

cintura: number | null;

cuello: number | null;

muslo: number | null;

observaciones?: string;
};

/*                                                                         |
| -------------------------------------------------------------------------- |
| INFORMACIÓN ECONÓMICA                                                      |
| -------------------------------------------------------------------------- |
|                                                                            |
| Visible únicamente para:                                                   |
|                                                                            |
| - admin                                                                    |
|                                                                            |
| El instructor no debería verla.                                            |
|                                                                            |
| */                                                                         

export type SituacionEconomicaAlumno = {

estado:
| "al_dia"
| "deuda";

plan: string;

ultimoPago: string | null;

observaciones: string;
};

/*                                                                         |
| -------------------------------------------------------------------------- |
| ASISTENCIA                                                                 |
| -------------------------------------------------------------------------- |
|                                                                            |
| Datos simples de asistencia.                                               |
|                                                                            |
| Más adelante puede evolucionar                                             |
| a un historial completo.                                                   |
|                                                                            |
| */                                                                         
export type AsistenciaAlumno = {

vecesPorSemanaObjetivo:
number | null;

promedioSemanal:
number | null;

observaciones: string;
};

/*                                                                         |
| -------------------------------------------------------------------------- |
| ALUMNO                                                                     |
| -------------------------------------------------------------------------- |
|                                                                            |
| Entidad principal del sistema.                                             |
|                                                                            |
| Todo gira alrededor del alumno:                                            |
|                                                                            |
| - rutinas                                                                  |
| - objetivos                                                                |
| - mediciones                                                               |
| - archivos                                                                 |
| - asistencia                                                               |
|                                                                            |
| */                                                                         

export type Alumno = {

/*                                                                         |
| -------------------------------------------------------------------------- |
| IDENTIFICACIÓN                                                             |
| -------------------------------------------------------------------------- |
| */                                                                         

id: string;

nombre: string;

apellido: string;

nrodoc: string;

/*                                                                         |
| -------------------------------------------------------------------------- |
| CONTACTO                                                                   |
| -------------------------------------------------------------------------- |
| */                                                                         

email: string;

telefono: string;

direccion: string,

 /*                                                                         |
| -------------------------------------------------------------------------- |
| DATOS PERSONALES                                                           |
| -------------------------------------------------------------------------- |
| */                                                                         

fechaNacimiento:
string | null;

sexo:
string | null;

observaciones:
string;

/*                                                                         |
| -------------------------------------------------------------------------- |
| NOTAS PRIVADAS                                                             |
| -------------------------------------------------------------------------- |
|                                                                            |
| Solo instructor/admin.                                                     |
|                                                                            |
| */                                                                         

notasInstructor:
string;

/*                                                                         |
| -------------------------------------------------------------------------- |
| FECHAS                                                                     |
| -------------------------------------------------------------------------- |
| */                                                                         

fechaAlta: string;

activo: boolean;

/*                                                                         |
| -------------------------------------------------------------------------- |
| CONTENIDO                                                                  |
| -------------------------------------------------------------------------- |
| */                                                                         

objetivos:
ObjetivoAlumno[];

archivos:
ArchivoAlumno[];

mediciones:
MedicionAlumno[];

/*                                                                         |
| -------------------------------------------------------------------------- |
| ADMINISTRACIÓN                                                             |
| -------------------------------------------------------------------------- |
| */                                                                         

asistencia:
AsistenciaAlumno;

situacionEconomica:
SituacionEconomicaAlumno;
};
