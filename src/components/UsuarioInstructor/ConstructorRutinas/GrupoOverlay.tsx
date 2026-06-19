"use client";

type Props = {

  grupoDraft: {

    entrenamientoId: string;

    nombre: string;

    notas: string;
  };

  onChange: (

    campo:
      | "nombre"
      | "notas",

    valor: string

  ) => void;

  onCancelar: () => void;

  onGuardar: () => void;
};

export default function GrupoOverlay({

  grupoDraft,

  onChange,

  onCancelar,

  onGuardar,

}: Props) {

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-lg
          flex
          flex-col
          gap-4
        "
      >

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Crear grupo
        </h2>

        <input

          type="text"

          value={
            grupoDraft.nombre
          }

          onChange={(e) =>
            onChange(
              "nombre",
              e.target.value
            )
          }

          placeholder="Nombre del grupo"

          className="
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <textarea

          value={
            grupoDraft.notas
          }

          onChange={(e) =>
            onChange(
              "notas",
              e.target.value
            )
          }

          placeholder="Notas"

          rows={4}

          className="
            border
            rounded-xl
            px-4
            py-3
          "
        />

        <div
          className="
            flex
            justify-end
            gap-3
            pt-2
          "
        >

          <button

            type="button"

            onClick={
              onCancelar
            }

            className="
              px-4
              py-2
              rounded-xl
              border
            "
          >
            Cancelar
          </button>

          <button

            type="button"

            onClick={
              onGuardar
            }

            className="
              px-4
              py-2
              rounded-xl
              bg-purple-600
              text-white
            "
          >
            Crear grupo
          </button>

        </div>

      </div>

    </div>
  );
}