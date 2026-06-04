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
*/

export function useConstructorRutina({
  rutinaInicial,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | ALUMNO
  |--------------------------------------------------------------------------
  */

  const [
    alumnoId,
    setAlumnoId,
  ] = useState(

    rutinaInicial?.alumnoId ??

    "alumno_001"
  );

  /*
  |--------------------------------------------------------------------------
  | FECHA DE INICIO
  |--------------------------------------------------------------------------
  */

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState(

    rutinaInicial?.fechaInicio ??

    ""
  );

  /*
  |--------------------------------------------------------------------------
  | CANTIDAD DE BLOQUES
  |--------------------------------------------------------------------------
  |
  | Bloque = Semana.
  |
  | Valor inicial:
  | - Rutina existente => valor guardado
  | - Rutina nueva => 4 semanas sugeridas
  |
  */

  const [
    cantidadBloques,
    setCantidadBloques,
  ] = useState<number | null>(

    rutinaInicial?.cantidadBloques ??

    4
  );

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS POR BLOQUE
  |--------------------------------------------------------------------------
  |
  | Cantidad de entrenamientos distintos
  | que se repetirán dentro del bloque.
  |
  */

  const [
    entrenamientosPorBloque,
    setEntrenamientosPorBloque,
  ] = useState<number | null>(

    rutinaInicial
      ?.entrenamientosPorBloque ??

    rutinaInicial
      ?.entrenamientos.length ??

    3
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  |
  | NO generamos progresiones automáticas.
  |
  | El instructor decide:
  |
  | - Cuántos bloques usar.
  | - Qué series usar.
  | - Qué repeticiones usar.
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
    |----------------------------------------------------------------------
    | ALUMNO
    |----------------------------------------------------------------------
    */

    alumnoId,
    setAlumnoId,

    /*
    |----------------------------------------------------------------------
    | FECHA
    |----------------------------------------------------------------------
    */

    fechaInicio,
    setFechaInicio,

    /*
    |----------------------------------------------------------------------
    | BLOQUES
    |----------------------------------------------------------------------
    */

    cantidadBloques,
    setCantidadBloques,

    /*
    |----------------------------------------------------------------------
    | ENTRENAMIENTOS
    |----------------------------------------------------------------------
    */

    entrenamientosPorBloque,
    setEntrenamientosPorBloque,

    /*
    |----------------------------------------------------------------------
    | PROGRESIÓN
    |----------------------------------------------------------------------
    */

    progresionGlobal,
    setProgresionGlobal,
  };
}