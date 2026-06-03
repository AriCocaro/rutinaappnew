"use client";

import { ReactNode } from "react";

import {
  EntrenamientoRutina,
} from "@/types/rutinas";

import {
  obtenerLetraDia,
} from "./helpers";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  entrenamiento:
    EntrenamientoRutina;

  onEliminar:
    () => void;

  onAgregarEjercicio:
    () => void;

  children:
    ReactNode;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function EntrenamientoCard({

  entrenamiento,

  onEliminar,

  onAgregarEjercicio,

  children,

}: Props) {

  return (

    <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">

          Día {
            obtenerLetraDia(
              entrenamiento.orden
            )
          }

        </h2>

        <button
          onClick={onEliminar}
          className="text-red-500 text-sm"
        >
          Eliminar día
        </button>

      </div>

      {/* AGREGAR EJERCICIO */}

      <button
        onClick={onAgregarEjercicio}
        className="
          bg-gray-100
          hover:bg-gray-200
          transition
          px-4
          py-3
          rounded-xl
        "
      >
        + Agregar ejercicio
      </button>

      {/* LISTA */}

      <div className="flex flex-col gap-3">

        {children}

      </div>

    </div>
  );
}