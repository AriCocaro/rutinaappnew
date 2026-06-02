import BarraLateralInstructor
from "@/components/layout/barraLateralInstructor";

export default function LayoutInstructor({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <main className="flex min-h-screen">

      <BarraLateralInstructor />

      <section className="flex-1 p-6">
        {children}
      </section>

    </main>

  );
}