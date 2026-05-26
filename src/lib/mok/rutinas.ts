import type { Rutina } from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| MOCK RUTINA
|--------------------------------------------------------------------------
| Datos falsos para probar la app antes del backend.
|--------------------------------------------------------------------------
*/

export const rutinaMock: Rutina = {

  id: 1,

  alumnoId: 14,

  nombre: "Hipertrofia Mayo",

  fechaInicio: "2026-05-26",

  semanas: 4,

  semanasExtra: 2,

  activa: true,

  dias: [

    {
      id: 1,

      ejercicios: [

        {
          id: 1,

          nombre: "Sentadilla",

          material: "Barra",

          notas: "Controlar bajada",

          override: false,

          seriesOverride: "",

          repsOverride: "",
        },

        {
          id: 2,

          nombre: "Prensa",

          material: "Máquina",

          notas: "",

          override: true,

          seriesOverride: "5",

          repsOverride: "10",
        },
      ],
    },

    {
      id: 2,

      ejercicios: [

        {
          id: 3,

          nombre: "Press banca",

          material: "Barra",

          notas: "",

          override: false,

          seriesOverride: "",

          repsOverride: "",
        },
      ],
    },
  ],
};