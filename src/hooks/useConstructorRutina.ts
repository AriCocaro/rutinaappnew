import { useState } from "react";

import {
  Rutina,
  ProgresionBloque,
} from "@/types/rutinas";

type Props = {
  rutinaInicial?: Rutina;
};

export function useConstructorRutina({
  rutinaInicial,
}: Props) {
  /*
  |--------------------------------------------------------------------------
  | DATOS GENERALES
  |--------------------------------------------------------------------------
  */

  const [
    alumnoId,
    setAlumnoId,
  ] = useState(
    rutinaInicial?.alumnoId ??
      "alumno_001"
  );

  const [
    fechaInicio,
    setFechaInicio,
  ] = useState(
    rutinaInicial?.fechaInicio ??
      ""
  );

  const [
    cantidadBloques,
    setCantidadBloques,
  ] = useState<number | null>(
    rutinaInicial?.cantidadBloques ??
      4
  );

  const [
    entrenamientosPorBloque,
    setEntrenamientosPorBloque,
  ] = useState<number | null>(
    rutinaInicial
      ?.entrenamientosPorBloque ??

      rutinaInicial
        ?.entrenamientos.length ??

      3
  );

  /*
  |--------------------------------------------------------------------------
  | PROGRESION GLOBAL
  |--------------------------------------------------------------------------
  */

  const [
    progresionGlobal,
    setProgresionGlobal,
  ] = useState<ProgresionBloque[]>(

    rutinaInicial
      ?.progresionGlobal ?? []
  );

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
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
  };
}