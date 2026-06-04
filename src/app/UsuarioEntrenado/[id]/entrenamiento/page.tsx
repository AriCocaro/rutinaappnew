"use client";

import { useEffect, useState } from "react";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import {
  obtenerRutinas,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  EntrenamientoRutina,
  EjercicioRutina,
} from "@/types/rutinas";

type Props = {
  params: {
    id: string;
  };
};

export default function EntrenamientoAlumnoPage({
  params,
}: Props) {

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(null);

  const [
    entrenamientoActual,
    setEntrenamientoActual,
  ] = useState(0);

  useEffect(() => {

    const rutinas =
      obtenerRutinas();

    const rutinaAlumno =
      rutinas.find(
        (item) =>
          item.alumnoId ===
          params.id
      );

    if (rutinaAlumno) {
      setRutina(rutinaAlumno);
    }

  }, [params.id]);

  if (!rutina) {

    return (

      <div className="p-10">

        <h1 className="text-2xl font-bold">
          El alumno no tiene rutina
        </h1>

      </div>
    );
  }

  const entrenamiento =
    rutina.entrenamientos[
      entrenamientoActual
    ];

  if (!entrenamiento) {

    return (

      <div className="p-10">

        <h1 className="text-2xl font-bold">
          Entrenamiento no encontrado
        </h1>

      </div>
    );
  }

  const progresionBase =
    rutina.progresionGlobal[0];

  return (

    <div className="flex flex-col gap-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Entrenamiento
        </h1>

        <p className="text-gray-500">
          Vista alumno
        </p>

      </div>

      <div className="flex gap-3 flex-wrap">

        {rutina.entrenamientos.map(

          (
            item:
              EntrenamientoRutina,
            index
          ) => (

            <button
              key={item.id}
              onClick={() =>
                setEntrenamientoActual(
                  index
                )
              }
              className={`px-5 py-3 rounded-xl border ${
                entrenamientoActual === index
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >

              Entrenamiento {index + 1}

            </button>
          )
        )}

      </div>

      <div className="flex flex-col gap-4">

        {entrenamiento.ejercicios.map(

          (
            ejercicio:
              EjercicioRutina,
            index
          ) => {

            const ejercicioData =
              ejercicios.find(
                (item) =>
                  item.id ===
                  ejercicio.ejercicioId
              );

            const materialData =
              materiales.find(
                (item) =>
                  item.id ===
                  ejercicio.materialId
              );

            return (

              <div
                key={ejercicio.id}
                className="border rounded-2xl p-5 bg-white"
              >

                <h2 className="text-xl font-bold">
                  {index + 1}.{" "}
                  {ejercicioData?.nombre}
                </h2>

                <p className="text-gray-500">
                  {materialData?.nombre}
                </p>

                <div className="mt-4">

                  {progresionBase?.series}
                  {" x "}
                  {progresionBase?.reps}

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}