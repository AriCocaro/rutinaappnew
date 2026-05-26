import Link from "next/link";

export default function AlumnosPage() {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Alumnos
        </h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          + Agregar alumno
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar alumno..."
        className="bg-white border rounded-lg px-4 py-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <Link
          href="/alumnos/1"
          className="bg-white rounded-xl p-4 shadow-sm border hover:border-blue-500 transition"
        >
          <h2 className="font-bold text-lg">
            Juan Pérez
          </h2>

          <p className="text-gray-500">
            3 rutinas activas
          </p>
        </Link>

        <Link
          href="/alumnos/2"
          className="bg-white rounded-xl p-4 shadow-sm border hover:border-blue-500 transition"
        >
          <h2 className="font-bold text-lg">
            Ana Gómez
          </h2>

          <p className="text-gray-500">
            1 rutina activa
          </p>
        </Link>

      </div>

    </div>
  );
}
