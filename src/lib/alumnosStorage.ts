"use client";

 /*                                                                         
| -------------------------------------------------------------------------- |
| TYPES                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

import {
Alumno,
} from "@/types/alumnos";

/*                                                                         
| -------------------------------------------------------------------------- |
| STORAGE KEY                                                                |
| -------------------------------------------------------------------------- |
| */                                                                         

const STORAGE_KEY =
"megagym_alumnos";

 /*                                                                         |
| -------------------------------------------------------------------------- |
| OBTENER ALUMNOS                                                            |
| -------------------------------------------------------------------------- |
| */                                                                         

export function obtenerAlumnos():
Alumno[] {

if (
typeof window ===
"undefined"
) {
return [];
}

const data =
localStorage.getItem(
STORAGE_KEY
);

if (!data) {
return [];
}

try {


return JSON.parse(
  data
) as Alumno[];


} catch (error) {


console.error(
  "Error leyendo alumnos:",
  error
);

return [];


}
}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| GUARDAR ALUMNOS                                                            |
| -------------------------------------------------------------------------- |
| */                                                                         

export function guardarAlumnos(
alumnos: Alumno[]
): void {

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(
alumnos
)
);
}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| OBTENER ALUMNO POR ID                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         



export function obtenerAlumnoPorId(
id: string
): Alumno | null {

const alumnos =
obtenerAlumnos();

const alumno =
alumnos.find(
(a) =>
a.id === id
);

return (
alumno ?? null
);
}

/*                                                                         |
| -------------------------------------------------------------------------- |
| AGREGAR ALUMNO                                                             |
| -------------------------------------------------------------------------- |
| */                                                                         

export function agregarAlumno(
alumno: Alumno
): void {

const alumnos =
obtenerAlumnos();

const existe =
alumnos.some(
(a) =>
a.id === alumno.id
);

if (existe) {


console.warn(
  "Alumno ya existente:",
  alumno.id
);

return;


}

guardarAlumnos([
...alumnos,
alumno,
]);
}

/*                                                                         |
| -------------------------------------------------------------------------- |
| ACTUALIZAR ALUMNO                                                          |
| -------------------------------------------------------------------------- |
| */                                                                         

export function actualizarAlumno(
alumnoActualizado:
Alumno
): void {

const alumnos =
obtenerAlumnos();

const nuevosAlumnos =
alumnos.map(
(alumno) => {


    if (
      alumno.id ===
      alumnoActualizado.id
    ) {
      return alumnoActualizado;
    }

    return alumno;
  }
);


guardarAlumnos(
nuevosAlumnos
);
}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| ELIMINAR ALUMNO                                                            |
| -------------------------------------------------------------------------- |
| */                                                                         

export function eliminarAlumno(
id: string
): void {

const alumnos =
obtenerAlumnos();

const nuevosAlumnos =
alumnos.filter(
(alumno) =>
alumno.id !== id
);

guardarAlumnos(
nuevosAlumnos
);
}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| GENERAR ID                                                                 |
| -------------------------------------------------------------------------- |
| */                                                                         

export function generarAlumnoId():
string {

return String(
 crypto.randomUUID()
);
}
