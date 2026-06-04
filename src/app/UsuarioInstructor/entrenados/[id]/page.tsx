"use client";

import { useParams } from "next/navigation";

import alumnos from "@/data/alumnos.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function AlumnoDetallePage() {

  /*
  |--------------------------------------------------------------------------
  | PARAMS
  |--------------------------------------------------------------------------
  */

  const params =
    useParams();

  const alumnoId =
    String(params.id);

  /*
  |--------------------------------------------------------------------------
  | ALUMNO
  |--------------------------------------------------------------------------
  */

  const alumno =
    alumnos.find(
      (item) =>
        item.id === alumnoId
    );

  /*
  |--------------------------------------------------------------------------
  | RUTINA ACTIVA
  |--------------------------------------------------------------------------
  */

  const rutinas =
    obtenerRutinas();

  const rutinaActiva =
    rutinas.find(
      (rutina) =>
        rutina.alumnoId ===
        alumnoId
    );

  /*
  |--------------------------------------------------------------------------
  | ALUMNO NO ENCONTRADO
  |--------------------------------------------------------------------------
  */

  if (!alumno) {

    return (

      <div>
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

    <div className="flex flex-col gap-6">

      {/* ===================================================== */}
      {/* DATOS DEL ALUMNO */}
      {/* ===================================================== */}

      <div className="bg-white rounded-2xl p-6 border">

        <h1 className="text-3xl font-bold">

          {alumno.nombre}
          {" "}
          {alumno.apellido}

        </h1>

        <p className="text-gray-500">

          ID:
          {" "}
          {alumno.id}

        </p>

      </div>

      {/* ===================================================== */}
      {/* RUTINA ACTIVA */}
      {/* ===================================================== */}

      <div className="bg-white rounded-2xl p-6 border">

        <h2 className="text-xl font-bold mb-4">

          Rutina activa

        </h2>

        {rutinaActiva ? (

          <div className="flex flex-col gap-2">

            {/* FECHA */}

            <p>

              Inicio:
              {" "}
              {rutinaActiva.fechaInicio}

            </p>

            {/* BLOQUES */}

            <p>

              Bloques:
              {" "}
              {rutinaActiva.cantidadBloques}

            </p>

            {/* ENTRENAMIENTOS POR BLOQUE */}

            <p>

              Entrenamientos por bloque:
              {" "}
              {rutinaActiva.entrenamientosPorBloque}

            </p>

            {/* CANTIDAD DE ENTRENAMIENTOS */}

            <p>

              Entrenamientos cargados:
              {" "}
              {rutinaActiva.entrenamientos.length}

            </p>

            {/* ESTADO */}

            <p>

              Estado:
              {" "}
              {rutinaActiva.activa
                ? "Activa"
                : "Inactiva"}

            </p>

          </div>

        ) : (

          <p className="text-gray-500">

            Sin rutina asignada

          </p>

        )}

      </div>

      {/* ===================================================== */}
      {/* HISTORIAL */}
      {/* ===================================================== */}

      <div className="bg-white rounded-2xl p-6 border">

        <h2 className="text-xl font-bold">

          Últimos entrenamientos

        </h2>

        <p className="text-gray-500">

          Próximamente

        </p>

      </div>

    </div>
  );
}