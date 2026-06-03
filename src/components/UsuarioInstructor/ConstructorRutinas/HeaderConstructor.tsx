"use client";

import { Rutina } from "@/types/rutinas";

type Props = {
  rutinaInicial?: Rutina;
  onGuardar: () => void;
};

export default function HeaderConstructor({

  rutinaInicial,

  onGuardar,

}: Props) {

  return (

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">

          {rutinaInicial
            ? "Editar rutina"
            : "Constructor de rutinas"}

        </h1>

        <p className="text-gray-500">

          {rutinaInicial
            ? "Modificar rutina existente"
            : "Crear rutina para alumno"}

        </p>

      </div>

      <button
        onClick={onGuardar}
        className="
          bg-green-600
          text-white
          px-5
          py-3
          rounded-xl
        "
      >

        {rutinaInicial
          ? "Guardar cambios"
          : "Guardar rutina"}

      </button>

    </div>
  );
}