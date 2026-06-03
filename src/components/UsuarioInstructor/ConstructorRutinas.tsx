"use client";

import { useState } from "react";

import alumnosData from "@/data/alumnos.json";

import {
  agregarRutina,
  actualizarRutina,
} from "@/lib/rutinasStorage";

import {
  ConfiguracionAvanzada,
  EntrenamientoRutina,
  EjercicioRutina,
  Rutina,
  ProgresionBloque,
} from "@/types/rutinas";

import { useRutina } from "@/hooks/useRutina";

import ConfiguradorEjercicio from "./ConstructorRutinas/ConfiguradorEjercicio";
import EjercicioItem from "./EjercicioItem";

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
  rutinaInicial?: Rutina;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ConstructorRutinas({
  rutinaInicial,
}: Props) {

  /*
  |--------------------------------------------------------------------------
  | HOOK
  |--------------------------------------------------------------------------
  |
  | Ya no trabajamos con "dias".
  | Ahora trabajamos con entrenamientos reutilizables.
  |
  */

  const {

    entrenamientos,

    draft,

    agregarEntrenamiento,

    eliminarEntrenamiento,

    actualizarDraft,

    actualizarDraftConfig,

    actualizarDraftNotas,

    agregarEjercicio,

    moverEjercicio,

    eliminarEjercicio,

    actualizarConfiguracion,

    actualizarNotas,

    generarRutina,

  } = useRutina(
    rutinaInicial
  );

  /*
  |--------------------------------------------------------------------------
  | DATOS GENERALES
  |--------------------------------------------------------------------------
  */

  const [
    alumnoSeleccionado,
    setAlumnoSeleccionado,
  ] = useState(
    rutinaInicial?.alumnoId ??
    "alumno_001"
  );

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState(
    rutinaInicial?.fechaInicio ??
    ""
  );

  /*
  |--------------------------------------------------------------------------
  | BLOQUES
  |--------------------------------------------------------------------------
  |
  | Antes:
  | cantidadSemanas
  |
  | Ahora:
  | cantidadBloques
  |
  */

  const [
    cantidadBloques,
    setCantidadBloques,
  ] = useState(
    rutinaInicial?.cantidadBloques ??
    4
  );

  /*
  |--------------------------------------------------------------------------
  | ENTRENAMIENTOS POR BLOQUE
  |--------------------------------------------------------------------------
  |
  | Ejemplo:
  |
  | Bloque 1:
  | A - B - C
  |
  | Bloque 2:
  | A - B - C
  |
  */

  const [
    entrenamientosPorBloque,
    setEntrenamientosPorBloque,
  ] = useState(

    rutinaInicial
      ?.entrenamientosPorBloque ??

    rutinaInicial
      ?.entrenamientos.length ??

    3
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  const [
    seriesIniciales,
    setSeriesIniciales,
  ] = useState(

    rutinaInicial
      ?.progresionGlobal?.[0]
      ?.series ?? 3
  );

  const [
    repsIniciales,
    setRepsIniciales,
  ] = useState(

    rutinaInicial
      ?.progresionGlobal?.[0]
      ?.reps ?? 10
  );

  /*
  |--------------------------------------------------------------------------
  | GENERAR PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  |
  | Ejemplo:
  |
  | Bloque 1 → 3x10
  | Bloque 2 → 4x10
  | Bloque 3 → 5x10
  |
  */

  function generarProgresionGlobal():
    ProgresionBloque[] {

    return Array.from(

      {
        length:
          cantidadBloques,
      },

      (_, index) => ({

        bloque:
          index + 1,

        series:
          seriesIniciales +
          index,

        reps:
          repsIniciales,
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | GUARDAR
  |--------------------------------------------------------------------------
  */

  function guardarRutina() {

    const rutina =
      generarRutina({

        alumnoId:
          alumnoSeleccionado,

        fechaInicio,

        cantidadBloques,

        entrenamientosPorBloque,

        progresionGlobal:
          generarProgresionGlobal(),
      });

    if (!rutina) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | EDITAR
    |--------------------------------------------------------------------------
    */

    if (rutinaInicial) {

      actualizarRutina(
        rutina
      );

      alert(
        "Rutina actualizada"
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | NUEVA
    |--------------------------------------------------------------------------
    */

    agregarRutina(
      rutina
    );

    alert(
      "Rutina creada"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="flex flex-col gap-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            {rutinaInicial
              ? "Editar rutina"
              : "Constructor de rutinas"}

          </h1>

          <p className="text-gray-500">

            {rutinaInicial
              ? "Modificar rutina existente"
              : "Crear rutina para alumno"}

          </p>

        </div>

        <button
          onClick={guardarRutina}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >

          {rutinaInicial
            ? "Guardar cambios"
            : "Guardar rutina"}

        </button>

      </div>

      {/* DATOS GENERALES */}

      <div className="border rounded-2xl p-5 bg-white flex flex-col gap-4">

        <h2 className="text-xl font-bold">
          Datos generales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* ENTRENAMIENTOS */}

          <input
            type="number"

            value={
              entrenamientosPorBloque
            }

            min={1}

            onChange={(e) =>
              setEntrenamientosPorBloque(
                Number(
                  e.target.value
                )
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          {/* ALUMNO */}

          <select
            value={
              alumnoSeleccionado
            }

            onChange={(e) =>
              setAlumnoSeleccionado(
                e.target.value
              )
            }

            className="border rounded-xl px-4 py-3"
          >

            {alumnos.map(
              (alumno) => (

                <option
                  key={alumno.id}
                  value={alumno.id}
                >

                  {alumno.nombre}{" "}
                  {alumno.apellido}

                </option>
              )
            )}

          </select>

          {/* FECHA */}

          <input
            type="date"

            value={fechaInicio}

            onChange={(e) =>
              setFechaInicio(
                e.target.value
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          {/* BLOQUES */}

          <input
            type="number"

            value={cantidadBloques}

            onChange={(e) =>
              setCantidadBloques(
                Number(
                  e.target.value
                )
              )
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* PROGRESIÓN GLOBAL */}

      <div className="border rounded-2xl p-5 bg-white flex flex-col gap-4">

        <h2 className="text-xl font-bold">
          Progresión global
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"

            value={seriesIniciales}

            onChange={(e) =>
              setSeriesIniciales(
                Number(
                  e.target.value
                )
              )
            }

            placeholder="Series"

            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"

            value={repsIniciales}

            onChange={(e) =>
              setRepsIniciales(
                Number(
                  e.target.value
                )
              )
            }

            placeholder="Repeticiones"

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* CONFIGURADOR */}

      <ConfiguradorEjercicio

        draft={draft}

        actualizarDraft={
          actualizarDraft
        }

        actualizarDraftConfig={
          actualizarDraftConfig
        }

        actualizarDraftNotas={
          actualizarDraftNotas
        }
      />

      {/* ENTRENAMIENTOS */}

      {entrenamientos.map(

        (
          entrenamiento:
            EntrenamientoRutina,

          index: number
        ) => (

          <div
            key={entrenamiento.id}
            className="border rounded-2xl p-5 bg-white flex flex-col gap-5"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">

                Entrenamiento {index + 1}

              </h2>

              <button
                onClick={() =>
                  eliminarEntrenamiento(
                    entrenamiento.id
                  )
                }

                className="text-red-500 text-sm"
              >
                Eliminar
              </button>

            </div>

            <button
              onClick={() =>
                agregarEjercicio(
                  entrenamiento.id
                )
              }

              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl"
            >
              + Agregar ejercicio
            </button>

            <div className="flex flex-col gap-3">

              {entrenamiento.ejercicios.map(

                (
                  ejercicio:
                    EjercicioRutina,

                  ejercicioIndex:
                    number
                ) => (

                  <EjercicioItem
                    key={ejercicio.id}

                    ejercicioId={
                      ejercicio.ejercicioId
                    }

                    materialId={
                      ejercicio.materialId
                    }

                    configuracion={
                      ejercicio.configuracion
                    }

                    notas={
                      ejercicio.notas
                    }

                    seriesGlobales={
                      seriesIniciales
                    }

                    repsGlobales={
                      repsIniciales
                    }

                    puedeSubir={
                      ejercicioIndex > 0
                    }

                    puedeBajar={
                      ejercicioIndex <
                      entrenamiento.ejercicios.length - 1
                    }

                    indiceSuperserie={
                      ejercicio.configuracion.superserieId
                    }

                    onMoverArriba={() =>
                      moverEjercicio(
                        entrenamiento.id,
                        ejercicioIndex,
                        "arriba"
                      )
                    }

                    onMoverAbajo={() =>
                      moverEjercicio(
                        entrenamiento.id,
                        ejercicioIndex,
                        "abajo"
                      )
                    }

                    onToggleOverride={() => {}}

                    onConfiguracionChange={() => {}}

                    onNotasChange={() => {}}

                    onEliminar={() =>
                      eliminarEjercicio(
                        entrenamiento.id,
                        ejercicio.id
                      )
                    }
                  />
                )
              )}

            </div>

          </div>
        )
      )}

      <button
        onClick={
          agregarEntrenamiento
        }

        className="bg-blue-500 text-white px-5 py-4 rounded-xl"
      >
        + Agregar entrenamiento
      </button>

    </div>
  );
}