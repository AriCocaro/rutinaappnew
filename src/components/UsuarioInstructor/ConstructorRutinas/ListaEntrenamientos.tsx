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
import EjercicioItem from "./EjercicioItem";
import ConfiguradorEjercicio from "./ConfiguradorEjercicio";
import GrupoEjercicioCard from "./GrupoEjercicioCard";

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

  agregarGrupo:
    (
      entrenamientoId: number
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

              (item, itemIndex) => {

                /*
                --------------------------------------------------
                EJERCICIO NORMAL
                --------------------------------------------------
                */

                if (
                  item.tipo ===
                  "ejercicio"
                ) {

                  const ejercicio =
                    item.contenido;

                  return (

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

                      cantidadBloques={
                        cantidadBloques
                      }

                      puedeSubir={
                        itemIndex > 0
                      }

                      puedeBajar={
                        itemIndex <
                        entrenamiento.items.length - 1
                      }

                      onMoverArriba={() =>
                        moverItem(
                          entrenamiento.id,
                          itemIndex,
                          "arriba"
                        )
                      }

                      onMoverAbajo={() =>
                        moverItem(
                          entrenamiento.id,
                          itemIndex,
                          "abajo"
                        )
                      }

                      onToggleOverride={() =>
                        actualizarConfiguracion(
                          entrenamiento.id,
                          ejercicio.id,
                          "overrideActivo",
                          !ejercicio.configuracion
                            .overrideActivo
                        )
                      }

                      onConfiguracionChange={(
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

                  );
                }

                /*
                --------------------------------------------------
                GRUPO
                --------------------------------------------------
                */

                if (
                  item.tipo ===
                  "grupo"
                ) {

                  const grupo =
                    item.contenido;

                  return (

                    <GrupoEjercicioCard

                      key={
                        grupo.id
                      }

                      grupo={
                        grupo
                      }

                      onEliminar={() =>
                        eliminarGrupo(
                          entrenamiento.id,
                          grupo.id
                        )
                      }

                      onMoverArriba={() =>
                        moverItem(
                          entrenamiento.id,
                          itemIndex,
                          "arriba"
                        )
                      }

                      onMoverAbajo={() =>
                        moverItem(
                          entrenamiento.id,
                          itemIndex,
                          "abajo"
                        )
                      }

                    >

                      {grupo.items.map(

                        (
                          subItem,
                          subIndex
                        ) => {

                          if (
                            subItem.tipo !==
                            "ejercicio"
                          ) {
                            return null;
                          }

                          const ejercicio =
                            subItem.contenido;

                          return (

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

                              cantidadBloques={
                                cantidadBloques
                              }

                              puedeSubir={
                                subIndex > 0
                              }

                              puedeBajar={
                                subIndex <
                                grupo.items.length - 1
                              }

                              onMoverArriba={() =>
                                grupoMoverEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  subIndex,
                                  "arriba"
                                )
                              }

                              onMoverAbajo={() =>
                                grupoMoverEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  subIndex,
                                  "abajo"
                                )
                              }

                              onToggleOverride={() =>
                                grupoActualizarConfigEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  ejercicio.id,
                                  "overrideActivo",
                                  !ejercicio.configuracion
                                    .overrideActivo
                                )
                              }

                              onConfiguracionChange={(
                                campo,
                                valor
                              ) =>
                                grupoActualizarConfigEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  ejercicio.id,
                                  campo,
                                  valor
                                )
                              }

                              onNotasChange={(notas) =>
                                grupoActualizarNotasEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  ejercicio.id,
                                  notas
                                )
                              }

                              onEliminar={() =>
                                grupoEliminarEjercicio(
                                  entrenamiento.id,
                                  grupo.id,
                                  ejercicio.id
                                )
                              }

                            />

                          );
                        }

                      )}

                      <ConfiguradorEjercicio

                        draft={draft}

                        actualizarDraft={
                          actualizarDraft
                        }

                        onAgregar={() =>
                          agregarEjercicioAGrupo(
                            entrenamiento.id,
                            grupo.id
                          )
                        }

                      />

                    </GrupoEjercicioCard>

                  );
                }

                return null;

              }

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