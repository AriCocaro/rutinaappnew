import type { Ejercicio } from "@/types/rutinas";

type Props = {
  ejercicio: Ejercicio;

  diaId: number;

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

export default function EjercicioItem({
  ejercicio,
  diaId,
  actualizarEjercicio,
  eliminarEjercicio,
}: Props) {

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-4">

      {/* Nombre + material */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Ejercicio"

          value={ejercicio.nombre}

          onChange={(e) =>
            actualizarEjercicio(
              diaId,
              ejercicio.id,
              "nombre",
              e.target.value
            )
          }

          className="border rounded-lg px-4 py-3"
        />

        <select

          value={ejercicio.material}

          onChange={(e) =>
            actualizarEjercicio(
              diaId,
              ejercicio.id,
              "material",
              e.target.value
            )
          }

          className="border rounded-lg px-4 py-3"
        >

          <option value="">
            Seleccionar material
          </option>

          <option value="Barra">
            Barra
          </option>

          <option value="Mancuerna">
            Mancuerna
          </option>

        </select>

      </div>

      {/* Notas */}

      <textarea
        placeholder="Notas del ejercicio"

        value={ejercicio.notas}

        onChange={(e) =>
          actualizarEjercicio(
            diaId,
            ejercicio.id,
            "notas",
            e.target.value
          )
        }

        className="border rounded-lg px-4 py-3"
      />

      {/* Override */}

      <div className="flex items-center gap-2">

        <input
          type="checkbox"

          checked={ejercicio.override}

          onChange={(e) =>
            actualizarEjercicio(
              diaId,
              ejercicio.id,
              "override",
              e.target.checked
            )
          }
        />

        <span>
          Usar progresión personalizada
        </span>

      </div>

      {/* Campos override */}

      {ejercicio.override && (

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            placeholder="Series"

            value={ejercicio.seriesOverride}

            onChange={(e) =>
              actualizarEjercicio(
                diaId,
                ejercicio.id,
                "seriesOverride",
                e.target.value
              )
            }

            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Repeticiones"

            value={ejercicio.repsOverride}

            onChange={(e) =>
              actualizarEjercicio(
                diaId,
                ejercicio.id,
                "repsOverride",
                e.target.value
              )
            }

            className="border rounded-lg px-4 py-3"
          />

        </div>

      )}

      {/* Eliminar ejercicio */}

      <button
        onClick={() =>
          eliminarEjercicio(
            diaId,
            ejercicio.id
          )
        }
        className="text-red-500"
      >
        Eliminar ejercicio
      </button>

    </div>
  );
}