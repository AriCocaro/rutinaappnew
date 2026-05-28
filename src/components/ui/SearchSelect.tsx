"use client";

import { useMemo, useState } from "react";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Option = {

  id: number;

  nombre: string;
};

type Props = {

  options: Option[];

  selectedId: number;

  onSelect: (id: number) => void;

  placeholder?: string;
};

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
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

  const [busqueda, setBusqueda] =
    useState("");

  const [abierto, setAbierto] =
    useState(false);

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

      return options.filter((option) =>

        option.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
      );

    }, [busqueda, options]);

  /*
  |--------------------------------------------------------------------------
  | SELECCIONADO
  |--------------------------------------------------------------------------
  */

  const seleccionado = options.find(
    (option) =>
      option.id === selectedId
  );

  /*
  |--------------------------------------------------------------------------
  | SELECCIONAR
  |--------------------------------------------------------------------------
  */

  function seleccionar(
    option: Option
  ) {

    onSelect(option.id);

    setBusqueda("");

    setAbierto(false);
  }

  return (

    <div className="relative flex flex-col gap-2">

      {/* LABEL SELECCIONADO */}

      {seleccionado && (

        <div className="text-sm text-gray-500">

          Seleccionado:
          {" "}

          <span className="font-semibold">

            {seleccionado.nombre}

          </span>

        </div>

      )}

      {/* INPUT */}

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

        className="border rounded-lg px-4 py-3"
      />

      {/* DROPDOWN */}

      {abierto &&
        opcionesFiltradas.length > 0 && (

          <div className="absolute top-full mt-2 w-full border rounded-xl bg-white shadow-lg overflow-hidden z-50">

            {opcionesFiltradas.map(
              (option) => (

                <button
                  key={option.id}

                  onClick={() =>
                    seleccionar(option)
                  }

                  className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b transition"
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