"use client";

import { useParams } from "next/navigation";

import alumnos from "@/data/alumnos.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

export default function AlumnoDetallePage() {

  const params =
    useParams();

  const alumnoId =
    String(params.id);

  const alumno =
    alumnos.find(

      (item) =>

        item.id ===
        alumnoId
    );

  const rutinas =
    obtenerRutinas();

  const rutinaActiva =
    rutinas.find(

      (rutina) =>

        rutina.alumnoId ===
        alumnoId
    );

  if (!alumno) {

    return (

      <div>
        Alumno no encontrado
      </div>

    );
  }

  return (

    <div className="flex flex-col gap-6">

      {/* DATOS */}

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

      {/* RUTINA */}

      <div className="bg-white rounded-2xl p-6 border">

        <h2 className="text-xl font-bold mb-4">
          Rutina activa
        </h2>

        {rutinaActiva ? (

          <div>

            <p>

              Inicio:
              {" "}
              {rutinaActiva.fechaInicio}

            </p>

            <p>

              Semanas:
              {" "}
              {rutinaActiva.cantidadSemanas}

            </p>

            <p>

              Días:
              {" "}
              {rutinaActiva.dias.length}

            </p>

          </div>

        ) : (

          <p className="text-gray-500">

            Sin rutina asignada

          </p>

        )}

      </div>

      {/* HISTORIAL */}

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