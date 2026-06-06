import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import SearchSelect from "@/components/ui/SearchSelect";

import {
  EjercicioDraft,
  ConfiguracionAvanzada,
  OverrideProgresion,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  draft: EjercicioDraft;

  actualizarDraft: (
    campo: keyof EjercicioDraft,
    valor: string | number
  ) => void;

  actualizarDraftConfig: (
    campo: keyof ConfiguracionAvanzada,
    valor:
      | string
      | number
      | boolean
      | null
      | OverrideProgresion[]
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
  | EJERCICIO SELECCIONADO
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
  | AGREGAR OVERRIDE
  |--------------------------------------------------------------------------
  */

  function agregarOverrideBloque() {
    const siguienteBloque =
      draft.configuracion
        .overrideProgresiones
        .length + 1;

    const nuevoOverride:
      OverrideProgresion = {
        bloque:
          siguienteBloque,

        series: 0,

        reps: 0,

        descansoSegundos:
          null,
      };

    actualizarDraftConfig(
      "overrideProgresiones",
      [
        ...draft.configuracion
          .overrideProgresiones,

        nuevoOverride,
      ]
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR OVERRIDE
  |--------------------------------------------------------------------------
  */

  function actualizarOverride(
    index: number,
    campo: keyof OverrideProgresion,
    valor: number
  ) {
    const nuevasProgresiones =
      draft.configuracion
        .overrideProgresiones
        .map(
          (
            progresion,
            i
          ) => {
            if (
              i !== index
            ) {
              return progresion;
            }

            return {
              ...progresion,
              [campo]:
                valor,
            };
          }
        );

    actualizarDraftConfig(
      "overrideProgresiones",
      nuevasProgresiones
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR OVERRIDE
  |--------------------------------------------------------------------------
  */

  function eliminarOverride(
    index: number
  ) {
    const nuevasProgresiones =
      draft.configuracion
        .overrideProgresiones
        .filter(
          (_, i) =>
            i !== index
        );

    actualizarDraftConfig(
      "overrideProgresiones",
      nuevasProgresiones
    );
  }

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

      {/* EJERCICIO Y MATERIAL */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchSelect
          options={ejercicios.map(
            (ejercicio) => ({
              id:
                ejercicio.id,

              nombre:
                ejercicio.nombre,
            })
          )}
          selectedId={String(
            draft.ejercicioId ||
              ""
          )}
          onSelect={(id) => {
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

        <SearchSelect
          options={materialesDisponibles.map(
            (material) => ({
              id:
                material.id,

              nombre:
                material.nombre,
            })
          )}
          selectedId={String(
            draft.materialId ||
              ""
          )}
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
            draft.configuracion
              .overrideActivo
          }
          onChange={(e) =>
            actualizarDraftConfig(
              "overrideActivo",
              e.target.checked
            )
          }
        />

        <span className="text-sm">
          Override de progresión
        </span>
      </div>

      {/* PROGRESIÓN PERSONALIZADA */}

      {draft.configuracion
        .overrideActivo && (
        <div className="flex flex-col gap-4 border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Progresión personalizada
            </h3>

            <button
              type="button"
              onClick={
                agregarOverrideBloque
              }
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
            >
              + Bloque
            </button>
          </div>

          {draft.configuracion
            .overrideProgresiones
            .map(
              (
                bloque,
                index
              ) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-3 items-center"
                >
                  <input
                    type="number"
                    value={
                      bloque.bloque
                    }
                    onChange={(e) =>
                      actualizarOverride(
                        index,
                        "bloque",
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="border rounded-xl px-3 py-2"
                    placeholder="Bloque"
                  />

                  <input
                    type="number"
                    value={
                      bloque.series
                    }
                    onChange={(e) =>
                      actualizarOverride(
                        index,
                        "series",
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="border rounded-xl px-3 py-2"
                    placeholder="Series"
                  />

                  <input
                    type="number"
                    value={
                      bloque.reps
                    }
                    onChange={(e) =>
                      actualizarOverride(
                        index,
                        "reps",
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="border rounded-xl px-3 py-2"
                    placeholder="Reps"
                  />

                  <input
                    type="number"
                    value={
                      bloque.descansoSegundos ??
                      ""
                    }
                    onChange={(e) =>
                      actualizarOverride(
                        index,
                        "descansoSegundos",
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="border rounded-xl px-3 py-2"
                    placeholder="Descanso"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      eliminarOverride(
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              )
            )}
        </div>
      )}

      {/* CONFIGURACIÓN */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="number"
          placeholder="RIR"
          value={
            draft.configuracion
              .rir ?? ""
          }
          onChange={(e) =>
            actualizarDraftConfig(
              "rir",
              e.target.value ===
                ""
                ? null
                : Number(
                    e.target
                      .value
                  )
            )
          }
          className="border rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Tempo"
          value={
            draft.configuracion
              .tempo ?? ""
          }
          onChange={(e) =>
            actualizarDraftConfig(
              "tempo",
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-3"
        />

        <input
          type="number"
          placeholder="Descanso"
          value={
            draft.configuracion
              .descansoSegundos ??
            ""
          }
          onChange={(e) =>
            actualizarDraftConfig(
              "descansoSegundos",
              e.target.value ===
                ""
                ? null
                : Number(
                    e.target
                      .value
                  )
            )
          }
          className="border rounded-xl px-4 py-3"
        />
      </div>

      {/* TÉCNICAS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              draft.configuracion
                .warmup
            }
            onChange={(e) =>
              actualizarDraftConfig(
                "warmup",
                e.target.checked
              )
            }
          />
          Warm Up
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              draft.configuracion
                .dropset
            }
            onChange={(e) =>
              actualizarDraftConfig(
                "dropset",
                e.target.checked
              )
            }
          />
          Drop Set
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              draft.configuracion
                .cluster
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              draft.configuracion
                .usarTimer
            }
            onChange={(e) =>
              actualizarDraftConfig(
                "usarTimer",
                e.target.checked
              )
            }
          />
          Usar timer
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