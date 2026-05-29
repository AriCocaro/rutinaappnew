import { Rutina } from "@/types/rutinas";

const STORAGE_KEY = "rutinas_app";

/*
|--------------------------------------------------------------------------
| OBTENER RUTINAS
|--------------------------------------------------------------------------
*/

export function obtenerRutinas(): Rutina[] {

  if (typeof window === "undefined") {
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

    return JSON.parse(data);

  } catch {

    return [];
  }
}

/*
|--------------------------------------------------------------------------
| GUARDAR TODAS
|--------------------------------------------------------------------------
*/

export function guardarRutinas(
  rutinas: Rutina[]
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(rutinas)
  );
}

/*
|--------------------------------------------------------------------------
| AGREGAR RUTINA
|--------------------------------------------------------------------------
*/

export function agregarRutina(
  rutina: Rutina
) {

  const rutinas =
    obtenerRutinas();

  rutinas.push(rutina);

  guardarRutinas(rutinas);
}

/*
|--------------------------------------------------------------------------
| OBTENER RUTINA POR ID
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
| ACTUALIZAR RUTINA
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
    "rutinas",
    JSON.stringify(
      nuevasRutinas
    )
  );
}