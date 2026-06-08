"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Option = {
  id: string | number;

  nombre: string;
};

type Props = {
  options: Option[];

  selectedId: string | number;

  onSelect: (
    id: string | number
  ) => void;

  placeholder?: string;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
|
| Select con búsqueda.
|
| Características:
|
| - Busca por nombre.
| - Muestra elemento seleccionado.
| - Permite IDs string o number.
| - Se limpia automáticamente cuando selectedId vuelve a 0.
| - Mantiene sincronizado el valor con el padre.
|
*/

export default function SearchSelect({

  options,

  selectedId,

  onSelect,

  placeholder = "Buscar...",

}: Props) {

  /*
  |--------------------------------------------------------------------------
  | ESTADOS
  |--------------------------------------------------------------------------
  */

  const [
    busqueda,
    setBusqueda,
  ] = useState("");

  const [
    abierto,
    setAbierto,
  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | OPCIONES FILTRADAS
  |--------------------------------------------------------------------------
  */

  const opcionesFiltradas =
    useMemo(() => {

      if (!busqueda.trim()) {

        return [];
      }

      return options.filter(
        (option) =>
          option.nombre
            .toLowerCase()
            .includes(
              busqueda.toLowerCase()
            )
      );

    }, [
      busqueda,
      options,
    ]);

  /*
  |--------------------------------------------------------------------------
  | ELEMENTO SELECCIONADO
  |--------------------------------------------------------------------------
  |
  | Comparación por string para evitar:
  |
  | 1 === "1"
  |
  */

  const seleccionado =
    options.find(
      (option) =>
        String(option.id) ===
        String(selectedId)
    );

  /*
  |--------------------------------------------------------------------------
  | SINCRONIZAR INPUT
  |--------------------------------------------------------------------------
  |
  | Cuando cambia selectedId:
  |
  | - Si existe seleccionado → mostrar nombre
  | - Si no existe → limpiar input
  |
  */

  useEffect(() => {

    if (!seleccionado) {

      setBusqueda("");

      return;
    }

    setBusqueda(
      seleccionado.nombre
    );

  }, [seleccionado]);

  /*
  |--------------------------------------------------------------------------
  | SELECCIONAR OPCIÓN
  |--------------------------------------------------------------------------
  */

  function seleccionar(
    option: Option
  ) {

    onSelect(
      option.id
    );

    setBusqueda(
      option.nombre
    );

    setAbierto(false);
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="relative flex flex-col gap-2">

      {/* -------------------------------------------------- */}
      {/* SELECCIONADO                                       */}
      {/* -------------------------------------------------- */}

      {seleccionado && (

        <div className="text-sm text-gray-500">

          Seleccionado:

          {" "}

          <span className="font-semibold">

            {seleccionado.nombre}

          </span>

        </div>

      )}

      {/* -------------------------------------------------- */}
      {/* INPUT                                              */}
      {/* -------------------------------------------------- */}

      <input
        type="text"

        placeholder={placeholder}

        value={busqueda}

        onFocus={() =>
          setAbierto(true)
        }

        onChange={(e) => {

          setBusqueda(
            e.target.value
          );

          setAbierto(true);
        }}

        className="
          border
          rounded-lg
          px-4
          py-3
        "
      />

      {/* -------------------------------------------------- */}
      {/* DROPDOWN                                           */}
      {/* -------------------------------------------------- */}

      {abierto &&
        opcionesFiltradas.length > 0 && (

          <div
            className="
              absolute
              top-full
              mt-2
              w-full
              border
              rounded-xl
              bg-white
              shadow-lg
              overflow-hidden
              z-50
            "
          >

            {opcionesFiltradas.map(
              (option) => (

                <button
                  key={option.id}

                  type="button"

                  onClick={() =>
                    seleccionar(
                      option
                    )
                  }

                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-gray-100
                    border-b
                    transition
                  "
                >

                  {option.nombre}

                </button>

              )
            )}

          </div>

      )}

    </div>
  );
}