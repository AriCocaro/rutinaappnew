/*
|--------------------------------------------------------------------------
| PROGRESIÓN GLOBAL DEL BLOQUE
|--------------------------------------------------------------------------
*/

export type ProgresionBloque = {

  bloque: number;

  series: number;

  reps: number;

  descansoSegundos:
    number | null;
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

  descansoSegundos:
    number | null;
};

/*
|--------------------------------------------------------------------------
| VALORES POSIBLES DE CONFIGURACIÓN
|--------------------------------------------------------------------------
|
| Todos los campos que pueden ser modificados
| dinámicamente desde formularios.
|
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
|
| Utilizada tanto por:
|
| - ejercicios
| - grupos
|
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
|
| Datos reales del ejercicio dentro
| de una rutina.
|
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
| ITEM EJERCICIO
|--------------------------------------------------------------------------
*/

export interface EjercicioItem {

  tipo: "ejercicio";

  contenido:
    EjercicioRutina;
}

/*
|--------------------------------------------------------------------------
| GRUPO
|--------------------------------------------------------------------------
|
| Ahora un grupo contiene ITEMS.
|
| Esto permite:
|
| Grupo
| ├─ Ejercicio
| ├─ Ejercicio
| └─ Grupo
|     ├─ Ejercicio
|     └─ Ejercicio
|
*/

export interface GrupoEjercicios {

  id: number;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;

  items:
    ItemEntrenamiento[];
}

/*
|--------------------------------------------------------------------------
| ITEM GRUPO
|--------------------------------------------------------------------------
*/

export interface GrupoItem {

  tipo: "grupo";

  contenido:
    GrupoEjercicios;
}

/*
|--------------------------------------------------------------------------
| ITEM DE ENTRENAMIENTO
|--------------------------------------------------------------------------
|
| Unidad mínima renderizable.
|
| Toda la aplicación debería trabajar
| únicamente con ItemEntrenamiento.
|
*/

export type ItemEntrenamiento =

  | EjercicioItem
  | GrupoItem;

/*
|--------------------------------------------------------------------------
| DRAFT TEMPORAL
|--------------------------------------------------------------------------
|
| Utilizado mientras el instructor
| configura un ejercicio.
|
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
| Lista ordenada de items.
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
| ESTADO DE RUTINA
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

  estado: EstadoRutina;

  fechaUltimaEdicion:
    string;

  /*
  |----------------------------------------------------------------------
  | CONTENIDO
  |----------------------------------------------------------------------
  */

  entrenamientos:
    EntrenamientoRutina[];
};