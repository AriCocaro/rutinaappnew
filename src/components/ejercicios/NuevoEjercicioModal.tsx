"use client";

import { useState } from "react";

import materiales from "@/data/materiales.json";

import posturas from "@/data/postura.json";

import movimientos from "@/data/movimientos.json";

import gruposMusculares from "@/data/gruposMusculares.json";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  onClose: () => void;
};

/*
|--------------------------------------------------------------------------
| MODAL NUEVO EJERCICIO
|--------------------------------------------------------------------------
*/

export default function NuevoEjercicioModal({
  onClose,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | ESTADOS
  |--------------------------------------------------------------------------
  */

  const [nombre, setNombre] = useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [posturaId, setPosturaId] =
    useState(1);

  const [movimientoId, setMovimientoId] =
    useState(1);

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 flex flex-col gap-6">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Nuevo ejercicio
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>

        </div>

        {/* FORMULARIO */}

        <div className="flex flex-col gap-4">

          {/* NOMBRE */}

          <input
            type="text"

            placeholder="Nombre ejercicio"

            value={nombre}

            onChange={(e) =>
              setNombre(e.target.value)
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* DESCRIPCIÓN */}

          <textarea
            placeholder="Descripción"

            value={descripcion}

            onChange={(e) =>
              setDescripcion(e.target.value)
            }

            className="border rounded-lg px-4 py-3 min-h-28"
          />

          {/* POSTURA */}

          <select
            value={posturaId}

            onChange={(e) =>
              setPosturaId(
                Number(e.target.value)
              )
            }

            className="border rounded-lg px-4 py-3"
          >

            {posturas.map((postura) => (

              <option
                key={postura.id}
                value={postura.id}
              >
                {postura.nombre}
              </option>

            ))}

          </select>

          {/* MOVIMIENTO */}

          <select
            value={movimientoId}

            onChange={(e) =>
              setMovimientoId(
                Number(e.target.value)
              )
            }

            className="border rounded-lg px-4 py-3"
          >

            {movimientos.map((movimiento) => (

              <option
                key={movimiento.id}
                value={movimiento.id}
              >
                {movimiento.nombre}
              </option>

            ))}

          </select>

          {/* GRUPOS MUSCULARES */}

          <div className="flex flex-col gap-2">

            <p className="font-semibold">
              Grupos musculares
            </p>

            <div className="grid grid-cols-2 gap-2">

              {gruposMusculares.map((grupo) => (

                <label
                  key={grupo.id}
                  className="flex items-center gap-2"
                >

                  <input type="checkbox" />

                  {grupo.nombre}

                </label>

              ))}

            </div>

          </div>

          {/* MATERIALES */}

          <div className="flex flex-col gap-2">

            <p className="font-semibold">
              Materiales habilitados
            </p>

            <div className="grid grid-cols-2 gap-2">

              {materiales.map((material) => (

                <label
                  key={material.id}
                  className="flex items-center gap-2"
                >

                  <input type="checkbox" />

                  {material.nombre}

                </label>

              ))}

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Guardar ejercicio
          </button>

        </div>

      </div>

    </div>
  );
}
