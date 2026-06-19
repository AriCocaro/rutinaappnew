import {
  obtenerRutinaActivaPorAlumno,
} from "@/lib/rutinasStorage";

import {
  obtenerProgresoAlumno,
} from "@/lib/progresoStorage";

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
*/

export function obtenerProximoEntrenamiento(

  alumnoId: string

) {

  const rutina =
    obtenerRutinaActivaPorAlumno(
      alumnoId
    );

  if (!rutina) {
    return null;
  }



  return rutina.entrenamientos[0];
}

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

