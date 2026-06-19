"use client";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  GrupoEjercicios,
} from "@/types/rutinas";

import RenderItem
  from "./RenderItem";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  grupo:
    GrupoEjercicios;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function TarjetaGrupo({

  grupo,

}: Props) {

  return (

    <div
      className="
        border-2
        rounded-2xl
        p-5
        bg-gray-50
      "
    >

      <h2
        className="
          font-bold
          text-lg
          mb-3
        "
      >

        {grupo.nombre}

      </h2>

      {

        grupo.notas && (

          <div
            className="
              text-sm
              text-gray-600
              mb-4
            "
          >

            {grupo.notas}

          </div>

        )

      }

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {

          grupo.items.map(

            (item, index) => (

              <RenderItem

                key={
                  `${grupo.id}-${index}`
                }

                item={item}

              />

            )

          )

        }

      </div>

    </div>

  );
}