"use client";

import { useState } from "react";

import alumnosData from "@/data/alumnos.json";

import {
  agregarRutina,
  actualizarRutina,
} from "@/lib/rutinasStorage";

import {
  ConfiguracionAvanzada,
  DiaRutina,
  EjercicioRutina,
  Rutina,
} from "@/types/rutinas";

import { useRutina } from "@/hooks/useRutina";

import ConfiguradorEjercicio from "./configuradorEjercicio";

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
  */

  const {

    dias,

    draft,

    agregarDia,

    eliminarDia,

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

  const [
    cantidadSemanas,
    setCantidadSemanas,
  ] = useState(

    rutinaInicial?.cantidadSemanas ??
    4
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN
  |--------------------------------------------------------------------------
  */

  const [
    seriesGlobales,
    setSeriesGlobales,
  ] = useState(

    rutinaInicial?.progresion
      .series ?? 3
  );

  const [
    repsGlobales,
    setRepsGlobales,
  ] = useState(

    rutinaInicial?.progresion
      .reps ?? 10
  );

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

        cantidadSemanas,

        seriesGlobales,

        repsGlobales,
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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

          {/* SEMANAS */}

          <input
            type="number"

            value={cantidadSemanas}

            onChange={(e) =>
              setCantidadSemanas(
                Number(
                  e.target.value
                )
              )
            }

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* PROGRESIÓN */}

      <div className="border rounded-2xl p-5 bg-white flex flex-col gap-4">

        <div>

          <h2 className="text-xl font-bold">
            Progresión global
          </h2>

          <p className="text-gray-500 text-sm">
            Configuración base
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="number"

            value={seriesGlobales}

            onChange={(e) =>
              setSeriesGlobales(
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

            value={repsGlobales}

            onChange={(e) =>
              setRepsGlobales(
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

      {/* DÍAS */}

      {dias.map((

        dia: DiaRutina,

        index: number

      ) => (

        <div
          key={dia.id}
          className="border rounded-2xl p-5 bg-white flex flex-col gap-5"
        >

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">

              Día {index + 1}

            </h2>

            <button
              onClick={() =>
                eliminarDia(
                  dia.id
                )
              }

              className="text-red-500 text-sm"
            >
              Eliminar día
            </button>

          </div>

          {/* AGREGAR */}

          <button
            onClick={() =>
              agregarEjercicio(
                dia.id
              )
            }

            className="bg-gray-100 hover:bg-gray-200 transition px-4 py-3 rounded-xl"
          >
            + Agregar ejercicio configurado
          </button>

          {/* LISTADO */}

          <div className="flex flex-col gap-3">

            {dia.ejercicios.map((

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
                  seriesGlobales
                }

                repsGlobales={
                  repsGlobales
                }

                puedeSubir={
                  ejercicioIndex > 0
                }

                puedeBajar={
                  ejercicioIndex <
                  dia.ejercicios.length - 1
                }

                indiceSuperserie={
                  ejercicio
                    .configuracion
                    .superserieId
                }

                onMoverArriba={() =>
                  moverEjercicio(
                    dia.id,
                    ejercicioIndex,
                    "arriba"
                  )
                }

                onMoverAbajo={() =>
                  moverEjercicio(
                    dia.id,
                    ejercicioIndex,
                    "abajo"
                  )
                }

                onToggleOverride={() =>
                  actualizarConfiguracion(
                    dia.id,
                    ejercicio.id,
                    "overrideActivo",
                    !ejercicio
                      .configuracion
                      .overrideActivo
                  )
                }

                onConfiguracionChange={(

                  campo:
                    keyof ConfiguracionAvanzada,

                  valor

                ) =>

                  actualizarConfiguracion(

                    dia.id,

                    ejercicio.id,

                    campo,

                    valor
                  )
                }

                onNotasChange={(
                  value
                ) =>

                  actualizarNotas(

                    dia.id,

                    ejercicio.id,

                    value
                  )
                }

                onEliminar={() =>
                  eliminarEjercicio(
                    dia.id,
                    ejercicio.id
                  )
                }
              />
            ))}

          </div>

        </div>
      ))}

      {/* NUEVO DÍA */}

      <button
        onClick={agregarDia}
        className="bg-blue-500 text-white px-5 py-4 rounded-xl"
      >
        + Agregar día
      </button>

    </div>
  );
}