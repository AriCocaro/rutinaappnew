import {
  DiaEntrenado,
  EjercicioRealizado,
  ProgresoAlumno,
} from "@/types/progreso";

import {
  calcularBloqueActual,
  contarVecesRealizadasEntrenamiento,
  esMismoDiaEntrenado,
  obtenerUltimoEjercicioRealizadoDesdeHistorial,
  obtenerUltimoPesoDesdeHistorial,
  ordenarEntrenamientosPorFecha,
} from "@/lib/progreso/progresoHelpers";

/*
|--------------------------------------------------------------------------|
| STORAGE KEY
|--------------------------------------------------------------------------|
*/

const STORAGE_KEY =
  "progreso_alumnos";

/*
|--------------------------------------------------------------------------|
| OBTENER TODOS LOS PROGRESOS
|--------------------------------------------------------------------------|
*/

export function obtenerProgresos():
  ProgresoAlumno[] {

  if (typeof window === "undefined") {
    return [];
  }

  const data =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(
      data
    ) as ProgresoAlumno[];
  } catch {
    console.error(
      "Error leyendo progreso desde localStorage"
    );
    return [];
  }
}

/*
|--------------------------------------------------------------------------|
| GUARDAR TODOS LOS PROGRESOS
|--------------------------------------------------------------------------|
*/

function guardarProgresos(
  progresos: ProgresoAlumno[]
): void {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      progresos
    )
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER PROGRESO DE UN ALUMNO
|--------------------------------------------------------------------------|
*/

export function obtenerProgresoAlumno(
  alumnoId: string
): ProgresoAlumno | null {

  const progresos =
    obtenerProgresos();

  return (
    progresos.find(
      (item) =>
        item.alumnoId === alumnoId
    ) ?? null
  );
}

/*
|--------------------------------------------------------------------------|
| CREAR PROGRESO VACÍO
|--------------------------------------------------------------------------|
*/

function crearProgresoVacio(
  alumnoId: string
): ProgresoAlumno {

  return {
    alumnoId,
    entrenamientos: [],
  };
}

/*
|--------------------------------------------------------------------------|
| OBTENER O CREAR PROGRESO EN MEMORIA
|--------------------------------------------------------------------------|
*/

function obtenerOCrearProgresoAlumno(
  progresos: ProgresoAlumno[],
  alumnoId: string
): {
  progreso: ProgresoAlumno;
  index: number;
} {

  const index =
    progresos.findIndex(
      (item) =>
        item.alumnoId === alumnoId
    );

  if (index !== -1) {
    return {
      progreso: progresos[index],
      index,
    };
  }

  const nuevoProgreso =
    crearProgresoVacio(
      alumnoId
    );

  progresos.push(
    nuevoProgreso
  );

  return {
    progreso: nuevoProgreso,
    index:
      progresos.length - 1,
  };
}

/*
|--------------------------------------------------------------------------|
| GUARDAR / ACTUALIZAR ENTRENAMIENTO
|--------------------------------------------------------------------------|
|
| Hace UPSERT de una sesión:
| - si no existe, la agrega
| - si ya existe (misma rutina + día + bloque), la reemplaza
|
*/

export function guardarEntrenamiento(
  alumnoId: string,
  entrenamiento: DiaEntrenado
): void {

  const progresos =
    obtenerProgresos();

  const {
    progreso,
    index,
  } =
    obtenerOCrearProgresoAlumno(
      progresos,
      alumnoId
    );

  const entrenamientoIndex =
    progreso.entrenamientos.findIndex(
      (item) =>
        esMismoDiaEntrenado(
          item,
          entrenamiento
        )
    );

  if (entrenamientoIndex === -1) {
    progreso.entrenamientos.push(
      entrenamiento
    );
  } else {
    progreso.entrenamientos[
      entrenamientoIndex
    ] = entrenamiento;
  }

  progreso.entrenamientos =
    ordenarEntrenamientosPorFecha(
      progreso.entrenamientos
    );

  progresos[index] =
    progreso;

  guardarProgresos(
    progresos
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER ENTRENAMIENTO GUARDADO
|--------------------------------------------------------------------------|
*/

export function obtenerEntrenamientoGuardado(
  alumnoId: string,
  rutinaId: string,
  diaId: string,
  bloque: number
): DiaEntrenado | null {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  if (!progreso) {
    return null;
  }

  return (
    progreso.entrenamientos.find(
      (item) =>
        item.rutinaId === rutinaId &&
        item.diaId === diaId &&
        item.bloque === bloque
    ) ?? null
  );
}

/*
|--------------------------------------------------------------------------|
| ELIMINAR ENTRENAMIENTO
|--------------------------------------------------------------------------|
*/

export function eliminarEntrenamiento(
  alumnoId: string,
  rutinaId: string,
  diaId: string,
  bloque: number
): void {

  const progresos =
    obtenerProgresos();

  const index =
    progresos.findIndex(
      (item) =>
        item.alumnoId === alumnoId
    );

  if (index === -1) {
    return;
  }

  progresos[index].entrenamientos =
    progresos[index].entrenamientos.filter(
      (item) =>
        !(
          item.rutinaId === rutinaId &&
          item.diaId === diaId &&
          item.bloque === bloque
        )
    );

  guardarProgresos(
    progresos
  );
}

/*
|--------------------------------------------------------------------------|
| MARCAR ENTRENAMIENTO COMO FINALIZADO
|--------------------------------------------------------------------------|
*/

export function marcarEntrenamientoComoFinalizado(
  alumnoId: string,
  rutinaId: string,
  diaId: string,
  bloque: number
): void {

  const progresos =
    obtenerProgresos();

  const progresoIndex =
    progresos.findIndex(
      (item) =>
        item.alumnoId === alumnoId
    );

  if (progresoIndex === -1) {
    return;
  }

  const entrenamientoIndex =
    progresos[
      progresoIndex
    ].entrenamientos.findIndex(
      (item) =>
        item.rutinaId === rutinaId &&
        item.diaId === diaId &&
        item.bloque === bloque
    );

  if (entrenamientoIndex === -1) {
    return;
  }

  progresos[
    progresoIndex
  ].entrenamientos[
    entrenamientoIndex
  ].finalizado = true;

  guardarProgresos(
    progresos
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER VECES REALIZADAS DE UN ENTRENAMIENTO
|--------------------------------------------------------------------------|
*/

export function obtenerVecesRealizadasDeEntrenamiento(
  alumnoId: string,
  rutinaId: string,
  entrenamientoOrden: number
): number {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  return contarVecesRealizadasEntrenamiento(
    progreso,
    rutinaId,
    entrenamientoOrden
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER BLOQUE ACTUAL
|--------------------------------------------------------------------------|
*/

export function obtenerBloqueActualEntrenamiento(
  alumnoId: string,
  rutinaId: string,
  entrenamientoOrden: number,
  cantidadBloques: number
): number {

  const vecesRealizadas =
    obtenerVecesRealizadasDeEntrenamiento(
      alumnoId,
      rutinaId,
      entrenamientoOrden
    );

  return calcularBloqueActual(
    vecesRealizadas,
    cantidadBloques
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER ÚLTIMO PESO
|--------------------------------------------------------------------------|
*/

export function obtenerUltimoPeso(
  alumnoId: string,
  ejercicioId: string,
  materialId: string | null
): number | null {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  return obtenerUltimoPesoDesdeHistorial(
    progreso,
    ejercicioId,
    materialId
  );
}

/*
|--------------------------------------------------------------------------|
| OBTENER ÚLTIMO EJERCICIO REALIZADO
|--------------------------------------------------------------------------|
*/

export function obtenerUltimoEjercicioRealizado(
  alumnoId: string,
  ejercicioId: string,
  materialId: string | null
): EjercicioRealizado | null {

  const progreso =
    obtenerProgresoAlumno(
      alumnoId
    );

  return obtenerUltimoEjercicioRealizadoDesdeHistorial(
    progreso,
    ejercicioId,
    materialId
  );
}