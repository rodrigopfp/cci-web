import { TERMINOS, assertGlosarioValido, ultimaActualizacion } from "@/lib/datos/glosario";
import { formatDate } from "@/lib/format";
import { GlosarioClient } from "./GlosarioClient";

export const metadata = {
  title: "Glosario técnico · CCI",
  description:
    "El lenguaje común de la construcción industrializada: definiciones claras y con fuente de los términos que usa el sector, por categoría.",
};

export default function GlosarioPage() {
  // Freno de build: si el glosario es inválido (slugs duplicados, referencias
  // rotas, término publicado sin fuentes/fecha/definición), la compilación falla.
  assertGlosarioValido();

  const fecha = ultimaActualizacion();
  return <GlosarioClient terminos={TERMINOS} ultimaActualizacion={fecha ? formatDate(fecha) : undefined} />;
}
