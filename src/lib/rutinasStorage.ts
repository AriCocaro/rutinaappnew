import {
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| STORAGE KEY
|--------------------------------------------------------------------------
*/

const STORAGE_KEY =
  "rutinas";

/*
|--------------------------------------------------------------------------
| GUARDAR EN STORAGE
|--------------------------------------------------------------------------
|
| Centraliza todas las escrituras.
|
*/

function guardarRutinas(
  rutinas: Rutina[]
) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      rutinas
    )
  );
}

/*
|--------------------------------------------------------------------------
| OBTENER TODAS
|--------------------------------------------------------------------------
*/

export function obtenerRutinas():
  Rutina[] {

  /*
  |--------------------------------------------------------------------------
  | SSR
  |--------------------------------------------------------------------------
  */

  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  /*
  |--------------------------------------------------------------------------
  | STORAGE
  |--------------------------------------------------------------------------
  */

  const data =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!data) {
    return [];
  }

  /*
  |--------------------------------------------------------------------------
  | SEGURIDAD
  |--------------------------------------------------------------------------
  |
  | Si el JSON se corrompe
  | evitamos romper toda la app.
  |
  */

  try {

    return JSON.parse(
      data
    );

  } catch {

    console.error(
      "Error leyendo rutinas desde localStorage"
    );

    return [];
  }
}

/*
|--------------------------------------------------------------------------
| OBTENER POR ID
|--------------------------------------------------------------------------
*/

export function obtenerRutinaPorId(
  id: number
): Rutina | undefined {

  const rutinas =
    obtenerRutinas();

  return rutinas.find(
    (rutina) =>
      rutina.id === id
  );
}

/*
|--------------------------------------------------------------------------
| AGREGAR
|--------------------------------------------------------------------------
*/

export function agregarRutina(
  rutina: Rutina
) {

  const rutinas =
    obtenerRutinas();

  /*
  |--------------------------------------------------------------------------
  | EVITAR DUPLICADOS
  |--------------------------------------------------------------------------
  */

  const existe =
    rutinas.some(
      (r) =>
        r.id === rutina.id
    );

  if (existe) {

    console.warn(
      "La rutina ya existe:",
      rutina.id
    );

    return;
  }

  guardarRutinas([

    ...rutinas,

    rutina,
  ]);
}

/*
|--------------------------------------------------------------------------
| ACTUALIZAR
|--------------------------------------------------------------------------
*/

export function actualizarRutina(
  rutinaActualizada: Rutina
) {

  const rutinas =
    obtenerRutinas();

  const nuevasRutinas =
    rutinas.map(
      (rutina) => {

        if (
          rutina.id ===
          rutinaActualizada.id
        ) {

          return {

            ...rutinaActualizada,

            fechaUltimaEdicion:
              new Date()
                .toISOString(),
          };
        }

        return rutina;
      }
    );

  guardarRutinas(
    nuevasRutinas
  );
}

/*
|--------------------------------------------------------------------------
| ELIMINAR
|--------------------------------------------------------------------------
*/

export function eliminarRutina(
  id: number
) {

  const rutinas =
    obtenerRutinas();

  const nuevasRutinas =
    rutinas.filter(
      (rutina) =>
        rutina.id !== id
    );

  guardarRutinas(
    nuevasRutinas
  );
}