export default function PerfilAlumnoPage() {
  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h1 className="text-3xl font-bold">
          Juan Pérez
        </h1>

        <p className="text-gray-500 mt-2">
          Alumno activo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white rounded-xl p-4 border">
          <h2 className="font-bold mb-2">
            Rutina actual
          </h2>

          <p>
            Hipertrofia - Semana 3
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <h2 className="font-bold mb-2">
            Último entrenamiento
          </h2>

          <p>
            Pierna - Martes
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl p-4 border">
        <h2 className="font-bold mb-4">
          Acciones rápidas
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Crear rutina
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Ver progreso
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Ver historial
          </button>
        </div>
      </div>

    </div>
  );
}
