"use client";

import { useState } from "react";

import ejercicios from "@/data/ejercicios.json";

import materiales from "@/data/materiales.json";

import posturas from "@/data/postura.json";

import movimientos from "@/data/movimientos.json";

import gruposMusculares from "@/data/gruposMusculares.json";

import NuevoEjercicioModal from "@/components/ejercicios/NuevoEjercicioModal";

/*
|--------------------------------------------------------------------------
| PÁGINA EJERCICIOS
|--------------------------------------------------------------------------
*/

export default function EjerciciosPage() {

  /*
  |--------------------------------------------------------------------------
  | ESTADO MODAL
  |--------------------------------------------------------------------------
  */

  const [modalAbierto, setModalAbierto] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | FUNCIONES AUXILIARES
  |--------------------------------------------------------------------------
  */

  function obtenerPostura(posturaId: number) {

    return posturas.find(
      (postura) => postura.id === posturaId
    )?.nombre;
  }

  function obtenerMovimiento(movimientoId: number) {

    return movimientos.find(
      (movimiento) =>
        movimiento.id === movimientoId
    )?.nombre;
  }

  function obtenerMateriales(ids: number[]) {

    return materiales
      .filter((material) =>
        ids.includes(material.id)
      )
      .map((material) => material.nombre)
      .join(", ");
  }

  function obtenerGruposMusculares(
    ids: number[]
  ) {

    return gruposMusculares
      .filter((grupo) =>
        ids.includes(grupo.id)
      )
      .map((grupo) => grupo.nombre)
      .join(", ");
  }

  return (

    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Ejercicios
          </h1>

          <p className="text-gray-500">
            Catálogo general del gimnasio
          </p>

        </div>

        {/* BOTÓN NUEVO */}

        <button
          onClick={() =>
            setModalAbierto(true)
          }

          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Nuevo ejercicio
        </button>

      </div>

      {/* LISTADO */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {ejercicios.map((ejercicio) => (

          <div
            key={ejercicio.id}
            className="bg-white border rounded-xl p-5 flex flex-col gap-4"
          >

            {/* TÍTULO */}

            <div>

              <h2 className="text-xl font-bold">
                {ejercicio.nombre}
              </h2>

              <p className="text-sm text-gray-500">
                {ejercicio.descripcion}
              </p>

            </div>

            {/* INFO */}

            <div className="flex flex-col gap-2 text-sm">

              <div>

                <span className="font-semibold">
                  Postura:
                </span>{" "}

                {obtenerPostura(
                  ejercicio.posturaId
                )}

              </div>

              <div>

                <span className="font-semibold">
                  Movimiento:
                </span>{" "}

                {obtenerMovimiento(
                  ejercicio.movimientoId
                )}

              </div>

              <div>

                <span className="font-semibold">
                  Grupos musculares:
                </span>{" "}

                {obtenerGruposMusculares(
                  ejercicio.gruposMuscularesIds
                )}

              </div>

              <div>

                <span className="font-semibold">
                  Materiales:
                </span>{" "}

                {obtenerMateriales(
                  ejercicio.materialesIds
                )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between pt-2">

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  ejercicio.activo
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ejercicio.activo
                  ? "Activo"
                  : "Inactivo"}
              </span>

              <button className="text-blue-500 text-sm">
                Editar
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {modalAbierto && (

        <NuevoEjercicioModal
          onClose={() =>
            setModalAbierto(false)
          }
        />

      )}

    </div>
  );
}