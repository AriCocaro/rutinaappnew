"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import {
  obtenerRutinaPorId,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  DiaRutina,
  EjercicioRutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function RutinaDetallePage() {

  /*
  |--------------------------------------------------------------------------
  | PARAMS
  |--------------------------------------------------------------------------
  */

  const params =
    useParams();

  const id =
    Number(params.id);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(null);

  /*
  |--------------------------------------------------------------------------
  | EFFECT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const data =
      obtenerRutinaPorId(id);

    if (data) {
      setRutina(data);
    }

  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (!rutina) {

    return (

      <div className="p-6">

        Rutina no encontrada

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          Rutina #{rutina.id}

        </h1>

        <p className="text-gray-500">

          Inicio:
          {" "}
          {rutina.fechaInicio}

        </p>

      </div>

      {/* DÍAS */}

      {rutina.dias.map(
        (
          dia: DiaRutina,
          index: number
        ) => (

          <div
            key={dia.id}
            className="border rounded-2xl p-5 bg-white flex flex-col gap-4"
          >

            {/* HEADER DÍA */}

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">

                Día {index + 1}

              </h2>

              <span className="text-sm text-gray-500">

                {dia.ejercicios.length}
                {" "}
                ejercicios

              </span>

            </div>

            {/* EJERCICIOS */}

            <div className="flex flex-col gap-3">

              {dia.ejercicios.map(
                (
                  ejercicio: EjercicioRutina
                ) => {

                  const ejercicioData =
                    ejercicios.find(
                      (e) =>
                        e.id ===
                        ejercicio.ejercicioId
                    );

                  const materialData =
                    materiales.find(
                      (m) =>
                        m.id ===
                        ejercicio.materialId
                    );

                  return (

                    <div
                      key={ejercicio.id}
                      className="border rounded-xl p-4 flex flex-col gap-3"
                    >

                      {/* TOP */}

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="font-semibold">

                            {ejercicioData?.nombre}

                          </h3>

                          <p className="text-sm text-gray-500">

                            {materialData?.nombre}

                          </p>

                        </div>

                        {/* OVERRIDE */}

                        {ejercicio.configuracion.overrideActivo && (

                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">

                            Override

                          </span>

                        )}

                      </div>

                      {/* SERIES Y REPS */}

                      <div className="text-sm">

                        {ejercicio.configuracion.overrideActivo
                          ? (
                            <>
                              {
                                ejercicio
                                  .configuracion
                                  .seriesOverride
                              }
                              {" "}
                              x
                              {" "}
                              {
                                ejercicio
                                  .configuracion
                                  .repsOverride
                              }
                            </>
                          )
                          : (
                            <>
                              {
                                rutina
                                  .progresion
                                  .series
                              }
                              {" "}
                              x
                              {" "}
                              {
                                rutina
                                  .progresion
                                  .reps
                              }
                            </>
                          )}

                      </div>

                      {/* CONFIGURACIONES */}

                      <div className="flex flex-wrap gap-2">

                        {ejercicio.configuracion.superserieId && (

                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">

                            SS
                            {" "}
                            {
                              ejercicio
                                .configuracion
                                .superserieId
                            }

                          </span>

                        )}

                        {ejercicio.configuracion.dropset && (

                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg">

                            Dropset

                          </span>

                        )}

                        {ejercicio.configuracion.warmup && (

                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">

                            Warmup

                          </span>

                        )}

                        {ejercicio.configuracion.usarTimer && (

                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">

                            Timer

                          </span>

                        )}

                        {ejercicio.configuracion.cluster && (

                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">

                            Cluster

                          </span>

                        )}

                      </div>

                      {/* RIR */}

                      {ejercicio.configuracion.rir && (

                        <div className="text-sm text-gray-600">

                          RIR:
                          {" "}
                          {
                            ejercicio
                              .configuracion
                              .rir
                          }

                        </div>

                      )}

                      {/* TEMPO */}

                      {ejercicio.configuracion.tempo && (

                        <div className="text-sm text-gray-600">

                          Tempo:
                          {" "}
                          {
                            ejercicio
                              .configuracion
                              .tempo
                          }

                        </div>

                      )}

                      {/* DESCANSO */}

                      {ejercicio.configuracion.descansoSegundos && (

                        <div className="text-sm text-gray-600">

                          Descanso:
                          {" "}
                          {
                            ejercicio
                              .configuracion
                              .descansoSegundos
                          }
                          s

                        </div>

                      )}

                      {/* NOTAS */}

                      {ejercicio.notas && (

                        <div className="border-t pt-2 text-sm text-gray-600">

                          {ejercicio.notas}

                        </div>

                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )
      )}

    </div>
  );
}