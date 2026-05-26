import EjercicioItem from "./EjercicioItem";

import type {
  Dia,
  Ejercicio,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/


type Props = {
  dia: Dia;

  agregarEjercicio: (
    idDia: number
  ) => void;

  eliminarDia: (
    idDia: number
  ) => void;

  actualizarEjercicio: (
    idDia: number,
    idEjercicio: number,
    campo: keyof Ejercicio,
    valor: string | boolean
  ) => void;

  eliminarEjercicio: (
    idDia: number,
    idEjercicio: number
  ) => void;
};

export default function DiaRutinaItem({
  dia,
  agregarEjercicio,
  eliminarDia,
  actualizarEjercicio,
  eliminarEjercicio,
}: Props) {

  return (
    <div className="border rounded-xl p-4">

      {/* Header día */}

      <div className="flex items-center justify-between mb-4">

        <h3 className="font-bold text-lg">
          Día {dia.id}
        </h3>

        <button
          onClick={() => eliminarDia(dia.id)}
          className="text-red-500"
        >
          Eliminar
        </button>

      </div>

      {/* Lista ejercicios */}

      <div className="flex flex-col gap-4">

        {dia.ejercicios.map((ejercicio) => (

          <EjercicioItem
            key={ejercicio.id}

            ejercicio={ejercicio}

            diaId={dia.id}

            actualizarEjercicio={actualizarEjercicio}

            eliminarEjercicio={eliminarEjercicio}
          />

        ))}

      </div>

      {/* Botón agregar ejercicio */}

      <button
        onClick={() => agregarEjercicio(dia.id)}
        className="mt-4 bg-gray-200 px-4 py-2 rounded-lg"
      >
        + Agregar ejercicio
      </button>

    </div>
  );
}