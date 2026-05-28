"use client";

import ejercicios from "@/data/ejercicios.json";

import materiales from "@/data/materiales.json";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Props = {

  ejercicioId: number;

  materialId: number;

  overrideActivo: boolean;

  seriesOverride: number | null;

  repsOverride: number | null;

  notas: string;

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  seriesGlobales: number;

  repsGlobales: number;

  /*
  |--------------------------------------------------------------------------
  | CALLBACKS
  |--------------------------------------------------------------------------
  */

  onToggleOverride: () => void;

  onSeriesChange: (
    value: number
  ) => void;

  onRepsChange: (
    value: number
  ) => void;

  onNotasChange: (
    value: string
  ) => void;

  onEliminar: () => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function EjercicioItem({

  ejercicioId,

  materialId,

  overrideActivo,

  seriesOverride,

  repsOverride,

  notas,

  seriesGlobales,

  repsGlobales,

  onToggleOverride,

  onSeriesChange,

  onRepsChange,

  onNotasChange,

  onEliminar,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | EJERCICIO
  |--------------------------------------------------------------------------
  */

  const ejercicio = ejercicios.find(
    (item) => item.id === ejercicioId
  );

  /*
  |--------------------------------------------------------------------------
  | MATERIAL
  |--------------------------------------------------------------------------
  */

  const material = materiales.find(
    (item) => item.id === materialId
  );

  if (!ejercicio) return null;

  return (

    <div className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-4">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-semibold text-lg">

            {ejercicio.nombre}

            {" con "}

            {material?.nombre}

          </h3>

          <p className="text-sm text-gray-500">

            {ejercicio.descripcion}

          </p>

        </div>

        <button
          onClick={onEliminar}
          className="text-red-500 text-sm"
        >
          Eliminar
        </button>

      </div>

      {/* OVERRIDE */}

      <div className="border-t pt-4 flex flex-col gap-4">

        {/* CONFIGURACIÓN ACTUAL */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* SERIES */}

          <div className="border rounded-lg px-4 py-3 bg-white">

            <p className="text-xs text-gray-500">
              Series
            </p>

            <p className="font-semibold">

              {overrideActivo
                ? seriesOverride
                : seriesGlobales}

            </p>

          </div>

          {/* REPS */}

          <div className="border rounded-lg px-4 py-3 bg-white">

            <p className="text-xs text-gray-500">
              Repeticiones
            </p>

            <p className="font-semibold">

              {overrideActivo
                ? repsOverride
                : repsGlobales}

            </p>

          </div>

        </div>

        {/* ACTIVAR OVERRIDE */}

        <label className="flex items-center gap-2">

          <input
            type="checkbox"

            checked={overrideActivo}

            onChange={onToggleOverride}
          />

          <span className="font-medium">
            Activar override
          </span>

        </label>

        {/* OVERRIDE EDITABLE */}

        {overrideActivo && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* SERIES */}

            <input
              type="number"

              placeholder="Series"

              value={
                seriesOverride ?? ""
              }

              onChange={(e) =>
                onSeriesChange(
                  Number(e.target.value)
                )
              }

              className="border rounded-lg px-4 py-3 bg-white"
            />

            {/* REPS */}

            <input
              type="number"

              placeholder="Repeticiones"

              value={
                repsOverride ?? ""
              }

              onChange={(e) =>
                onRepsChange(
                  Number(e.target.value)
                )
              }

              className="border rounded-lg px-4 py-3 bg-white"
            />

          </div>

        )}

        {/* NOTAS */}

        <textarea
          placeholder="Notas del ejercicio"

          value={notas}

          onChange={(e) =>
            onNotasChange(
              e.target.value
            )
          }

          className="border rounded-lg px-4 py-3 bg-white min-h-24"
        />

      </div>

    </div>
  );
}