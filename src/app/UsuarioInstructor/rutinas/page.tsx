"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import alumnos from "@/data/alumnos.json";

import {
  obtenerRutinas,
  agregarRutina,
} from "@/lib/rutinasStorage";

import {
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Alumno = {

  id: string;

  nombre: string;

  apellido: string;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function RutinasPage() {

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    rutinas,
    setRutinas,
  ] = useState<Rutina[]>([]);

  /*
  |--------------------------------------------------------------------------
  | CARGAR
  |--------------------------------------------------------------------------
  */

  function cargarRutinas() {

    const data =
      obtenerRutinas();

    setRutinas(data);
  }

  /*
  |--------------------------------------------------------------------------
  | EFFECT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    cargarRutinas();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  function obtenerAlumno(
    alumnoId: string
  ) {

    return (
      alumnos as Alumno[]
    ).find(
      (alumno) =>
        alumno.id === alumnoId
    );
  }

  /*
  |--------------------------------------------------------------------------
  | DUPLICAR
  |--------------------------------------------------------------------------
  */

  function duplicarRutina(
    rutina: Rutina
  ) {

    /*
    |--------------------------------------------------------------------------
    | NUEVO ALUMNO
    |--------------------------------------------------------------------------
    */

    const nuevoAlumnoId =
      prompt(

        "Ingresar ID alumno.\n\nDejar vacío para mantener mismo alumno:",

        rutina.alumnoId
      );

    /*
    |--------------------------------------------------------------------------
    | CANCELAR
    |--------------------------------------------------------------------------
    */

    if (
      nuevoAlumnoId === null
    ) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | NUEVA RUTINA
    |--------------------------------------------------------------------------
    */

    const nuevaRutina: Rutina = {

      ...rutina,

      id: Date.now(),

      alumnoId:
        nuevoAlumnoId.trim() === ""
          ? rutina.alumnoId
          : nuevoAlumnoId,

      fechaInicio:
        new Date()
          .toISOString()
          .split("T")[0],
    };

    /*
    |--------------------------------------------------------------------------
    | GUARDAR
    |--------------------------------------------------------------------------
    */

    agregarRutina(
      nuevaRutina
    );

    /*
    |--------------------------------------------------------------------------
    | RECARGAR
    |--------------------------------------------------------------------------
    */

    cargarRutinas();

    /*
    |--------------------------------------------------------------------------
    | ALERT
    |--------------------------------------------------------------------------
    */

    alert(
      "Rutina duplicada"
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

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Rutinas
          </h1>

          <p className="text-gray-500">
            Dashboard entrenador
          </p>

        </div>

        <Link
          href="/rutinas/nueva"
          className="bg-blue-500 text-white px-5 py-3 rounded-xl"
        >
          + Nueva rutina
        </Link>

      </div>

      {/* VACÍO */}

      {rutinas.length === 0 && (

        <div className="border rounded-2xl p-10 text-center text-gray-500">

          No hay rutinas guardadas

        </div>

      )}

      {/* LISTADO */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {rutinas.map((rutina) => {

          const alumno =
            obtenerAlumno(
              rutina.alumnoId
            );

          return (

            <div
              key={rutina.id}
              className="border rounded-2xl p-5 bg-white flex flex-col gap-4"
            >

              {/* NOMBRE */}

              <div>

                <h2 className="text-xl font-bold">

                  {alumno?.nombre}{" "}
                  {alumno?.apellido}

                </h2>

                <p className="text-sm text-gray-500">

                  {rutina.activa
                    ? "Rutina activa"
                    : "Rutina archivada"}

                </p>

              </div>

              {/* INFO */}

              <div className="flex flex-col gap-2 text-sm">

                <div className="flex justify-between">

                  <span>
                    Inicio
                  </span>

                  <span>
                    {rutina.fechaInicio}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Semanas
                  </span>

                  <span>
                    {rutina.cantidadSemanas}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Días
                  </span>

                  <span>
                    {rutina.dias.length}
                  </span>

                </div>

              </div>

              {/* ACCIONES */}

              <div className="grid grid-cols-3 gap-2">

                {/* VER */}

                <Link
                  href={`/rutinas/${rutina.id}`}
                  className="bg-blue-500 text-white rounded-xl py-3 text-center text-sm"
                >
                  Ver
                </Link>

                {/* EDITAR */}

                <Link
                  href={`/rutinas/${rutina.id}/editar`}
                  className="border rounded-xl py-3 text-center text-sm"
                >
                  Editar
                </Link>

                {/* DUPLICAR */}

                <button
                  onClick={() =>
                    duplicarRutina(
                      rutina
                    )
                  }

                  className="border rounded-xl py-3 text-sm"
                >
                  Duplicar
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}