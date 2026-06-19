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
  EntrenamientoRutina,
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
  obtenerProximoEntrenamiento,
} from "@/lib/dashboardEntrenado";

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

import RenderItem
  from "@/components/UsuarioEntrenado/Entrenamiento/RenderItem";

/*
|--------------------------------------------------------------------------
| BRANDING
|--------------------------------------------------------------------------
*/

import {
  useBranding,
} from "@/hooks/useBranding";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
|
| Muestra el próximo entrenamiento que debe realizar
| el alumno respetando el orden secuencial de la rutina.
|
| Todavía NO registra progreso.
| Todavía NO guarda pesos.
| Todavía NO finaliza entrenamientos.
|
*/

export default function EntrenamientoPage() {

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
  | BRANDING
  |--------------------------------------------------------------------------
  */

  const branding =
    useBranding();

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const [
    alumno,
    setAlumno,
  ] = useState<
    Alumno | null
  >(null);

  const [
    entrenamiento,
    setEntrenamiento,
  ] = useState<
    EntrenamientoRutina | null
  >(null);

  /*
  |--------------------------------------------------------------------------
  | CARGA INICIAL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const alumnoData =
      obtenerAlumnoPorId(
        alumnoId
      );

    if (!alumnoData) {

      setCargando(
        false
      );

      return;
    }

    setAlumno(
      alumnoData
    );

    const proximoEntrenamiento =

      obtenerProximoEntrenamiento(
        alumnoId
      );

    setEntrenamiento(
      proximoEntrenamiento
    );

    setCargando(
      false
    );

  }, [alumnoId]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (cargando) {

    return (

      <div className="p-6">

        Cargando...

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | ALUMNO NO ENCONTRADO
  |--------------------------------------------------------------------------
  */

  if (!alumno) {

    return (

      <div className="p-6">

        {branding.alumno}
        {" "}
        no encontrado

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | SIN ENTRENAMIENTO DISPONIBLE
  |--------------------------------------------------------------------------
  */

  if (!entrenamiento) {

    return (

      <div className="p-6">

        No hay
        {" "}
        {branding.entrenamiento.toLowerCase()}
        {" "}
        disponible.

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

      {/* ------------------------------------------------------------ */}
      {/* HEADER                                                       */}
      {/* ------------------------------------------------------------ */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          {branding.entrenamiento}
          {" "}
          {
            entrenamiento.orden + 1
          }

        </h1>

        <p
          className="
            text-gray-500
          "
        >

          {
            alumno.nombre
          }
          {" "}
          {
            alumno.apellido
          }

        </p>

      </div>

      {/* ------------------------------------------------------------ */}
      {/* LISTA DE ITEMS                                               */}
      {/* ------------------------------------------------------------ */}

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {

          entrenamiento.items.map(

            (
              item,
              index
            ) => (

              <RenderItem

                key={
                  `${item.tipo}-${index}`
                }

                item={
                  item
                }

              />

            )

          )

        }

      </div>

      {/* ------------------------------------------------------------ */}
      {/* ACCIONES                                                     */}
      {/* ------------------------------------------------------------ */}

      <div
        className="
          border-t
          pt-4
          flex
          justify-end
        "
      >

        <button
          disabled
          className="
            px-6
            py-3
            rounded-xl
            bg-green-600
            text-white
            opacity-50
            cursor-not-allowed
          "
        >

          Finalizar
          {" "}
          {branding.entrenamiento}
          {" "}
          (Próximamente)

        </button>

      </div>

    </div>

  );
}