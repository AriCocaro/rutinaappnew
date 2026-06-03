/*
|--------------------------------------------------------------------------
| PROGRESIÓN
|--------------------------------------------------------------------------
*/

export type ProgresionBloque = {

  bloque: number;

  series: number;

  reps: number;
};

/*
|--------------------------------------------------------------------------
| OVERRIDE DE PROGRESIÓN
|--------------------------------------------------------------------------
|
| Permite que un ejercicio tenga una progresión distinta
| a la progresión global de la rutina.
|
*/

export type OverrideProgresion = {

  bloque: number;

  series: number;

  reps: number;
};

/*
|--------------------------------------------------------------------------
| VALOR CONFIGURACIÓN
|--------------------------------------------------------------------------
|
| Tipo reutilizable para cualquier
| modificación de ConfiguracionAvanzada.
|
*/

export type ValorConfiguracion =

  | string

  | number

  | boolean

  | null

  | ProgresionBloque[];


/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN AVANZADA
|--------------------------------------------------------------------------
*/

export type ConfiguracionAvanzada = {

  /*
  |----------------------------------------------------------------------
  | PROGRESIÓN PERSONALIZADA
  |----------------------------------------------------------------------
  */

  overrideActivo: boolean;

  overrideProgresiones:
    OverrideProgresion[];

  /*
  |----------------------------------------------------------------------
  | INTENSIDAD
  |----------------------------------------------------------------------
  */

  rir: number | null;

  tempo: string | null;

  /*
  |----------------------------------------------------------------------
  | DESCANSO
  |----------------------------------------------------------------------
  */

  descansoSegundos:
    number | null;

  usarTimer: boolean;

  /*
  |----------------------------------------------------------------------
  | TÉCNICAS
  |----------------------------------------------------------------------
  */

  warmup: boolean;

  dropset: boolean;

  cluster: boolean;

  superserieId:
    number | null;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO DE LA RUTINA
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
| DRAFT TEMPORAL DEL CONSTRUCTOR
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
| ENTRENAMIENTO
|--------------------------------------------------------------------------
|
| Representa un entrenamiento reutilizable.
|
| NO representa:
| Lunes
| Martes
| Miércoles
|
*/

export type EntrenamientoRutina = {

  id: number;

  orden: number;

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
  |----------------------------------------------------------------------
  | ESTRUCTURA
  |----------------------------------------------------------------------
  */

  cantidadBloques: number;

  entrenamientosPorBloque:
    number;

  /*
  |----------------------------------------------------------------------
  | PROGRESIÓN GLOBAL
  |----------------------------------------------------------------------
  */

  progresionGlobal:
    ProgresionBloque[];

  /*
  |----------------------------------------------------------------------
  | ESTADO
  |----------------------------------------------------------------------
  */

  activa: boolean;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

  entrenamientos:
    EntrenamientoRutina[];
};