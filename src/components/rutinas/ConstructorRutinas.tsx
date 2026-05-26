"use client";

import { useState } from "react";

import DiaRutinaItem from "./DiaRutinaItem";

import type {
  Dia,
  Ejercicio,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
| Definimos la estructura de los datos.
|--------------------------------------------------------------------------
*/



export default function ConstructorRutinas() {

  /*
  |--------------------------------------------------------------------------
  | ESTADO PRINCIPAL
  |--------------------------------------------------------------------------
  | Acá guardamos todos los días y ejercicios.
  |--------------------------------------------------------------------------
  */

  const [dias, setDias] = useState<Dia[]>([
    {
      id: 1,
      ejercicios: [],
    },
  ]);

  /*
  |--------------------------------------------------------------------------
  | AGREGAR DÍA
  |--------------------------------------------------------------------------
  */

  function agregarDia() {

    setDias([
      ...dias,

      {
        id: dias.length + 1,
        ejercicios: [],
      },
    ]);
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR DÍA
  |--------------------------------------------------------------------------
  */

  function eliminarDia(idDia: number) {

    const nuevosDias = dias.filter(
      (dia) => dia.id !== idDia
    );

    setDias(nuevosDias);
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  | Agrega un ejercicio dentro del día seleccionado.
  |--------------------------------------------------------------------------
  */

  function agregarEjercicio(idDia: number) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === idDia) {

        return {
          ...dia,

          ejercicios: [
            ...dia.ejercicios,

            {
              id: Date.now(),

              nombre: "",
              material: "",
              notas: "",

              override: false,

              seriesOverride: "",
              repsOverride: "",
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
    idDia: number,
    idEjercicio: number
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === idDia) {

        return {
          ...dia,

          ejercicios: dia.ejercicios.filter(
            (ejercicio) =>
              ejercicio.id !== idEjercicio
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
  | Permite modificar cualquier campo del ejercicio.
  |--------------------------------------------------------------------------
  */

  function actualizarEjercicio(
    idDia: number,
    idEjercicio: number,
    campo: keyof Ejercicio,
    valor: string | boolean
  ) {

    const nuevosDias = dias.map((dia) => {

      if (dia.id === idDia) {

        return {
          ...dia,

          ejercicios: dia.ejercicios.map((ejercicio) => {

            if (ejercicio.id === idEjercicio) {

              return {
                ...ejercicio,

                // Actualización dinámica
                [campo]: valor,
              };
            }

            return ejercicio;
          }),
        };
      }

      return dia;
    });

    setDias(nuevosDias);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* INFORMACIÓN GENERAL */}

      <div className="bg-white p-6 rounded-xl border">

        <h2 className="text-2xl font-bold mb-4">
          Nueva rutina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Buscar alumno..."
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Cantidad de semanas"
            className="border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* PROGRESIÓN GLOBAL */}

      <div className="bg-white p-6 rounded-xl border">

        <h2 className="text-xl font-bold mb-4">
          Progresión global
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-sm">

          <input
            type="number"
            placeholder="Series"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Repeticiones"
            className="border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* DÍAS */}

      <div className="bg-white p-6 rounded-xl border">

            <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-bold">
                Días de entrenamiento
            </h2>

            <button
                onClick={agregarDia}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                + Agregar día
            </button>

            </div>

            <div className="flex flex-col gap-4">

            {/* Recorremos todos los días */}   
            {dias.map((dia) => (

                <DiaRutinaItem
                    key={dia.id}

                    dia={dia}

                    agregarEjercicio={agregarEjercicio}

                    eliminarDia={eliminarDia}

                    actualizarEjercicio={actualizarEjercicio}

                    eliminarEjercicio={eliminarEjercicio}
                />

                ))}
            </div>

      </div>

      {/* BOTÓN FINAL */}

      <button className="bg-green-500 text-white py-4 rounded-xl font-bold">
        Guardar rutina
      </button>

    </div>
  );
}