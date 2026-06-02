import Link from "next/link";

export default function BarraLateralInstructor() {

  return (

    <aside className="w-64 min-h-screen bg-white border-r p-6">

      <h1 className="text-2xl font-bold mb-10">
        Rutina App
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/UsuarioInstructor/dashboard">
          Dashboard
        </Link>

        <Link href="/UsuarioInstructor/entrenados">
          Entrenados
        </Link>

        <Link href="/UsuarioInstructor/rutinas">
          Rutinas
        </Link>

        <Link href="/UsuarioInstructor/ejercicios">
          Ejercicios
        </Link>

        <Link href="/UsuarioInstructor/progreso">
          Progreso
        </Link>

      </nav>

    </aside>

  );
}