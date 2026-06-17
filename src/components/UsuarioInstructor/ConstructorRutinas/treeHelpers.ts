import {
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
  grupoId: number
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
  grupoId: number,
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
  nodoId: number
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

