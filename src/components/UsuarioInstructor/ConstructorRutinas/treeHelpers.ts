import {
  EjercicioRutina,
  GrupoEjercicios,
  GrupoItem,
  ItemEntrenamiento,
} from "@/types/rutinas";

export function esGrupo(
  item: ItemEntrenamiento
): item is GrupoItem {

  return item.tipo === "grupo";
}

export function buscarGrupo(
  items: ItemEntrenamiento[],
  grupoId: string
): GrupoEjercicios | null {

  for (const item of items) {

    if (
      esGrupo(item) &&
      item.contenido.id === grupoId
    ) {
      return item.contenido;
    }

    if (esGrupo(item)) {

      const encontrado =
        buscarGrupo(
          item.contenido.items,
          grupoId
        );

      if (encontrado) {
        return encontrado;
      }
    }
  }

  return null;
}

export function actualizarGrupoRecursivo(
  items: ItemEntrenamiento[],
  grupoId: string,
  updater: (
    grupo: GrupoEjercicios
  ) => GrupoEjercicios
): ItemEntrenamiento[] {

  return items.map((item) => {

    if (
      esGrupo(item) &&
      item.contenido.id === grupoId
    ) {
      return {
        ...item,
        contenido: updater(
          item.contenido
        ),
      };
    }

    if (esGrupo(item)) {

      return {
        ...item,
        contenido: {
          ...item.contenido,
          items:
            actualizarGrupoRecursivo(
              item.contenido.items,
              grupoId,
              updater
            ),
        },
      };
    }

    return item;
  });
}

export function eliminarNodoRecursivo(
  items: ItemEntrenamiento[],
  nodoId: string
): ItemEntrenamiento[] {

  return items
    .filter((item) => {

      if (
        item.tipo === "grupo" &&
        item.contenido.id === nodoId
      ) {
        return false;
      }

      return true;
    })
    .map((item) => {

      if (
        item.tipo === "grupo"
      ) {

        return {
          ...item,
          contenido: {
            ...item.contenido,
            items:
              eliminarNodoRecursivo(
                item.contenido.items,
                nodoId
              ),
          },
        };
      }

      return item;
    });
}

/*
|--------------------------------------------------------------------------
| ACTUALIZAR EJERCICIO RECURSIVO
|--------------------------------------------------------------------------
|
| Busca un ejercicio dentro de cualquier nivel
| de grupos y aplica un updater.
|
| Ejemplo:
|
| Grupo
| └─ Grupo
|     └─ Ejercicio
|
*/

export function actualizarEjercicioRecursivo(

  items: ItemEntrenamiento[],

  ejercicioId: string,

  updater: (
    ejercicio: EjercicioRutina
  ) => EjercicioRutina

): ItemEntrenamiento[] {

  return items.map((item) => {

    /*
    |--------------------------------------------------------------------------
    | EJERCICIO
    |--------------------------------------------------------------------------
    */

    if (
      item.tipo ===
      "ejercicio"
    ) {

      if (
        item.contenido.id !==
        ejercicioId
      ) {
        return item;
      }

      return {

        ...item,

        contenido:
          updater(
            item.contenido
          ),
      };
    }

    /*
    |--------------------------------------------------------------------------
    | GRUPO
    |--------------------------------------------------------------------------
    */

    return {

      ...item,

      contenido: {

        ...item.contenido,

        items:
          actualizarEjercicioRecursivo(
            item.contenido.items,
            ejercicioId,
            updater
          ),
      },
    };
  });
}

/*
|--------------------------------------------------------------------------
| ELIMINAR EJERCICIO RECURSIVO
|--------------------------------------------------------------------------
|
| Elimina un ejercicio sin importar
| la profundidad.
|
*/

export function eliminarEjercicioRecursivo(

  items: ItemEntrenamiento[],

  ejercicioId: string

): ItemEntrenamiento[] {

  return items

    .filter((item) => {

      if (
        item.tipo ===
        "ejercicio"
      ) {

        return (
          item.contenido.id !==
          ejercicioId
        );
      }

      return true;
    })

    .map((item) => {

      if (
        item.tipo !==
        "grupo"
      ) {
        return item;
      }

      return {

        ...item,

        contenido: {

          ...item.contenido,

          items:
            eliminarEjercicioRecursivo(
              item.contenido.items,
              ejercicioId
            ),
        },
      };
    });
}

