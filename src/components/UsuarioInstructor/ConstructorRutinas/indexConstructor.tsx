"use client";

/*
|--------------------------------------------------------------------------
| HOOKS
|--------------------------------------------------------------------------
*/

import { useRutina } from "@/hooks/useRutina";
import { useConstructorRutina } from "@/hooks/useConstructorRutina";

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

import {
  agregarRutina,
  actualizarRutina,
} from "@/lib/rutinasStorage";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

import HeaderConstructor from "./HeaderConstructor";

import DatosGenerales from "./DatosGenerales";

import ProgresionGlobal from "./ProgresionGlobal";

import ConfiguradorEjercicio from "./ConfiguradorEjercicio";

import ListaEntrenamientos from "./ListaEntrenamientos";

/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

type Props = {
  rutinaInicial?: Rutina;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function IndexConstructor({

  rutinaInicial,

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | DATOS GENERALES
  |--------------------------------------------------------------------------
  */

  const {

    alumnoId,
    setAlumnoId,

    fechaInicio,
    setFechaInicio,

    cantidadBloques,
    setCantidadBloques,

    entrenamientosPorBloque,
    setEntrenamientosPorBloque,

    progresionGlobal,
    setProgresionGlobal,

  } = useConstructorRutina({

    rutinaInicial,

  });

  /*
  |--------------------------------------------------------------------------
  | RUTINA
  |--------------------------------------------------------------------------
  */

  const {

    entrenamientos,

    draft,

    agregarEntrenamiento,

    eliminarEntrenamiento,

    actualizarDraft,

    actualizarDraftConfig,

    actualizarDraftNotas,

    agregarEjercicio,

    moverEjercicio,

    eliminarEjercicio,

    actualizarConfiguracion,

    actualizarNotas,

    generarRutina,

  } = useRutina(
    rutinaInicial
  );

  /*
  |--------------------------------------------------------------------------
  | GUARDAR
  |--------------------------------------------------------------------------
  */

  function guardarRutina() {

    if (
      !cantidadBloques ||
      !entrenamientosPorBloque
    ) {
      return;
    }

    const rutina = generarRutina({

      alumnoId,

      fechaInicio,

      cantidadBloques,

      entrenamientosPorBloque,

      progresionGlobal,

    });

    if (!rutina) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | EDITAR
    |--------------------------------------------------------------------------
    */

    if (rutinaInicial) {

      actualizarRutina(
        rutina
      );

      alert(
        "Rutina actualizada"
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | NUEVA
    |--------------------------------------------------------------------------
    */

    agregarRutina(
      rutina
    );

    alert(
      "Rutina creada"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SERIES Y REPS GLOBALES
  |--------------------------------------------------------------------------
  |
  | Se usan para mostrar en
  | EjercicioItem.
  |
  */

  const seriesGlobales =

    progresionGlobal?.[0]
      ?.series ?? 0;

  const repsGlobales =

    progresionGlobal?.[0]
      ?.reps ?? 0;

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="flex flex-col gap-6">

      <HeaderConstructor

        rutinaInicial={
          rutinaInicial
        }

        onGuardar={
          guardarRutina
        }

      />

      <DatosGenerales

        fechaInicio={
          fechaInicio
        }

        alumnoId={
          alumnoId
        }

        cantidadBloques={
          cantidadBloques
        }

        entrenamientosPorBloque={
          entrenamientosPorBloque
        }

        onFechaInicioChange={
          setFechaInicio
        }

        onAlumnoChange={
          setAlumnoId
        }

        onCantidadBloquesChange={
          setCantidadBloques
        }

        onEntrenamientosPorBloqueChange={
          setEntrenamientosPorBloque
        }

      />

      <ProgresionGlobal

        cantidadBloques={
          cantidadBloques
        }

        progresionGlobal={
          progresionGlobal
        }

        onChange={
          setProgresionGlobal
        }

      />

      <ConfiguradorEjercicio

        draft={draft}

        actualizarDraft={
          actualizarDraft
        }

        actualizarDraftConfig={
          actualizarDraftConfig
        }

        actualizarDraftNotas={
          actualizarDraftNotas
        }

      />

      <ListaEntrenamientos

        entrenamientos={
          entrenamientos
        }

        seriesGlobales={
          seriesGlobales
        }

        repsGlobales={
          repsGlobales
        }

        eliminarEntrenamiento={
          eliminarEntrenamiento
        }

        agregarEjercicio={
          agregarEjercicio
        }

        moverEjercicio={
          moverEjercicio
        }

        eliminarEjercicio={
          eliminarEjercicio
        }

        actualizarConfiguracion={
          actualizarConfiguracion
        }

        actualizarNotas={
          actualizarNotas
        }

      />

      <button

        onClick={
          agregarEntrenamiento
        }

        className="
          bg-blue-600
          text-white
          rounded-xl
          px-5
          py-4
        "
      >

        + Agregar entrenamiento

      </button>

    </div>
  );
}