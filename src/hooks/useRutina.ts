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

  ejercicioId: 0,

  materialId: 0,

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

      id:
        Date.now() +
        Math.floor(
          Math.random() * 10000
        ),

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
    entrenamientoId: number
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
    entrenamientoId: number
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

            id:
              Date.now() +
              Math.floor(
                Math.random() * 10000
              ),

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

      ejercicioId: 0,

      materialId: 0,

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

  function agregarGrupo(
    entrenamientoId: number
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

          const nuevoGrupo:
            GrupoEjercicios = {

            id:
              Date.now() +
              Math.floor(
                Math.random() * 10000
              ),

            ejercicios: [],
          };

          const nuevoItem:
            ItemEntrenamiento = {

            tipo: "grupo",

            contenido:
              nuevoGrupo,
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
  }

  /*
  |--------------------------------------------------------------------------
  | MOVER EJERCICIO
  |--------------------------------------------------------------------------
  */

  function moverItem(

    entrenamientoId: number,

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

    entrenamientoId: number,

    ejercicioId: number

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

  entrenamientoId: number,

  ejercicioId: number,

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

  entrenamientoId: number,

  ejercicioId: number,

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
        (
          Date.now() +
          Math.floor(
            Math.random() * 10000
          )
        ),

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

    actualizarDraftConfig,

    actualizarDraftNotas,

    agregarEjercicio,
    agregarGrupo,

    moverItem,

    eliminarEjercicio,

    actualizarConfiguracion,

    actualizarNotas,

    generarRutina,
  };
  

}