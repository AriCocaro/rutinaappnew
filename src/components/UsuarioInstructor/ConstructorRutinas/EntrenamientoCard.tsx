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
|
| Card contenedora de un día de entrenamiento.
|
| Responsabilidades:
|
| - Mostrar nombre del día
| - Permitir eliminar el día
| - Renderizar contenido interno
|
| NO maneja ejercicios.
| NO maneja configuraciones.
|
*/

type Props = {

  entrenamiento:
    EntrenamientoRutina;

  onEliminar:
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

  children,

}: Props) {

  return (

    <div
      className="
        border
        rounded-2xl
        p-5
        bg-white
        flex
        flex-col
        gap-5
      "
    >

      {/* ------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------ */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h2 className="text-xl font-bold">

          Día {
            obtenerLetraDia(
              entrenamiento.orden
            )
          }

        </h2>

        <button
          type="button"
          onClick={onEliminar}
          className="
            text-red-500
            text-sm
          "
        >
          Eliminar día
        </button>

      </div>

      {/* ------------------------------------------------------------ */}
      {/* CONTENIDO */}
      {/* ------------------------------------------------------------ */}

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {children}

      </div>

    </div>
  );
}