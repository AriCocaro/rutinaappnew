"use client";

import { useState } from "react";

import ejercicios from "@/data/ejercicios.json";

import materiales from "@/data/materiales.json";

import alumnosData from "@/data/alumnos.json";

import EjercicioItem from "./EjercicioItem";

import SearchSelect from "@/components/ui/SearchSelect";

/*
|--------------------------------------------------------------------------
| TYPES JSON
|--------------------------------------------------------------------------
*/

type Alumno = {

  id: number;

  nombre: string;
};

const alumnos =
  alumnosData as Alumno[];

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type EjercicioRutina = {

  id: number;

  ejercicioId: number;

  materialId: number;

  overrideActivo: boolean;

  seriesOverride: number | null;

  repsOverride: number | null;

  notas: string;
};

type DiaRutina = {

  id: number;

  ejercicios: EjercicioRutina[];
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ConstructorRutinas() {

  /*
  |--------------------------------------------------------------------------
  | DATOS RUTINA
  |--------------------------------------------------------------------------
  */

  const [
    alumnoSeleccionado,
    setAlumnoSeleccionado,
  ] = useState<number>(1);

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState<string>("");

  const [
    cantidadSemanas,
    setCantidadSemanas,
  ] = useState<number>(4);

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  const [
    seriesGlobales,
    setSeriesGlobales,
  ] = useState<number>(3);

  const [
    repsGlobales,
    setRepsGlobales,
  ] = useState<number>(10);

  /*
  |--------------------------------------------------------------------------
  | DÍAS
  |--------------------------------------------------------------------------
  */

  const [dias, setDias] =
    useState<DiaRutina[]>([
      {
        id: Date.now(),

        ejercicios: [],
      },
    ]);

  /*
  |--------------------------------------------------------------------------
  | SELECTORES
  |--------------------------------------------------------------------------
  */

  const [
    ejercicioSeleccionado,
    setEjercicioSeleccionado,
  ] = useState<number>(1);

  const [
    materialSeleccionado,
    setMaterialSeleccionado,
  ] = useState<number>(1);

  /*
  |--------------------------------------------------------------------------
  | EJERCICIO ACTUAL
  |--------------------------------------------------------------------------
  */

  const ejercicioActual =
    ejercicios.find(
      (ejercicio) =>
        ejercicio.id ===
        ejercicioSeleccionado
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
  | AGREGAR DÍA
  |--------------------------------------------------------------------------
  */

  function agregarDia() {

    const nuevoDia: DiaRutina = {

      id: Date.now(),

      ejercicios: [],
    };

    setDias([
      ...dias,
      nuevoDia,
    ]);
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR DÍA
  |--------------------------------------------------------------------------
  */

  function eliminarDia(
    diaId: number
  ) {

    const nuevosDias =
      dias.filter(
        (dia) =>
          dia.id !== diaId
      );

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function agregarEjercicio(
    diaId: number
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === diaId) {

        return {

          ...dia,

          ejercicios: [

            ...dia.ejercicios,

            {
              id: Date.now(),

              ejercicioId:
                ejercicioSeleccionado,

              materialId:
                materialSeleccionado,

              overrideActivo: false,

              seriesOverride: null,

              repsOverride: null,

              notas: "",
            },
          ],
        };
      }

      return dia;
    });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function eliminarEjercicio(
    diaId: number,
    ejercicioId: number
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === diaId) {

        return {

          ...dia,

          ejercicios:
            dia.ejercicios.filter(
              (ejercicio) =>

                ejercicio.id !==
                ejercicioId
            ),
        };
      }

      return dia;
    });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | TOGGLE OVERRIDE
  |--------------------------------------------------------------------------
  */

  function toggleOverride(
    diaId: number,
    ejercicioId: number
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === diaId) {

        return {

          ...dia,

          ejercicios:
            dia.ejercicios.map(
              (ejercicio) => {

                if (
                  ejercicio.id ===
                  ejercicioId
                ) {

                  return {

                    ...ejercicio,

                    overrideActivo:
                      !ejercicio.overrideActivo,
                  };
                }

                return ejercicio;
              }
            ),
        };
      }

      return dia;
    });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function actualizarEjercicio(
    diaId: number,
    ejercicioId: number,
    campo: string,
    valor: string | number
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === diaId) {

        return {

          ...dia,

          ejercicios:
            dia.ejercicios.map(
              (ejercicio) => {

                if (
                  ejercicio.id ===
                  ejercicioId
                ) {

                  return {

                    ...ejercicio,

                    [campo]: valor,
                  };
                }

                return ejercicio;
              }
            ),
        };
      }

      return dia;
    });

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | GUARDAR RUTINA
  |--------------------------------------------------------------------------
  */

  function guardarRutina() {

    /*
    |--------------------------------------------------------------------------
    | VALIDACIONES
    |--------------------------------------------------------------------------
    */

    if (!fechaInicio) {

      alert(
        "Seleccionar fecha inicio"
      );

      return;
    }

    if (dias.length === 0) {

      alert(
        "Agregar al menos un día"
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | ESTRUCTURA FINAL
    |--------------------------------------------------------------------------
    */

    const rutina = {

      alumnoId:
        alumnoSeleccionado,

      fechaInicio,

      cantidadSemanas,

      /*
      |--------------------------------------------------------------------------
      | PROGRESIÓN
      |--------------------------------------------------------------------------
      */

      progresion: {

        series:
          seriesGlobales,

        reps:
          repsGlobales,
      },

      /*
      |--------------------------------------------------------------------------
      | DÍAS
      |--------------------------------------------------------------------------
      */

      dias,
    };

    console.log(rutina);

    alert(
      "Rutina generada. Revisar consola."
    );
  }

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

      {/* DATOS */}

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
                  alumno.nombre,
              })
            )}

            selectedId={
              alumnoSeleccionado
            }

            onSelect={
              setAlumnoSeleccionado
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

            className="border rounded-lg px-4 py-3"
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

            className="border rounded-lg px-4 py-3"
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
            Configuración base de rutina
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="number"

            value={seriesGlobales}

            onChange={(e) =>
              setSeriesGlobales(
                Number(e.target.value)
              )
            }

            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"

            value={repsGlobales}

            onChange={(e) =>
              setRepsGlobales(
                Number(e.target.value)
              )
            }

            className="border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* DÍAS */}

      {dias.map((dia, index) => (

        <div
          key={dia.id}
          className="border rounded-2xl p-5 flex flex-col gap-5 bg-white"
        >

          {/* HEADER DÍA */}

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

          {/* SELECTORES */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <SearchSelect

              options={ejercicios.map(
                (ejercicio) => ({
                  id: ejercicio.id,

                  nombre:
                    ejercicio.nombre,
                })
              )}

              selectedId={
                ejercicioSeleccionado
              }

              onSelect={
                setEjercicioSeleccionado
              }

              placeholder="Buscar ejercicio..."
            />

            <SearchSelect

              options={materialesDisponibles.map(
                (material) => ({
                  id: material.id,

                  nombre:
                    material.nombre,
                })
              )}

              selectedId={
                materialSeleccionado
              }

              onSelect={
                setMaterialSeleccionado
              }

              placeholder="Buscar material..."
            />

          </div>

          {/* AGREGAR */}

          <button
            onClick={() =>
              agregarEjercicio(dia.id)
            }

            className="bg-gray-100 hover:bg-gray-200 transition px-4 py-3 rounded-lg"
          >
            + Agregar ejercicio
          </button>

          {/* LISTADO */}

          <div className="flex flex-col gap-3">

            {dia.ejercicios.map(
              (ejercicio) => (

                <EjercicioItem
                  key={ejercicio.id}

                  ejercicioId={
                    ejercicio.ejercicioId
                  }

                  materialId={
                    ejercicio.materialId
                  }

                  overrideActivo={
                    ejercicio.overrideActivo
                  }

                  seriesOverride={
                    ejercicio.seriesOverride
                  }

                  repsOverride={
                    ejercicio.repsOverride
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

                  onToggleOverride={() =>
                    toggleOverride(
                      dia.id,
                      ejercicio.id
                    )
                  }

                  onSeriesChange={(value) =>
                    actualizarEjercicio(
                      dia.id,
                      ejercicio.id,
                      "seriesOverride",
                      value
                    )
                  }

                  onRepsChange={(value) =>
                    actualizarEjercicio(
                      dia.id,
                      ejercicio.id,
                      "repsOverride",
                      value
                    )
                  }

                  onNotasChange={(value) =>
                    actualizarEjercicio(
                      dia.id,
                      ejercicio.id,
                      "notas",
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