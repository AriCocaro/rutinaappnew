"use client";

import {
  EntrenamientoRutina,
  ConfiguracionAvanzada,
  EjercicioRutina,
  EjercicioDraft,
  ValorConfiguracion,
} from "@/types/rutinas";

import EntrenamientoCard from "./EntrenamientoCard";
import EjercicioItem from "./EjercicioItem";
import ConfiguradorEjercicio from "./ConfiguradorEjercicio";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  entrenamientos:
    EntrenamientoRutina[];

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  seriesGlobales:
    number;

  repsGlobales:
    number;

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  */

  eliminarEntrenamiento: (
    id: number
  ) => void;

  /*
  |--------------------------------------------------------------------------
  | EJERCICIOS
  |--------------------------------------------------------------------------
  */

  agregarEjercicio: (
    entrenamientoId: number
  ) => void;

  moverEjercicio: (
    entrenamientoId: number,
    index: number,
    direccion:
      | "arriba"
      | "abajo"
  ) => void;

  eliminarEjercicio: (
    entrenamientoId: number,
    ejercicioId: number
  ) => void;

  /*
  |--------------------------------------------------------------------------
  | CONFIGURACIÓN
  |--------------------------------------------------------------------------
  */

  actualizarConfiguracion: (

    entrenamientoId: number,

    ejercicioId: number,

    campo:
      keyof ConfiguracionAvanzada,

    valor:
      ValorConfiguracion

  ) => void;

  actualizarNotas: (

    entrenamientoId: number,

    ejercicioId: number,

    notas: string

  ) => void;

  /*
  |--------------------------------------------------------------------------
  | DRAFT GLOBAL
  |--------------------------------------------------------------------------
  |
  | Utilizado para crear
  | nuevos ejercicios.
  |
  */

  draft:
    EjercicioDraft;

  actualizarDraft: (

    campo:
      keyof EjercicioDraft,

    valor:
      string | number

  ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ListaEntrenamientos({

  entrenamientos,

  seriesGlobales,
  repsGlobales,

  eliminarEntrenamiento,

  agregarEjercicio,
  moverEjercicio,
  eliminarEjercicio,

  actualizarConfiguracion,
  actualizarNotas,

  draft,
  actualizarDraft,

}: Props) {

  return (

    <>

      {entrenamientos.map(

        (entrenamiento) => (

          <EntrenamientoCard

            key={
              entrenamiento.id
            }

            entrenamiento={
              entrenamiento
            }

            onEliminar={() =>
              eliminarEntrenamiento(
                entrenamiento.id
              )
            }

          >

            {/* ------------------------------------------------------ */}
            {/* EJERCICIOS */}
            {/* ------------------------------------------------------ */}

            {entrenamiento.ejercicios.map(

              (
                ejercicio:
                  EjercicioRutina,

                ejercicioIndex
              ) => (

                <EjercicioItem

                  key={
                    ejercicio.id
                  }

                  ejercicioId={
                    ejercicio.ejercicioId
                  }

                  materialId={
                    ejercicio.materialId
                  }

                  configuracion={
                    ejercicio.configuracion
                  }

                  notas={
                    ejercicio.notas
                  }

                  seriesGlobales={
                    seriesGlobales
                  }

                  repsGlobales={
                    repsGlobales
                  }

                  puedeSubir={
                    ejercicioIndex > 0
                  }

                  puedeBajar={

                    ejercicioIndex <

                    entrenamiento
                      .ejercicios
                      .length - 1

                  }

                  indiceSuperserie={
                    ejercicio
                      .configuracion
                      .superserieId
                  }

                  onMoverArriba={() =>

                    moverEjercicio(

                      entrenamiento.id,

                      ejercicioIndex,

                      "arriba"
                    )

                  }

                  onMoverAbajo={() =>

                    moverEjercicio(

                      entrenamiento.id,

                      ejercicioIndex,

                      "abajo"
                    )

                  }

                  onToggleOverride={() =>

                    actualizarConfiguracion(

                      entrenamiento.id,

                      ejercicio.id,

                      "overrideActivo",

                      !ejercicio
                        .configuracion
                        .overrideActivo
                    )

                  }

                  onConfiguracionChange={

                    (
                      campo,
                      valor
                    ) =>

                      actualizarConfiguracion(

                        entrenamiento.id,

                        ejercicio.id,

                        campo,

                        valor
                      )
                  }

                  onNotasChange={(notas) =>

                    actualizarNotas(

                      entrenamiento.id,

                      ejercicio.id,

                      notas
                    )

                  }

                  onEliminar={() =>

                    eliminarEjercicio(

                      entrenamiento.id,

                      ejercicio.id
                    )

                  }
                />

              )
            )}

            {/* ------------------------------------------------------ */}
            {/* NUEVO EJERCICIO */}
            {/* ------------------------------------------------------ */}
            {/* 
              Flujo:
              
              1) Seleccionar ejercicio
              2) Seleccionar material
              3) Agregar ejercicio
              4) Editar después si hace falta
            */}

              <ConfiguradorEjercicio
                draft={draft}
                actualizarDraft={actualizarDraft}
                onAgregar={() =>
                  agregarEjercicio(
                    entrenamiento.id
                  )
                }
              />       
              </EntrenamientoCard>

        )
      )}

    </>

  );
}