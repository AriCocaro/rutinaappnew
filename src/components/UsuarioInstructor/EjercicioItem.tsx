import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import {
  ConfiguracionAvanzada,
} from "@/types/rutinas";

type Props = {

  ejercicioId: number;

  materialId: number;

  configuracion:
    ConfiguracionAvanzada;

  notas: string;

  seriesGlobales: number;

  repsGlobales: number;

  puedeSubir: boolean;

  puedeBajar: boolean;

  indiceSuperserie:
    number | null;

  onMoverArriba: () => void;

  onMoverAbajo: () => void;

  onToggleOverride: () => void;

  onConfiguracionChange: (

    campo:
      keyof ConfiguracionAvanzada,

    valor:
      | string
      | number
      | boolean
      | null

  ) => void;

  onNotasChange: (
    value: string
  ) => void;

  onEliminar: () => void;
};

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

  onToggleOverride,

  onConfiguracionChange,

  onNotasChange,

  onEliminar,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | DATA
  |--------------------------------------------------------------------------
  */

  const ejercicio =
    ejercicios.find(
      (item) =>
        item.id === ejercicioId
    );

  const material =
    materiales.find(
      (item) =>
        item.id === materialId
    );

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="border rounded-2xl p-5 bg-gray-50 flex flex-col gap-5">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="font-bold text-lg">
            {ejercicio?.nombre}
          </h3>

          <p className="text-sm text-gray-500">
            {material?.nombre}
          </p>

        </div>

        <div className="flex items-center gap-2">

          {puedeSubir && (

            <button
              onClick={onMoverArriba}
              className="border px-3 py-1 rounded-lg"
            >
              ↑
            </button>

          )}

          {puedeBajar && (

            <button
              onClick={onMoverAbajo}
              className="border px-3 py-1 rounded-lg"
            >
              ↓
            </button>

          )}

          <button
            onClick={onEliminar}
            className="text-red-500 text-sm"
          >
            Eliminar
          </button>

        </div>

      </div>

      {/* SUPERSERIE */}

      {indiceSuperserie && (

        <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl text-sm w-fit">

          Superserie #{indiceSuperserie}

        </div>

      )}

      {/* OVERRIDE */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"

          checked={
            configuracion.overrideActivo
          }

          onChange={onToggleOverride}
        />

        <span className="text-sm">
          Override activo
        </span>

      </div>

      {/* SERIES / REPS */}

      {configuracion.overrideActivo && (

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"

            placeholder={`Series (${seriesGlobales})`}

            value={
              configuracion.seriesOverride ??
              ""
            }

            onChange={(e) =>
              onConfiguracionChange(
                "seriesOverride",
                Number(e.target.value)
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"

            placeholder={`Reps (${repsGlobales})`}

            value={
              configuracion.repsOverride ??
              ""
            }

            onChange={(e) =>
              onConfiguracionChange(
                "repsOverride",
                Number(e.target.value)
              )
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

      )}

      {/* CONFIGURACIONES */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* RIR */}

        <input
          type="number"

          placeholder="RIR"

          value={
            configuracion.rir ??
            ""
          }

          onChange={(e) =>
            onConfiguracionChange(
              "rir",
              Number(e.target.value)
            )
          }

          className="border rounded-xl px-4 py-3"
        />

        {/* TEMPO */}

        <input
          type="text"

          placeholder="Tempo"

          value={
            configuracion.tempo ??
            ""
          }

          onChange={(e) =>
            onConfiguracionChange(
              "tempo",
              e.target.value
            )
          }

          className="border rounded-xl px-4 py-3"
        />

        {/* DESCANSO */}

        <input
          type="number"

          placeholder="Descanso"

          value={
            configuracion.descansoSegundos ??
            ""
          }

          onChange={(e) =>
            onConfiguracionChange(
              "descansoSegundos",
              Number(e.target.value)
            )
          }

          className="border rounded-xl px-4 py-3"
        />

        {/* TIMER */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              configuracion.usarTimer
            }

            onChange={(e) =>
              onConfiguracionChange(
                "usarTimer",
                e.target.checked
              )
            }
          />

          Timer

        </label>

      </div>

      {/* EXTRAS */}

      <div className="flex flex-wrap gap-5">

        {/* WARMUP */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              configuracion.warmup
            }

            onChange={(e) =>
              onConfiguracionChange(
                "warmup",
                e.target.checked
              )
            }
          />

          Warmup

        </label>

        {/* DROPSET */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              configuracion.dropset
            }

            onChange={(e) =>
              onConfiguracionChange(
                "dropset",
                e.target.checked
              )
            }
          />

          Dropset

        </label>

        {/* CLUSTER */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              configuracion.cluster
            }

            onChange={(e) =>
              onConfiguracionChange(
                "cluster",
                e.target.checked
              )
            }
          />

          Cluster

        </label>

      </div>

      {/* SUPERSERIES */}

      <div className="flex flex-col gap-2">

        <span className="text-sm font-medium">
          Superserie
        </span>

        <div className="flex gap-2">

          <button
            onClick={() =>
              onConfiguracionChange(
                "superserieId",
                1
              )
            }
            className="border px-3 py-2 rounded-xl text-sm"
          >
            SS1
          </button>

          <button
            onClick={() =>
              onConfiguracionChange(
                "superserieId",
                2
              )
            }
            className="border px-3 py-2 rounded-xl text-sm"
          >
            SS2
          </button>

          <button
            onClick={() =>
              onConfiguracionChange(
                "superserieId",
                null
              )
            }
            className="border px-3 py-2 rounded-xl text-sm"
          >
            Quitar
          </button>

        </div>

      </div>

      {/* NOTAS */}

      <textarea

        value={notas}

        onChange={(e) =>
          onNotasChange(
            e.target.value
          )
        }

        placeholder="Notas..."

        className="border rounded-2xl px-4 py-3 min-h-[100px]"
      />

    </div>
  );
}