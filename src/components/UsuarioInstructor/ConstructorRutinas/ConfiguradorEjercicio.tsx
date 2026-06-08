"use client";

/*
|--------------------------------------------------------------------------
| DATA
|--------------------------------------------------------------------------
*/

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

import SearchSelect from "@/components/ui/SearchSelect";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  EjercicioDraft,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
|
| Este componente solamente se encarga de:
|
| - Seleccionar ejercicio
| - Seleccionar material
| - Agregar el ejercicio al entrenamiento
|
| La configuración avanzada vive en:
|
| FormConfigEjercicio
|
*/

type Props = {
  draft: EjercicioDraft;

  actualizarDraft: (
    campo: keyof EjercicioDraft,
    valor: string | number
  ) => void;

  onAgregar: () => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ConfiguradorEjercicio({
  draft,
  actualizarDraft,
  onAgregar,
}: Props) {
  /*
  |--------------------------------------------------------------------------
  | EJERCICIO ACTUAL
  |--------------------------------------------------------------------------
  */

  const ejercicioActual =
    ejercicios.find(
      (ejercicio) =>
        ejercicio.id === draft.ejercicioId
    );

  /*
  |--------------------------------------------------------------------------
  | MATERIALES COMPATIBLES
  |--------------------------------------------------------------------------
  |
  | Sólo se muestran los materiales
  | permitidos para el ejercicio seleccionado.
  |
  */

  const materialesDisponibles =
    materiales.filter(
      (material) =>
        ejercicioActual?.materialesIds.includes(
          material.id
        )
    );

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
        bg-white
        flex
        flex-col
        gap-5
      "
    >
      {/* ------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------ */}

      <div>
        <h2 className="text-xl font-bold">
          Configurar ejercicio
        </h2>

        <p className="text-sm text-gray-500">
          Seleccionar ejercicio y material.
        </p>
      </div>

      {/* ------------------------------------------------------ */}
      {/* EJERCICIO + MATERIAL */}
      {/* ------------------------------------------------------ */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        {/* EJERCICIO */}

        <SearchSelect
          options={ejercicios.map(
            (ejercicio) => ({
              id: ejercicio.id,
              nombre: ejercicio.nombre,
            })
          )}
          selectedId={draft.ejercicioId}
          onSelect={(id) => {
            /*
            |------------------------------------------------------
            | CAMBIO DE EJERCICIO
            |------------------------------------------------------
            |
            | Reinicia el material para evitar
            | combinaciones incompatibles.
            |
            */

            actualizarDraft(
              "ejercicioId",
              Number(id)
            );

            actualizarDraft(
              "materialId",
              0
            );
          }}
          placeholder="Buscar ejercicio..."
        />

        {/* MATERIAL */}

        <SearchSelect
          options={materialesDisponibles.map(
            (material) => ({
              id: material.id,
              nombre: material.nombre,
            })
          )}
          selectedId={draft.materialId}
          onSelect={(id) => {
            actualizarDraft(
              "materialId",
              Number(id)
            );
          }}
          placeholder="Buscar material..."
        />
      </div>

      {/* ------------------------------------------------------ */}
      {/* AGREGAR EJERCICIO */}
      {/* ------------------------------------------------------ */}

      <button
        type="button"
        onClick={onAgregar}
        className="
          bg-blue-600
          text-white
          rounded-xl
          px-4
          py-3
        "
      >
        Agregar ejercicio
      </button>
    </div>
  );
}