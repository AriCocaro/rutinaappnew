"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import alumnos from "@/data/alumnos.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

import {
  Rutina,
} from "@/types/rutinas";

/*
|------------------------------------------------------------------
| TYPES
|------------------------------------------------------------------
*/

type Alumno = {

  id: string;

  nombre: string;

  apellido: string;
};

/*
|------------------------------------------------------------------
| COMPONENTE
|------------------------------------------------------------------
*/

export default function AlumnoPage() {

  /*
  |----------------------------------------------------------------
  | PARAMS
  |----------------------------------------------------------------
  */

  const params =
    useParams();

  const alumnoId =
    params.id as string;

  /*
  |----------------------------------------------------------------
  | STATE
  |----------------------------------------------------------------
  */

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(
    null
  );

  /*
  |----------------------------------------------------------------
  | ALUMNO
  |----------------------------------------------------------------
  */

  const alumno =
    (alumnos as Alumno[]).find(
      (item) =>
        item.id === alumnoId
    );

  /*
  |----------------------------------------------------------------
  | EFFECT
  |----------------------------------------------------------------
  */

  useEffect(() => {

    const rutinas =
      obtenerRutinas();

    const rutinaActiva =
      rutinas.find(
        (item) =>

          item.alumnoId ===
            alumnoId &&

          item.activa
      );

    if (rutinaActiva) {

      setRutina(
        rutinaActiva
      );
    }

  }, [alumnoId]);

  /*
  |----------------------------------------------------------------
  | EMPTY
  |----------------------------------------------------------------
  */

  if (!alumno) {

    return (

      <div className="p-6">

        Alumno no encontrado

      </div>
    );
  }

  /*
  |----------------------------------------------------------------
  | RENDER
  |----------------------------------------------------------------
  */

  return (

    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          {alumno.nombre}{" "}
          {alumno.apellido}

        </h1>

        <p className="text-gray-500">

          Dashboard alumno

        </p>

      </div>

      {/* SIN RUTINA */}

      {!rutina && (

        <div className="border rounded-2xl p-10 bg-white text-center text-gray-500">

          El alumno no tiene
          rutina activa

        </div>

      )}

      {/* RUTINA */}

      {rutina && (

        <div className="flex flex-col gap-5">

          {/* INFO */}

          <div className="border rounded-2xl p-5 bg-white flex flex-col gap-3">

            <h2 className="text-xl font-bold">

              Rutina activa

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Inicio
                </p>

                <p className="font-bold">
                  {rutina.fechaInicio}
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Semanas
                </p>

                <p className="font-bold">
                  {rutina.cantidadSemanas}
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Días
                </p>

                <p className="font-bold">
                  {rutina.dias.length}
                </p>

              </div>

            </div>

          </div>

          {/* DÍAS */}

          <div className="flex flex-col gap-4">

            {rutina.dias.map(
              (
                dia,
                index
              ) => (

                <div
                  key={dia.id}
                  className="border rounded-2xl p-5 bg-white flex flex-col gap-4"
                >

                  <h2 className="text-xl font-bold">

                    Día {index + 1}

                  </h2>

                  <div className="flex flex-col gap-3">

                    {dia.ejercicios.map(
                      (ejercicio) => (

                        <div
                          key={ejercicio.id}
                          className="border rounded-xl p-4"
                        >

                          <div className="flex items-center justify-between">

                            <div>

                              <p className="font-semibold">

                                Ejercicio ID:
                                {" "}
                                {ejercicio.ejercicioId}

                              </p>

                              <p className="text-sm text-gray-500">

                                Material:
                                {" "}
                                {ejercicio.materialId}

                              </p>

                            </div>

                            <div className="text-sm text-gray-500">

                              {ejercicio
                                .configuracion
                                .overrideActivo

                                ? (
                                  <>
                                    {
                                      ejercicio
                                        .configuracion
                                        .seriesOverride
                                    }
                                    {" "}x{" "}
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
                                    {" "}x{" "}
                                    {
                                      rutina
                                        .progresion
                                        .reps
                                    }
                                  </>
                                )}

                            </div>

                          </div>

                          {/* NOTAS */}

                          {ejercicio.notas && (

                            <div className="mt-3 text-sm text-gray-600">

                              {ejercicio.notas}

                            </div>

                          )}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  );
}