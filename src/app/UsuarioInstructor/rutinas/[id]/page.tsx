"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import ejercicios from "@/data/ejercicios.json";
import materiales from "@/data/materiales.json";

import { useBranding } from "@/hooks/useBranding";

import {
  obtenerRutinaPorId,
} from "@/lib/rutinasStorage";

import {
  Rutina,
  EntrenamientoRutina,
  EjercicioRutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function RutinaDetallePage() {

  /*
  |--------------------------------------------------------------------------
  | BRANDING
  |--------------------------------------------------------------------------
  */

  const branding =
    useBranding();

  /*
  |--------------------------------------------------------------------------
  | PARAMS
  |--------------------------------------------------------------------------
  */

  const params =
    useParams();

  const id =
    Number(params.id);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(
    null
  );

  /*
  |--------------------------------------------------------------------------
  | CARGAR RUTINA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const data =
      obtenerRutinaPorId(id);

    if (data) {

      setRutina(data);

    }

  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!rutina) {

    return (

      <div className="p-6">

        {branding.rutina}
        {" "}
        no encontrada

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          {branding.rutina}
          {" "}
          #{rutina.id}

        </h1>

        <p className="text-gray-500">

          Inicio:
          {" "}
          {rutina.fechaInicio}

        </p>

        <p className="text-gray-500">

          {branding.bloque}s:
          {" "}
          {rutina.cantidadBloques}

        </p>

      </div>

      {/* ENTRENAMIENTOS */}

      {rutina.entrenamientos.map(

        (
          entrenamiento:
            EntrenamientoRutina,
          index
        ) => (

          <div
            key={entrenamiento.id}
            className="
              border
              rounded-2xl
              p-5
              bg-white
              flex
              flex-col
              gap-4
            "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">

                {branding.entrenamiento}
                {" "}
                {index + 1}

              </h2>

              <span className="text-sm text-gray-500">

                {entrenamiento.ejercicios.length}
                {" "}
                {branding.ejercicio.toLowerCase()}
                {entrenamiento.ejercicios.length !== 1
                  ? "s"
                  : ""}

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
                      className="
                        border
                        rounded-xl
                        p-4
                        flex
                        flex-col
                        gap-3
                      "
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

                        {ejercicio.configuracion
                          .overrideActivo && (

                          <span
                            className="
                              text-xs
                              bg-yellow-100
                              text-yellow-700
                              px-2
                              py-1
                              rounded-lg
                            "
                          >

                            Override

                          </span>

                        )}

                      </div>

                      <div className="text-sm text-gray-600">

                        Ver
                        {" "}
                        {branding.progresion.toLowerCase()}

                      </div>

                      {ejercicio.notas && (

                        <div
                          className="
                            border-t
                            pt-2
                            text-sm
                            text-gray-600
                          "
                        >

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