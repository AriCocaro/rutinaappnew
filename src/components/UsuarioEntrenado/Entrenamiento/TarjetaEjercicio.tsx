"use client";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  EjercicioRutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

import {
  obtenerEjercicioPorId,
} from "@/lib/ejerciciosStorage";

import {
  obtenerMaterialPorId,
} from "@/lib/materialesStorage";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  ejercicio:
    EjercicioRutina;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function TarjetaEjercicio({

  ejercicio,

}: Props) {

  const ejercicioBase =

    obtenerEjercicioPorId(
      ejercicio.ejercicioId
    );

  const material =

    obtenerMaterialPorId(
      ejercicio.materialId
    );

  return (

    <div
      className="
        border
        rounded-xl
        p-4
        bg-white
      "
    >

      <h3
        className="
          font-semibold
          text-lg
        "
      >

        {
          ejercicioBase?.nombre ??
          "Ejercicio"
        }

      </h3>

      <div
        className="
          mt-3
          flex
          flex-col
          gap-1
          text-sm
        "
      >

        <div>

          Material:
          {" "}

          {
            material?.nombre ??
            "-"
          }

        </div>

        <div>

          RIR:
          {" "}

          {
            ejercicio
              .configuracion
              .rir ?? "-"
          }

        </div>

        <div>

          Descanso:
          {" "}

          {
            ejercicio
              .configuracion
              .descansoSegundos ??
            "-"
          }

          {" "}
          seg

        </div>

      </div>

      {

        ejercicio.notas && (

          <div
            className="
              mt-3
              text-sm
              text-gray-600
            "
          >

            {ejercicio.notas}

          </div>

        )

      }

    </div>

  );
}