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
|
| Utilizada tanto por ejercicios
| como por grupos.
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
| Representa cualquier conjunto de ejercicios
| ejecutados como bloque:
|
| - Superserie
| - Triserie
| - Circuito
| - Giant Set
| - Finisher
|
| La aplicación NO guarda un tipo.
| El entrenador simplemente crea un grupo.
|
| El grupo puede tener:
|
| - notas propias
| - override propio
| - configuración propia
|
| Además cada ejercicio interno
| mantiene su configuración individual.
|
*/

export type GrupoEjercicios = {

  id: number;

  notas: string;

  configuracion:
    ConfiguracionAvanzada;

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
|
| Utilizado para construir
| un ejercicio antes de agregarlo.
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
| Cada item puede ser:
|
| - ejercicio
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