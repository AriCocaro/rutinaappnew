"use client";

import {
  ItemEntrenamiento,
} from "@/types/rutinas";

import TarjetaEjercicio
  from "./TarjetaEjercicio";

import TarjetaGrupo
  from "./TarjetaGrupo";

type Props = {

  item:
    ItemEntrenamiento;
};

export default function RenderItem({

  item,

}: Props) {

  if (
    item.tipo ===
    "ejercicio"
  ) {

    return (

      <TarjetaEjercicio

        ejercicio={
          item.contenido
        }

      />

    );
  }

  return (

    <TarjetaGrupo

      grupo={
        item.contenido
      }

    />

  );
}