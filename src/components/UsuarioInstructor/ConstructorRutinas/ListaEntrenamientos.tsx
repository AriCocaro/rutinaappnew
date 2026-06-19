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
    (id: string) => void;

  /*
  |--------------------------------------------------------------------------
  | ITEMS
  |--------------------------------------------------------------------------
  */

  agregarEjercicio:
    (
      entrenamientoId: string
    ) => void;

  agregarGrupo: (

    entrenamientoId: string,

    nombre: string,

    notas?: string

  ) => void;

  moverItem:
    (
      entrenamientoId: string,
      index: number,
      direccion:
        | "arriba"
        | "abajo"
    ) => void;

  eliminarEjercicio:
    (
      entrenamientoId: string,
      ejercicioId: string
    ) => void;

      /*
      |--------------------------------------------------------------------------
      | GRUPOS
      |--------------------------------------------------------------------------
      */

      agregarEjercicioAGrupo:
        (
          entrenamientoId: string,
          grupoId: string
        ) => void;

      eliminarGrupo:
        (
          entrenamientoId: string,
          grupoId: string
        ) => void;

      grupoEliminarEjercicio:
        (
          entrenamientoId: string,
          grupoId: string,
          ejercicioId: string
        ) => void;

      grupoMoverEjercicio:
        (
          entrenamientoId: string,
          grupoId: string,
          indexActual: number,
          direccion:
            | "arriba"
            | "abajo"
        ) => void;

        abrirGrupo: (
          entrenamientoId: string
        ) => void;                    

  /*
  |--------------------------------------------------------------------------
  | CONFIGURACIÓN
  |--------------------------------------------------------------------------
  */

  actualizarConfiguracion:
    (
      entrenamientoId: string,
      ejercicioId: string,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

      actualizarConfiguracionGrupo:
    (
      entrenamientoId: string,
      grupoId: string,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  grupoActualizarConfigEjercicio:
    (
      entrenamientoId: string,
      grupoId: string,
      ejercicioId: string,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  actualizarNotas:
    (
      entrenamientoId: string,
      ejercicioId: string,
      notas: string
    ) => void;

      actualizarNotasGrupo:
    (
      entrenamientoId: string,
      grupoId: string,
      notas: string
    ) => void;

  grupoActualizarNotasEjercicio:
    (
      entrenamientoId: string,
      grupoId: string,
      ejercicioId: string,
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