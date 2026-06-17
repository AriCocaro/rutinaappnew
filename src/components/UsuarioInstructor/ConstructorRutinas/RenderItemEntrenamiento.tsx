"use client";

import {
  ItemEntrenamiento,
  EjercicioDraft,
  ConfiguracionAvanzada,
  ValorConfiguracion,
} from "@/types/rutinas";

import EjercicioItem from "./EjercicioItem";
import GrupoEjercicioCard from "./GrupoEjercicioCard";
import ConfiguradorEjercicio from "./ConfiguradorEjercicio";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {

  item:
    ItemEntrenamiento;

  entrenamientoId:
    number;

  index:
    number;

  totalItems:
    number;

  cantidadBloques:
    number;

  seriesGlobales:
    number;

  repsGlobales:
    number;

  draft:
        EjercicioDraft;

        actualizarDraft:
        (
        campo: keyof EjercicioDraft,
        valor: string | number
        ) => void;  

  moverItem:
    (
      entrenamientoId: number,
      index: number,
      direccion:
        | "arriba"
        | "abajo"
    ) => void;

  grupoMoverEjercicio:
    (
      entrenamientoId: number,
      grupoId: number,
      index: number,
      direccion:
        | "arriba"
        | "abajo"
    ) => void;

  eliminarEjercicio:
    (
      entrenamientoId: number,
      ejercicioId: number
    ) => void;

  eliminarGrupo:
    (
      entrenamientoId: number,
      grupoId: number
    ) => void;

  grupoEliminarEjercicio:
    (
      entrenamientoId: number,
      grupoId: number,
      ejercicioId: number
    ) => void;

  actualizarConfiguracion:
    (
      entrenamientoId: number,
      ejercicioId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  actualizarConfiguracionGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  actualizarConfiguracionEjercicioGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      ejercicioId: number,
      campo: keyof ConfiguracionAvanzada,
      valor: ValorConfiguracion
    ) => void;

  actualizarNotas:
    (
      entrenamientoId: number,
      ejercicioId: number,
      notas: string
    ) => void;

  actualizarNotasGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      notas: string
    ) => void;

  actualizarNotasEjercicioGrupo:
    (
      entrenamientoId: number,
      grupoId: number,
      ejercicioId: number,
      notas: string
    ) => void;

  agregarEjercicioAGrupo:
    (
      entrenamientoId: number,
      grupoId: number
    ) => void;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function RenderItemEntrenamiento({

  item,

  entrenamientoId,

  index,

  totalItems,

  cantidadBloques,

  seriesGlobales,

  repsGlobales,

  draft,

  actualizarDraft,

  moverItem,

  grupoMoverEjercicio,

  eliminarEjercicio,

  eliminarGrupo,

  grupoEliminarEjercicio,

  actualizarConfiguracion,

  actualizarConfiguracionGrupo,

  actualizarConfiguracionEjercicioGrupo,

  actualizarNotas,

  actualizarNotasGrupo,

  actualizarNotasEjercicioGrupo,

  agregarEjercicioAGrupo,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | EJERCICIO
  |--------------------------------------------------------------------------
  */

  if (
    item.tipo ===
    "ejercicio"
  ) {

    const ejercicio =
      item.contenido;

    return (

      <EjercicioItem

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

        cantidadBloques={
          cantidadBloques
        }

        seriesGlobales={
          seriesGlobales
        }

        repsGlobales={
          repsGlobales
        }

        puedeSubir={
          index > 0
        }

        puedeBajar={
          index <
          totalItems - 1
        }

        onMoverArriba={() =>
          moverItem(
            entrenamientoId,
            index,
            "arriba"
          )
        }

        onMoverAbajo={() =>
          moverItem(
            entrenamientoId,
            index,
            "abajo"
          )
        }

        onEliminar={() =>
          eliminarEjercicio(
            entrenamientoId,
            ejercicio.id
          )
        }

        onToggleOverride={() =>
          actualizarConfiguracion(
            entrenamientoId,
            ejercicio.id,
            "overrideActivo",
            !ejercicio.configuracion
              .overrideActivo
          )
        }

        onConfiguracionChange={(
          campo,
          valor
        ) =>
          actualizarConfiguracion(
            entrenamientoId,
            ejercicio.id,
            campo,
            valor
          )
        }

        onNotasChange={(notas) =>
          actualizarNotas(
            entrenamientoId,
            ejercicio.id,
            notas
          )
        }

      />

    );
  }

  /*
  |--------------------------------------------------------------------------
  | GRUPO
  |--------------------------------------------------------------------------
  */

  const grupo =
    item.contenido;

  return (

    <GrupoEjercicioCard

      grupo={grupo}

      onEliminar={() =>
        eliminarGrupo(
          entrenamientoId,
          grupo.id
        )
      }

      onMoverArriba={() =>
        moverItem(
          entrenamientoId,
          index,
          "arriba"
        )
      }

      onMoverAbajo={() =>
        moverItem(
          entrenamientoId,
          index,
          "abajo"
        )
      }

    >

      {grupo.items.map(

        (
          child,
          childIndex
        ) => (

          <RenderItemEntrenamiento

            key={
              child.tipo === "ejercicio"
                ? child.contenido.id
                : child.contenido.id
            }

            item={child}

            entrenamientoId={
              entrenamientoId
            }

            index={
              childIndex
            }

            totalItems={
              grupo.items.length
            }

            cantidadBloques={
              cantidadBloques
            }

            seriesGlobales={
              seriesGlobales
            }

            repsGlobales={
              repsGlobales
            }

            draft={draft}

            actualizarDraft={
              actualizarDraft
            }

            moverItem={
              moverItem
            }

            grupoMoverEjercicio={
              grupoMoverEjercicio
            }

            eliminarEjercicio={
              eliminarEjercicio
            }

            eliminarGrupo={
              eliminarGrupo
            }

            grupoEliminarEjercicio={
              grupoEliminarEjercicio
            }

            actualizarConfiguracion={
              actualizarConfiguracion
            }

            actualizarConfiguracionGrupo={
              actualizarConfiguracionGrupo
            }

            actualizarConfiguracionEjercicioGrupo={
              actualizarConfiguracionEjercicioGrupo
            }

            actualizarNotas={
              actualizarNotas
            }

            actualizarNotasGrupo={
              actualizarNotasGrupo
            }

            actualizarNotasEjercicioGrupo={
              actualizarNotasEjercicioGrupo
            }

            agregarEjercicioAGrupo={
              agregarEjercicioAGrupo
            }

          />

        )

      )}

      <ConfiguradorEjercicio

        draft={draft}

        actualizarDraft={
          actualizarDraft
        }

        onAgregar={() =>
          agregarEjercicioAGrupo(
            entrenamientoId,
            grupo.id
          )
        }

      />

    </GrupoEjercicioCard>

  );
}