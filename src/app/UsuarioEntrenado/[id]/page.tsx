"use client";

/*                                                                         |
| -------------------------------------------------------------------------- |
| HOOKS                                                                      |
| -------------------------------------------------------------------------- |
| */

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

/*                                                                         |
| -------------------------------------------------------------------------- |
| TYPES                                                                      |
| -------------------------------------------------------------------------- |
| */

import {
  Alumno,
} from "@/types/alumnos";

/*                                                                         |
| -------------------------------------------------------------------------- |
| STORAGE                                                                    |
| -------------------------------------------------------------------------- |
| */

import {
  obtenerAlumnoPorId,
} from "@/lib/alumnosStorage";

import {
  obtenerResumenDashboard,
} from "@/lib/dashboardEntrenado";

/*                                                                         |
| -------------------------------------------------------------------------- |
| HELPERS                                                                    |
| -------------------------------------------------------------------------- |
| */

import {
  formatearFecha,
} from "@/lib/fechas";

/*                                                                         |
| -------------------------------------------------------------------------- |
| BRANDING                                                                   |
| -------------------------------------------------------------------------- |
| */

import {
  useBranding,
} from "@/hooks/useBranding";

/*                                                                         |
| -------------------------------------------------------------------------- |
| COMPONENTE                                                                 |
| -------------------------------------------------------------------------- |
|                                                                            |
| Dashboard principal del usuario entrenado.                                |
|                                                                            |
| Muestra:                                                                   |
|                                                                            |
| - Resumen semanal                                                          |
| - Rutina activa                                                            |
| - Próximo entrenamiento                                                    |
| - Último entrenamiento                                                     |
| - Acciones rápidas                                                         |
|                                                                            |
| */

export default function UsuarioEntrenadoPage() {

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | PARAMS                                                                 |
  | ---------------------------------------------------------------------- |
  | */

  const params =
    useParams();

  const alumnoId =
    String(
      params.id
    );

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | BRANDING                                                               |
  | ---------------------------------------------------------------------- |
  | */

  const branding =
    useBranding();

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | STATE                                                                  |
  | ---------------------------------------------------------------------- |
  | */

  const [
    alumno,
    setAlumno,
  ] = useState<
    Alumno | null
  >(null);

  const [
    cargando,
    setCargando,
  ] = useState(
    true
  );

  const [
    resumen,
    setResumen,
  ] = useState(() =>
    obtenerResumenDashboard(
      alumnoId
    )
  );

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | CARGAR DATOS                                                           |
  | ---------------------------------------------------------------------- |
  | */

  useEffect(() => {

    const alumnoData =
      obtenerAlumnoPorId(
        alumnoId
      );

    if (!alumnoData) {

      setAlumno(
        null
      );

      setCargando(
        false
      );

      return;
    }

    setAlumno(
      alumnoData
    );

    setResumen(

      obtenerResumenDashboard(
        alumnoId
      )

    );

    setCargando(
      false
    );

  }, [alumnoId]);

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | LOADING                                                                |
  | ---------------------------------------------------------------------- |
  | */

  if (cargando) {

    return (

      <div className="p-6">

        Cargando...

      </div>

    );
  }

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | NOT FOUND                                                              |
  | ---------------------------------------------------------------------- |
  | */

  if (!alumno) {

    return (

      <div className="p-6">

        {branding.alumno}
        {" "}
        no encontrado

      </div>

    );
  }

  /*                                                                       |
  | ---------------------------------------------------------------------- |
  | RENDER                                                                 |
  | ---------------------------------------------------------------------- |
  | */

  return (

    <div
      className="
        p-6
        flex
        flex-col
        gap-6
      "
    >

      {/* -------------------------------------------------------------- */}
      {/* HEADER                                                         */}
      {/* -------------------------------------------------------------- */}

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

          Dashboard del
          {" "}
          {branding.alumno.toLowerCase()}

        </p>

      </div>

      {/* -------------------------------------------------------------- */}
      {/* RESUMEN SEMANAL                                                */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          border
          rounded-2xl
          p-5
          bg-white
        "
      >

        <h2
          className="
            font-bold
            mb-2
          "
        >

          Esta semana

        </h2>

        <div>

          {
            resumen.entrenamientosSemana
          }
          {" "}
          entrenamientos realizados

        </div>

      </div>

      {/* -------------------------------------------------------------- */}
      {/* RUTINA ACTIVA                                                  */}
      {/* -------------------------------------------------------------- */}

      {resumen.rutina && (

        <div
          className="
            border
            rounded-2xl
            p-5
            bg-white
          "
        >

          <h2
            className="
              font-bold
              mb-3
            "
          >

            {branding.rutina}
            {" "}
            activa

          </h2>

          <div className="flex flex-col gap-2">

            <div>

              Inicio:
              {" "}
              {
                formatearFecha(
                  resumen.rutina
                    .fechaInicio
                )
              }

            </div>

            <div>

              {
                branding.bloques
              }
              :
              {" "}
              {
                resumen.rutina
                  .cantidadBloques
              }

            </div>

            <div>

              {
                branding.entrenamientos
              }
              :
              {" "}
              {
                resumen.rutina
                  .entrenamientos
                  .length
              }

            </div>

          </div>

        </div>

      )}

      {/* -------------------------------------------------------------- */}
      {/* PRÓXIMO ENTRENAMIENTO                                          */}
      {/* -------------------------------------------------------------- */}

      {resumen.proximoEntrenamiento && (

        <div
          className="
            border
            rounded-2xl
            p-5
            bg-white
          "
        >

          <h2
            className="
              font-bold
              mb-3
            "
          >

            Próximo
            {" "}
            {branding.entrenamiento}

          </h2>

          <div>

            {branding.entrenamiento}
            {" "}
            {
              resumen
                .proximoEntrenamiento
                .orden + 1
            }

          </div>

        </div>

      )}

      {/* -------------------------------------------------------------- */}
      {/* ÚLTIMO ENTRENAMIENTO                                           */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          border
          rounded-2xl
          p-5
          bg-white
        "
      >

        <h2
          className="
            font-bold
            mb-3
          "
        >

          Último
          {" "}
          {branding.entrenamiento}

        </h2>

        {resumen.ultimoEntrenamiento ? (

          <div>

            {
              formatearFecha(
                resumen
                  .ultimoEntrenamiento
                  .fecha
              )
            }

          </div>

        ) : (

          <div>

            Sin entrenamientos registrados

          </div>

        )}

      </div>

      {/* -------------------------------------------------------------- */}
      {/* ACCIONES                                                       */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          flex
          gap-3
          flex-wrap
        "
      >

        <Link
          href={`/UsuarioEntrenado/${alumno.id}/entrenamiento`}
          className="
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-xl
          "
        >

          Iniciar
          {" "}
          {branding.entrenamiento}

        </Link>

        <Link
          href={`/UsuarioEntrenado/${alumno.id}/libre`}
          className="
            border
            px-5
            py-3
            rounded-xl
          "
        >

          Entrenamiento libre

        </Link>

      </div>

    </div>

  );
}