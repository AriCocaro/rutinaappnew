"use client";

 /*                                                                         |
| -------------------------------------------------------------------------- |
| TYPES                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

import { Alumno } from "@/types/alumnos";

 /*                                                                         |
| -------------------------------------------------------------------------- |
| PROPS                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

type Props = {

alumno: Alumno;

onChange: (
campo: keyof Alumno,
valor: string | boolean | null
) => void;

};

 /*                                                                         |
| -------------------------------------------------------------------------- |
| COMPONENTE                                                                 |
| -------------------------------------------------------------------------- |
|                                                                            |
| Formulario principal de datos                                              |
| básicos del alumno.                                                        |
|                                                                            |
| Utilizado para:                                                            |
|                                                                            |
| - Alta                                                                     |
| - Edición                                                                  |
|                                                                            |
| */                                                                         

export default function FormularioAlumno({

alumno,

onChange,

}: Props) {

return (


<div className="flex flex-col gap-6">

  {/* ------------------------------------------------------- */}
  {/* DATOS PERSONALES                                        */}
  {/* ------------------------------------------------------- */}

  <div
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

    <h2 className="font-bold text-lg">

      Datos personales

    </h2>

    <input
      value={alumno.nombre}
      onChange={(e) =>
        onChange(
          "nombre",
          e.target.value
        )
      }
      placeholder="Nombre"
      className="border rounded-xl p-3"
    />

    <input
      value={alumno.apellido}
      onChange={(e) =>
        onChange(
          "apellido",
          e.target.value
        )
      }
      placeholder="Apellido"
      className="border rounded-xl p-3"
    />

    <input
      value={alumno.nrodoc}
      onChange={(e) =>
        onChange(
          "nrodoc",
          e.target.value
        )
      }
      placeholder="Documento"
      className="border rounded-xl p-3"
    />

    <input
      type="date"
      value={
        alumno.fechaNacimiento ??
        ""
      }
      onChange={(e) =>
        onChange(
          "fechaNacimiento",
          e.target.value
        )
      }
      className="border rounded-xl p-3"
    />

    <select
      value={alumno.sexo ?? ""}
      onChange={(e) =>
        onChange(
          "sexo",
          e.target.value
        )
      }
      className="border rounded-xl p-3"
    >

      <option value="">

        Seleccionar sexo

      </option>

      <option value="Masculino">
        Masculino
      </option>

      <option value="Femenino">
        Femenino
      </option>

      <option value="Otro">
        Otro
      </option>

    </select>

  </div>

  {/* ------------------------------------------------------- */}
  {/* CONTACTO                                                */}
  {/* ------------------------------------------------------- */}

  <div
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

    <h2 className="font-bold text-lg">

      Contacto

    </h2>

    <input
      value={alumno.email}
      onChange={(e) =>
        onChange(
          "email",
          e.target.value
        )
      }
      placeholder="Email"
      className="border rounded-xl p-3"
    />

    <input
      value={alumno.telefono}
      onChange={(e) =>
        onChange(
          "telefono",
          e.target.value
        )
      }
      placeholder="Teléfono"
      className="border rounded-xl p-3"
    />

    <input
      value={alumno.direccion}
      onChange={(e) =>
        onChange(
          "direccion",
          e.target.value
        )
      }
      placeholder="Dirección"
      className="border rounded-xl p-3"
    />

  </div>

  {/* ------------------------------------------------------- */}
  {/* OBSERVACIONES                                           */}
  {/* ------------------------------------------------------- */}

  <div
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

    <h2 className="font-bold text-lg">

      Observaciones

    </h2>

    <textarea
      rows={4}
      value={
        alumno.observaciones
      }
      onChange={(e) =>
        onChange(
          "observaciones",
          e.target.value
        )
      }
      className="
        border
        rounded-xl
        p-3
      "
    />

  </div>

  {/* ------------------------------------------------------- */}
  {/* NOTAS PRIVADAS                                          */}
  {/* ------------------------------------------------------- */}

  <div
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

    <h2 className="font-bold text-lg">

      Notas del instructor

    </h2>

    <textarea
      rows={5}
      value={
        alumno.notasInstructor
      }
      onChange={(e) =>
        onChange(
          "notasInstructor",
          e.target.value
        )
      }
      className="
        border
        rounded-xl
        p-3
      "
    />

  </div>

  {/* ------------------------------------------------------- */}
  {/* ACTIVO                                                  */}
  {/* ------------------------------------------------------- */}

  <div
    className="
      border
      rounded-2xl
      p-5
      bg-white
    "
  >

    <label
      className="
        flex
        items-center
        gap-3
      "
    >

      <input
        type="checkbox"
        checked={
          alumno.activo
        }
        onChange={(e) =>
          onChange(
            "activo",
            e.target.checked
          )
        }
      />

      Alumno activo

    </label>

  </div>

</div>


);

}
