/*
|--------------------------------------------------------------------------
| PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------
|
| Se aplica a todos los ejercicios
| salvo que tengan Override.
|
*/

export type ProgresionBloque = {

  bloque: number;

  series: number;

  reps: number;

  /*
  |--------------------------------------------------------------------------
  | DESCANSO GLOBAL
  |--------------------------------------------------------------------------
  */

  descansoSegundos: number | null;
};

/*
|--------------------------------------------------------------------------
| OVERRIDE DE PROGRESIÓN
|--------------------------------------------------------------------------
|
| Permite modificar únicamente
| un ejercicio específico.
|
*/

export type OverrideProgresion = {

  bloque: number;

  series: number;

  reps: number;

  descansoSegundos: number | null;
};

/*
|--------------------------------------------------------------------------
| VALOR CONFIGURACIÓN
|--------------------------------------------------------------------------
*/

export type ValorConfiguracion =

  | string
  | number
  | boolean
  | null
  | OverrideProgresion[];

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN AVANZADA
|--------------------------------------------------------------------------
*/

export type ConfiguracionAvanzada = {

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN PERSONALIZADA
  |--------------------------------------------------------------------------
  */

  overrideActivo: boolean;

  overrideProgresiones: OverrideProgresion[];

  /*
  |--------------------------------------------------------------------------
  | INTENSIDAD
  |--------------------------------------------------------------------------
  */

  rir: number | null;

  tempo: string | null;

  /*
  |--------------------------------------------------------------------------
  | DESCANSO
  |--------------------------------------------------------------------------
  */

  descansoSegundos: number | null;

  usarTimer: boolean;

  /*
  |--------------------------------------------------------------------------
  | TÉCNICAS AVANZADAS
  |--------------------------------------------------------------------------
  */

  warmup: boolean;

  dropset: boolean;

  cluster: boolean;

  /*
  |--------------------------------------------------------------------------
  | SUPERSERIES
  |--------------------------------------------------------------------------
  */

  superserieId: number | null;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO DE LA RUTINA
|--------------------------------------------------------------------------
|
| Ejercicio ya agregado dentro
| de un entrenamiento.
|
*/

export type EjercicioRutina = {

  id: number;

  ejercicioId: number;

  materialId: number;

  notas: string;

  configuracion: ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| DRAFT TEMPORAL DEL CONSTRUCTOR
|--------------------------------------------------------------------------
|
| Ejercicio temporal mientras
| el instructor lo configura.
|
*/

export type EjercicioDraft = {

  ejercicioId: number;

  materialId: number;

  notas: string;

  configuracion: ConfiguracionAvanzada;
};

/*
|--------------------------------------------------------------------------
| ENTRENAMIENTO
|--------------------------------------------------------------------------
*/


export type EntrenamientoRutina = {

  id: number;

  orden: number;

  ejercicios: EjercicioRutina[];
};

/*
|--------------------------------------------------------------------------
| ESTADO DE LA RUTINA
|--------------------------------------------------------------------------
*/

export type EstadoRutina =

  | "en_proceso"
  | "completa";

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
  | ESTRUCTURA
  |--------------------------------------------------------------------------
  */

  cantidadBloques: number;

  entrenamientosPorBloque: number;

  /*
  |--------------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |--------------------------------------------------------------------------
  */

  progresionGlobal: ProgresionBloque[];

  /*
  |--------------------------------------------------------------------------
  | ESTADO
  |--------------------------------------------------------------------------
  */

  activa: boolean;

  estado: EstadoRutina;

  fechaUltimaEdicion: string;

  /*
  |--------------------------------------------------------------------------
  | CONTENIDO
  |--------------------------------------------------------------------------
  */

  entrenamientos: EntrenamientoRutina[];
};