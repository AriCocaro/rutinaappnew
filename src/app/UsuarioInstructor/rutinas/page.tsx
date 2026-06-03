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
|
| Dashboard principal de rutinas.
|
| Lista todas las rutinas guardadas.
| Permite:
|
| - Ver
| - Editar
| - Duplicar
| - Crear nueva
|
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
  | CARGAR RUTINAS
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
  | BUSCAR ALUMNO
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
  | DUPLICAR RUTINA
  |--------------------------------------------------------------------------
  */

  function duplicarRutina(
    rutina: Rutina
  ) {

    const nuevoAlumnoId =
      prompt(

        "Ingresar ID alumno.\n\nDejar vacío para mantener el mismo alumno.",

        rutina.alumnoId
      );

    if (
      nuevoAlumnoId === null
    ) {
      return;
    }

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

    agregarRutina(
      nuevaRutina
    );

    cargarRutinas();

    alert(
      "Rutina duplicada correctamente"
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

        {/* IMPORTANTE:
            En Next NO se navega al archivo.
            Se navega a la ruta.
        */}

        <Link
          href="/UsuarioInstructor/rutinas/nueva"
          className="bg-blue-500 text-white px-5 py-3 rounded-xl"
        >
          + Nueva rutina
        </Link>

      </div>

      {/* SIN RUTINAS */}

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
                    Bloques
                  </span>

                  <span>
                    {rutina.cantidadBloques}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>
                    Entrenamientos
                  </span>

                  <span>
                    {
                      rutina.entrenamientos
                        .length
                    }
                  </span>

                </div>

              </div>

              {/* ACCIONES */}

              <div className="grid grid-cols-3 gap-2">

                {/* VER */}

                <Link
                  href={`/UsuarioInstructor/rutinas/${rutina.id}`}
                  className="bg-blue-500 text-white rounded-xl py-3 text-center text-sm"
                >
                  Ver
                </Link>

                {/* EDITAR */}

                <Link
                  href={`/UsuarioInstructor/rutinas/${rutina.id}/editar`}
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