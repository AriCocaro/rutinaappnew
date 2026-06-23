import {
  ConfiguracionAvanzada,
  EjercicioRutina,
  EntrenamientoRutina,
  ItemEntrenamiento,
  OverrideProgresion,
  ProgresionBloque,
  Rutina,
} from "@/types/rutinas";

import {
  EjercicioEntrenamientoAlumno,
  EntrenamientoAlumno,
  GrupoVisualAlumno,
  ObjetivoEjercicioAlumno,
} from "@/types/UsuarioEntrenado/entrenamientoEntrenado";

import {
  obtenerBloqueActualEntrenamiento,
  obtenerUltimoPeso,
} from "@/lib/progreso/progresoStorage";

import {
  obtenerEjercicioPorId,
} from "@/lib/ejerciciosStorage";

import {
  obtenerMaterialPorId,
} from "@/lib/materialesStorage";

/*
|--------------------------------------------------------------------------|
| CONTEXTO DE GRUPO DURANTE EL APLANADO
|--------------------------------------------------------------------------|
|
| Mientras recorremos items anidados necesitamos recordar si un ejercicio
| proviene de un grupo, para conservar esa información en la UI del alumno.
|
*/

type GrupoContexto = {
  id: string;
  nombre: string;
} | null;

/*
|--------------------------------------------------------------------------|
| RESOLVER ENTRENAMIENTO DEL ALUMNO
|--------------------------------------------------------------------------|
|
| Convierte un EntrenamientoRutina (estructura del instructor) en una
| sesión ejecutable para el alumno.
|
| Responsabilidades:
| - calcular bloque actual
| - aplanar grupos/ejercicios
| - resolver objetivo visible (series/reps/descanso)
| - recuperar último peso por ejercicio + material
| - resolver nombres de ejercicio y material
|
| NO guarda progreso.
| NO crea DiaEntrenado.
| NO maneja UI.
|
*/

export function resolverEntrenamientoAlumno(params: {
  alumnoId: string;
  rutina: Rutina;
  entrenamiento: EntrenamientoRutina;
}): EntrenamientoAlumno {

  const {
    alumnoId,
    rutina,
    entrenamiento,
  } = params;

  /*
  |-----------------------------------------------------------------------|
  | BLOQUE ACTUAL
  |-----------------------------------------------------------------------|
  */

  const bloqueActual =
    obtenerBloqueActualEntrenamiento(
      alumnoId,
      rutina.id,
      entrenamiento.orden,
      rutina.cantidadBloques
    );

  /*
  |-----------------------------------------------------------------------|
  | ACUMULADOR DE EJERCICIOS RESUELTOS
  |-----------------------------------------------------------------------|
  */

  const ejerciciosResueltos:
    EjercicioEntrenamientoAlumno[] = [];

  /*
  |-----------------------------------------------------------------------|
  | APLANAR ITEMS DEL ENTRENAMIENTO
  |-----------------------------------------------------------------------|
  */

  aplanarItemsEntrenamiento({
    alumnoId,
    rutina,
    entrenamiento,
    bloqueActual,
    items: entrenamiento.items,
    ejerciciosResueltos,
    grupoActual: null,
  });

  /*
  |-----------------------------------------------------------------------|
  | ENTRENAMIENTO FINAL
  |-----------------------------------------------------------------------|
  */

  return {
    rutinaId: rutina.id,
    entrenamientoId: entrenamiento.id,
    entrenamientoOrden: entrenamiento.orden,
    bloqueActual,
    alumnoId,
    ejercicios: ejerciciosResueltos,
  };
}

/*
|--------------------------------------------------------------------------|
| APLANAR ITEMS DEL ENTRENAMIENTO
|--------------------------------------------------------------------------|
|
| Recorre recursivamente los items del entrenamiento y transforma cada
| ejercicio en un EjercicioEntrenamientoAlumno listo para mostrar/ejecutar.
|
*/

function aplanarItemsEntrenamiento(params: {
  alumnoId: string;
  rutina: Rutina;
  entrenamiento: EntrenamientoRutina;
  bloqueActual: number;
  items: ItemEntrenamiento[];
  ejerciciosResueltos: EjercicioEntrenamientoAlumno[];
  grupoActual: GrupoContexto;
}): void {

  const {
    alumnoId,
    rutina,
    entrenamiento,
    bloqueActual,
    items,
    ejerciciosResueltos,
    grupoActual,
  } = params;

  for (const item of items) {

    /*
    |---------------------------------------------------------------------|
    | ITEM EJERCICIO
    |---------------------------------------------------------------------|
    */

    if (item.tipo === "ejercicio") {

      const ejercicioResuelto =
        resolverEjercicioAlumno({
          alumnoId,
          rutina,
          entrenamiento,
          bloqueActual,
          ejercicio: item.contenido,
          grupoActual,
          ordenVisual:
            ejerciciosResueltos.length,
        });

      ejerciciosResueltos.push(
        ejercicioResuelto
      );

      continue;
    }

    /*
    |---------------------------------------------------------------------|
    | ITEM GRUPO
    |---------------------------------------------------------------------|
    */

    if (item.tipo === "grupo") {

      const grupo =
        item.contenido;

      aplanarItemsEntrenamiento({
        alumnoId,
        rutina,
        entrenamiento,
        bloqueActual,
        items: grupo.items,
        ejerciciosResueltos,
        grupoActual: {
          id: grupo.id,
          nombre: grupo.nombre,
        },
      });
    }
  }
}

/*
|--------------------------------------------------------------------------|
| RESOLVER EJERCICIO DEL ALUMNO
|--------------------------------------------------------------------------|
|
| Convierte un EjercicioRutina del instructor en un ejercicio ejecutable
| del alumno ya resuelto para un bloque concreto.
|
*/

function resolverEjercicioAlumno(params: {
  alumnoId: string;
  rutina: Rutina;
  entrenamiento: EntrenamientoRutina;
  bloqueActual: number;
  ejercicio: EjercicioRutina;
  grupoActual: GrupoContexto;
  ordenVisual: number;
}): EjercicioEntrenamientoAlumno {

  const {
    alumnoId,
    rutina,
    entrenamiento,
    bloqueActual,
    ejercicio,
    grupoActual,
    ordenVisual,
  } = params;

  /*
  |-----------------------------------------------------------------------|
  | OBJETIVO VISIBLE DEL EJERCICIO
  |-----------------------------------------------------------------------|
  */

  const objetivo =
    resolverObjetivoEjercicio({
      rutina,
      configuracion:
        ejercicio.configuracion,
      bloqueActual,
    });

  /*
  |-----------------------------------------------------------------------|
  | MATERIAL NORMALIZADO
  |-----------------------------------------------------------------------|
  */

  const materialId =
    ejercicio.materialId ?? null;

  /*
  |-----------------------------------------------------------------------|
  | ÚLTIMO PESO REGISTRADO
  |-----------------------------------------------------------------------|
  */

  const ultimoPeso =
    obtenerUltimoPeso(
      alumnoId,
      ejercicio.ejercicioId,
      materialId
    );

  /*
  |-----------------------------------------------------------------------|
  | NOMBRES VISIBLES
  |-----------------------------------------------------------------------|
  */

  const {
    nombreEjercicio,
    nombreMaterial,
  } = resolverNombresEjercicioYMaterial({
    ejercicioId:
      ejercicio.ejercicioId,
    materialId,
  });

  /*
  |-----------------------------------------------------------------------|
  | GRUPO VISUAL
  |-----------------------------------------------------------------------|
  */

  const grupoVisual:
    GrupoVisualAlumno | null =
      grupoActual
        ? {
            id: grupoActual.id,
            nombre: grupoActual.nombre,
          }
        : null;

  /*
  |-----------------------------------------------------------------------|
  | ID DE SESIÓN
  |-----------------------------------------------------------------------|
  |
  | Debe ser único dentro de la sesión ejecutable.
  |
  */

  const idSesionEjercicio =
    `${entrenamiento.id}__${ejercicio.id}__${ordenVisual}`;

  /*
  |-----------------------------------------------------------------------|
  | DEVOLVER EJERCICIO RESUELTO
  |-----------------------------------------------------------------------|
  */

  return {
    idSesionEjercicio,
    ejercicioRutinaId:
      ejercicio.id,
    ejercicioId:
      ejercicio.ejercicioId,
    materialId,

    rutinaId:
      rutina.id,
    entrenamientoId:
      entrenamiento.id,
    entrenamientoOrden:
      entrenamiento.orden,
    bloqueActual,

    ordenVisual,

    nombreEjercicio,
    nombreMaterial,

    notasInstructor:
      ejercicio.notas,

    objetivo,

    ultimoPeso,

    grupo: grupoVisual,
  };
}

/*
|--------------------------------------------------------------------------|
| RESOLVER NOMBRES DE EJERCICIO Y MATERIAL
|--------------------------------------------------------------------------|
|
| Estrategia:
|
| 1) Buscar el ejercicio base por ejercicioId
| 2) Tomar su nombre
| 3) Si hay materialId:
|    a) buscar primero dentro de los materiales permitidos del ejercicio
|    b) si no aparece, fallback al storage global de materiales
|
*/

function resolverNombresEjercicioYMaterial(params: {
  ejercicioId: string;
  materialId: string | null;
}): {
  nombreEjercicio: string;
  nombreMaterial: string | null;
} {

  const {
    ejercicioId,
    materialId,
  } = params;

  const ejercicioBase =
    obtenerEjercicioPorId(
      ejercicioId
    );

  /*
  |-----------------------------------------------------------------------|
  | NOMBRE DEL EJERCICIO
  |-----------------------------------------------------------------------|
  */

  const nombreEjercicio =
    ejercicioBase?.nombre ??
    "Ejercicio sin nombre";

  /*
  |-----------------------------------------------------------------------|
  | SI NO HAY MATERIAL
  |-----------------------------------------------------------------------|
  */

  if (!materialId) {
    return {
      nombreEjercicio,
      nombreMaterial: null,
    };
  }

  /*
  |-----------------------------------------------------------------------|
  | INTENTAR RESOLVER EL MATERIAL DESDE EL PROPIO EJERCICIO
  |-----------------------------------------------------------------------|
  */

  const materialDesdeEjercicio =
    ejercicioBase?.materiales.find(
      (material) =>
        material.id === materialId
    );

  if (materialDesdeEjercicio) {
    return {
      nombreEjercicio,
      nombreMaterial:
        materialDesdeEjercicio.nombre,
    };
  }

  /*
  |-----------------------------------------------------------------------|
  | FALLBACK AL STORAGE GLOBAL DE MATERIALES
  |-----------------------------------------------------------------------|
  */

  const materialGlobal =
    obtenerMaterialPorId(
      materialId
    );

  return {
    nombreEjercicio,
    nombreMaterial:
      materialGlobal?.nombre ?? null,
  };
}

/*
|--------------------------------------------------------------------------|
| RESOLVER OBJETIVO DEL EJERCICIO
|--------------------------------------------------------------------------|
|
| Prioridad:
|
| 1) Si el ejercicio tiene overrideActivo y existe override para el bloque,
|    usar ese override.
|
| 2) Si no, usar la progresión global de la rutina para ese bloque.
|
| 3) El descanso visible se resuelve así:
|    - si el override define descansoSegundos, usarlo
|    - si no, si la configuración del ejercicio tiene descansoSegundos,
|      usar ese
|    - si no, usar el descanso de la progresión global
|
*/

function resolverObjetivoEjercicio(params: {
  rutina: Rutina;
  configuracion: ConfiguracionAvanzada;
  bloqueActual: number;
}): ObjetivoEjercicioAlumno {

  const {
    rutina,
    configuracion,
    bloqueActual,
  } = params;

  /*
  |-----------------------------------------------------------------------|
  | OVERRIDE DEL BLOQUE
  |-----------------------------------------------------------------------|
  */

  const overrideDelBloque =
    obtenerOverrideDelBloque({
      configuracion,
      bloqueActual,
    });

  /*
  |-----------------------------------------------------------------------|
  | PROGRESIÓN GLOBAL DEL BLOQUE
  |-----------------------------------------------------------------------|
  */

  const progresionDelBloque =
    obtenerProgresionGlobalDelBloque({
      progresiones:
        rutina.progresionGlobal,
      bloqueActual,
    });

  /*
  |-----------------------------------------------------------------------|
  | SERIES Y REPS
  |-----------------------------------------------------------------------|
  */

  const series =
    overrideDelBloque?.series ??
    progresionDelBloque?.series ??
    0;

  const reps =
    overrideDelBloque?.reps ??
    progresionDelBloque?.reps ??
    0;

  /*
  |-----------------------------------------------------------------------|
  | DESCANSO VISIBLE
  |-----------------------------------------------------------------------|
  */

  const descansoSegundos =
    overrideDelBloque?.descansoSegundos ??
    configuracion.descansoSegundos ??
    progresionDelBloque?.descansoSegundos ??
    null;

  return {
    series,
    reps,
    descansoSegundos,
  };
}

/*
|--------------------------------------------------------------------------|
| OBTENER OVERRIDE DEL BLOQUE
|--------------------------------------------------------------------------|
*/

function obtenerOverrideDelBloque(params: {
  configuracion: ConfiguracionAvanzada;
  bloqueActual: number;
}): OverrideProgresion | null {

  const {
    configuracion,
    bloqueActual,
  } = params;

  if (!configuracion.overrideActivo) {
    return null;
  }

  const override =
    configuracion.overrideProgresiones.find(
      (item) =>
        item.bloque ===
        bloqueActual
    );

  return override ?? null;
}

/*
|--------------------------------------------------------------------------|
| OBTENER PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------|
|
| Busca la progresión exacta del bloque actual.
| Si no existe, usa como fallback la última progresión disponible.
|
*/

function obtenerProgresionGlobalDelBloque(params: {
  progresiones: ProgresionBloque[];
  bloqueActual: number;
}): ProgresionBloque | null {

  const {
    progresiones,
    bloqueActual,
  } = params;

  if (progresiones.length === 0) {
    return null;
  }

  /*
  |-----------------------------------------------------------------------|
  | BUSCAR COINCIDENCIA EXACTA
  |-----------------------------------------------------------------------|
  */

  const progresionExacta =
    progresiones.find(
      (item) =>
        item.bloque ===
        bloqueActual
    );

  if (progresionExacta) {
    return progresionExacta;
  }

  /*
  |-----------------------------------------------------------------------|
  | FALLBACK: ÚLTIMA PROGRESIÓN DISPONIBLE
  |-----------------------------------------------------------------------|
  */

  const progresionesOrdenadas =
    [...progresiones].sort(
      (a, b) =>
        a.bloque - b.bloque
    );

  return (
    progresionesOrdenadas[
      progresionesOrdenadas.length - 1
    ] ?? null
  );
}