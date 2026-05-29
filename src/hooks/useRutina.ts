import { useState } from "react";

import {
  ConfiguracionAvanzada,
  DiaRutina,
  EjercicioDraft,
  EjercicioRutina,
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| CONFIG BASE
|--------------------------------------------------------------------------
*/

const configuracionBase: ConfiguracionAvanzada = {

  overrideActivo: false,

  seriesOverride: null,

  repsOverride: null,

  rir: null,

  tempo: null,

  descansoSegundos: null,

  usarTimer: false,

  warmup: false,

  dropset: false,

  cluster: false,

  superserieId: null,
};

/*
|--------------------------------------------------------------------------
| DRAFT BASE
|--------------------------------------------------------------------------
*/

const draftBase: EjercicioDraft = {

  ejercicioId: 1,

  materialId: 1,

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
  | STATE
  |--------------------------------------------------------------------------
  */

  const [dias, setDias] =
    useState<DiaRutina[]>(

      rutinaInicial?.dias ?? [

        {
          id: Date.now(),

          ejercicios: [],
        },
      ]
    );

  const [draft, setDraft] =
    useState<EjercicioDraft>(
      draftBase
    );

  /*
  |--------------------------------------------------------------------------
  | DÍAS
  |--------------------------------------------------------------------------
  */

  function agregarDia() {

    const nuevoDia:
      DiaRutina = {

      id: Date.now(),

      ejercicios: [],
    };

    setDias([
      ...dias,
      nuevoDia,
    ]);
  }

  function eliminarDia(
    diaId: number
  ) {

    setDias(
      dias.filter(
        (dia) =>
          dia.id !== diaId
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
      | string
      | number
  ) {

    setDraft({

      ...draft,

      [campo]: valor,
    });
  }

  function actualizarDraftConfig(

    campo:
      keyof ConfiguracionAvanzada,

    valor:
      | string
      | number
      | boolean
      | null
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
    diaId: number
  ) {

    const nuevosDias =
      dias.map((dia) => {

        if (dia.id === diaId) {

          const nuevoEjercicio:
            EjercicioRutina = {

            id: Date.now(),

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

            ...dia,

            ejercicios: [

              ...dia.ejercicios,

              nuevoEjercicio,
            ],
          };
        }

        return dia;
      });

    setDias(nuevosDias);

    setDraft(draftBase);
  }

  /*
  |--------------------------------------------------------------------------
  | MOVER EJERCICIO
  |--------------------------------------------------------------------------
  */

  function moverEjercicio(

    diaId: number,

    indexActual: number,

    direccion:
      | "arriba"
      | "abajo"
  ) {

    const nuevosDias =
      dias.map((dia) => {

        if (dia.id !== diaId) {
          return dia;
        }

        const ejercicios =
          [...dia.ejercicios];

        const nuevoIndex =
          direccion === "arriba"
            ? indexActual - 1
            : indexActual + 1;

        if (
          nuevoIndex < 0 ||
          nuevoIndex >=
            ejercicios.length
        ) {
          return dia;
        }

        [
          ejercicios[indexActual],
          ejercicios[nuevoIndex],
        ] = [
          ejercicios[nuevoIndex],
          ejercicios[indexActual],
        ];

        return {

          ...dia,

          ejercicios,
        };
      });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function eliminarEjercicio(

    diaId: number,

    ejercicioId: number
  ) {

    const nuevosDias =
      dias.map((dia) => {

        if (dia.id === diaId) {

          return {

            ...dia,

            ejercicios:
              dia.ejercicios.filter(
                (ejercicio) =>

                  ejercicio.id !==
                  ejercicioId
              ),
          };
        }

        return dia;
      });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | CONFIGURACIÓN
  |--------------------------------------------------------------------------
  */

  function actualizarConfiguracion(

    diaId: number,

    ejercicioId: number,

    campo:
      keyof ConfiguracionAvanzada,

    valor:
      | string
      | number
      | boolean
      | null
  ) {

    const nuevosDias =
      dias.map((dia) => {

        if (dia.id === diaId) {

          return {

            ...dia,

            ejercicios:
              dia.ejercicios.map(
                (ejercicio) => {

                  if (
                    ejercicio.id ===
                    ejercicioId
                  ) {

                    return {

                      ...ejercicio,

                      configuracion: {

                        ...ejercicio.configuracion,

                        [campo]: valor,
                      },
                    };
                  }

                  return ejercicio;
                }
              ),
          };
        }

        return dia;
      });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | NOTAS
  |--------------------------------------------------------------------------
  */

  function actualizarNotas(

    diaId: number,

    ejercicioId: number,

    notas: string
  ) {

    const nuevosDias =
      dias.map((dia) => {

        if (dia.id === diaId) {

          return {

            ...dia,

            ejercicios:
              dia.ejercicios.map(
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

        return dia;
      });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | GENERAR RUTINA
  |--------------------------------------------------------------------------
  */

  function generarRutina({

    alumnoId,

    fechaInicio,

    cantidadSemanas,

    seriesGlobales,

    repsGlobales,

  }: {

    alumnoId: string;

    fechaInicio: string;

    cantidadSemanas: number;

    seriesGlobales: number;

    repsGlobales: number;

  }): Rutina | null {

    if (!fechaInicio) {

      alert(
        "Seleccionar fecha"
      );

      return null;
    }

    return {

      id:
        rutinaInicial?.id ??
        Date.now(),

      alumnoId,

      fechaInicio,

      cantidadSemanas,

      progresion: {

        series:
          seriesGlobales,

        reps:
          repsGlobales,
      },

      activa: true,

      dias,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {

    dias,

    draft,

    agregarDia,

    eliminarDia,

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