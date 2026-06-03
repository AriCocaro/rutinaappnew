"use client";

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

import DatosGenerales from "./DatosGenerales";
import ProgresionGlobal from "./ProgresionGlobal";
import ListaEntrenamientos from "./ListaEntrenamientos";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
|
| ESTE ARCHIVO ES TEMPORAL.
|
| La lógica todavía está dentro de ConstructorRutinas.tsx.
|
| Por ahora solamente verificamos que:
|
| - compile
| - encuentre los componentes
| - no rompa Next
|
| Después vamos moviendo la lógica de a poco.
|
*/

export default function IndexConstructor() {

  return (

    <div className="flex flex-col gap-6">

      <DatosGenerales />

      <ProgresionGlobal />

      <ListaEntrenamientos />

    </div>

  );
}
