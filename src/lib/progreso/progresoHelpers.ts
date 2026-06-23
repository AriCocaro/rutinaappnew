import {
  DiaEntrenado,
  EjercicioRealizado,
  ProgresoAlumno,
} from "@/types/progreso";

/*
|--------------------------------------------------------------------------|
| COMPARAR SI DOS DÍAS ENTRENADOS REPRESENTAN LA MISMA SESIÓN
|--------------------------------------------------------------------------|
|
| Una sesión se considera la misma si coincide:
| - rutinaId
| - diaId
| - bloque
|
*/

export function esMismoDiaEntrenado(
  a: DiaEntrenado,
  b: DiaEntrenado
): boolean {

  return (
    a.rutinaId === b.rutinaId &&
    a.diaId === b.diaId &&
    a.bloque === b.bloque
  );
}

/*
|--------------------------------------------------------------------------|
| ORDENAR ENTRENAMIENTOS POR FECHA
|--------------------------------------------------------------------------|
*/

export function ordenarEntrenamientosPorFecha(
  entrenamientos: DiaEntrenado[]
): DiaEntrenado[] {

  return [...entrenamientos].sort(
    (a, b) =>
      new Date(a.fecha).getTime() -
      new Date(b.fecha).getTime()
  );
}

/*
|--------------------------------------------------------------------------|
| CONTAR VECES REALIZADAS DE UN ENTRENAMIENTO
|--------------------------------------------------------------------------|
|
| Cuenta cuántas veces un entrenamiento concreto ya fue finalizado dentro
| de una rutina.
|
*/

export function contarVecesRealizadasEntrenamiento(
  progreso: ProgresoAlumno | null,
  rutinaId: string,
  entrenamientoOrden: number
): number {

  if (!progreso) {
    return 0;
  }

  return progreso.entrenamientos.filter(
    (entrenamiento) =>
      entrenamiento.rutinaId === rutinaId &&
      entrenamiento.entrenamientoOrden === entrenamientoOrden &&
      entrenamiento.finalizado
  ).length;
}

/*
|--------------------------------------------------------------------------|
| CALCULAR BLOQUE ACTUAL
|--------------------------------------------------------------------------|
|
| Regla:
| bloque = vecesRealizadas + 1
| con tope en cantidadBloques.
|
*/

export function calcularBloqueActual(
  vecesRealizadas: number,
  cantidadBloques: number
): number {

  if (cantidadBloques <= 0) {
    return 1;
  }

  const bloqueCalculado =
    vecesRealizadas + 1;

  return Math.min(
    Math.max(bloqueCalculado, 1),
    cantidadBloques
  );
}

/*
|--------------------------------------------------------------------------|
| CREAR DÍA ENTRENADO VACÍO
|--------------------------------------------------------------------------|
*/

export function crearDiaEntrenadoVacio(params: {
  rutinaId: string;
  diaId: string;
  entrenamientoOrden: number;
  bloque: number;
  fecha?: string;
}): DiaEntrenado {

  return {
    rutinaId: params.rutinaId,
    diaId: params.diaId,
    entrenamientoOrden: params.entrenamientoOrden,
    bloque: params.bloque,
    fecha: params.fecha ?? new Date().toISOString(),
    ejercicios: [],
    finalizado: false,
  };
}

/*
|--------------------------------------------------------------------------|
| UPSERT DE EJERCICIO EN DÍA ENTRENADO
|--------------------------------------------------------------------------|
|
| Si el ejercicio ya existe dentro del día, lo reemplaza.
| Si no existe, lo agrega.
|
| La identidad se resuelve por `idSesionEjercicio`.
|
*/

export function upsertEjercicioEnDiaEntrenado(
  dia: DiaEntrenado,
  ejercicio: EjercicioRealizado
): DiaEntrenado {

  const index =
    dia.ejercicios.findIndex(
      (item) =>
        item.idSesionEjercicio === ejercicio.idSesionEjercicio
    );

  if (index === -1) {
    return {
      ...dia,
      ejercicios: [
        ...dia.ejercicios,
        ejercicio,
      ],
    };
  }

  const nuevosEjercicios =
    [...dia.ejercicios];

  nuevosEjercicios[index] =
    ejercicio;

  return {
    ...dia,
    ejercicios: nuevosEjercicios,
  };
}

/*
|--------------------------------------------------------------------------|
| OBTENER ÚLTIMO PESO DESDE HISTORIAL
|--------------------------------------------------------------------------|
|
| Busca el último peso no nulo para una combinación exacta de:
| - ejercicioId
| - materialId
|
*/

export function obtenerUltimoPesoDesdeHistorial(
  progreso: ProgresoAlumno | null,
  ejercicioId: string,
  materialId: string | null
): number | null {

  if (!progreso) {
    return null;
  }

  const entrenamientos =
    [...progreso.entrenamientos].reverse();

  for (const entrenamiento of entrenamientos) {

    const ejercicios =
      [...entrenamiento.ejercicios].reverse();

    for (const ejercicio of ejercicios) {

      const mismoEjercicio =
        ejercicio.ejercicioId === ejercicioId;

      const mismoMaterial =
        ejercicio.materialId === materialId;

      if (!mismoEjercicio || !mismoMaterial) {
        continue;
      }

      const series =
        [...ejercicio.series].reverse();

      for (const serie of series) {
        if (serie.peso !== null) {
          return serie.peso;
        }
      }
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------|
| OBTENER ÚLTIMO EJERCICIO REALIZADO DESDE HISTORIAL
|--------------------------------------------------------------------------|
*/

export function obtenerUltimoEjercicioRealizadoDesdeHistorial(
  progreso: ProgresoAlumno | null,
  ejercicioId: string,
  materialId: string | null
): EjercicioRealizado | null {

  if (!progreso) {
    return null;
  }

  const entrenamientos =
    [...progreso.entrenamientos].reverse();

  for (const entrenamiento of entrenamientos) {

    const ejercicioEncontrado =
      [...entrenamiento.ejercicios]
        .reverse()
        .find(
          (ejercicio) =>
            ejercicio.ejercicioId === ejercicioId &&
            ejercicio.materialId === materialId
        );

    if (ejercicioEncontrado) {
      return ejercicioEncontrado;
    }
  }

  return null;
}