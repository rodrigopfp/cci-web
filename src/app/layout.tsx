import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CCI · Datos y evidencia de la construcción industrializada en Chile",
  description:
    "La plataforma del Consejo de Construcción Industrializada: noticias, evidencia, datos y ecosistema de la industrialización en Chile y LATAM. Cada cifra, con su fuente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
