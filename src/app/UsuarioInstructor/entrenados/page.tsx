"use client";

import Link from "next/link";

import alumnos from "@/data/alumnos.json";

import {
  useBranding,
} from "@/hooks/useBranding";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function AlumnosPage() {

  /*
  |--------------------------------------------------------------------------
  | BRANDING
  |--------------------------------------------------------------------------
  |
  | Permite cambiar nombres según el cliente:
  |
  | Alumno
  | Cliente
  | Deportista
  | Atleta
  |
  */

  const branding =
    useBranding();

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="flex flex-col gap-6">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div>

        <h1 className="text-3xl font-bold">

          {branding.alumno}s

        </h1>

        <p className="text-gray-500">

          Gestionar{" "}
          {branding.alumno.toLowerCase()}s

        </p>

      </div>

      {/* ====================================================== */}
      {/* LISTADO */}
      {/* ====================================================== */}

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

            {/* NOMBRE */}

            <h2 className="font-semibold">

              {alumno.nombre}
              {" "}
              {alumno.apellido}

            </h2>

            {/* ID */}

            <p className="text-sm text-gray-500">

              {alumno.id}

            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}