import {
  obtenerRutinaActivaPorAlumno,
} from "@/lib/rutinasStorage";

import {
  obtenerProgresoAlumno,
} from "@/lib/progreso/progresoStorage";

import {
  Rutina,
} from "@/types/rutinas";

import {
  DiaEntrenado,
} from "@/types/progreso";

/*
|--------------------------------------------------------------------------
| RUTINA ACTIVA
|--------------------------------------------------------------------------
*/

export function obtenerRutinaActivaAlumno(

  alumnoId: string

): Rutina | null {

  return (

    obtenerRutinaActivaPorAlumno(
      alumnoId
    ) ?? null

  );
}

/*
|--------------------------------------------------------------------------
| ÚLTIMO ENTRENAMIENTO
|--------------------------------------------------------------------------
*/

export function obtenerUltimoEntrenamiento(

  alumnoId: string

): DiaEntrenado | null {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  if (!progreso) {
    return null;
  }

  if (
    progreso.entrenamientos
      .length === 0
  ) {
    return null;
  }

  return (
    progreso.entrenamientos[
      progreso.entrenamientos.length - 1
    ]
  );
}

/*
|--------------------------------------------------------------------------
| ENTRENAMIENTOS DE LA SEMANA
|--------------------------------------------------------------------------
*/

export function obtenerEntrenamientosSemana(

  alumnoId: string

): number {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  if (!progreso) {
    return 0;
  }

  const hoy =
    new Date();

  const hace7Dias =
    new Date();

  hace7Dias.setDate(
    hoy.getDate() - 7
  );

  return progreso.entrenamientos.filter(

    (item) =>

      new Date(
        item.fecha
      ) >= hace7Dias

  ).length;
}

/*
|--------------------------------------------------------------------------
| PRÓXIMO ENTRENAMIENTO
|--------------------------------------------------------------------------
|
| Devuelve el próximo entrenamiento sugerido para el alumno.
|
| Por el momento la lógica es simple:
|
| - busca la rutina activa
| - si no existe rutina devuelve null
| - si la rutina no tiene entrenamientos devuelve null
| - devuelve el primer entrenamiento de la rutina
|
| Más adelante esta función podrá evolucionar para:
|
| - detectar entrenamientos completados
| - continuar desde el último realizado
| - respetar bloques y progresiones
| - manejar ciclos avanzados
|
*/

export function obtenerProximoEntrenamiento(

  alumnoId: string

) {

  /*
  |--------------------------------------------------------------------------
  | RUTINA ACTIVA
  |--------------------------------------------------------------------------
  */

  const rutina =
    obtenerRutinaActivaPorAlumno(
      alumnoId
    );

  if (!rutina) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | SIN ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  */

  if (
    rutina.entrenamientos.length === 0
  ) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | PRÓXIMO ENTRENAMIENTO
  |--------------------------------------------------------------------------
  |
  | Actualmente se considera
  | el primer entrenamiento
  | de la rutina.
  |
  */

  return (
    rutina.entrenamientos[0]
  );
}

/*
|--------------------------------------------------------------------------
| TODO
|--------------------------------------------------------------------------
|
| Utilizar ProgresoAlumno para
| identificar cuál fue el último
| entrenamiento realizado y
| devolver el siguiente.
|
*/

/*
|--------------------------------------------------------------------------
| RESUMEN DASHBOARD
|--------------------------------------------------------------------------
*/

export function obtenerResumenDashboard(

  alumnoId: string

) {

  const rutina =
    obtenerRutinaActivaAlumno(
      alumnoId
    );

  const ultimoEntrenamiento =
    obtenerUltimoEntrenamiento(
      alumnoId
    );

  const entrenamientosSemana =
    obtenerEntrenamientosSemana(
      alumnoId
    );

  const proximoEntrenamiento =
    obtenerProximoEntrenamiento(
      alumnoId
    );

  return {

    rutina,

    ultimoEntrenamiento,

    entrenamientosSemana,

    proximoEntrenamiento,
  };
}

