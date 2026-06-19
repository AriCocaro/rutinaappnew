// lib/fechas.ts

export function formatearFecha(
  fecha: string
) {

  return new Date(
    fecha
  ).toLocaleDateString(
    "es-AR"
  );
}