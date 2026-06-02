import BarraLateralEntrenado
from "@/components/layout/barraLateralEntrenado";

export default function LayoutEntrenado({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <main className="flex min-h-screen">

      <BarraLateralEntrenado />

      <section className="flex-1 p-6">
        {children}
      </section>

    </main>

  );
}