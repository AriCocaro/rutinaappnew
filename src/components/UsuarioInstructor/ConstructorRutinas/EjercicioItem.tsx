"use client";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import FormConfigEjercicio from "./FormConfigEjercicio";

import {
  ConfiguracionAvanzada,
  OverrideProgresion,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
|
| Este componente es SOLO una “caja contenedora visual + acciones”.
| No debería contener lógica de negocio.
|
*/

type Props = {
  ejercicioId: number;
  materialId: number;

  configuracion: ConfiguracionAvanzada;
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
  | ORDEN
  |--------------------------------------------------------------------------
  */
  puedeSubir: boolean;
  puedeBajar: boolean;

  /*
  |--------------------------------------------------------------------------
  | SUPERSERIES
  |--------------------------------------------------------------------------
  */
  indiceSuperserie: number | null;

  /*
  |--------------------------------------------------------------------------
  | ACCIONES
  |--------------------------------------------------------------------------
  */
  onMoverArriba: () => void;
  onMoverAbajo: () => void;
  onEliminar: () => void;

  onToggleOverride: () => void;

  onConfiguracionChange: (
    campo: keyof ConfiguracionAvanzada,
    valor:
      | string
      | number
      | boolean
      | null
      | OverrideProgresion[]
  ) => void;

  onNotasChange: (value: string) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function EjercicioItem({
  ejercicioId,
  materialId,
  configuracion,
  notas,
  seriesGlobales,
  repsGlobales,
  puedeSubir,
  puedeBajar,
  indiceSuperserie,
  onMoverArriba,
  onMoverAbajo,
  onEliminar,
  onToggleOverride,
  onConfiguracionChange,
  onNotasChange,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | RESOLUCIÓN DE DATOS
  |--------------------------------------------------------------------------
  |
  | Convertimos IDs en objetos legibles.
  | IMPORTANTE: siempre proteger undefined.
  |
  */

  const ejercicio = ejercicios.find(
    (item) => item.id === ejercicioId
  );

  const material = materiales.find(
    (item) => item.id === materialId
  );

  /*
  |--------------------------------------------------------------------------
  | UI FALLBACK (IMPORTANTE)
  |--------------------------------------------------------------------------
  */

  if (!ejercicio) {
    return (
      <div className="border rounded-xl p-4 bg-red-50 text-red-600">
        Ejercicio no encontrado (ID: {ejercicioId})
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="border rounded-2xl p-5 bg-gray-50 flex flex-col gap-5">

      {/* =========================================================== */}
      {/* HEADER */}
      {/* =========================================================== */}

      <div className="flex items-start justify-between gap-4">

        {/* INFO PRINCIPAL */}
        <div>
          <h3 className="font-bold text-lg">
            {ejercicio.nombre}
          </h3>

          <p className="text-sm text-gray-500">
            {material?.nombre ?? "Sin material"}
          </p>
        </div>

        {/* ACCIONES DE ORDEN */}
        <div className="flex items-center gap-2">

          {puedeSubir && (
            <button
              type="button"
              onClick={onMoverArriba}
              className="border px-3 py-1 rounded-lg"
            >
              ↑
            </button>
          )}

          {puedeBajar && (
            <button
              type="button"
              onClick={onMoverAbajo}
              className="border px-3 py-1 rounded-lg"
            >
              ↓
            </button>
          )}

          <button
            type="button"
            onClick={onEliminar}
            className="text-red-500 text-sm"
          >
            Eliminar
          </button>

        </div>
      </div>

      {/* =========================================================== */}
      {/* INDICADOR SUPERSERIE */}
      {/* =========================================================== */}

      {indiceSuperserie !== null && (
        <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl text-sm w-fit">
          Superserie #{indiceSuperserie}
        </div>
      )}

      {/* =========================================================== */}
      {/* CONFIGURACIÓN COMPLETA */}
      {/* =========================================================== */}

      <FormConfigEjercicio
        configuracion={configuracion}
        notas={notas}
        seriesGlobales={seriesGlobales}
        repsGlobales={repsGlobales}
        onToggleOverride={onToggleOverride}
        onConfiguracionChange={onConfiguracionChange}
        onNotasChange={onNotasChange}
      />

    </div>
  );
}