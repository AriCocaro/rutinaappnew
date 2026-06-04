"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import IndexConstructor from "@/components/UsuarioInstructor/ConstructorRutinas/indexConstructor";

import {
  obtenerRutinaPorId,
} from "@/lib/rutinasStorage";

import {
  Rutina,
} from "@/types/rutinas";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function EditarRutinaPage() {

  /*
  |--------------------------------------------------------------------------
  | PARAMS
  |--------------------------------------------------------------------------
  */

  const params =
    useParams();

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [
    rutina,
    setRutina,
  ] = useState<Rutina | null>(
    null
  );

  const [
    cargando,
    setCargando,
  ] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | CARGAR RUTINA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    /*
    |--------------------------------------------------------------------------
    | VALIDAR ID
    |--------------------------------------------------------------------------
    */

    if (!params?.id) {

      setCargando(false);

      return;
    }

    const id =
      Number(params.id);

    /*
    |--------------------------------------------------------------------------
    | VALIDAR NUMBER
    |--------------------------------------------------------------------------
    */

    if (isNaN(id)) {

      setCargando(false);

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | BUSCAR RUTINA
    |--------------------------------------------------------------------------
    */

    const rutinaEncontrada =
      obtenerRutinaPorId(id);

    if (rutinaEncontrada) {

      setRutina(
        rutinaEncontrada
      );
    }

    setCargando(false);

  }, [params]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (cargando) {

    return (

      <div className="p-6">

        Cargando...

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!rutina) {

    return (

      <div className="p-6">

        <h1 className="text-2xl font-bold">

          Rutina no encontrada

        </h1>

      </div>

    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="p-6">

      {/* ------------------------------------------------------- */}
      {/* MODO EDICIÓN                                            */}
      {/* ------------------------------------------------------- */}
      {/* 
        indexConstructor ya recibe la rutina existente
        y precarga:
        
        - alumno
        - fecha
        - bloques
        - progresión
        - entrenamientos
        - ejercicios
      */}

      <IndexConstructor
        rutinaInicial={rutina}
      />

    </div>

  );
}