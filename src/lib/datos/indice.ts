// ============================================================================
// ÍNDICE — acceso seguro a la fuente única de cifras
// ============================================================================
// obtenerIndicador / obtenerFuente LANZAN ERROR si el slug/id no existe: así el
// build truena de inmediato ante un consumo mal escrito, en vez de fallar en
// silencio en producción. Todos los componentes de cifras consumen desde aquí.
// ============================================================================

import { INDICADORES } from "./indicadores";
import { FUENTES } from "./fuentes";
import type { DataIndicator, DataSource } from "./tipos-indicadores";

export function obtenerIndicador(slug: string): DataIndicator {
  const indicador = INDICADORES[slug];
  if (!indicador) {
    throw new Error(`[datos] Indicador no encontrado: "${slug}". Revisa src/lib/datos/indicadores.ts.`);
  }
  return indicador;
}

export function obtenerFuente(id: string): DataSource {
  const fuente = FUENTES[id];
  if (!fuente) {
    throw new Error(`[datos] Fuente no encontrada: "${id}". Revisa src/lib/datos/fuentes.ts.`);
  }
  return fuente;
}

/** Indicador + su fuente resuelta, en una sola llamada. */
export function obtenerIndicadorConFuente(slug: string): {
  indicador: DataIndicator;
  fuente: DataSource;
} {
  const indicador = obtenerIndicador(slug);
  return { indicador, fuente: obtenerFuente(indicador.sourceId) };
}
