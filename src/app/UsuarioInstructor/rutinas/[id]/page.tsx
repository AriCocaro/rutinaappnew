"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import {
  obtenerRutinaPorId,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  EntrenamientoRutina,
  EjercicioRutina,
} from "@/types/rutinas";

export default function RutinaDetallePage() {

  const params = useParams();

  const id = Number(params.id);

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(null);

  useEffect(() => {

    const data =
      obtenerRutinaPorId(id);

    if (data) {
      setRutina(data);
    }

  }, [id]);

  if (!rutina) {

    return (
      <div className="p-6">
        Rutina no encontrada
      </div>
    );
  }

  const progresionBase =
    rutina.progresionGlobal[0];

  return (

    <div className="p-6 flex flex-col gap-6">

      <div>

        <h1 className="text-3xl font-bold">
          Rutina #{rutina.id}
        </h1>

        <p className="text-gray-500">
          Inicio: {rutina.fechaInicio}
        </p>

      </div>

      {rutina.entrenamientos.map(

        (
          entrenamiento:
            EntrenamientoRutina,
          index
        ) => (

          <div
            key={entrenamiento.id}
            className="border rounded-2xl p-5 bg-white flex flex-col gap-4"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Entrenamiento {index + 1}
              </h2>

              <span className="text-sm text-gray-500">
                {entrenamiento.ejercicios.length}
                {" "}
                ejercicios
              </span>

            </div>

            <div className="flex flex-col gap-3">

              {entrenamiento.ejercicios.map(

                (
                  ejercicio:
                    EjercicioRutina
                ) => {

                  const ejercicioData =
                    ejercicios.find(
                      (e) =>
                        e.id ===
                        ejercicio.ejercicioId
                    );

                  const materialData =
                    materiales.find(
                      (m) =>
                        m.id ===
                        ejercicio.materialId
                    );

                  return (

                    <div
                      key={ejercicio.id}
                      className="border rounded-xl p-4 flex flex-col gap-3"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="font-semibold">
                            {ejercicioData?.nombre}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {materialData?.nombre}
                          </p>

                        </div>

                        {ejercicio.configuracion.overrideActivo && (

                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                            Override
                          </span>

                        )}

                      </div>

                      <div className="text-sm">

                        {progresionBase?.series}
                        {" x "}
                        {progresionBase?.reps}

                      </div>

                      {ejercicio.notas && (

                        <div className="border-t pt-2 text-sm text-gray-600">
                          {ejercicio.notas}
                        </div>

                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )
      )}

    </div>
  );
}