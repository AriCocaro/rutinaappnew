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

  return JSON.parse(data);
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

  const nuevasRutinas = [

    ...rutinas,

    rutina,
  ];

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      nuevasRutinas
    )
  );
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
    rutinas.map((rutina) => {

      if (
        rutina.id ===
        rutinaActualizada.id
      ) {

        return rutinaActualizada;
      }

      return rutina;
    });

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      nuevasRutinas
    )
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

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      nuevasRutinas
    )
  );
}