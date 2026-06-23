/*
|--------------------------------------------------------------------------|
| SERIE REALIZADA
|--------------------------------------------------------------------------|
| Representa una serie realmente ejecutada por el alumno.
|
| Aunque el alumno inicialmente solo cargue el peso, la estructura guarda
| también reps y estado de completado para soportar:
|
| - edición manual de series/reps
| - historial completo
| - futura ejecución guiada
|
*/

export type SerieRealizada = {

  /*
  |-----------------------------------------------------------------------|
  | PESO UTILIZADO
  |-----------------------------------------------------------------------|
  |
  | Puede ser null mientras el ejercicio todavía no fue cargado
  | completamente o si en el futuro se quisiera permitir un guardado parcial
  | muy temprano.
  |
  */

  peso: number | null;

  /*
  |-----------------------------------------------------------------------|
  | REPS REALES
  |-----------------------------------------------------------------------|
  |
  | Si el alumno no edita el resultado, se pueden guardar las reps objetivo.
  | Si no completó el objetivo, acá queda el valor real.
  |
  */

  reps: number | null;

  /*
  |-----------------------------------------------------------------------|
  | COMPLETADA
  |-----------------------------------------------------------------------|
  |
  | Marca si esa serie se considera realizada.
  |
  */

  completada: boolean;

  /*
  |-----------------------------------------------------------------------|
  | RPE FUTURO
  |-----------------------------------------------------------------------|
  */

  rpe?: number | null;
};

/*
|--------------------------------------------------------------------------|
| EJERCICIO REALIZADO
|--------------------------------------------------------------------------|
| Representa un ejercicio ejecutado dentro de una sesión concreta.
|
| IMPORTANTE:
| - `idSesionEjercicio` identifica ese ejercicio dentro de ESA sesión.
| - no se usa `ejercicioId` como identificador único porque el mismo
|   ejercicio podría repetirse dentro del mismo entrenamiento.
|
*/

export type EjercicioRealizado = {

  /*
  |-----------------------------------------------------------------------|
  | ID ÚNICO DENTRO DE LA SESIÓN
  |-----------------------------------------------------------------------|
  */

  idSesionEjercicio: string;

  /*
  |-----------------------------------------------------------------------|
  | IDS DE REFERENCIA
  |-----------------------------------------------------------------------|
  */

  ejercicioId: string;
  materialId: string | null;

  /*
  |-----------------------------------------------------------------------|
  | SERIES REALMENTE EJECUTADAS
  |-----------------------------------------------------------------------|
  */

  series: SerieRealizada[];

  /*
  |-----------------------------------------------------------------------|
  | TIMER
  |-----------------------------------------------------------------------|
  */

  timerUsado: boolean;

  /*
  |-----------------------------------------------------------------------|
  | DESCANSO REAL POR SERIE
  |-----------------------------------------------------------------------|
  */

  descansoRealSegundos?: number[];

  /*
  |-----------------------------------------------------------------------|
  | NOTAS DEL ALUMNO
  |-----------------------------------------------------------------------|
  */

  notasAlumno: string;

  /*
  |-----------------------------------------------------------------------|
  | COMPLETADO
  |-----------------------------------------------------------------------|
  |
  | Marca si el ejercicio ya fue efectivamente cargado/confirmado
  | en la sesión.
  |
  */

  completado: boolean;
};

/*
|--------------------------------------------------------------------------|
| DÍA ENTRENADO
|--------------------------------------------------------------------------|
| Representa una sesión concreta de entrenamiento realizada por el alumno.
|
| Esta entidad ya no guarda solo "un día", sino el contexto completo
| necesario para distinguir:
|
| - qué rutina era
| - qué entrenamiento dentro de la rutina era
| - en qué bloque de progresión se realizó
|
*/

export type DiaEntrenado = {

  /*
  |-----------------------------------------------------------------------|
  | RUTINA Y ENTRENAMIENTO
  |-----------------------------------------------------------------------|
  */

  rutinaId: string;

  /*
  |-----------------------------------------------------------------------|
  | ID DEL ENTRENAMIENTO DE LA RUTINA
  |-----------------------------------------------------------------------|
  |
  | Corresponde al `EntrenamientoRutina.id`
  |
  */

  diaId: string;

  /*
  |-----------------------------------------------------------------------|
  | ORDEN DEL ENTRENAMIENTO DENTRO DE LA RUTINA
  |-----------------------------------------------------------------------|
  */

  entrenamientoOrden: number;

  /*
  |-----------------------------------------------------------------------|
  | BLOQUE DE PROGRESIÓN EN EL QUE SE EJECUTÓ
  |-----------------------------------------------------------------------|
  */

  bloque: number;

  /*
  |-----------------------------------------------------------------------|
  | FECHA DE EJECUCIÓN
  |-----------------------------------------------------------------------|
  */

  fecha: string;

  /*
  |-----------------------------------------------------------------------|
  | EJERCICIOS REALIZADOS
  |-----------------------------------------------------------------------|
  */

  ejercicios: EjercicioRealizado[];

  /*
  |-----------------------------------------------------------------------|
  | FINALIZADO
  |-----------------------------------------------------------------------|
  |
  | Permite distinguir:
  | - guardado parcial / sesión en curso
  | - sesión ya terminada
  |
  */

  finalizado: boolean;
};

/*
|--------------------------------------------------------------------------|
| PROGRESO DEL ALUMNO
|--------------------------------------------------------------------------|
| Historial completo del alumno.
|--------------------------------------------------------------------------|
*/

export type ProgresoAlumno = {

  alumnoId: string;

  entrenamientos: DiaEntrenado[];
};