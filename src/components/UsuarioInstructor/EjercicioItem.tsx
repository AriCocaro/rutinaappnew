import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

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

  ejercicioId: number;

  materialId: number;

  configuracion:
    ConfiguracionAvanzada;

  notas: string;

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  |
  | Más adelante probablemente llegue
  | un array completo de bloques.
  |
  */

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
      | OverrideProgresion[]

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
  | OVERRIDE
  |--------------------------------------------------------------------------
  */

  function agregarBloqueOverride() {

    const siguienteBloque =

      configuracion
        .overrideProgresiones
        .length + 1;

    onConfiguracionChange(

      "overrideProgresiones",

      [

        ...configuracion
          .overrideProgresiones,

        {
          bloque:
            siguienteBloque,

          series:
            seriesGlobales,

          reps:
            repsGlobales,
        },
      ]
    );
  }

  function actualizarBloque(

    index: number,

    campo:
      keyof OverrideProgresion,

    valor: number

  ) {

    const nuevasProgresiones =

      configuracion
        .overrideProgresiones
        .map(

          (
            bloque,
            i
          ) => {

            if (
              i !== index
            ) {
              return bloque;
            }

            return {

              ...bloque,

              [campo]:
                valor,
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

      configuracion
        .overrideProgresiones
        .filter(

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
              onClick={
                onMoverArriba
              }
              className="border px-3 py-1 rounded-lg"
            >
              ↑
            </button>

          )}

          {puedeBajar && (

            <button
              onClick={
                onMoverAbajo
              }
              className="border px-3 py-1 rounded-lg"
            >
              ↓
            </button>

          )}

          <button
            onClick={
              onEliminar
            }
            className="text-red-500 text-sm"
          >
            Eliminar
          </button>

        </div>

      </div>

      {/* SUPERSERIE */}

      {indiceSuperserie && (

        <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl text-sm w-fit">

          Superserie #
          {indiceSuperserie}

        </div>

      )}

      {/* OVERRIDE */}

      <div className="flex items-center gap-3">

        <input
          type="checkbox"

          checked={
            configuracion
              .overrideActivo
          }

          onChange={
            onToggleOverride
          }
        />

        <span className="text-sm">
          Override activo
        </span>

      </div>

      {/* PROGRESIÓN PERSONALIZADA */}

      {configuracion
        .overrideActivo && (

        <div className="border rounded-xl p-4 flex flex-col gap-4">

          <div className="flex items-center justify-between">

            <h4 className="font-semibold">

              Progresión personalizada

            </h4>

            <button

              onClick={
                agregarBloqueOverride
              }

              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
            >
              + Bloque
            </button>

          </div>

          {configuracion
            .overrideProgresiones
            .map(

              (
                bloque,
                index
              ) => (

                <div

                  key={index}

                  className="grid grid-cols-4 gap-3 items-center"
                >

                  {/* BLOQUE */}

                  <input
                    type="number"

                    value={
                      bloque.bloque
                    }

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
                  />

                  {/* SERIES */}

                  <input
                    type="number"

                    value={
                      bloque.series
                    }

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
                  />

                  {/* REPS */}

                  <input
                    type="number"

                    value={
                      bloque.reps
                    }

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
                  />

                  {/* ELIMINAR */}

                  <button

                    onClick={() =>
                      eliminarBloque(
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
              Number(
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
            configuracion
              .descansoSegundos ??
            ""
          }

          onChange={(e) =>
            onConfiguracionChange(
              "descansoSegundos",
              Number(
                e.target.value
              )
            )
          }

          className="border rounded-xl px-4 py-3"
        />

      </div>

      {/* TÉCNICAS */}

      <div className="flex flex-wrap gap-5">

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

          Warmup

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

          Dropset

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

      </div>

      {/* SUPERSERIE */}

      <div className="flex gap-2">

        <button
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