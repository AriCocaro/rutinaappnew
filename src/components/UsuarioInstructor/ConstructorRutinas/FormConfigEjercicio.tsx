import {
  ConfiguracionAvanzada,
  OverrideProgresion,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  configuracion: ConfiguracionAvanzada;

  notas: string;

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  |
  | Se utiliza como base cuando se crean
  | bloques personalizados.
  |
  */

  seriesGlobales: number;

  repsGlobales: number;

  /*
  |--------------------------------------------------------------------------
  | ACCIONES
  |--------------------------------------------------------------------------
  */

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

  onNotasChange: (
    value: string
  ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function FormConfigEjercicio({
  configuracion,
  notas,
  seriesGlobales,
  repsGlobales,
  onToggleOverride,
  onConfiguracionChange,
  onNotasChange,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | OVERRIDE DE PROGRESIÓN
  |--------------------------------------------------------------------------
  */

  function agregarBloqueOverride() {

    const nuevoBloque: OverrideProgresion = {

      bloque:
        configuracion
          .overrideProgresiones
          .length + 1,

      series:
        seriesGlobales,

      reps:
        repsGlobales,

      descansoSegundos:
        null,
    };

    onConfiguracionChange(
      "overrideProgresiones",
      [
        ...configuracion.overrideProgresiones,
        nuevoBloque,
      ]
    );
  }

  function actualizarBloque(
    index: number,
    campo: keyof OverrideProgresion,
    valor: number | null
  ) {

    const nuevasProgresiones =
      configuracion.overrideProgresiones.map(
        (bloque, i) => {

          if (i !== index) {
            return bloque;
          }

          return {
            ...bloque,
            [campo]: valor,
          };
        }
      );

    onConfiguracionChange(
      "overrideProgresiones",
      nuevasProgresiones
    );
  }

  function eliminarBloque(
    index: number
  ) {

    const nuevasProgresiones =
      configuracion.overrideProgresiones.filter(
        (_, i) =>
          i !== index
      );

    onConfiguracionChange(
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

    <div className="flex flex-col gap-5">

      {/* ---------------------------------------------------------- */}
      {/* OVERRIDE */}
      {/* ---------------------------------------------------------- */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={
            configuracion.overrideActivo
          }
          onChange={
            onToggleOverride
          }
        />

        <span className="text-sm font-medium">
          Progresión personalizada
        </span>

      </div>

      {/* ---------------------------------------------------------- */}
      {/* BLOQUES PERSONALIZADOS */}
      {/* ---------------------------------------------------------- */}

      {configuracion.overrideActivo && (

        <div className="border rounded-xl p-4 flex flex-col gap-4">

          <div className="flex items-center justify-between">

            <h4 className="font-semibold">
              Bloques Override
            </h4>

            <button
              type="button"
              onClick={
                agregarBloqueOverride
              }
              className="
                bg-blue-600
                text-white
                px-3
                py-2
                rounded-lg
                text-sm
              "
            >
              + Bloque
            </button>

          </div>

          {configuracion.overrideProgresiones.map(
            (
              bloque,
              index
            ) => (

              <div
                key={index}
                className="
                  grid
                  grid-cols-5
                  gap-3
                  items-center
                "
              >

                {/* BLOQUE */}

                <input
                  type="number"
                  value={bloque.bloque}
                  onChange={(e) =>
                    actualizarBloque(
                      index,
                      "bloque",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                  placeholder="Bloque"
                />

                {/* SERIES */}

                <input
                  type="number"
                  value={bloque.series}
                  onChange={(e) =>
                    actualizarBloque(
                      index,
                      "series",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                  placeholder="Series"
                />

                {/* REPS */}

                <input
                  type="number"
                  value={bloque.reps}
                  onChange={(e) =>
                    actualizarBloque(
                      index,
                      "reps",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                  placeholder="Reps"
                />

                {/* DESCANSO */}

                <input
                  type="number"
                  value={
                    bloque.descansoSegundos ?? ""
                  }
                  onChange={(e) =>
                    actualizarBloque(
                      index,
                      "descansoSegundos",
                      e.target.value === ""
                        ? null
                        : Number(
                            e.target.value
                          )
                    )
                  }
                  className="border rounded-xl px-3 py-2"
                  placeholder="Descanso"
                />

                {/* ELIMINAR */}

                <button
                  type="button"
                  onClick={() =>
                    eliminarBloque(index)
                  }
                  className="
                    text-red-500
                    text-sm
                  "
                >
                  Eliminar
                </button>

              </div>
            )
          )}

        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* CONFIGURACIÓN GENERAL */}
      {/* ---------------------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* RIR */}

        <input
          type="number"
          placeholder="RIR"
          value={
            configuracion.rir ?? ""
          }
          onChange={(e) =>
            onConfiguracionChange(
              "rir",
              e.target.value === ""
                ? null
                : Number(
                    e.target.value
                  )
            )
          }
          className="border rounded-xl px-4 py-3"
        />

        {/* TEMPO */}

        <input
          type="text"
          placeholder="Tempo"
          value={
            configuracion.tempo ?? ""
          }
          onChange={(e) =>
            onConfiguracionChange(
              "tempo",
              e.target.value === ""
                ? null
                : e.target.value
            )
          }
          className="border rounded-xl px-4 py-3"
        />

        {/* DESCANSO */}

        <input
          type="number"
          placeholder="Descanso (seg)"
          value={
            configuracion.descansoSegundos ?? ""
          }
          onChange={(e) =>
            onConfiguracionChange(
              "descansoSegundos",
              e.target.value === ""
                ? null
                : Number(
                    e.target.value
                  )
            )
          }
          className="border rounded-xl px-4 py-3"
        />

      </div>

      {/* ---------------------------------------------------------- */}
      {/* TÉCNICAS */}
      {/* ---------------------------------------------------------- */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <label className="flex items-center gap-2">
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
          Warm Up
        </label>

        <label className="flex items-center gap-2">
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
          Drop Set
        </label>

        <label className="flex items-center gap-2">
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

        <label className="flex items-center gap-2">
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
          Usar Timer
        </label>

      </div>

      {/* ---------------------------------------------------------- */}
      {/* SUPERSERIES */}
      {/* ---------------------------------------------------------- */}

      <div className="flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() =>
            onConfiguracionChange(
              "superserieId",
              1
            )
          }
          className="border px-3 py-2 rounded-xl"
        >
          SS1
        </button>

        <button
          type="button"
          onClick={() =>
            onConfiguracionChange(
              "superserieId",
              2
            )
          }
          className="border px-3 py-2 rounded-xl"
        >
          SS2
        </button>

        <button
          type="button"
          onClick={() =>
            onConfiguracionChange(
              "superserieId",
              null
            )
          }
          className="border px-3 py-2 rounded-xl"
        >
          Quitar
        </button>

      </div>

      {/* ---------------------------------------------------------- */}
      {/* NOTAS */}
      {/* ---------------------------------------------------------- */}

      <textarea
        value={notas}
        onChange={(e) =>
          onNotasChange(
            e.target.value
          )
        }
        placeholder="Notas del entrenador..."
        className="
          border
          rounded-2xl
          px-4
          py-3
          min-h-[120px]
        "
      />

    </div>
  );
}