import { useState } from "react";

import {
  ConfiguracionAvanzada,
  EjercicioDraft,
  EjercicioRutina,
  EntrenamientoRutina,
  Rutina,
  ProgresionBloque,
  ValorConfiguracion,
  ItemEntrenamiento,
  GrupoEjercicios,
} from "@/types/rutinas";

import {

  actualizarGrupoRecursivo,

  actualizarEjercicioRecursivo,

  eliminarNodoRecursivo,

  eliminarEjercicioRecursivo,

} from "@/components/UsuarioInstructor/ConstructorRutinas/treeHelpers";


/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN BASE
|--------------------------------------------------------------------------
|
|  mínima que tendrá cualquier ejercicio
| agregado a una rutina.
|
*/

const configuracionBase: ConfiguracionAvanzada = {

  /*
  |--------------------------------------------------------------------------
  | OVERRIDE
  |--------------------------------------------------------------------------
  */

  overrideActivo: false,

  overrideProgresiones: [],

  /*
  |--------------------------------------------------------------------------
  | INTENSIDAD
  |--------------------------------------------------------------------------
  */

  rir: null,

  tempo: null,

  /*
  |--------------------------------------------------------------------------
  | DESCANSO
  |--------------------------------------------------------------------------
  */

  descansoSegundos: null,

  usarTimer: false,

  /*
  |--------------------------------------------------------------------------
  | TÉCNICAS
  |--------------------------------------------------------------------------
  */

  warmup: false,

  dropset: false,

  cluster: false,


};

/*
|--------------------------------------------------------------------------
| DRAFT BASE
|--------------------------------------------------------------------------
|
| Es el ejercicio temporal que el instructor configura
| antes de agregarlo a un entrenamiento.
|
*/
 const draftBase: EjercicioDraft = {

  ejercicioId: "",

  materialId: "",

  notas: "",

  configuracion: {
    ...configuracionBase,
  },
};


/*
|--------------------------------------------------------------------------
| HOOK
|--------------------------------------------------------------------------
*/

export function useRutina(
  rutinaInicial?: Rutina
) {



  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  |
  | Antes eran "dias".
  | Ahora representan estructuras de entrenamiento.
  |
  */
    
  const [
  entrenamientos,
  setEntrenamientos,
  ] = useState<EntrenamientoRutina[]>(

   rutinaInicial?.entrenamientos ?? []
  );
  
  /*
  |--------------------------------------------------------------------------
  | DRAFT
  |--------------------------------------------------------------------------
  */

  const [
    draft,
    setDraft,
  ] = useState<EjercicioDraft>(
    draftBase
  );

  /*
  |--------------------------------------------------------------------------
  | DEBUG DRAFT
  |--------------------------------------------------------------------------
  |
  | Muestra cada cambio del draft.
  |
  | Eliminar cuando todo funcione.
  |
  */


  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  */
  /*
|--------------------------------------------------------------------------
| ENTRENAMIENTOS
|--------------------------------------------------------------------------
*/

  function agregarEntrenamiento() {

    const nuevoEntrenamiento:
      EntrenamientoRutina = {

      id: crypto.randomUUID(),
      orden:
        entrenamientos.length + 1,

      items: [],
    };

    setEntrenamientos([

      ...entrenamientos,

      nuevoEntrenamiento,

    ]);
  }

  function eliminarEntrenamiento(
    entrenamientoId: string
  ) {

    const nuevosEntrenamientos =
      entrenamientos.filter(
        (entrenamiento) =>
          entrenamiento.id !==
          entrenamientoId
      );

    setEntrenamientos(

      nuevosEntrenamientos.map(
        (
          entrenamiento,
          index
        ) => ({

          ...entrenamiento,

          orden:
            index + 1,
        })
      )
    );
  }
 

  


  

  /*
  |--------------------------------------------------------------------------
  | DRAFT
  |--------------------------------------------------------------------------
  */

 /*
  |--------------------------------------------------------------------------
  | DRAFT
  |--------------------------------------------------------------------------
  |
  | Actualiza cualquier propiedad del draft.
  |
  | Se utiliza la versión funcional de setState
  | para evitar problemas cuando React agrupa
  | múltiples actualizaciones consecutivas.
  |
  | Ejemplo:
  |
  | actualizarDraft("ejercicioId", 12)
  | actualizarDraft("materialId", 0)
  |
  | Sin esta versión se pueden perder cambios.
  |
  */

  function actualizarDraft(

    campo: keyof EjercicioDraft,

    valor: string | number

  ) {

    setDraft((prev) => ({

      ...prev,

      [campo]: valor,

    }));
  }

  /*
  |--------------------------------------------------------------------------
  | CONFIGURACIÓN DEL DRAFT
  |--------------------------------------------------------------------------
  |
  | Actualiza cualquier propiedad dentro de:
  |
  | draft.configuracion
  |
  | También utiliza la versión funcional
  | para evitar sobrescribir cambios previos.
  |
  */

  function actualizarDraftConfig(

    campo: keyof ConfiguracionAvanzada,

    valor: ValorConfiguracion

  ) {

    setDraft((prev) => ({

      ...prev,

      configuracion: {

        ...prev.configuracion,

        [campo]: valor,

      },

    }));
  }

  /*
  |--------------------------------------------------------------------------
  | NOTAS DEL DRAFT
  |--------------------------------------------------------------------------
  |
  | Actualiza las notas temporales
  | antes de agregar el ejercicio.
  |
  */

  function actualizarDraftNotas(
    notas: string
  ) {

    setDraft((prev) => ({

      ...prev,

      notas,

    }));
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  */

 /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function agregarEjercicio(
    entrenamientoId: string
  ) {

    if (!draft.ejercicioId) {

      alert(
        "Seleccionar ejercicio"
      );

      return;
    }

    if (!draft.materialId) {

      alert(
        "Seleccionar material"
      );

      return;
    }

    const nuevosEntrenamientos =
      entrenamientos.map(
        (entrenamiento) => {

          if (
            entrenamiento.id !==
            entrenamientoId
          ) {
            return entrenamiento;
          }

          const nuevoEjercicio:
            EjercicioRutina = {

            id: crypto.randomUUID(),
            

            ejercicioId:
              draft.ejercicioId,

            materialId:
              draft.materialId,

            notas:
              draft.notas,

            configuracion: {
              ...draft.configuracion,
            },
          };

          const nuevoItem:
            ItemEntrenamiento = {

            tipo: "ejercicio",

            contenido:
              nuevoEjercicio,
          };

          return {

            ...entrenamiento,

            items: [

              ...entrenamiento.items,

              nuevoItem,
            ],
          };
        }
      );

    setEntrenamientos(
      nuevosEntrenamientos
    );

    setDraft({

      ejercicioId: "",

      materialId: "",

      notas: "",

      configuracion: {

        ...configuracionBase,
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR GRUPO
  |--------------------------------------------------------------------------
  */

/*
|--------------------------------------------------------------------------
| AGREGAR GRUPO
|--------------------------------------------------------------------------
|
| Crea un nuevo grupo dentro de un entrenamiento.
|
| El grupo puede representar:
|
| - Superserie
| - Triserie
| - Circuito
| - Giant Set
| - Dropset
| - Cualquier nombre definido por el instructor
|
| El grupo se agrega como un ItemEntrenamiento
| de tipo "grupo".
|
*/

function agregarGrupo(

  entrenamientoId: string,

  nombre: string,

  notas: string = ""

): void {

  /*
  |--------------------------------------------------------------------------
  | VALIDACIÓN
  |--------------------------------------------------------------------------
  */

  if (!nombre.trim()) {

    alert(
      "Ingresar nombre del grupo"
    );

    return;
  }

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      /*
      |--------------------------------------------------------------------------
      | NUEVO GRUPO
      |--------------------------------------------------------------------------
      */

      const nuevoGrupo:
        GrupoEjercicios = {

        id: crypto.randomUUID(),

        /*
        |------------------------------------------------------
        | DATOS GENERALES
        |------------------------------------------------------
        */

        nombre,

        notas,

        configuracion: {
          ...configuracionBase,
        },

        /*
        |------------------------------------------------------
        | CONTENIDO
        |------------------------------------------------------
        */

        items: [],
      };

      /*
      |--------------------------------------------------------------------------
      | ITEM ENTRENAMIENTO
      |--------------------------------------------------------------------------
      */

      const nuevoItem:
        ItemEntrenamiento = {

        tipo: "grupo",

        contenido:
          nuevoGrupo,
      };

      /*
      |--------------------------------------------------------------------------
      | INSERTAR EN EL ENTRENAMIENTO
      |--------------------------------------------------------------------------
      */

      return {

        ...entrenamiento,

        items: [

          ...entrenamiento.items,

          nuevoItem,
        ],
      };
    })
  );
}

/*
|--------------------------------------------------------------------------
| AGREGAR EJERCICIO A GRUPO
|--------------------------------------------------------------------------
|
| Inserta un ejercicio dentro de un grupo.
|
| Ahora utiliza búsqueda recursiva para soportar:
|
| Grupo
| └─ Grupo
|     └─ Grupo
|         └─ Ejercicio
|
*/

function agregarEjercicioAGrupo(

  entrenamientoId: string,

  grupoId: tring

): void {

  /*
  |--------------------------------------------------------------------------
  | VALIDACIONES
  |--------------------------------------------------------------------------
  */

  if (!draft.ejercicioId) {

    alert(
      "Seleccionar ejercicio"
    );

    return;
  }

  if (!draft.materialId) {

    alert(
      "Seleccionar material"
    );

    return;
  }

  /*
  |--------------------------------------------------------------------------
  | NUEVO EJERCICIO
  |--------------------------------------------------------------------------
  */

  const nuevoEjercicio:
    EjercicioRutina = {

    id: crypto.randomUUID(),

    ejercicioId:
      draft.ejercicioId,

    materialId:
      draft.materialId,

    notas:
      draft.notas,

    configuracion: {
      ...draft.configuracion,
    },
  };

  /*
  |--------------------------------------------------------------------------
  | ITEM EJERCICIO
  |--------------------------------------------------------------------------
  |
  | Toda la estructura interna trabaja
  | con ItemEntrenamiento.
  |
  */

  const nuevoItem:
    ItemEntrenamiento = {

    tipo: "ejercicio",

    contenido:
      nuevoEjercicio,
  };

  /*
  |--------------------------------------------------------------------------
  | INSERTAR EN EL GRUPO
  |--------------------------------------------------------------------------
  |
  | Busca el grupo de forma recursiva.
  | Funciona aunque el grupo esté
  | anidado dentro de otros grupos.
  |
  */

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          actualizarGrupoRecursivo(

            entrenamiento.items,

            grupoId,

            (grupo) => ({

              ...grupo,

              items: [

                ...grupo.items,

                nuevoItem,
              ],
            })
          ),
      };
    })
  );

  /*
  |--------------------------------------------------------------------------
  | LIMPIAR DRAFT
  |--------------------------------------------------------------------------
  */

  setDraft(
    draftBase
  );
}

/*
|--------------------------------------------------------------------------
| ELIMINAR GRUPO
|--------------------------------------------------------------------------
|
| Elimina un grupo en cualquier nivel del árbol.
|
| Soporta:
|
| Grupo
| └─ Grupo
|     └─ Grupo
|
*/

function eliminarGrupo(

  entrenamientoId: string,

  grupoId: string

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      /*
      |--------------------------------------------------------------------------
      | NO ES EL ENTRENAMIENTO BUSCADO
      |--------------------------------------------------------------------------
      */

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      /*
      |--------------------------------------------------------------------------
      | ELIMINACIÓN RECURSIVA
      |--------------------------------------------------------------------------
      */

      return {

        ...entrenamiento,

        items:
          eliminarNodoRecursivo(
            entrenamiento.items,
            grupoId
          ),
      };
    })
  );
}

/*
|--------------------------------------------------------------------------
| ELIMINAR EJERCICIO DE GRUPO
|--------------------------------------------------------------------------
|
| Elimina un ejercicio sin importar
| la profundidad donde se encuentre.
|
*/

function eliminarEjercicioGrupo(

  entrenamientoId: string,

  grupoId: string,

  ejercicioId: string

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          eliminarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId
          ),
      };
    })
  );
}

/*
|--------------------------------------------------------------------------
| ACTUALIZAR CONFIGURACIÓN DE GRUPO
|--------------------------------------------------------------------------
|
| Permite modificar cualquier campo de configuración
| de un grupo en cualquier profundidad.
|
*/

function actualizarConfiguracionGrupo(

  entrenamientoId: string,

  grupoId: string,

  campo: keyof ConfiguracionAvanzada,

  valor: ValorConfiguracion

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      /*
      |--------------------------------------------------------------------------
      | NO ES EL ENTRENAMIENTO BUSCADO
      |--------------------------------------------------------------------------
      */

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      /*
      |--------------------------------------------------------------------------
      | ACTUALIZACIÓN RECURSIVA
      |--------------------------------------------------------------------------
      */

      return {

        ...entrenamiento,

        items:
          actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => ({

              ...grupo,

              configuracion: {

                ...grupo.configuracion,

                [campo]:
                  valor,
              },
            })
          ),
      };
    })
  );
}

/*
|--------------------------------------------------------------------------
| ACTUALIZAR NOTAS DE GRUPO
|--------------------------------------------------------------------------
|
| Modifica las notas de un grupo
| en cualquier nivel del árbol.
|
*/

function actualizarNotasGrupo(

  entrenamientoId: string,

  grupoId: string,

  notas: string

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          actualizarGrupoRecursivo(
            entrenamiento.items,
            grupoId,
            (grupo) => ({

              ...grupo,

              notas,
            })
          ),
      };
    })
  );
}

/*
|--------------------------------------------------------------------------
| MOVER EJERCICIO DENTRO DE GRUPO
|--------------------------------------------------------------------------
|
| Reordena ejercicios internos de un grupo.
|
| NO mueve el grupo.
|
| Sólo modifica:
|
| grupo.ejercicios[]
|
*/

function moverEjercicioGrupo(

  entrenamientoId: string,

  grupoId: string,

  indexActual: number,

  direccion:
    | "arriba"
    | "abajo"

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          entrenamiento.items.map(
            (item) => {

              if (
                item.tipo !==
                "grupo"
              ) {
                return item;
              }

              if (
                item.contenido.id !==
                grupoId
              ) {
                return item;
              }

              /*
              ----------------------------------------------------
              ITEMS DEL GRUPO
              ----------------------------------------------------
              */

              const itemsGrupo = [
                ...item.contenido.items,
              ];

              const nuevoIndex =
                direccion === "arriba"
                  ? indexActual - 1
                  : indexActual + 1;

              /*
              ----------------------------------------------------
              VALIDACIÓN
              ----------------------------------------------------
              */

              if (
                nuevoIndex < 0 ||
                nuevoIndex >=
                  itemsGrupo.length
              ) {
                return item;
              }

              /*
              ----------------------------------------------------
              SWAP
              ----------------------------------------------------
              */

              [
                itemsGrupo[indexActual],
                itemsGrupo[nuevoIndex],
              ] = [
                itemsGrupo[nuevoIndex],
                itemsGrupo[indexActual],
              ];

              return {

                ...item,

                contenido: {

                  ...item.contenido,

                  items:
                    itemsGrupo,
                },
              };
            }
          ),
      };
    })

  );
}

/*
|--------------------------------------------------------------------------
| AGREGAR GRUPO DENTRO DE GRUPO
|--------------------------------------------------------------------------
|
| Permite crear grupos anidados.
|
*/

function agregarGrupoDentroDeGrupo(

  entrenamientoId: string,

  grupoPadreId: string,

  nombre: string,

  notas: string

): void {

  const nuevoGrupo = {

    tipo: "grupo" as const,

    contenido: {

      id: Date.now(),

      nombre,

      notas,

      configuracion:{
        ...configuracionBase
      },

      items: [],
    },
  };

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          actualizarGrupoRecursivo(

            entrenamiento.items,

            grupoPadreId,

            (grupo) => ({

              ...grupo,

              items: [

                ...grupo.items,

                nuevoGrupo,
              ],
            })
          ),
      };
    })
  );
}

  
  /*
  |--------------------------------------------------------------------------
  | MOVER EJERCICIO
  |--------------------------------------------------------------------------
  */

  function moverItem(

    entrenamientoId: string,

    indexActual: number,

    direccion:
      | "arriba"
      | "abajo"
  ) {

    const nuevosEntrenamientos =
      entrenamientos.map(
        (entrenamiento) => {

          if (
            entrenamiento.id !==
            entrenamientoId
          ) {
            return entrenamiento;
          }

          const items =
          [...entrenamiento.items];

          const nuevoIndex =
            direccion === "arriba"
              ? indexActual - 1
              : indexActual + 1;

          if (
            nuevoIndex < 0 ||
            nuevoIndex >=
            items.length
          ) {
            return entrenamiento;
          }

         [
            items[indexActual],
            items[nuevoIndex],
          ] = [
            items[nuevoIndex],
            items[indexActual],
          ]; 

          return {

            ...entrenamiento,

            items,
          };
        }
      );

    setEntrenamientos(
      nuevosEntrenamientos
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function eliminarEjercicio(

    entrenamientoId: string,

    ejercicioId: string

  ) {

    setEntrenamientos((prev) =>

      prev.map((entrenamiento) => {

        if (
          entrenamiento.id !==
          entrenamientoId
        ) {
          return entrenamiento;
        }

        return {

          ...entrenamiento,

          items:
            entrenamiento.items.filter(
              (item) => {

                if (
                  item.tipo !==
                  "ejercicio"
                ) {
                  return true;
                }

                return (
                  item.contenido.id !==
                  ejercicioId
                );
              }
            ),
        };
      })
    );
  }
  /*
|--------------------------------------------------------------------------
| CONFIGURACIÓN
|--------------------------------------------------------------------------
|
| Actualiza cualquier propiedad de
| ConfiguracionAvanzada para un ejercicio.
|
*/
function actualizarConfiguracion(

  entrenamientoId: string,

  ejercicioId: string,

  campo:
    keyof ConfiguracionAvanzada,

  valor:
    ValorConfiguracion

) {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          entrenamiento.items.map(
            (item) => {

              if (
                item.tipo !==
                "ejercicio"
              ) {
                return item;
              }

              if (
                item.contenido.id !==
                ejercicioId
              ) {
                return item;
              }

              return {

                ...item,

                contenido: {

                  ...item.contenido,

                  configuracion: {

                    ...item.contenido.configuracion,

                    [campo]:
                      valor,
                  },
                },
              };
            }
          ),
      };
    })
  );
}






  /*
  |--------------------------------------------------------------------------
  | NOTAS
  |--------------------------------------------------------------------------
  */

function actualizarNotas(

  entrenamientoId: string,

  ejercicioId: string,

  notas: string

) {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          entrenamiento.items.map(
            (item) => {

              if (
                item.tipo !==
                "ejercicio"
              ) {
                return item;
              }

              if (
                item.contenido.id !==
                ejercicioId
              ) {
                return item;
              }

              return {

                ...item,

                contenido: {

                  ...item.contenido,

                  notas,
                },
              };
            }
          ),
      };
    })
  );
}

  /*
  |--------------------------------------------------------------------------
  | GENERAR RUTINA
  |--------------------------------------------------------------------------
  */

   function generarRutina({
    alumnoId,
    fechaInicio,
    cantidadBloques,
    entrenamientosPorBloque,
    progresionGlobal,
  }: {
    alumnoId: string;
    fechaInicio: string;
    cantidadBloques: number;
    entrenamientosPorBloque: number;
    progresionGlobal: ProgresionBloque[];
    }): Rutina | null {

    if (!alumnoId) {

      alert(
        "Seleccionar entrenado"
      );

      return null;
    }

    if (!fechaInicio) {

      alert(
        "Seleccionar fecha de inicio"
      );

      return null;
    }

    const estado =

      entrenamientosPorBloque > 0 &&
      entrenamientos.length >=
        entrenamientosPorBloque

        ? "completa"

        : "en_proceso";

    return {

      id:
      rutinaInicial?.id ??
      crypto.randomUUID(),

   
      alumnoId,

      fechaInicio,

      cantidadBloques,

      entrenamientosPorBloque,

      progresionGlobal,

      activa:
        rutinaInicial?.activa ??
        true,

      estado,

      fechaUltimaEdicion:
        new Date().toISOString(),

      entrenamientos,
    };
  }   

  function actualizarConfiguracionEjercicioGrupo(

  entrenamientoId: string,

  grupoId: string,

  ejercicioId: string,

  campo: keyof ConfiguracionAvanzada,

  valor: ValorConfiguracion

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          actualizarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId,
            (ejercicio) => ({

              ...ejercicio,

              configuracion: {

                ...ejercicio.configuracion,

                [campo]:
                  valor,
              },
            })
          ),
      };
    })
  );
}

function actualizarNotasEjercicioGrupo(

  entrenamientoId: string,

  grupoId: string,

  ejercicioId: string,

  notas: string

): void {

  setEntrenamientos((prev) =>

    prev.map((entrenamiento) => {

      if (
        entrenamiento.id !==
        entrenamientoId
      ) {
        return entrenamiento;
      }

      return {

        ...entrenamiento,

        items:
          actualizarEjercicioRecursivo(
            entrenamiento.items,
            ejercicioId,
            (ejercicio) => ({

              ...ejercicio,

              notas,
            })
          ),
      };
    })
  );
}
  

  /*
  |------------------------------------------------------------------
  | RETURN
  |------------------------------------------------------------------
  */
 return {

  entrenamientos,

  draft,

  agregarEntrenamiento,
  eliminarEntrenamiento,

  actualizarDraft,

  agregarEjercicio,
  agregarGrupo,
  agregarEjercicioAGrupo,
  agregarGrupoDentroDeGrupo,

  moverItem,

  eliminarEjercicio,
  eliminarGrupo,

  grupoEliminarEjercicio:
    eliminarEjercicioGrupo,

  grupoMoverEjercicio:
    moverEjercicioGrupo,

  actualizarConfiguracion,

  actualizarConfiguracionGrupo,

  actualizarConfiguracionEjercicioGrupo,

  actualizarNotas,

  actualizarNotasGrupo,

  actualizarNotasEjercicioGrupo,

  generarRutina,

};
}