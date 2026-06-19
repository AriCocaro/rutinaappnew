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
useRouter,
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
  obtenerRutinasPorAlumno,
} from "@/lib/rutinasStorage";

import {
  Rutina,
} from "@/types/rutinas";

/*                                                                         |
| -------------------------------------------------------------------------- |
| COMPONENTE                                                                 |
| -------------------------------------------------------------------------- |
|                                                                            |
| Ficha completa del alumno.                                                 |
|                                                                            |
| Esta pantalla será la base para:                                           |
|                                                                            |
| - objetivos                                                                |
| - mediciones                                                               |
| - archivos                                                                 |
| - asistencia                                                               |
| - situación económica                                                      |
|                                                                            |
| */                                                                         

export default function AlumnoDetallePage() {

/*                                                                         |
| -------------------------------------------------------------------------- |
| ROUTER                                                                     |
| -------------------------------------------------------------------------- |
| */                                                                         

const params =
useParams();

const router =
useRouter();

 /*                                                                         |
| -------------------------------------------------------------------------- |
| PARAMS                                                                     |
| -------------------------------------------------------------------------- |
| */                                                                         

const id =
String(
params.id
);

 /*                                                                         |
| -------------------------------------------------------------------------- |
| STATE                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

const [
  alumno,
  setAlumno,
  ] = useState<
  Alumno | null

  > (null);
  const [
    rutinas,
    setRutinas,
  ] = useState<Rutina[]>([])
;

/*                                                                         |
| -------------------------------------------------------------------------- |
| CARGAR ALUMNO                                                              |
| -------------------------------------------------------------------------- |
| */                                                                         

useEffect(() => {

    const data =
      obtenerAlumnoPorId(id);

    if (!data) {
      return;
    }

    setAlumno(data);

    const rutinasAlumno =
      obtenerRutinasPorAlumno(
        id
      );

    setRutinas(
      rutinasAlumno
    );

  }, [id]);           

 /*                                                                         |
| -------------------------------------------------------------------------- |
| NOT FOUND                                                                  |
| -------------------------------------------------------------------------- |
| */                                                                         

if (!alumno) {


return (

  <div className="p-6">

    Alumno no encontrado

  </div>

);


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

  {/* ---------------------------------------------------- */}
  {/* HEADER                                               */}
  {/* ---------------------------------------------------- */}

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

        {alumno.nombre}
        {" "}
        {alumno.apellido}

      </h1>

      <p
        className="
          text-gray-500
          mt-1
        "
      >

        Documento:
        {" "}
        {alumno.nrodoc}

      </p>

    </div>

    <button

      type="button"

      onClick={() =>
        router.back()
      }

      className="
        border
        px-4
        py-2
        rounded-xl
      "
    >

      Volver

    </button>

  </div>

  {/* ---------------------------------------------------- */}
  {/* DATOS PERSONALES                                     */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Datos Personales

    </h2>

    <div className="grid gap-2">

      <div>
        Nombre:
        {" "}
        {alumno.nombre}
      </div>

      <div>
        Apellido:
        {" "}
        {alumno.apellido}
      </div>

      <div>
        Documento:
        {" "}
        {alumno.nrodoc}
      </div>

      <div>
        Fecha nacimiento:
        {" "}
        {
          alumno.fechaNacimiento ??
          "-"
        }
      </div>

      <div>
        Sexo:
        {" "}
        {
          alumno.sexo ??
          "-"
        }
      </div>

    </div>

  </div>

  {/* ---------------------------------------------------- */}
  {/* CONTACTO                                             */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Contacto

    </h2>

    <div className="grid gap-2">

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

      <div>
        Dirección:
        {" "}
        {alumno.direccion || "-"}
      </div>

    </div>

  </div>

  {/* ---------------------------------------------------- */}
  {/* OBSERVACIONES                                        */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Observaciones

    </h2>

    <p>

      {
        alumno.observaciones ||
        "Sin observaciones"
      }

    </p>

  </div>

  {/* ---------------------------------------------------- */}
  {/* NOTAS INSTRUCTOR                                     */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Notas del Instructor

    </h2>

    <p>

      {
        alumno.notasInstructor ||
        "Sin notas"
      }

    </p>

  </div>




  {/* ---------------------------------------------------- */}
  {/* OBJETIVOS                                            */}
  {/* ---------------------------------------------------- */}

  <div
    className="
      border
      rounded-2xl
      p-5
      bg-white
    "
  >

    <div
      className="
        flex
        items-center
        justify-between
        mb-4
      "
    >

      <h2
        className="
          text-xl
          font-bold
        "
      >

        Objetivos

      </h2>

      <span
        className="
          text-sm
          text-gray-500
        "
      >

        {
          alumno.objetivos
            .length
        }
        {" "}
        registrados

      </span>

    </div>

    {alumno.objetivos.length === 0 ? (

      <div
        className="
          text-gray-500
        "
      >

        Sin objetivos cargados

      </div>

    ) : (

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {alumno.objetivos.map(

          (
            objetivo
          ) => (

            <div

              key={
                objetivo.id
              }

              className="
                border
                rounded-xl
                p-4
              "
            >

              <div
                className="
                  font-semibold
                "
              >

                {
                  objetivo.titulo
                }

              </div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >

                {
                  objetivo.estado
                }

              </div>

              <div
                className="
                  mt-2
                "
              >

                {
                  objetivo.descripcion
                }

              </div>

            </div>

          )

        )}

      </div>

    )}

  </div>

  {rutinas.map((rutina) => (

    <div
      key={rutina.id}
      className="
        border
        rounded-xl
        p-4
      "
    >

      <div>

        Rutina ID:
        {" "}
        {rutina.id.slice(0, 8)}

      </div>

      <div>

        Inicio:
        {" "}
        {rutina.fechaInicio}

      </div>

      <div>

        Bloques:
        {" "}
        {rutina.cantidadBloques}

      </div>

      <div>

        Entrenamientos:
        {" "}
        {rutina.entrenamientos.length}

      </div>

      <div>

        Estado:
        {" "}
        {rutina.estado}

      </div>

      <Link
        href={`/UsuarioInstructor/rutinas/${rutina.id}/editar`}
        className="
          mt-3
          inline-block
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-xl
        "
      >

        Ver Rutina

      </Link>

    </div>

  ))}

  {/* ---------------------------------------------------- */}
  {/* MEDICIONES                                           */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Mediciones

    </h2>

    <div>

      Registros:
      {" "}
      {
        alumno.mediciones
          .length
      }

    </div>

  </div>

  {/* ---------------------------------------------------- */}
  {/* ARCHIVOS                                             */}
  {/* ---------------------------------------------------- */}

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
        text-xl
        font-bold
        mb-4
      "
    >

      Archivos

    </h2>

    <div>

      Archivos cargados:
      {" "}
      {
        alumno.archivos
          .length
      }

    </div>

  </div>

</div>


);

}
