type Props = {

  grupoDraft: {

    entrenamientoId: number;

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