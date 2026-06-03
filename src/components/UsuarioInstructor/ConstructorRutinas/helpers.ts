/*
|--------------------------------------------------------------------------
| OBTENER LETRA DEL DÍA
|--------------------------------------------------------------------------
|
| 1 -> A
| 2 -> B
| 3 -> C
|
*/

export function obtenerLetraDia(
  orden: number
) {
  return String.fromCharCode(
    64 + orden
  );
}