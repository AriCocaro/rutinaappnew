"use client";

import { useState } from "react";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";
import alumnosData from "@/data/alumnos.json";

import SearchSelect from "@/components/ui/SearchSelect";

import EjercicioItem from "./EjercicioItem";

import useRutina from "@/hooks/useRutina";

import {
  agregarRutina,
} from "@/lib/rutinasStorage";

import {
  DiaRutina,
  EjercicioRutina,
  ConfiguracionAvanzada,
} from "@/types/rutinas";

import {
  Rutina,
} from "@/types/rutinas";

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
| COMPONENTE
|--------------------------------------------------------------------------
*/
type Props = {

  rutinaInicial?: Rutina;
};

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

  } = useRutina();

  /*
  |--------------------------------------------------------------------------
  | DATOS GENERALES
  |--------------------------------------------------------------------------
  */

  const [
    alumnoSeleccionado,
    setAlumnoSeleccionado,
  ] = useState("alumno_001");

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState("");

  const [
    cantidadSemanas,
    setCantidadSemanas,
  ] = useState(4);

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  const [
    seriesGlobales,
    setSeriesGlobales,
  ] = useState(3);

  const [
    repsGlobales,
    setRepsGlobales,
  ] = useState(10);

  /*
  |--------------------------------------------------------------------------
  | EJERCICIO ACTUAL
  |--------------------------------------------------------------------------
  */

  const ejercicioActual =
    ejercicios.find(
      (ejercicio) =>
        ejercicio.id ===
        draft.ejercicioId
    );

  /*
  |--------------------------------------------------------------------------
  | MATERIALES DISPONIBLES
  |--------------------------------------------------------------------------
  */

  const materialesDisponibles =
    materiales.filter((material) =>

      ejercicioActual?.materialesIds.includes(
        material.id
      )
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

    agregarRutina(rutina);

    console.log(rutina);
    alert(
      "Rutina creada correctamente"
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
            Constructor de rutinas
          </h1>

          <p className="text-gray-500">
            Crear rutina para alumno
          </p>

        </div>

        <button
          onClick={guardarRutina}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Guardar rutina
        </button>

      </div>

      {/* DATOS GENERALES */}

      <div className="border rounded-2xl p-5 bg-white flex flex-col gap-4">

        <h2 className="text-xl font-bold">
          Datos generales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ALUMNO */}

          <SearchSelect

            options={alumnos.map(
              (alumno) => ({
                id: alumno.id,

                nombre:
                  `${alumno.nombre} ${alumno.apellido}`,
              })
            )}

            selectedId={
              alumnoSeleccionado
            }

            onSelect={(id) =>
              setAlumnoSeleccionado(
                String(id)
              )
            }

            placeholder="Buscar alumno..."
          />

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
                Number(e.target.value)
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

          {/* SERIES */}

          <input
            type="number"

            value={seriesGlobales}

            onChange={(e) =>
              setSeriesGlobales(
                Number(e.target.value)
              )
            }

            placeholder="Series"

            className="border rounded-xl px-4 py-3"
          />

          {/* REPS */}

          <input
            type="number"

            value={repsGlobales}

            onChange={(e) =>
              setRepsGlobales(
                Number(e.target.value)
              )
            }

            placeholder="Repeticiones"

            className="border rounded-xl px-4 py-3"
          />

        </div>

      </div>

      {/* CONFIGURAR EJERCICIO */}

      <div className="border rounded-2xl p-5 bg-white flex flex-col gap-5">

        <div>

          <h2 className="text-xl font-bold">
            Configurar ejercicio
          </h2>

          <p className="text-gray-500 text-sm">
            El ejercicio se configura antes de agregarlo
          </p>

        </div>

        {/* SELECTORES */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* EJERCICIO */}

          <SearchSelect

            options={ejercicios.map(
              (ejercicio) => ({
                id: ejercicio.id,

                nombre:
                  ejercicio.nombre,
              })
            )}

            selectedId={
              draft.ejercicioId
            }

            onSelect={(id) =>
              actualizarDraft(
                "ejercicioId",
                Number(id)
              )
            }

            placeholder="Buscar ejercicio..."
          />

          {/* MATERIAL */}

          <SearchSelect

            options={materialesDisponibles.map(
              (material) => ({
                id: material.id,

                nombre:
                  material.nombre,
              })
            )}

            selectedId={
              draft.materialId
            }

            onSelect={(id) =>
              actualizarDraft(
                "materialId",
                Number(id)
              )
            }

            placeholder="Buscar material..."
          />

        </div>

        {/* OVERRIDE */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"

            checked={
              draft.configuracion.overrideActivo
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "overrideActivo",
                e.target.checked
              )
            }
          />

          <span className="text-sm">
            Override activo
          </span>

        </div>

        {/* SERIES / REPS */}

        {draft.configuracion.overrideActivo && (

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"

              placeholder="Series"

              value={
                draft.configuracion.seriesOverride ??
                ""
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "seriesOverride",
                  Number(e.target.value)
                )
              }

              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"

              placeholder="Repeticiones"

              value={
                draft.configuracion.repsOverride ??
                ""
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "repsOverride",
                  Number(e.target.value)
                )
              }

              className="border rounded-xl px-4 py-3"
            />

          </div>

        )}

        {/* CONFIGURACIÓN */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* RIR */}

          <input
            type="number"

            placeholder="RIR"

            value={
              draft.configuracion.rir ??
              ""
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "rir",
                Number(e.target.value)
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          {/* TEMPO */}

          <input
            type="text"

            placeholder="Tempo"

            value={
              draft.configuracion.tempo ??
              ""
            }

            onChange={(e) =>
              actualizarDraftConfig(
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
              draft.configuracion.descansoSegundos ??
              ""
            }

            onChange={(e) =>
              actualizarDraftConfig(
                "descansoSegundos",
                Number(e.target.value)
              )
            }

            className="border rounded-xl px-4 py-3"
          />

          {/* TIMER */}

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"

              checked={
                draft.configuracion.usarTimer
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "usarTimer",
                  e.target.checked
                )
              }
            />

            Timer

          </label>

        </div>

        {/* EXTRAS */}

        <div className="flex flex-wrap gap-5">

          {/* WARMUP */}

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"

              checked={
                draft.configuracion.warmup
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "warmup",
                  e.target.checked
                )
              }
            />

            Warmup

          </label>

          {/* DROPSET */}

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"

              checked={
                draft.configuracion.dropset
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "dropset",
                  e.target.checked
                )
              }
            />

            Dropset

          </label>

          {/* CLUSTER */}

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"

              checked={
                draft.configuracion.cluster
              }

              onChange={(e) =>
                actualizarDraftConfig(
                  "cluster",
                  e.target.checked
                )
              }
            />

            Cluster

          </label>

        </div>

        {/* NOTAS */}

        <textarea

          placeholder="Notas..."

          value={draft.notas}

          onChange={(e) =>
            actualizarDraftNotas(
              e.target.value
            )
          }

          className="border rounded-2xl px-4 py-3 min-h-[120px]"
        />

      </div>

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
                eliminarDia(dia.id)
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

            {dia.ejercicios.map(
              (
                ejercicio:
                  EjercicioRutina,

                ejercicioIndex: number
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
                    ejercicio.configuracion
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

                  onNotasChange={(value) =>
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

              )
            )}

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