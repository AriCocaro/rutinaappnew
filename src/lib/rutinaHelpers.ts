import {
  ItemEntrenamiento,
  EjercicioItem,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| OBTENER EJERCICIOS PLANOS
|--------------------------------------------------------------------------
|
| Convierte una estructura:
|
| Grupo
| ├─ Ejercicio
| ├─ Ejercicio
| └─ Grupo
|    ├─ Ejercicio
|    └─ Ejercicio
|
| en una lista simple de ejercicios.
|
*/

export function obtenerEjerciciosPlanos(
  items: ItemEntrenamiento[]
): EjercicioItem[] {

  const resultado:
    EjercicioItem[] = [];

  function recorrer(
    lista: ItemEntrenamiento[]
  ): void {

    for (const item of lista) {

      /*
      |--------------------------------------------------------
      | EJERCICIO
      |--------------------------------------------------------
      */

      if (
        item.tipo ===
        "ejercicio"
      ) {

        resultado.push(
          item
        );

        continue;
      }

      /*
      |--------------------------------------------------------
      | GRUPO
      |--------------------------------------------------------
      */

      recorrer(
        item.contenido.items
      );
    }
  }

  recorrer(items);

  return resultado;
}

/*
|--------------------------------------------------------------------------
| CONTAR EJERCICIOS
|--------------------------------------------------------------------------
*/

export function contarEjercicios(
  items: ItemEntrenamiento[]
): number {

  return obtenerEjerciciosPlanos(
    items
  ).length;
}