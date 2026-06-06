"use client";

import {
  ProgresionBloque,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  cantidadBloques: number | null;

  progresionGlobal: ProgresionBloque[];

  onChange: (
    progresion: ProgresionBloque[]
  ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ProgresionGlobal({

  cantidadBloques,

  progresionGlobal,

  onChange,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | SIN BLOQUES
  |--------------------------------------------------------------------------
  */

  if (
    !cantidadBloques ||
    cantidadBloques <= 0
  ) {

    return (

      <div className="border rounded-2xl p-5 bg-white">

        <h2 className="text-xl font-bold">
          Progresión global
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Primero indicar la cantidad de semanas.
        </p>

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | OBTENER BLOQUE
  |--------------------------------------------------------------------------
  */

  function obtenerBloque(
    numeroBloque: number
  ) {

    return progresionGlobal.find(

      (bloque) =>

        bloque.bloque ===
        numeroBloque
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR BLOQUE
  |--------------------------------------------------------------------------
  */

  function actualizarBloque(

    bloqueNumero: number,

    campo:
      | "series"
      | "reps"
      | "descansoSegundos",

    valor: number

  ) {

    const bloqueExistente =
      obtenerBloque(
        bloqueNumero
      );

    /*
    |--------------------------------------------------------------------------
    | EXISTE
    |--------------------------------------------------------------------------
    */

    if (
      bloqueExistente
    ) {

      const nuevaProgresion =
        progresionGlobal.map(
          (bloque) => {

            if (
              bloque.bloque ===
              bloqueNumero
            ) {

              return {

                ...bloque,

                [campo]:
                  valor,
              };
            }

            return bloque;
          }
        );

      onChange(
        nuevaProgresion
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | NO EXISTE
    |--------------------------------------------------------------------------
    */

    const nuevoBloque:
      ProgresionBloque = {

      bloque:
        bloqueNumero,

      series:
        campo === "series"
          ? valor
          : 0,

      reps:
        campo === "reps"
          ? valor
          : 0,

      descansoSegundos:
        campo === "descansoSegundos"
          ? valor
          : null,
    };

    onChange([

      ...progresionGlobal,

      nuevoBloque,
    ]);
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

      {/* HEADER */}

      <div>

        <h2 className="text-xl font-bold">
          Progresión global
        </h2>

        <p className="text-sm text-gray-500">

          Define series, repeticiones
          y descanso para cada semana.

        </p>

      </div>

      {/* BLOQUES */}

      <div className="flex flex-col gap-4">

        {Array.from({

          length:
            cantidadBloques,

        }).map((_, index) => {

          const bloqueNumero =
            index + 1;

          const bloque =
            obtenerBloque(
              bloqueNumero
            );

          return (

            <div
              key={
                bloqueNumero
              }
              className="border rounded-xl p-4 flex flex-col gap-4"
            >

              {/* TITULO */}

              <h3 className="font-semibold">

                Semana {bloqueNumero}

              </h3>

              {/* INPUTS */}

              <div className="grid grid-cols-3 gap-4">

                {/* SERIES */}

                <input
                  type="number"
                  min={0}
                  value={
                    bloque?.series ??
                    ""
                  }
                  onChange={(e) =>

                    actualizarBloque(

                      bloqueNumero,

                      "series",

                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Series"
                  className="border rounded-xl px-4 py-3"
                />

                {/* REPS */}

                <input
                  type="number"
                  min={0}
                  value={
                    bloque?.reps ??
                    ""
                  }
                  onChange={(e) =>

                    actualizarBloque(

                      bloqueNumero,

                      "reps",

                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Reps"
                  className="border rounded-xl px-4 py-3"
                />

                {/* DESCANSO */}

                <input
                  type="number"
                  min={0}
                  value={
                    bloque?.descansoSegundos ??
                    ""
                  }
                  onChange={(e) =>

                    actualizarBloque(

                      bloqueNumero,

                      "descansoSegundos",

                      Number(
                        e.target.value
                      )
                    )
                  }
                  placeholder="Descanso (seg)"
                  className="border rounded-xl px-4 py-3"
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>

  );
}