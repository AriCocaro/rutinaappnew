"use client";

/*
|--------------------------------------------------------------------------
| CONSTRUCTOR NUEVO
|--------------------------------------------------------------------------
|
| Ya no usamos:
| ConstructorRutinas.tsx
|
| Ahora usamos:
| indexConstructor.tsx
|
*/

import IndexConstructor from "@/components/UsuarioInstructor/ConstructorRutinas/indexConstructor";

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function NuevaRutinaPage() {

  return (

    <div className="p-6">

      {/* ------------------------------------------------------- */}
      {/* CONSTRUCTOR NUEVO                                       */}
      {/* ------------------------------------------------------- */}

      <IndexConstructor />

    </div>

  );
}