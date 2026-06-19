"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Alumno,
} from "@/types/alumnos";

import {
  obtenerAlumnoPorId,
  actualizarAlumno,
} from "@/lib/alumnosStorage";

import FormularioAlumno from "@/components/UsuarioInstructor/Alumnos/FormularioAlumno";

export default function EditarAlumnoPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const id =
    String(
      params.id
    );

  const [
    alumno,
    setAlumno,
  ] = useState<
    Alumno | null
  >(null);

  useEffect(() => {

    const data =
      obtenerAlumnoPorId(
        id
      );

    if (!data) {
      return;
    }

    setAlumno(
      data
    );

  }, [id]);

  function actualizarCampo(

    campo: keyof Alumno,

    valor:
      string |
      boolean |
      null

  ) {

    setAlumno(
      (prev) => {

        if (!prev) {
          return prev;
        }

        return {

          ...prev,

          [campo]:
            valor,
        };

      }
    );

  }

  function guardarCambios() {

    if (!alumno) {
      return;
    }

    if (
      !alumno.nombre.trim()
    ) {

      alert(
        "Ingresar nombre"
      );

      return;
    }

    if (
      !alumno.apellido.trim()
    ) {

      alert(
        "Ingresar apellido"
      );

      return;
    }

    actualizarAlumno(
      alumno
    );

    alert(
      "Alumno actualizado correctamente"
    );

    router.push(
      `/UsuarioInstructor/alumnos/${id}`
    );

  }

  if (!alumno) {

    return (

      <div className="p-6">

        Alumno no encontrado

      </div>

    );

  }

  return (

    <div
      className="
        p-6
        flex
        flex-col
        gap-6
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Editar Alumno

        </h1>

        <p
          className="
            text-gray-500
            mt-1
          "
        >

          Modificar datos del alumno.

        </p>

      </div>

      <FormularioAlumno

        alumno={alumno}

        onChange={
          actualizarCampo
        }

      />

      <button

        type="button"

        onClick={
          guardarCambios
        }

        className="
          bg-green-600
          text-white
          rounded-xl
          px-5
          py-4
          font-medium
        "
      >

        Guardar Cambios

      </button>

    </div>

  );

}