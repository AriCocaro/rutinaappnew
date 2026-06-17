"use client";

/*
|--------------------------------------------------------------------------
| HOOKS
|--------------------------------------------------------------------------
*/

import { useRutina } from "@/hooks/useRutina";
import { useConstructorRutina } from "@/hooks/useConstructorRutina";
import GrupoOverlay from "./GrupoOverlay";
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

export default function ConstructorRutina({
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

  agregarEjercicio,
  agregarGrupo,
  agregarEjercicioAGrupo,

  moverItem,

  eliminarEjercicio,
  eliminarGrupo,

  grupoEliminarEjercicio,
  grupoMoverEjercicio,

  actualizarConfiguracion,
  actualizarConfiguracionGrupo,
  grupoActualizarConfigEjercicio,

  actualizarNotas,
  actualizarNotasGrupo,
  grupoActualizarNotasEjercicio,

  generarRutina,

} = useRutina(
  rutinaInicial
);

  /*
  |--------------------------------------------------------------------------
  | OVERLAY DE GRUPO
  |--------------------------------------------------------------------------
  |
  | Estado visual para crear grupos personalizados.
  |
  */

  const [
    grupoModal,
    setGrupoModal,
  ] = useState<{
    entrenamientoId: number;
  } | null>(null);

  
  /*
  |--------------------------------------------------------------------------
  | GUARDAR RUTINA
  |--------------------------------------------------------------------------
  */

  function guardarRutina() {

    if (!alumnoId) {

      alert(
        "Seleccionar entrenado"
      );

      return;
    }

    if (!fechaInicio) {

      alert(
        "Seleccionar fecha de inicio"
      );

      return;
    }

    if (!cantidadBloques) {

      alert(
        "Ingresar cantidad de bloques"
      );

      return;
    }

    if (!entrenamientosPorBloque) {

      alert(
        "Ingresar cantidad de días por bloque"
      );

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

      alert(
        "No se pudo generar la rutina"
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR
    |--------------------------------------------------------------------------
    */

    if (rutinaInicial) {

      actualizarRutina(
        rutina
      );

      alert(
        "Rutina actualizada correctamente"
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
      "Rutina creada correctamente"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SERIES Y REPS GLOBALES
  |--------------------------------------------------------------------------
  |
  | Se utilizan como referencia visual
  | para los ejercicios.
  |
  */

  const seriesGlobales =
    progresionGlobal?.[0]?.series ?? 0;

  const repsGlobales =
    progresionGlobal?.[0]?.reps ?? 0;

  /*
  |--------------------------------------------------------------------------
  | RESUMEN DE DÍAS
  |--------------------------------------------------------------------------
  */

  const maxDias =
    entrenamientosPorBloque ?? 0;

  const diasActuales =
    entrenamientos.length;

  const diasFaltantes =
    Math.max(
      0,
      maxDias - diasActuales
    );

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="flex flex-col gap-6">

      <HeaderConstructor
        rutinaInicial={rutinaInicial}
        onGuardar={guardarRutina}
      />

      <DatosGenerales

        fechaInicio={fechaInicio}

        alumnoId={alumnoId}

        cantidadBloques={cantidadBloques}

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


     <ListaEntrenamientos

  entrenamientos={entrenamientos}

  seriesGlobales={seriesGlobales}
  repsGlobales={repsGlobales}

  cantidadBloques={cantidadBloques ?? 0}

  eliminarEntrenamiento={eliminarEntrenamiento}

  agregarEjercicio={agregarEjercicio}
  agregarGrupo={agregarGrupo}
  agregarEjercicioAGrupo={agregarEjercicioAGrupo}

  moverItem={moverItem}

  eliminarEjercicio={eliminarEjercicio}
  eliminarGrupo={eliminarGrupo}

  grupoEliminarEjercicio={
    grupoEliminarEjercicio
  }

  grupoMoverEjercicio={
    grupoMoverEjercicio
  }

  actualizarConfiguracion={
    actualizarConfiguracion
  }

  actualizarConfiguracionGrupo={
    actualizarConfiguracionGrupo
  }

  grupoActualizarConfigEjercicio={
    grupoActualizarConfigEjercicio
  }

  actualizarNotas={
    actualizarNotas
  }

  actualizarNotasGrupo={
    actualizarNotasGrupo
  }

  grupoActualizarNotasEjercicio={
    grupoActualizarNotasEjercicio
  }

  draft={draft}

  actualizarDraft={
    actualizarDraft
  }

/>

     
      {/* ----------------------------------------------------- */}
      {/* RESUMEN                                               */}
      {/* ----------------------------------------------------- */}

      {maxDias > 0 && (

        <div
          className="
            border
            rounded-xl
            p-4
            bg-gray-50
          "
        >

          <div className="font-medium">

            Días configurados:
            {" "}
            {diasActuales}
            {" / "}
            {maxDias}

          </div>

          {diasFaltantes > 0 && (

            <div
              className="
                text-sm
                text-amber-600
                mt-1
              "
            >

              Faltan
              {" "}
              {diasFaltantes}
              {" "}
              día(s) para completar
              la planificación.

            </div>

          )}

          {diasFaltantes === 0 && (

            <div
              className="
                text-sm
                text-green-600
                mt-1
              "
            >

              Rutina completa.

            </div>

          )}

        </div>

      )}

      {/* ----------------------------------------------------- */}
      {/* CREAR DÍA                                             */}
      {/* ----------------------------------------------------- */}

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

        + Crear Día

      </button>

      {/* ----------------------------------------------------- */}
      {/* GUARDAR                                               */}
      {/* ----------------------------------------------------- */}

      <button

        onClick={
          guardarRutina
        }

        className="
          bg-green-600
          text-white
          rounded-xl
          px-5
          py-4
        "
      >

        Guardar rutina

      </button>

    </div>

  );
}