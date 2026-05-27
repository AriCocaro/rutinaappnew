"use client";

import { useState } from "react";

import DiaRutinaItem from "./DiaRutinaItem";

import type {
  Rutina,
  Ejercicio,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| CONSTRUCTOR DE RUTINAS
|--------------------------------------------------------------------------
*/

export default function ConstructorRutinas() {

  /*
  |--------------------------------------------------------------------------
  | RUTINA VACÍA
  |--------------------------------------------------------------------------
  | La rutina se construye desde cero.
  |--------------------------------------------------------------------------
  */

  const rutinaInicial: Rutina = {

    id: Date.now(),

    alumnoId: 0,

    fechaInicio: "",

    semanas: 4,

    semanasExtra: 0,

    activa: true,

    dias: [],
  };

  /*
  |--------------------------------------------------------------------------
  | ESTADO PRINCIPAL
  |--------------------------------------------------------------------------
  */

  const [rutina, setRutina] = useState<Rutina>(
    rutinaInicial
  );

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR RUTINA
  |--------------------------------------------------------------------------
  */

  function actualizarRutina(
    campo: keyof Rutina,
    valor: string | number | boolean
  ) {

    setRutina({
      ...rutina,

      [campo]: valor,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR DÍA
  |--------------------------------------------------------------------------
  */

  function agregarDia() {

    const nuevosDias = [
      ...rutina.dias,

      {
        id: rutina.dias.length + 1,
        ejercicios: [],
      },
    ];

    setRutina({
      ...rutina,
      dias: nuevosDias,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | ELIMINAR DÍA
  |--------------------------------------------------------------------------
  */

  function eliminarDia(idDia: number) {

    const nuevosDias = rutina.dias.filter(
      (dia) => dia.id !== idDia
    );

    setRutina({
      ...rutina,
      dias: nuevosDias,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | AGREGAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function agregarEjercicio(idDia: number) {

    const nuevosDias = rutina.dias.map((dia) => {

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

    setRutina({
      ...rutina,
      dias: nuevosDias,
    });
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

    const nuevosDias = rutina.dias.map((dia) => {

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

    setRutina({
      ...rutina,
      dias: nuevosDias,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | ACTUALIZAR EJERCICIO
  |--------------------------------------------------------------------------
  */

  function actualizarEjercicio(
    idDia: number,
    idEjercicio: number,
    campo: keyof Ejercicio,
    valor: string | boolean
  ) {

    const nuevosDias = rutina.dias.map((dia) => {

      if (dia.id === idDia) {

        return {
          ...dia,

          ejercicios: dia.ejercicios.map((ejercicio) => {

            if (ejercicio.id === idEjercicio) {

              return {
                ...ejercicio,

                [campo]: valor,
              };
            }

            return ejercicio;
          }),
        };
      }

      return dia;
    });

    setRutina({
      ...rutina,
      dias: nuevosDias,
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* INFORMACIÓN GENERAL */}

      <div className="bg-white p-6 rounded-xl border">

        <h2 className="text-2xl font-bold mb-4">
          Nueva rutina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Alumno */}

          <input
            type="text"

            placeholder="Buscar alumno..."

            className="border rounded-lg px-4 py-3"
          />

          {/* Fecha */}

          <input
            type="date"

            value={rutina.fechaInicio}

            onChange={(e) =>
              actualizarRutina(
                "fechaInicio",
                e.target.value
              )
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* Semanas */}

          <input
            type="number"

            placeholder="Cantidad de semanas"

            value={rutina.semanas}

            onChange={(e) =>
              actualizarRutina(
                "semanas",
                Number(e.target.value)
              )
            }

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

          {rutina.dias.map((dia) => (

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

      <button className="bg-green-500 text-white py-4 rounded-xl font-bold">
        Guardar rutina
      </button>

    </div>
  );
}