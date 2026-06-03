/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN AVANZADA
|--------------------------------------------------------------------------
*/

export type ConfiguracionAvanzada = {

  overrideActivo: boolean;

  seriesOverride: number | null;

  repsOverride: number | null;

  rir: number | null;

  tempo: string | null;

  descansoSegundos: number | null;

  usarTimer: boolean;

  warmup: boolean;

  dropset: boolean;

  cluster: boolean;

  superserieId: number | null;
};

/*
|--------------------------------------------------------------------------
| PROGRESIÓN SEMANAL
|--------------------------------------------------------------------------
*/

export type SemanaProgresion = {

  semana: number;

  series: number;

  reps: number;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO RUTINA
|--------------------------------------------------------------------------
*/

export type EjercicioRutina = {

  id: number;

  ejercicioId: number;

  materialId: number;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO DRAFT
|--------------------------------------------------------------------------
*/

export type EjercicioDraft = {

  ejercicioId: number;

  materialId: number;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| DÍA
|--------------------------------------------------------------------------
*/

export type DiaRutina = {

  id: number;

  ejercicios:
    EjercicioRutina[];
};

/*
|--------------------------------------------------------------------------
| RUTINA
|--------------------------------------------------------------------------
*/

export type Rutina = {

  id: number;

  alumnoId: string;

  fechaInicio: string;

  /*
  |--------------------------------------------------------------------------
  | BLOQUE DE PROGRESIÓN
  |--------------------------------------------------------------------------
  |
  | El entrenador lo verá como "Semanas"
  | pero internamente representa las progresiones.
  |
  */

  cantidadSemanas: number;

  /*
  |--------------------------------------------------------------------------
  | CANTIDAD DE DÍAS DEL PLAN
  |--------------------------------------------------------------------------
  */

  diasPorSemana: number;

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  progresiones:
    SemanaProgresion[];

  activa: boolean;

  dias: DiaRutina[];
};