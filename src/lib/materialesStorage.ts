/*
|--------------------------------------------------------------------------
| DATA
|--------------------------------------------------------------------------
*/

import materiales from "@/data/materiales.json";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

import {
  Material,
} from "@/types/ejercicios";

/*
|--------------------------------------------------------------------------
| OBTENER TODOS
|--------------------------------------------------------------------------
*/

export function obtenerMateriales():
  Material[] {

  return materiales as Material[];
}

/*
|--------------------------------------------------------------------------
| OBTENER POR ID
|--------------------------------------------------------------------------
*/

export function obtenerMaterialPorId(

  id: string

): Material | undefined {

  return materiales.find(

    (material) =>

      material.id === id

  ) as Material | undefined;
}

/*
|--------------------------------------------------------------------------
| BUSCAR POR NOMBRE
|--------------------------------------------------------------------------
*/

export function buscarMateriales(

  texto: string

): Material[] {

  const busqueda =
    texto.toLowerCase();

  return obtenerMateriales().filter(

    (material) =>

      material.nombre
        .toLowerCase()
        .includes(
          busqueda
        )

  );
}