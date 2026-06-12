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
| Componente visual de un ejercicio.
|
| Responsabilidades:
|
| - Mostrar ejercicio
| - Mostrar material
| - Mostrar acciones
| - Mostrar configuración
|
| No contiene lógica de negocio.
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
  | ESTRUCTURA DE BLOQUES
  |--------------------------------------------------------------------------
  */

  cantidadBloques: number;

  /*
  |--------------------------------------------------------------------------
  | ORDEN
  |--------------------------------------------------------------------------
  */

  puedeSubir: boolean;

  puedeBajar: boolean;

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
  cantidadBloques,
  puedeSubir,
  puedeBajar,
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
  */

  const ejercicio = ejercicios.find(
    (item) => item.id === ejercicioId
  );

  const material = materiales.find(
    (item) => item.id === materialId
  );

  /*
  |--------------------------------------------------------------------------
  | FALLBACK
  |--------------------------------------------------------------------------
  */

  if (!ejercicio) {
    return (
      <div
        className="
          border
          rounded-xl
          p-4
          bg-red-50
          text-red-600
        "
      >
        Ejercicio no encontrado
        (ID: {ejercicioId})
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        border
        rounded-2xl
        p-5
        bg-gray-50
        flex
        flex-col
        gap-5
      "
    >
      {/* ---------------------------------------------------------- */}
      {/* HEADER */}
      {/* ---------------------------------------------------------- */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        {/* INFO */}

        <div>
          <h3
            className="
              font-bold
              text-lg
            "
          >
            {ejercicio.nombre}
          </h3>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {material?.nombre ?? "Sin material"}
          </p>
        </div>

        {/* ACCIONES */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {puedeSubir && (
            <button
              type="button"
              onClick={onMoverArriba}
              className="
                border
                px-3
                py-1
                rounded-lg
              "
            >
              ↑
            </button>
          )}

          {puedeBajar && (
            <button
              type="button"
              onClick={onMoverAbajo}
              className="
                border
                px-3
                py-1
                rounded-lg
              "
            >
              ↓
            </button>
          )}

          <button
            type="button"
            onClick={onEliminar}
            className="
              text-red-500
              text-sm
            "
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* CONFIGURACIÓN */}
      {/* ---------------------------------------------------------- */}

      <FormConfigEjercicio
        cantidadBloques={cantidadBloques}
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