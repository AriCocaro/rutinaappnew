"use client";

import { useEffect, useState } from "react";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  DiaRutina,
  EjercicioRutina,
} from "@/types/rutinas";

type Props = {
  params: {
    id: string;
  };
};

export default function EntrenamientoAlumnoPage({
  params,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(null);

  const [
    diaActual,
    setDiaActual,
  ] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | EFFECT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const rutinas =
      obtenerRutinas();

    const rutinaAlumno =
      rutinas.find(
        (item) =>
          item.alumnoId ===
          params.id
      );

    if (rutinaAlumno) {

      setRutina(
        rutinaAlumno
      );
    }

  }, [params.id]);

  /*
  |--------------------------------------------------------------------------
  | SIN RUTINA
  |--------------------------------------------------------------------------
  */

  if (!rutina) {

    return (

      <div className="p-10">

        <h1 className="text-2xl font-bold">
          El alumno no tiene rutina
        </h1>

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | DÍA ACTUAL
  |--------------------------------------------------------------------------
  */

  const dia:
    DiaRutina | undefined =
      rutina.dias[diaActual];

  /*
  |--------------------------------------------------------------------------
  | SIN DÍA
  |--------------------------------------------------------------------------
  */

  if (!dia) {

    return (

      <div className="p-10">

        <h1 className="text-2xl font-bold">
          Día no encontrado
        </h1>

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Entrenamiento
          </h1>

          <p className="text-gray-500">
            Vista alumno
          </p>

        </div>

      </div>

      {/* DÍAS */}

      <div className="flex gap-3 flex-wrap">

        {rutina.dias.map((
          item,
          index
        ) => (

          <button
            key={item.id}

            onClick={() =>
              setDiaActual(index)
            }

            className={`px-5 py-3 rounded-xl border transition ${
              diaActual === index
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Día {index + 1}
          </button>

        ))}

      </div>

      {/* EJERCICIOS */}

      <div className="flex flex-col gap-4">

        {dia.ejercicios.map((
          ejercicio:
            EjercicioRutina,
          index
        ) => {

          const ejercicioData =
            ejercicios.find(
              (item) =>
                item.id ===
                ejercicio.ejercicioId
            );

          const materialData =
            materiales.find(
              (item) =>
                item.id ===
                ejercicio.materialId
            );

          const usarOverride =
            ejercicio
              .configuracion
              .overrideActivo;

          const series =
            usarOverride
              ? ejercicio
                  .configuracion
                  .seriesOverride
              : rutina
                  .progresion
                  .series;

          const reps =
            usarOverride
              ? ejercicio
                  .configuracion
                  .repsOverride
              : rutina
                  .progresion
                  .reps;

          return (

            <div
              key={ejercicio.id}
              className="border rounded-2xl p-5 bg-white flex flex-col gap-5"
            >

              {/* HEADER */}

              <div className="flex items-start justify-between gap-4">

                <div>

                  <span className="text-sm text-gray-400">
                    Ejercicio {index + 1}
                  </span>

                  <h2 className="text-2xl font-bold">
                    {ejercicioData?.nombre}
                  </h2>

                  <p className="text-gray-500">
                    {materialData?.nombre}
                  </p>

                </div>

              </div>

              {/* SERIES */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="border rounded-xl p-4">

                  <span className="text-sm text-gray-400">
                    Series
                  </span>

                  <p className="text-2xl font-bold">
                    {series}
                  </p>

                </div>

                <div className="border rounded-xl p-4">

                  <span className="text-sm text-gray-400">
                    Repeticiones
                  </span>

                  <p className="text-2xl font-bold">
                    {reps}
                  </p>

                </div>

                <div className="border rounded-xl p-4">

                  <span className="text-sm text-gray-400">
                    RIR
                  </span>

                  <p className="text-2xl font-bold">

                    {ejercicio
                      .configuracion
                      .rir ?? "-"}

                  </p>

                </div>

                <div className="border rounded-xl p-4">

                  <span className="text-sm text-gray-400">
                    Descanso
                  </span>

                  <p className="text-2xl font-bold">

                    {ejercicio
                      .configuracion
                      .descansoSegundos
                      ? `${ejercicio.configuracion.descansoSegundos}s`
                      : "-"}

                  </p>

                </div>

              </div>

              {/* FLAGS */}

              <div className="flex flex-wrap gap-3">

                {ejercicio
                  .configuracion
                  .warmup && (

                  <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm">
                    Warmup
                  </div>

                )}

                {ejercicio
                  .configuracion
                  .dropset && (

                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm">
                    Dropset
                  </div>

                )}

                {ejercicio
                  .configuracion
                  .cluster && (

                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm">
                    Cluster
                  </div>

                )}

                {ejercicio
                  .configuracion
                  .usarTimer && (

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
                    Timer
                  </div>

                )}

              </div>

              {/* NOTAS */}

              {ejercicio.notas && (

                <div className="border rounded-2xl p-4 bg-gray-50">

                  <span className="text-sm text-gray-400">
                    Notas
                  </span>

                  <p className="mt-2 whitespace-pre-wrap">
                    {ejercicio.notas}
                  </p>

                </div>

              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}