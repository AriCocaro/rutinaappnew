// src/utils/generarId.ts

export function generarId(): string {
  return crypto.randomUUID();
}