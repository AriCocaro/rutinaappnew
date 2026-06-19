"use client";

import {
  obtenerAlumnos,
} from "@/lib/alumnosStorage";

import SearchSelect from "@/components/ui/SearchSelect";

import { useBranding } from "@/hooks/useBranding";

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

const alumnos: Alumno[] =
  obtenerAlumnos();
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
| - Cantidad de bloques
| - Cantidad de entrenamientos
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

  /*
  |----------------------------------------------------------------------
  | BRANDING
  |----------------------------------------------------------------------
  |
  | Permite adaptar el vocabulario
  | según el cliente:
  |
  | Alumno / Cliente / Atleta
  | Rutina / Plan
  | Bloque / Semana / Mesociclo
  | Entrenamiento / Sesión
  |
  */

  const branding =
    useBranding();

  /*
  |----------------------------------------------------------------------
  | RENDER
  |----------------------------------------------------------------------
  */

  return (

    <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

      {/* HEADER */}

      <div>

        <h2 className="text-xl font-bold">

          Datos generales

        </h2>

        <p className="text-sm text-gray-500">

          Configuración inicial de la{" "}
          {branding.rutina.toLowerCase()}

        </p>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* ====================================================== */}
        {/* FECHA DE INICIO                                        */}
        {/* ====================================================== */}

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

        {/* ====================================================== */}
        {/* ALUMNO                                                 */}
        {/* ====================================================== */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            {branding.alumno}

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

            placeholder={
              `Elegir ${branding.alumno.toLowerCase()}...`
            }
          />

        </div>

        {/* ====================================================== */}
        {/* BLOQUES                                                */}
        {/* ====================================================== */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Cantidad de{" "}
            {branding.bloque.toLowerCase()}

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

            placeholder={
              `Cantidad de ${branding.bloque.toLowerCase()}`
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

        {/* ====================================================== */}
        {/* ENTRENAMIENTOS                                         */}
        {/* ====================================================== */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Cantidad de{" "}
            {branding.entrenamiento.toLowerCase()}

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

            placeholder={
              `Cantidad de ${branding.entrenamiento.toLowerCase()}`
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

    </div>
  );
}