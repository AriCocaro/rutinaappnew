import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import SearchSelect from "@/components/ui/SearchSelect";

import {
  EjercicioDraft,
  ConfiguracionAvanzada,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  draft: EjercicioDraft;

  actualizarDraft: (

    campo:
      keyof EjercicioDraft,

    valor:
      | string
      | number

  ) => void;

  actualizarDraftConfig: (

    campo:
      keyof ConfiguracionAvanzada,

    valor:
      | string
      | number
      | boolean
      | null

  ) => void;

  actualizarDraftNotas: (
    notas: string
  ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ConfiguradorEjercicio({

  draft,

  actualizarDraft,

  actualizarDraftConfig,

  actualizarDraftNotas,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | EJERCICIO ACTUAL
  |--------------------------------------------------------------------------
  */

  const ejercicioActual =
    ejercicios.find(
      (ejercicio) =>

        ejercicio.id ===
        draft.ejercicioId
    );

  /*
  |--------------------------------------------------------------------------
  | MATERIALES DISPONIBLES
  |--------------------------------------------------------------------------
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

    <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

      <div>

        <h2 className="text-xl font-bold">
          Configurar ejercicio
        </h2>

        <p className="text-gray-500 text-sm">
          El ejercicio se configura antes de agregarlo
        </p>

      </div>

      {/* SELECTORES */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* EJERCICIO */}

        <SearchSelect

          options={ejercicios.map(
            (ejercicio) => ({
              id: ejercicio.id,

              nombre:
                ejercicio.nombre,
            })
          )}

          selectedId={
            draft.ejercicioId
          }

          onSelect={(id) =>
            actualizarDraft(
              "ejercicioId",
              Number(id)
            )
          }

          placeholder="Buscar ejercicio..."
        />

        {/* MATERIAL */}

        <SearchSelect

          options={materialesDisponibles.map(
            (material) => ({
              id: material.id,

              nombre:
                material.nombre,
            })
          )}

          selectedId={
            draft.materialId
          }

          onSelect={(id) =>
            actualizarDraft(
              "materialId",
              Number(id)
            )
          }

          placeholder="Buscar material..."
        />

      </div>

      {/* OVERRIDE */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"

          checked={
            draft.configuracion.overrideActivo
          }

          onChange={(e) =>
            actualizarDraftConfig(
              "overrideActivo",
              e.target.checked
            )
          }
        />

        <span className="text-sm">
          Override activo
        </span>

      </div>

      {/* SERIES / REPS */}

      {draft.configuracion.overrideActivo && (

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"

            placeholder="Series"

            value={
              draft.configuracion.seriesOverride ??
              ""
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "seriesOverride",
                Number(e.target.value)
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"

            placeholder="Repeticiones"

            value={
              draft.configuracion.repsOverride ??
              ""
            }

            onChange={(e) =>
              actualizarDraftConfig(
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
            draft.configuracion.rir ??
            ""
          }

          onChange={(e) =>
            actualizarDraftConfig(
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
            draft.configuracion.tempo ??
            ""
          }

          onChange={(e) =>
            actualizarDraftConfig(
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
            draft.configuracion.descansoSegundos ??
            ""
          }

          onChange={(e) =>
            actualizarDraftConfig(
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
              draft.configuracion.usarTimer
            }

            onChange={(e) =>
              actualizarDraftConfig(
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

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              draft.configuracion.warmup
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "warmup",
                e.target.checked
              )
            }
          />

          Warmup

        </label>

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              draft.configuracion.dropset
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "dropset",
                e.target.checked
              )
            }
          />

          Dropset

        </label>

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"

            checked={
              draft.configuracion.cluster
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "cluster",
                e.target.checked
              )
            }
          />

          Cluster

        </label>

      </div>

      {/* NOTAS */}

      <textarea

        placeholder="Notas..."

        value={draft.notas}

        onChange={(e) =>
          actualizarDraftNotas(
            e.target.value
          )
        }

        className="border rounded-2xl px-4 py-3 min-h-[120px]"
      />

    </div>
  );
}