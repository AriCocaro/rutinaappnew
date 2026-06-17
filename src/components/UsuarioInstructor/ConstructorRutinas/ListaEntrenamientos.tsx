"use client";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  EntrenamientoRutina,
  ConfiguracionAvanzada,
  EjercicioDraft,
  ValorConfiguracion,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

import EntrenamientoCard from "./EntrenamientoCard";
import ConfiguradorEjercicio from "./ConfiguradorEjercicio";
import RenderItemEntrenamiento from "./RenderItemEntrenamiento";
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
  | BLOQUES
  |--------------------------------------------------------------------------
  */

  cantidadBloques:
    number;

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS
  |--------------------------------------------------------------------------
  */

  eliminarEntrenamiento:
    (id: number) => void;

  /*
  |--------------------------------------------------------------------------
  | ITEMS
  |--------------------------------------------------------------------------
  */

  agregarEjercicio:
    (
      entrenamientoId: number
    ) => void;

  agregarGrupo: (

    entrenamientoId: number,

    nombre: string,

    notas?: string

  ) => void;

  moverItem:
    (
      entrenamientoId: number,
      index: number,
      direccion:
        | "arriba"
        | "abajo"
    ) => void;

  eliminarEjercicio:
    (
      entrenamientoId: number,
      ejercicioId: number
    ) => void;

      /*
      |--------------------------------------------------------------------------
      | GRUPOS
      |--------------------------------------------------------------------------
      */

      agregarEjercicioAGrupo:
        (
          entrenamientoId: number,
          grupoId: number
        ) => void;

      eliminarGrupo:
        (
          entrenamientoId: number,
          grupoId: number
        ) => void;

      grupoEliminarEjercicio:
        (
          entrenamientoId: number,
          grupoId: number,
          ejercicioId: number
        ) => void;

      grupoMoverEjercicio:
        (
          entrenamientoId: number,
          grupoId: number,
          indexActual: number,
          direccion:
            | "arriba"
            | "abajo"
        ) => void;

        abrirGrupo: (
          entrenamientoId: number
        ) => void;                    

  /*
  |--------------------------------------------------------------------------
  | CONFIGURACIÓN
  |--------------------------------------------------------------------------
  */

  actualizarConfiguracion:
    (
      entrenamientoId: number,
      ejercicioId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

      actualizarConfiguracionGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  grupoActualizarConfigEjercicio:
    (
      entrenamientoId: number,
      grupoId: number,
      ejercicioId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  actualizarNotas:
    (
      entrenamientoId: number,
      ejercicioId: number,
      notas: string
    ) => void;

      actualizarNotasGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      notas: string
    ) => void;

  grupoActualizarNotasEjercicio:
    (
      entrenamientoId: number,
      grupoId: number,
      ejercicioId: number,
      notas: string
    ) => void;
  /*
  |--------------------------------------------------------------------------
  | DRAFT
  |--------------------------------------------------------------------------
  */

  draft:
    EjercicioDraft;

  actualizarDraft:
    (
      campo: keyof EjercicioDraft,
      valor: string | number
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

  cantidadBloques,

  eliminarEntrenamiento,

  agregarEjercicio,
  agregarGrupo,
  agregarEjercicioAGrupo,

  moverItem,

  eliminarEjercicio,
  eliminarGrupo,

  grupoEliminarEjercicio,
  grupoMoverEjercicio,

  actualizarConfiguracion,
  actualizarConfiguracionGrupo,
  grupoActualizarConfigEjercicio,

  actualizarNotas,
  actualizarNotasGrupo,
  grupoActualizarNotasEjercicio,

  draft,
  actualizarDraft,
  
  abrirGrupo,

}: Props) {

  return (

    <>

      {entrenamientos.map(

        (entrenamiento) => (

          <EntrenamientoCard
              key={entrenamiento.id}
              entrenamiento={entrenamiento}
              onEliminar={() =>
                eliminarEntrenamiento(
                  entrenamiento.id
                )
              }
              acciones={
                <>
                  <button
                    type="button"
                    onClick={() =>
                      abrirGrupo(
                        entrenamiento.id
                      )
                    }
                    className="
                      bg-purple-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                    "
                  >
                    + Grupo
                  </button>
                </>
              }
            >

            {entrenamiento.items.map(

              (item, itemIndex) => (

                <RenderItemEntrenamiento

                  key={
                    item.contenido.id
                  }

                  item={item}

                  entrenamientoId={
                    entrenamiento.id
                  }

                  index={
                    itemIndex
                  }

                  totalItems={
                    entrenamiento.items.length
                  }

                  cantidadBloques={
                    cantidadBloques
                  }

                  seriesGlobales={
                    seriesGlobales
                  }

                  repsGlobales={
                    repsGlobales
                  }

                  draft={draft}

                  actualizarDraft={
                    actualizarDraft
                  }

                  moverItem={
                    moverItem
                  }

                  grupoMoverEjercicio={
                    grupoMoverEjercicio
                  }

                  eliminarEjercicio={
                    eliminarEjercicio
                  }

                  eliminarGrupo={
                    eliminarGrupo
                  }

                  grupoEliminarEjercicio={
                    grupoEliminarEjercicio
                  }

                  actualizarConfiguracion={
                    actualizarConfiguracion
                  }

                  actualizarConfiguracionGrupo={
                    actualizarConfiguracionGrupo
                  }

                  actualizarConfiguracionEjercicioGrupo={
                    grupoActualizarConfigEjercicio
                  }

                  actualizarNotas={
                    actualizarNotas
                  }

                  actualizarNotasGrupo={
                    actualizarNotasGrupo
                  }

                  actualizarNotasEjercicioGrupo={
                    grupoActualizarNotasEjercicio
                  }

                  agregarEjercicioAGrupo={
                    agregarEjercicioAGrupo
                  }

                />

              )

            )}

            <ConfiguradorEjercicio

              draft={draft}

              actualizarDraft={
                actualizarDraft
              }

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