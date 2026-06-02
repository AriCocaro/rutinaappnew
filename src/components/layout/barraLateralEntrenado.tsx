import Link from "next/link";

export default function BarraLateralEntrenado() {

  return (

    <aside className="w-64 min-h-screen bg-white border-r p-6">

      <h1 className="text-2xl font-bold mb-10">
        Mi Entrenamiento
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/UsuarioEntrenado">
          Inicio
        </Link>

        <Link href="/UsuarioEntrenado/1/entrenamiento">
          Entrenar
        </Link>

        <Link href="/UsuarioEntrenado/historial">
          Historial
        </Link>

      </nav>

    </aside>

  );
}