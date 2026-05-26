import Link from "next/link";

export default function BarraLateral() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-6">
      <h1 className="text-2xl font-bold mb-10">
        Rutina App
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard" className="hover:text-blue-500">
          Dashboard
        </Link>

        <Link href="/alumnos" className="hover:text-blue-500">
          Alumnos
        </Link>

        <Link href="/rutinas" className="hover:text-blue-500">
          Rutinas
        </Link>

        <Link href="/ejercicios" className="hover:text-blue-500">
          Ejercicios
        </Link>

        <Link href="/progreso" className="hover:text-blue-500">
          Progreso
        </Link>

      </nav>
    </aside>
  );
}