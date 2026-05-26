import "./globals.css";

import BarraLateral from "@/components/layout/BarraLateral";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <main className="flex min-h-screen bg-gray-100">
          <BarraLateral />

          <section className="flex-1 p-6">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
