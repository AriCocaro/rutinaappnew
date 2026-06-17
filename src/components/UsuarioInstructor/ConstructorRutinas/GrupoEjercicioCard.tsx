"use client";

import type { ReactNode } from "react";

import {
  GrupoEjercicios,
} from "@/types/rutinas";

/* -------------------------------------------------------------------------- */
/* PROPS                                                                      */
/* -------------------------------------------------------------------------- */

type Props = {
  /* ------------------------------------------------------------------------ */
  /* DATOS                                                                     */
  /* ------------------------------------------------------------------------ */

  grupo: GrupoEjercicios;

  /* ------------------------------------------------------------------------ */
  /* CONTENIDO                                                                 */
  /* ------------------------------------------------------------------------ */

  children: ReactNode;

  /* ------------------------------------------------------------------------ */
  /* ACCIONES                                                                  */
  /* ------------------------------------------------------------------------ */

  onEliminar?: () => void;

  onMoverArriba?: () => void;

  onMoverAbajo?: () => void;
};

/* -------------------------------------------------------------------------- */
/* COMPONENTE                                                                 */
/* -------------------------------------------------------------------------- */

export default function GrupoEjercicioCard({
  grupo,
  children,
  onEliminar,
  onMoverArriba,
  onMoverAbajo,
}: Props) {
  return (
    <div
      className="
        border
        border-purple-300
        bg-purple-50
        rounded-2xl
        p-5
        flex
        flex-col
        gap-4
      "
    >
      {/* ---------------------------------------------------------- */}
      {/* HEADER                                                     */}
      {/* ---------------------------------------------------------- */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div>
          <h3
            className="
              font-bold
              text-purple-700
            "
          >
            Grupo
          </h3>

          <p
            className="
              text-xs
              text-purple-600
            "
          >
            {grupo.items.length} item(s)
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {onMoverArriba && (
            <button
              type="button"
              onClick={onMoverArriba}
              className="
                border
                px-3
                py-1
                rounded-lg
                bg-white
              "
            >
              ↑
            </button>
          )}

          {onMoverAbajo && (
            <button
              type="button"
              onClick={onMoverAbajo}
              className="
                border
                px-3
                py-1
                rounded-lg
                bg-white
              "
            >
              ↓
            </button>
          )}

          {onEliminar && (
            <button
              type="button"
              onClick={onEliminar}
              className="
                text-red-500
                text-sm
              "
            >
              Eliminar grupo
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* NOTAS DEL GRUPO                                            */}
      {/* ---------------------------------------------------------- */}

      {grupo.notas && (
        <div
          className="
            text-sm
            text-purple-800
            bg-white
            border
            rounded-xl
            p-3
          "
        >
          {grupo.notas}
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* CONTENIDO                                                  */}
      {/* ---------------------------------------------------------- */}

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >
        {children}
      </div>
    </div>
  );
}