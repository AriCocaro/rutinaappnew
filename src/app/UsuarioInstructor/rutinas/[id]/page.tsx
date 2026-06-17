"use client";

 /*                                                                         |
| -------------------------------------------------------------------------- |
| PAGE                                                                       |
| -------------------------------------------------------------------------- |
|                                                                            |
| Detalle completo de una rutina.                                            |
|                                                                            |
| Compatible con la nueva estructura:                                        |
|                                                                            |
| entrenamiento.items[]                                                      |
|                                                                            |
| - ejercicio                                                                |
| - grupo                                                                    |
|                                                                            |
| */                                                                         

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
ItemEntrenamiento,
EjercicioRutina,
GrupoEjercicios,
} from "@/types/rutinas";

 /*                                                                         |
| -------------------------------------------------------------------------- |
| COMPONENTE                                                                 |
| -------------------------------------------------------------------------- |
| */                                                                         

export default function RutinaDetallePage() {

 /*                                                                         |
| -------------------------------------------------------------------------- |
| BRANDING                                                                   |
| -------------------------------------------------------------------------- |
| */                                                                         

const branding =
useBranding();



/*                                                                         |
| -------------------------------------------------------------------------- |
| PARAMS                                                                     |
| -------------------------------------------------------------------------- |
| */                                                                         

const params =
useParams();

const id =
Number(params.id);

 /*                                                                         |
| -------------------------------------------------------------------------- |
| STATE                                                                      |
| -------------------------------------------------------------------------- |
| */                                                                         

const [
rutina,
setRutina,
] = useState<Rutina | null>(
null
);

 /*                                                                         |
| -------------------------------------------------------------------------- |
| CARGAR RUTINA                                                              |
| -------------------------------------------------------------------------- |
| */                                                                         

useEffect(() => {


const data =
  obtenerRutinaPorId(id);

if (data) {

  setRutina(data);

}


}, [id]);

/*                                                                         |
| -------------------------------------------------------------------------- |
| NOT FOUND                                                                  |
| -------------------------------------------------------------------------- |
| */                                                                         

if (!rutina) {


return (

  <div className="p-6">

    {branding.rutina}
    {" "}
    no encontrada

  </div>

);


}

 /*                                                                         |
| -------------------------------------------------------------------------- |
| RENDER                                                                     |
| -------------------------------------------------------------------------- |
| */                                                                         

return (


<div className="p-6 flex flex-col gap-6">

  {/* ---------------------------------------------------------- */}
  {/* HEADER */}
  {/* ---------------------------------------------------------- */}

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

  {/* ---------------------------------------------------------- */}
  {/* ENTRENAMIENTOS */}
  {/* ---------------------------------------------------------- */}

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

            {entrenamiento.items.length}
            {" "}
            item(s)

          </span>

        </div>

        {/* -------------------------------------------------- */}
        {/* ITEMS */}
        {/* -------------------------------------------------- */}

        {entrenamiento.items.map(

          (
            item:
              ItemEntrenamiento
          ) => {

            /*
            --------------------------------------------------
            EJERCICIO
            --------------------------------------------------
            */

            if (
              item.tipo ===
              "ejercicio"
            ) {

              const ejercicio:
                EjercicioRutina =
                  item.contenido;

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

                  <h3 className="font-semibold">

                    {ejercicioData?.nombre}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {materialData?.nombre}

                  </p>

                  {ejercicio.notas && (

                    <p className="text-sm text-gray-600">

                      {ejercicio.notas}

                    </p>

                  )}

                </div>

              );
            }

            /*
            --------------------------------------------------
            GRUPO
            --------------------------------------------------
            */

            if (
              item.tipo ===
              "grupo"
            ) {

              const grupo:
                GrupoEjercicios =
                  item.contenido;

              return (

                <div
                  key={grupo.id}
                  className="
                    border-2
                    border-purple-300
                    bg-purple-50
                    rounded-xl
                    p-4
                    flex
                    flex-col
                    gap-3
                  "
                >

                  <div>

                    <h3
                      className="
                        font-bold
                        text-purple-700
                      "
                    >
                      Grupo
                    </h3>

                    <p
                      className="
                        text-xs
                        text-purple-600
                      "
                    >
                      {grupo.items.length}
                      {" "}
                      ejercicio(s)
                    </p>

                  </div>

                  {grupo.items.map(

                    (subItem) => {

                      if (
                        subItem.tipo !==
                        "ejercicio"
                      ) {
                        return null;
                      }

                      const ejercicio =
                        subItem.contenido;

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
                            rounded-lg
                            p-3
                            bg-white
                          "
                        >

                          <div className="font-medium">

                            {ejercicioData?.nombre}

                          </div>

                          <div className="text-sm text-gray-500">

                            {materialData?.nombre}

                          </div>

                        </div>

                      );
                    }

                  )}

                </div>

              );
            }

            return null;

          }

        )}

      </div>

    )

  )}

</div>


);
}
