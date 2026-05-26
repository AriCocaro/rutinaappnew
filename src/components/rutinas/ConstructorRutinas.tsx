export default function ConstructorRutina() {
  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">
          Nueva rutina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Buscar alumno..."
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="date"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Cantidad de semanas"
            className="border rounded-lg px-4 py-3"
          />

        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-4">
          Progresión global
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-sm">

          <input
            type="number"
            placeholder="Series"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Repeticiones"
            className="border rounded-lg px-4 py-3"
          />

        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-bold">
            Días de entrenamiento
          </h2>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            + Agregar día
          </button>

        </div>

        <div className="border rounded-xl p-4">

          <div className="flex items-center justify-between mb-4">

            <h3 className="font-bold text-lg">
              Día 1
            </h3>

            <button className="text-red-500">
              Eliminar
            </button>

          </div>

          <div className="flex flex-col gap-4">

            <div className="border rounded-lg p-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Ejercicio"
                  className="border rounded-lg px-4 py-3"
                />

                <select className="border rounded-lg px-4 py-3">
                  <option>
                    Seleccionar material
                  </option>

                  <option>
                    Barra
                  </option>

                  <option>
                    Mancuerna
                  </option>
                </select>

              </div>

            </div>

          </div>

          <button className="mt-4 bg-gray-200 px-4 py-2 rounded-lg">
            + Agregar ejercicio
          </button>

        </div>

      </div>

      <button className="bg-green-500 text-white py-4 rounded-xl font-bold">
        Guardar rutina
      </button>

    </div>
  );
}
