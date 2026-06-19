"use client";

/*
|--------------------------------------------------------------------------
| HOOKS
|--------------------------------------------------------------------------
*/

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  Alumno,
} from "@/types/alumnos";

import {
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

import {
  obtenerAlumnoPorId,
} from "@/lib/alumnosStorage";

import {
  obtenerRutinaActivaPorAlumno,
} from "@/lib/rutinasStorage";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

import {
  contarEjercicios,
} from "@/lib/rutinaHelpers";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function AlumnoPage() {

  /*
  |--------------------------------------------------------------------------
  | PARAMS
  |--------------------------------------------------------------------------
  */

  const params =
    useParams();

  const alumnoId =
    String(
      params.id
    );

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    alumno,
    setAlumno,
  ] = useState<
    Alumno | null
  >(null);

  const [
    rutina,
    setRutina,
  ] = useState<
    Rutina | null
  >(null);

  /*
  |--------------------------------------------------------------------------
  | INIT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const alumnoData =
      obtenerAlumnoPorId(
        alumnoId
      );

    if (
      alumnoData
    ) {

      setAlumno(
        alumnoData
      );
    }

    const rutinaActiva =
      obtenerRutinaActivaPorAlumno(
        alumnoId
      );

    if (
      rutinaActiva
    ) {

      setRutina(
        rutinaActiva
      );
    }

  }, [alumnoId]);

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!alumno) {

    return (

      <div className="p-6">

        Alumno no encontrado

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div
      className="
        p-6
        flex
        flex-col
        gap-6
      "
    >

      {/* ------------------------------------------------ */}
      {/* HEADER                                           */}
      {/* ------------------------------------------------ */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          {alumno.nombre}
          {" "}
          {alumno.apellido}

        </h1>

        <p
          className="
            text-gray-500
          "
        >

          Vista alumno

        </p>

      </div>

      {/* ------------------------------------------------ */}
      {/* SIN RUTINA                                       */}
      {/* ------------------------------------------------ */}

      {!rutina && (

        <div
          className="
            border
            rounded-2xl
            p-8
            bg-white
          "
        >

          Este alumno no posee
          una rutina activa.

        </div>

      )}

      {/* ------------------------------------------------ */}
      {/* RUTINA ACTIVA                                    */}
      {/* ------------------------------------------------ */}

      {rutina && (

        <div
          className="
            border
            rounded-2xl
            p-5
            bg-white
            flex
            flex-col
            gap-5
          "
        >

          <h2
            className="
              text-xl
              font-bold
            "
          >

            Rutina activa

          </h2>

          <div
            className="
              grid
              md:grid-cols-4
              gap-4
            "
          >

            <div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >

                Inicio

              </div>

              <div>

                {
                  rutina.fechaInicio
                }

              </div>

            </div>

            <div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >

                Bloques

              </div>

              <div>

                {
                  rutina.cantidadBloques
                }

              </div>

            </div>

            <div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >

                Entrenamientos

              </div>

              <div>

                {
                  rutina.entrenamientos
                    .length
                }

              </div>

            </div>

            <div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >

                Estado

              </div>

              <div>

                {
                  rutina.estado
                }

              </div>

            </div>

          </div>

          {/* -------------------------------------------- */}
          {/* ENTRENAMIENTOS                               */}
          {/* -------------------------------------------- */}

          <div
            className="
              flex
              flex-col
              gap-3
            "
          >

            {rutina.entrenamientos.map(

              (
                entrenamiento,
                index
              ) => (

                <Link

                  key={
                    entrenamiento.id
                  }

                  href={`/UsuarioEntrenado/${alumno.id}/entrenamiento`}

                  className="
                    border
                    rounded-xl
                    p-4
                    hover:bg-gray-50
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          font-semibold
                        "
                      >

                        Entrenamiento
                        {" "}
                        {index + 1}

                      </div>

                      <div
                        className="
                          text-sm
                          text-gray-500
                        "
                      >

                        {
                          contarEjercicios(
                            entrenamiento.items
                          )
                        }
                        {" "}
                        ejercicios

                      </div>

                    </div>

                  </div>

                </Link>

              )

            )}

          </div>

        </div>

      )}

    </div>

  );
}