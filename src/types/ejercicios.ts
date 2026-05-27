/*
|--------------------------------------------------------------------------
| POSTURAS
|--------------------------------------------------------------------------
| Posiciones posibles del cuerpo durante el ejercicio.
|--------------------------------------------------------------------------
*/

export type Postura =
  | "parado"
  | "sentado"
  | "tumbado"
  | "inclinado"
  | "arrodillado";

/*
|--------------------------------------------------------------------------
| MATERIAL
|--------------------------------------------------------------------------
| Equipamiento utilizado para ejecutar ejercicios.
|--------------------------------------------------------------------------
*/

export type Material = {

  // ID único
  id: number;

  // Nombre visible
  nombre: string;

  // Peso inicial sugerido
  pesoBase?: number;

  // Incremento habitual
  incrementoBase?: number;
};

/*
|--------------------------------------------------------------------------
| EJERCICIO BASE
|--------------------------------------------------------------------------
| Representa el ejercicio del catálogo.
|--------------------------------------------------------------------------
*/

export type EjercicioBase = {

  // ID único
  id: number;

  // Nombre ejercicio
  nombre: string;

  // Descripción opcional
  descripcion?: string;

  // Posición corporal principal
  postura: Postura;

  // Materiales permitidos
  materiales: Material[];

  // Activo o archivado
  activo: boolean;

  /*
  |--------------------------------------------------------------------------
  | ORIGEN DEL EJERCICIO
  |--------------------------------------------------------------------------
  | Define quién creó el ejercicio.
  |--------------------------------------------------------------------------
  */

  creadoPor:
    | "sistema"
    | "gimnasio"
    | "entrenador";
};