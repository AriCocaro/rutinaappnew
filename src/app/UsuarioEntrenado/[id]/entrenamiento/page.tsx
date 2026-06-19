"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Alumno } from "@/types/alumnos";
import { obtenerAlumnos } from "@/lib/alumnosStorage";
import { obtenerResumenDashboard } from "@/lib/dashboard";

export default function EntrenamientoPage() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(null);
  const [loading, setLoading] = useState(true);

  const [resumen, setResumen] = useState<any>(null);

  // 🔄 Cargar alumnos al montar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerAlumnos();
        setAlumnos(data);

        if (data.length > 0) {
          setAlumnoSeleccionado(data[0]);
        }
      } catch (error) {
        console.error("Error cargando alumnos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // 🔄 Cargar resumen cuando cambia alumno
  useEffect(() => {
    const cargarResumen = async () => {
      if (!alumnoSeleccionado) return;

      try {
        const data = await obtenerResumenDashboard(alumnoSeleccionado.id);
        setResumen(data);
      } catch (error) {
        console.error("Error cargando resumen:", error);
      }
    };

    cargarResumen();
  }, [alumnoSeleccionado]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando entrenamiento...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Entrenamiento</h1>
        <p className="text-gray-500">
          Gestioná y seguí el progreso de tus alumnos
        </p>
      </div>

      {/* SELECTOR DE ALUMNOS */}
      <div className="flex gap-2 flex-wrap">
        {alumnos.map((alumno) => (
          <button
            key={alumno.id}
            onClick={() => setAlumnoSeleccionado(alumno)}
            className={`px-3 py-1 rounded-md border text-sm transition ${
              alumnoSeleccionado?.id === alumno.id
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {alumno.nombre}
          </button>
        ))}
      </div>

      {/* RESUMEN */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Rutinas activas</p>
          <p className="text-xl font-bold">
            {resumen?.rutinasActivas ?? 0}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Entrenamientos semana</p>
          <p className="text-xl font-bold">
            {resumen?.entrenamientosSemana ?? 0}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500">Progreso general</p>
          <p className="text-xl font-bold">
            {resumen?.progreso ?? 0}%
          </p>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="flex gap-3">
        {alumnoSeleccionado && (
          <>
            <Link
              href={`/usuarioEntrenado/${alumnoSeleccionado.id}`}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Ver ficha del alumno
            </Link>

            <Link
              href={`/rutinas/${alumnoSeleccionado.id}`}
              className="px-4 py-2 border rounded-md"
            >
              Ver rutinas
            </Link>
          </>
        )}
      </div>
    </div>
  );
}