/*
|--------------------------------------------------------------------------
| EJERCICIO
|--------------------------------------------------------------------------
| Representa un ejercicio dentro de un día.
|--------------------------------------------------------------------------
*/

export type Ejercicio = {
  id: number;

  nombre: string;

  material: string;

  notas: string;

  override: boolean;

  seriesOverride: string;

  repsOverride: string;
};

/*
|--------------------------------------------------------------------------
| DÍA DE RUTINA
|--------------------------------------------------------------------------
*/

export type Dia = {
  id: number;

  ejercicios: Ejercicio[];
};

/*
|--------------------------------------------------------------------------
| RUTINA
|--------------------------------------------------------------------------
| Representa la rutina completa del alumno.
|--------------------------------------------------------------------------
*/

export type Rutina = {

  id: number;

  // Alumno asignado
  alumnoId: number;

  // Nombre visible
  nombre: string;

  // Fecha inicio
  fechaInicio: string;

  // Semanas planificadas
  semanas: number;

  // Semanas extra habilitadas
  semanasExtra: number;

  // Activa o archivada
  activa: boolean;

  // Días de entrenamiento
  dias: Dia[];
};