import { useState } from "react";

import {
  ConfiguracionAvanzada,
  EjercicioDraft,
  EjercicioRutina,
  EntrenamientoRutina,
  Rutina,
  ProgresionBloque,
  ValorConfiguracion,
} from "@/types/rutinas";



/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN BASE
|--------------------------------------------------------------------------
|
| Configuración mínima que tendrá cualquier ejercicio
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

  superserieId: null,
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

      ejercicios: [],
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

    /*
    |--------------------------------------------------------------------------
    | REORDENAR
    |--------------------------------------------------------------------------
    */

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

  function actualizarDraft(

    campo:
      keyof EjercicioDraft,

    valor:
      string | number
  ) {

    setDraft({

      ...draft,

      [campo]: valor,
    });
  }

  function actualizarDraftConfig(

  campo:
    keyof ConfiguracionAvanzada,

  valor: ValorConfiguracion

  ) {

    setDraft({

      ...draft,

      configuracion: {

        ...draft.configuracion,

        [campo]: valor,
      },
    });
  }

  function actualizarDraftNotas(
    notas: string
  ) {

    setDraft({

      ...draft,

      notas,
    });
  }

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
            entrenamiento.id ===
            entrenamientoId
          ) {

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

            return {
             ...entrenamiento,

              ejercicios: [
               ...entrenamiento.ejercicios,
               nuevoEjercicio,
              ],
            };
          }
           return entrenamiento;
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
  | MOVER EJERCICIO
  |--------------------------------------------------------------------------
  */

  function moverEjercicio(

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

          const ejercicios =
            [...entrenamiento.ejercicios];

          const nuevoIndex =
            direccion === "arriba"
              ? indexActual - 1
              : indexActual + 1;

          if (
            nuevoIndex < 0 ||
            nuevoIndex >=
              ejercicios.length
          ) {
            return entrenamiento;
          }

          [
            ejercicios[indexActual],
            ejercicios[nuevoIndex],
          ] = [
            ejercicios[nuevoIndex],
            ejercicios[indexActual],
          ];

          return {

            ...entrenamiento,

            ejercicios,
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

    const nuevosEntrenamientos =
      entrenamientos.map(
        (entrenamiento) => {

          if (
            entrenamiento.id ===
            entrenamientoId
          ) {

            return {

              ...entrenamiento,

              ejercicios:
                entrenamiento.ejercicios.filter(
                  (ejercicio) =>
                    ejercicio.id !==
                    ejercicioId
                ),
            };
          }

          return entrenamiento;
        }
      );

    setEntrenamientos(
      nuevosEntrenamientos
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

    const nuevosEntrenamientos =
      entrenamientos.map(
        (entrenamiento) => {

          if (
            entrenamiento.id ===
            entrenamientoId
          ) {

            return {

              ...entrenamiento,

              ejercicios:
                entrenamiento.ejercicios.map(
                  (ejercicio) => {

                    if (
                      ejercicio.id ===
                      ejercicioId
                    ) {

                      return {

                        ...ejercicio,

                        configuracion: {

                          ...ejercicio.configuracion,

                          [campo]:
                            valor,
                        },
                      };
                    }

                    return ejercicio;
                  }
                ),
            };
          }

          return entrenamiento;
        }
      );

    setEntrenamientos(
      nuevosEntrenamientos
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

    const nuevosEntrenamientos =
      entrenamientos.map(
        (entrenamiento) => {

          if (
            entrenamiento.id ===
            entrenamientoId
          ) {

            return {

              ...entrenamiento,

              ejercicios:
                entrenamiento.ejercicios.map(
                  (ejercicio) => {

                    if (
                      ejercicio.id ===
                      ejercicioId
                    ) {

                      return {

                        ...ejercicio,

                        notas,
                      };
                    }

                    return ejercicio;
                  }
                ),
            };
          }

          return entrenamiento;
        }
      );

    setEntrenamientos(
      nuevosEntrenamientos
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

    moverEjercicio,

    eliminarEjercicio,

    actualizarConfiguracion,

    actualizarNotas,

    generarRutina,
  };

}