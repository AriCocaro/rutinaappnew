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
| Card contenedora de un entrenamiento.
|
| Responsabilidades:
|
| - Mostrar encabezado del día
| - Permitir eliminar el entrenamiento
| - Renderizar acciones opcionales
| - Renderizar contenido interno
|
| NO maneja:
|
| - ejercicios
| - grupos
| - configuraciones
| - lógica de negocio
|
*/

type Props = {

  entrenamiento:
    EntrenamientoRutina;

  onEliminar:
    () => void;

  /*
  |----------------------------------------------------------------------
  | ACCIONES OPCIONALES
  |----------------------------------------------------------------------
  |
  | Permite inyectar botones:
  |
  | + Ejercicio
  | + Superserie
  | + Triserie
  | + Circuito
  |
  | sin acoplar este componente
  | a la lógica de la rutina.
  |
  */

  acciones?:
    ReactNode;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

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

  acciones,

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

        <h2
          className="
            text-xl
            font-bold
          "
        >
          Día{" "}
          {obtenerLetraDia(
            entrenamiento.orden
          )}
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
      {/* ACCIONES */}
      {/* ------------------------------------------------------------ */}
      {acciones && (

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {acciones}
        </div>

      )}

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