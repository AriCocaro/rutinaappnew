"use client";

import Link from "next/link";

import alumnos from "@/data/alumnos.json";

export default function AlumnosPage() {

  return (

    <div className="flex flex-col gap-6">

      <div>

        <h1 className="text-3xl font-bold">
          Alumnos
        </h1>

        <p className="text-gray-500">
          Gestionar alumnos
        </p>

      </div>

      <div className="grid gap-4">

        {alumnos.map((alumno) => (

          <Link
            key={alumno.id}
            href={`/UsuarioInstructor/entrenados/${alumno.id}`}
            className="
              border
              rounded-2xl
              p-5
              bg-white
              hover:border-blue-500
            "
          >

            <h2 className="font-semibold">

              {alumno.nombre}
              {" "}
              {alumno.apellido}

            </h2>

            <p className="text-sm text-gray-500">
              {alumno.id}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}