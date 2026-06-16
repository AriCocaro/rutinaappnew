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

  actualizarNotas:
    (
      entrenamientoId: number,
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

  moverItem,

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

            acciones={

              <>
                <button

                  type="button"

                  onClick={() =>
                    agregarGrupo(
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

            {/* -------------------------------------------------- */}
            {/* ITEMS */}
            {/* -------------------------------------------------- */}

            {entrenamiento.items.map(

              (
                item,
                itemIndex
              ) => {

                /*
                --------------------------------------------------
                EJERCICIO
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

                    >

                      <div
                        className="
                          text-sm
                          text-purple-700
                        "
                      >

                        {
                          grupo.ejercicios.length
                        }

                        {" "}

                        ejercicio(s)

                      </div>

                    </GrupoEjercicioCard>

                  );
                }

                return null;

              }

            )}

            {/* -------------------------------------------------- */}
            {/* NUEVO EJERCICIO */}
            {/* -------------------------------------------------- */}

            <ConfiguradorEjercicio

              draft={
                draft
              }

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