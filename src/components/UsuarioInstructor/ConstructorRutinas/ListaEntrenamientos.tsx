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
    | ESTRUCTURA DE BLOQUES
    |--------------------------------------------------------------------------
    |
    | Cantidad total de bloques configurados
    | para la rutina.
    |
    */

    cantidadBloques:
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

  moverItem: (
    entrenamientoId: number,
    index: number,
    direccion:
      | "arriba"
      | "abajo"
  ) => void;

  agregarGrupo: (
    entrenamientoId: number
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

            {/* ------------------------------------------------------ */}
            {/* EJERCICIOS */}
            {/* ------------------------------------------------------ */}
             {entrenamiento.items.map(

                (item, itemIndex) => {

                  /*
                  |----------------------------------------------------------
                  | EJERCICIO INDIVIDUAL
                  |----------------------------------------------------------
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

                          entrenamiento.items
                            .length - 1
                        }

                        onMoverArriba={() =>

                          moverEjercicio(

                            entrenamiento.id,

                            itemIndex,

                            "arriba"
                          )

                        }

                        onMoverAbajo={() =>

                          moverEjercicio(

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
                    );
                  }

                  /*
                  |----------------------------------------------------------
                  | GRUPO
                  |----------------------------------------------------------
                  */

                  return (

                    <div
                      key={
                        item.contenido.id
                      }
                      className="
                        border
                        rounded-xl
                        p-4
                        bg-purple-50
                      "
                    >

                      <div className="font-bold mb-3">

                        Grupo

                      </div>

                      {entrenamiento.items.map(

                        (
                          item,
                          itemIndex
                        ) => {

                          /*
                          |----------------------------------------------------------
                          | EJERCICIO INDIVIDUAL
                          |----------------------------------------------------------
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

                                  entrenamiento.items
                                    .length - 1
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
                            );
                          }

                          /*
                          |----------------------------------------------------------
                          | GRUPO
                          |----------------------------------------------------------
                          */

                          return (

                            <GrupoEjerciciosCard

                              key={
                                item.contenido.id
                              }

                              grupo={
                                item.contenido
                              }

                              entrenamientoId={
                                entrenamiento.id
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

                              actualizarConfiguracion={
                                actualizarConfiguracion
                              }

                              actualizarNotas={
                                actualizarNotas
                              }

                              eliminarEjercicio={
                                eliminarEjercicio
                              }
                            />
                          );
                        }
                      )}


                    </div>
                  );
                }
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