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
obtenerAlumnos,
eliminarAlumno,
} from "@/lib/alumnosStorage";

/*                                                                         |
| -------------------------------------------------------------------------- |
| COMPONENTE                                                                 |
| -------------------------------------------------------------------------- |
|                                                                            |
| Listado principal de alumnos.                                              |
|                                                                            |
| Responsabilidades:                                                         |
|                                                                            |
| - Mostrar todos los alumnos                                                |
| - Crear nuevo alumno                                                       |
| - Acceder a ficha individual                                               |
| - Eliminar alumno                                                          |
|                                                                            |
| */                                                                         

export default function AlumnosPage() {

 /*                                                                         |
| -------------------------------------------------------------------------- |
| STATE                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

const [
alumnos,
setAlumnos,
] = useState<
Alumno[]

> ([]);

 /*                                                                         |
| -------------------------------------------------------------------------- |
| CARGAR ALUMNOS                                                             |
| -------------------------------------------------------------------------- |
| */                                                                         

function cargarAlumnos() {


const data =
  obtenerAlumnos();

setAlumnos(
  data
);


}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| INIT                                                                       |
| -------------------------------------------------------------------------- |
| */                                                                         

useEffect(() => {


cargarAlumnos();


}, []);

/*                                                                         |
| -------------------------------------------------------------------------- |
| ELIMINAR                                                                   |
| -------------------------------------------------------------------------- |
| */                                                                         

function borrarAlumno(
id: number
) {


const confirmar =
  window.confirm(
    "¿Eliminar alumno?"
  );

if (!confirmar) {
  return;
}

eliminarAlumno(
  id
);

cargarAlumnos();


}

/*                                                                         |
| -------------------------------------------------------------------------- |
| RENDER                                                                     |
| -------------------------------------------------------------------------- |
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

  {/* ------------------------------------------------------ */}
  {/* HEADER                                                 */}
  {/* ------------------------------------------------------ */}

  <div
    className="
      flex
      items-center
      justify-between
    "
  >

    <div>

      <h1
        className="
          text-3xl
          font-bold
        "
      >

        Alumnos

      </h1>

      <p
        className="
          text-gray-500
          mt-1
        "
      >

        Gestión de alumnos
        del gimnasio.

      </p>

    </div>

    <Link
      href="/UsuarioInstructor/alumnos/nuevo"
      className="
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-xl
      "
    >

      + Nuevo Alumno

    </Link>

  </div>

  {/* ------------------------------------------------------ */}
  {/* SIN ALUMNOS                                            */}
  {/* ------------------------------------------------------ */}

  {alumnos.length === 0 && (

    <div
      className="
        border
        rounded-2xl
        p-8
        text-center
        bg-white
      "
    >

      <div
        className="
          text-lg
          font-medium
        "
      >

        No hay alumnos cargados

      </div>

      <div
        className="
          text-gray-500
          mt-2
        "
      >

        Crear el primer alumno
        para comenzar.

      </div>

    </div>

  )}

  {/* ------------------------------------------------------ */}
  {/* LISTADO                                                */}
  {/* ------------------------------------------------------ */}

  {alumnos.map(

    (
      alumno
    ) => (

      <div

        key={
          alumno.id
        }

        className="
          border
          rounded-2xl
          p-5
          bg-white
          flex
          flex-col
          gap-4
        "
      >

        {/* ------------------------------------------------ */}
        {/* CABECERA                                         */}
        {/* ------------------------------------------------ */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-bold
              "
            >

              {alumno.nombre}
              {" "}
              {alumno.apellido}

            </h2>

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Documento:
              {" "}
              {alumno.nrodoc}

            </p>

          </div>

          <div>

            {alumno.activo ? (

              <span
                className="
                  text-green-600
                  text-sm
                  font-medium
                "
              >

                Activo

              </span>

            ) : (

              <span
                className="
                  text-red-600
                  text-sm
                  font-medium
                "
              >

                Inactivo

              </span>

            )}

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* CONTACTO                                         */}
        {/* ------------------------------------------------ */}

        <div
          className="
            text-sm
            text-gray-600
            flex
            flex-col
            gap-1
          "
        >

          <div>

            Email:
            {" "}
            {alumno.email || "-"}

          </div>

          <div>

            Teléfono:
            {" "}
            {alumno.telefono || "-"}

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* OBJETIVOS                                        */}
        {/* ------------------------------------------------ */}

        <div
          className="
            text-sm
            text-gray-500
          "
        >

          Objetivos:
          {" "}
          {
            alumno.objetivos.length
          }

        </div>

        {/* ------------------------------------------------ */}
        {/* ACCIONES                                         */}
        {/* ------------------------------------------------ */}

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          <Link

            href={`/UsuarioInstructor/alumnos/${alumno.id}`}

            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >

            Ver ficha

          </Link>

          <Link

            href={`/UsuarioInstructor/alumnos/${alumno.id}/editar`}

            className="
              bg-amber-500
              text-white
              px-4
              py-2
              rounded-xl
            "
          >

            Editar

          </Link>

          <button

            type="button"

            onClick={() =>
              borrarAlumno(
                alumno.id
              )
            }

            className="
              bg-red-600
              text-white
              px-4
              py-2
              rounded-xl
            "
          >

            Eliminar

          </button>

        </div>

      </div>

    )

  )}

</div>


);

}
