import ejercicios from "@/data/ejercicios.json";

export function obtenerEjercicios() {
  return ejercicios;
}

export function obtenerEjercicioPorId(
  id: string
) {
  return ejercicios.find(
    (ejercicio) =>
      String(ejercicio.id) === id
  );
}
