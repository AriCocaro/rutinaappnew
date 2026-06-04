import { useState } from "react";

import {
  Rutina,
  ProgresionBloque,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  rutinaInicial?: Rutina;
};

/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
|
| Maneja los datos generales del constructor:
|
| - Alumno
| - Fecha de inicio
| - Cantidad de bloques
| - Entrenamientos por bloque
| - Progresión global
|
| Si existe rutinaInicial:
|   carga los datos guardados.
|
| Si NO existe:
|   inicia el formulario vacío.
|
*/

export function useConstructorRutina({
  rutinaInicial,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | ALUMNO
  |--------------------------------------------------------------------------
  |
  | En edición:
  |   utiliza el alumno guardado.
  |
  | En creación:
  |   comienza sin seleccionar.
  |
  */

  const [
    alumnoId,
    setAlumnoId,
  ] = useState<string>(

    rutinaInicial?.alumnoId ??

    ""
  );

  /*
  |--------------------------------------------------------------------------
  | FECHA DE INICIO
  |--------------------------------------------------------------------------
  */

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState<string>(

    rutinaInicial?.fechaInicio ??

    ""
  );

  /*
  |--------------------------------------------------------------------------
  | CANTIDAD DE BLOQUES
  |--------------------------------------------------------------------------
  |
  | Representa la duración del plan.
  |
  | Ejemplos:
  |
  | 4 bloques
  | 6 bloques
  | 8 bloques
  |
  | En creación:
  |   inicia vacío.
  |
  */

  const [
    cantidadBloques,
    setCantidadBloques,
  ] = useState<number | null>(

    rutinaInicial?.cantidadBloques ??

    null
  );

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS POR BLOQUE
  |--------------------------------------------------------------------------
  |
  | Cantidad de entrenamientos
  | distintos que tendrá el bloque.
  |
  | Ejemplo:
  |
  | Bloque:
  |   4 semanas
  |
  | Entrenamientos:
  |   A
  |   B
  |   C
  |
  | Valor:
  |   3
  |
  */

  const [
    entrenamientosPorBloque,
    setEntrenamientosPorBloque,
  ] = useState<number | null>(

    rutinaInicial
      ?.entrenamientosPorBloque ??

    null
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  |
  | Define la progresión principal
  | del plan.
  |
  | Cada bloque puede contener:
  |
  | - series
  | - reps
  |
  | Se configura desde:
  |
  | ProgresionGlobal.tsx
  |
  */

  const [
    progresionGlobal,
    setProgresionGlobal,
  ] = useState<ProgresionBloque[]>(

    rutinaInicial
      ?.progresionGlobal ??

    []
  );

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {

    /*
    |--------------------------------------------------------------------------
    | ALUMNO
    |--------------------------------------------------------------------------
    */

    alumnoId,
    setAlumnoId,

    /*
    |--------------------------------------------------------------------------
    | FECHA
    |--------------------------------------------------------------------------
    */

    fechaInicio,
    setFechaInicio,

    /*
    |--------------------------------------------------------------------------
    | BLOQUES
    |--------------------------------------------------------------------------
    */

    cantidadBloques,
    setCantidadBloques,

    /*
    |--------------------------------------------------------------------------
    | ENTRENAMIENTOS
    |--------------------------------------------------------------------------
    */

    entrenamientosPorBloque,
    setEntrenamientosPorBloque,

    /*
    |--------------------------------------------------------------------------
    | PROGRESIÓN
    |--------------------------------------------------------------------------
    */

    progresionGlobal,
    setProgresionGlobal,
  };
}