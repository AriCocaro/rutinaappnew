/*
|--------------------------------------------------------------------------
| PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------
*/

export type ProgresionBloque = {

  bloque: number;

  series: number;

  reps: number;

  descansoSegundos: number | null;
};

/*
|--------------------------------------------------------------------------
| OVERRIDE DE PROGRESIÓN
|--------------------------------------------------------------------------
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
  |----------------------------------------------------------------------
  | OVERRIDES
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

  /*
  |----------------------------------------------------------------------
  | FUTURAS TÉCNICAS
  |----------------------------------------------------------------------
  */

  restPause?: boolean;

  myoReps?: boolean;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO
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
| GRUPO DE EJERCICIOS
|--------------------------------------------------------------------------
|
| Representa ejercicios que se ejecutan juntos:
|
| - Superserie
| - Triserie
| - Circuito
| - Giant Set
| - Finisher
|
| No necesita nombre ni descripción.
| La UI decidirá cómo mostrarlo.
|
*/

export type GrupoEjercicios = {

  id: number;

  ejercicios:
    EjercicioRutina[];
};

/*
|--------------------------------------------------------------------------
| ITEM DE ENTRENAMIENTO
|--------------------------------------------------------------------------
|
| Un entrenamiento puede contener:
|
| - ejercicio individual
| - grupo de ejercicios
|
*/

export type ItemEntrenamiento =

  | {

      tipo: "ejercicio";

      contenido:
        EjercicioRutina;
    }

  | {

      tipo: "grupo";

      contenido:
        GrupoEjercicios;
    };

/*
|--------------------------------------------------------------------------
| DRAFT TEMPORAL
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
| Contiene una lista ordenada de items.
|
| Cada item puede ser:
|
| - ejercicio individual
| - grupo
|
*/

export type EntrenamientoRutina = {

  id: number;

  orden: number;

  items:
    ItemEntrenamiento[];
};

/*
|--------------------------------------------------------------------------
| ESTADO
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
  |----------------------------------------------------------------------
  | ESTRUCTURA
  |----------------------------------------------------------------------
  */

  cantidadBloques: number;

  entrenamientosPorBloque: number;

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

  estado: EstadoRutina;

  fechaUltimaEdicion: string;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

  entrenamientos:
    EntrenamientoRutina[];
};