"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import alumnos from "@/data/alumnos.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  EntrenamientoRutina,
  EjercicioRutina,
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
  | CARGAR RUTINA ACTIVA
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
  | ALUMNO NO ENCONTRADO
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
  | PROGRESIÓN BASE
  |----------------------------------------------------------------
  |
  | Tomamos el primer bloque de la progresión global
  | para mostrar una referencia rápida.
  |
  */

  const progresionBase =
    rutina?.progresionGlobal?.[0];

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

          {/* INFO GENERAL */}

          <div className="border rounded-2xl p-5 bg-white flex flex-col gap-3">

            <h2 className="text-xl font-bold">

              Rutina activa

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              {/* FECHA */}

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Inicio
                </p>

                <p className="font-bold">
                  {rutina.fechaInicio}
                </p>

              </div>

              {/* BLOQUES */}

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Bloques
                </p>

                <p className="font-bold">
                  {rutina.cantidadBloques}
                </p>

              </div>

              {/* ENTRENAMIENTOS */}

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Entrenamientos
                </p>

                <p className="font-bold">
                  {rutina.entrenamientos.length}
                </p>

              </div>

              {/* PROGRESIÓN BASE */}

              <div className="border rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Progresión inicial
                </p>

                <p className="font-bold">

                  {progresionBase?.series ?? "-"}
                  {" x "}
                  {progresionBase?.reps ?? "-"}

                </p>

              </div>

            </div>

          </div>

          {/* ENTRENAMIENTOS */}

          <div className="flex flex-col gap-4">

            {rutina.entrenamientos.map(

              (
                entrenamiento:
                  EntrenamientoRutina,
                index
              ) => (

                <div
                  key={entrenamiento.id}
                  className="border rounded-2xl p-5 bg-white flex flex-col gap-4"
                >

                  {/* HEADER */}

                  <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">

                      Entrenamiento {index + 1}

                    </h2>

                    <span className="text-sm text-gray-500">

                      {
                        entrenamiento
                          .ejercicios
                          .length
                      }
                      {" "}
                      ejercicios

                    </span>

                  </div>

                  {/* EJERCICIOS */}

                  <div className="flex flex-col gap-3">

                    {entrenamiento.ejercicios.map(

                      (
                        ejercicio:
                          EjercicioRutina
                      ) => (

                        <div
                          key={ejercicio.id}
                          className="border rounded-xl p-4"
                        >

                          <div className="flex items-center justify-between">

                            {/* INFO */}

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

                            {/* OVERRIDE */}

                            {ejercicio
                              .configuracion
                              .overrideActivo && (

                              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg">

                                Override

                              </span>

                            )}

                          </div>

                          {/* PROGRESIÓN */}

                          <div className="mt-3 text-sm text-gray-500">

                            {progresionBase?.series ?? "-"}
                            {" x "}
                            {progresionBase?.reps ?? "-"}

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