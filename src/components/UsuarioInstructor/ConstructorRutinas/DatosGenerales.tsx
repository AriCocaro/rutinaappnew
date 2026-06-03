"use client";

import alumnosData from "@/data/alumnos.json";

import SearchSelect from "@/components/ui/SearchSelect";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Alumno = {

  id: string;

  nombre: string;

  apellido: string;
};

const alumnos =
  alumnosData as Alumno[];

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  fechaInicio: string;

  alumnoId: string;

  cantidadBloques: number | null;

  entrenamientosPorBloque:
    number | null;

  onFechaInicioChange: (
    value: string
  ) => void;

  onAlumnoChange: (
    value: string
  ) => void;

  onCantidadBloquesChange: (
    value: number | null
  ) => void;

  onEntrenamientosPorBloqueChange: (
    value: number | null
  ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
|
| Esta sección contiene únicamente:
|
| - Fecha de inicio
| - Alumno
| - Cantidad de semanas
| - Cantidad de días por semana
|
| No contiene lógica de progresión
| ni lógica de ejercicios.
|
*/

export default function DatosGenerales({

  fechaInicio,

  alumnoId,

  cantidadBloques,

  entrenamientosPorBloque,

  onFechaInicioChange,

  onAlumnoChange,

  onCantidadBloquesChange,

  onEntrenamientosPorBloqueChange,

}: Props) {

  return (

    <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

      {/* HEADER */}

      <div>

        <h2 className="text-xl font-bold">

          Datos generales

        </h2>

        <p className="text-sm text-gray-500">

          Configuración inicial de la rutina

        </p>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* FECHA */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Fecha de inicio

          </label>

          <input
            type="date"

            value={fechaInicio}

            onChange={(e) =>
              onFechaInicioChange(
                e.target.value
              )
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

        {/* ALUMNO */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Entrenado

          </label>

          <SearchSelect

            options={alumnos.map(
              (alumno) => ({

                id: alumno.id,

                nombre:
                  `${alumno.nombre} ${alumno.apellido}`,
              })
            )}

            selectedId={
              alumnoId || ""
            }

            onSelect={(id) =>
              onAlumnoChange(
                String(id)
              )
            }

            placeholder="Elegir entrenado..."
          />

        </div>

        {/* BLOQUES */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Cantidad de semanas

          </label>

          <input
            type="number"

            min={1}

            value={
              cantidadBloques ?? ""
            }

            onChange={(e) =>

              onCantidadBloquesChange(

                e.target.value === ""
                  ? null
                  : Number(
                      e.target.value
                    )
              )
            }

            placeholder="Cantidad de semanas"

            className="border rounded-xl px-4 py-3"
          />

        </div>

        {/* ENTRENAMIENTOS */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Cantidad de días por semana

          </label>

          <input
            type="number"

            min={1}

            value={
              entrenamientosPorBloque ?? ""
            }

            onChange={(e) =>

              onEntrenamientosPorBloqueChange(

                e.target.value === ""
                  ? null
                  : Number(
                      e.target.value
                    )
              )
            }

            placeholder="Cantidad de días por semana"

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

    </div>
  );
}