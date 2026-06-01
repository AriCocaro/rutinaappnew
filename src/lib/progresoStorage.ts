import {
  ProgresoAlumno,
  DiaEntrenado,
} from "@/types/progreso";

/*
|--------------------------------------------------------------------------
| STORAGE KEY
|--------------------------------------------------------------------------
*/

const STORAGE_KEY =
  "progreso_alumnos";

/*
|--------------------------------------------------------------------------
| OBTENER TODO
|--------------------------------------------------------------------------
*/

export function obtenerProgresos():
  ProgresoAlumno[] {

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

  return JSON.parse(data);
}

/*
|--------------------------------------------------------------------------
| GUARDAR TODO
|--------------------------------------------------------------------------
*/

function guardarProgresos(

  progresos:
    ProgresoAlumno[]

) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      progresos
    )
  );
}

/*
|--------------------------------------------------------------------------
| OBTENER PROGRESO ALUMNO
|--------------------------------------------------------------------------
*/

export function obtenerProgresoAlumno(

  alumnoId: string

): ProgresoAlumno | null {

  const progresos =
    obtenerProgresos();

  return (

    progresos.find(
      (item) =>
        item.alumnoId ===
        alumnoId
    ) ?? null
  );
}

/*
|--------------------------------------------------------------------------
| GUARDAR ENTRENAMIENTO
|--------------------------------------------------------------------------
*/

export function guardarEntrenamiento(

  alumnoId: string,

  entrenamiento:
    DiaEntrenado

) {

  const progresos =
    obtenerProgresos();

  const index =
    progresos.findIndex(
      (item) =>
        item.alumnoId ===
        alumnoId
    );

  /*
  |--------------------------------------------------------------------------
  | SI NO EXISTE
  |--------------------------------------------------------------------------
  */

  if (index === -1) {

    progresos.push({

      alumnoId,

      entrenamientos: [
        entrenamiento,
      ],
    });

    guardarProgresos(
      progresos
    );

    return;
  }

  /*
  |--------------------------------------------------------------------------
  | SI EXISTE
  |--------------------------------------------------------------------------
  */

  progresos[
    index
  ].entrenamientos.push(
    entrenamiento
  );

  guardarProgresos(
    progresos
  );
}

/*
|--------------------------------------------------------------------------
| ÚLTIMO PESO USADO
|--------------------------------------------------------------------------
*/

export function obtenerUltimoPeso(

  alumnoId: string,

  ejercicioId: number

): number | null {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  if (!progreso) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | RECORRER DESDE EL FINAL
  |--------------------------------------------------------------------------
  */

  const entrenamientos =
    [
      ...progreso.entrenamientos,
    ].reverse();

  for (const entrenamiento of entrenamientos) {

    for (const ejercicio of entrenamiento.ejercicios) {

      if (
        ejercicio.ejercicioId ===
        ejercicioId
      ) {

        const series =
          [
            ...ejercicio.series,
          ].reverse();

        for (const serie of series) {

          if (
            serie.peso !== null
          ) {

            return serie.peso;
          }
        }
      }
    }
  }

  return null;
}