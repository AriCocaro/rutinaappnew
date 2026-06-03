"use client";

import {
  EntrenamientoRutina,
  ConfiguracionAvanzada,
  EjercicioRutina,
} from "@/types/rutinas";

import EntrenamientoCard from "./EntrenamientoCard";

import EjercicioItem from "../EjercicioItem";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  entrenamientos:
    EntrenamientoRutina[];

  seriesGlobales:
    number;

  repsGlobales:
    number;

  eliminarEntrenamiento:
    (id: number) => void;

  agregarEjercicio:
    (id: number) => void;

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

  actualizarConfiguracion: (

    entrenamientoId: number,

    ejercicioId: number,

    campo:
      keyof ConfiguracionAvanzada,

    valor: unknown

  ) => void;

  actualizarNotas: (

    entrenamientoId: number,

    ejercicioId: number,

    notas: string

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

}: Props) {

  return (

    <>

      {entrenamientos.map(

        (
          entrenamiento,
          entrenamientoIndex
        ) => (

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

            onAgregarEjercicio={() =>
              agregarEjercicio(
                entrenamiento.id
              )
            }
          >

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

                  onNotasChange={

                    (notas) =>

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

          </EntrenamientoCard>
        )
      )}

    </>
  );
}