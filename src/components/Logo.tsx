import Image from "next/image";

// ============================================================================
// LOGOTIPO CCI
//
// Se usa el ARCHIVO OFICIAL entregado por el CCI (public/logo-cci.png), no una
// reconstrucción. Para fondos oscuros se usa la versión en blanco derivada del
// mismo arte (public/logo-cci-blanco.png), según la regla 1.4 del manual:
// sobre naranja, gris o negro el logotipo completo va en blanco.
//
// Nota: el manual fija un tamano mínimo de 3.5 cm de ancho para impresión; en
// pantallá se respeta el criterio equivalente de legibilidad de la bajada.
// ============================================================================

// Proporciones del arte oficial
const FULL = { w: 947, h: 381 };      // logotipo completo (con bajada)
const COMPACT = { w: 931, h: 304 };   // isotipo + CCI, sin bajada

/**
 * Logotipo oficial del CCI.
 *
 * compact: usa la versión sin la bajada. El manual fija un tamano mínimo para
 * garantizar la legibilidad de "Consejo de Construcción Industrializada"; por
 * debajo de ese umbral (barras de navegación, espacios reducidos) corresponde
 * usar la versión compacta en vez de una bajada ilegible.
 */
export function CCILogo({
  variant = "color",
  width = 150,
  compact = false,
}: {
  variant?: "color" | "white";
  width?: number;
  compact?: boolean;
}) {
  const white = variant === "white";
  const dims = compact ? COMPACT : FULL;
  const src = compact
    ? white ? "/logo-cci-compacto-blanco.png" : "/logo-cci-compacto.png"
    : white ? "/logo-cci-blanco.png" : "/logo-cci.png";

  return (
    <Image
      src={src}
      alt="CCI · Consejo de Construcción Industrializada"
      width={width}
      height={Math.round((width * dims.h) / dims.w)}
      priority
      style={{ height: "auto" }}
    />
  );
}

// ---------------------------------------------------------------------------
// Isotipo suelto en SVG, reproducido del manual: dos cubos isometricos anidados
// y rotados 60 grados entre si, inscritos en un hexagono.
// Se usa SOLO como recurso grafico decorativo (fondos, marcas de agua), nunca
// en reemplazo del logotipo oficial de arriba.
// ---------------------------------------------------------------------------

const R = 46;
const r = 22.5;
const C = 50;

function v(radius: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [C + radius * Math.cos(rad), C + radius * Math.sin(rad)];
}

const O = { d0: v(R, 0), d60: v(R, 60), d120: v(R, 120), d180: v(R, 180), d240: v(R, 240), d300: v(R, 300) };
const I = { d0: v(r, 0), d60: v(r, 60), d120: v(r, 120), d180: v(r, 180), d240: v(r, 240), d300: v(r, 300) };

const pt = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`;
const poly = (...points: [number, number][]) => `M ${points.map(pt).join(" L ")} Z`;
const line = (a: [number, number], b: [number, number]) => `M ${pt(a)} L ${pt(b)}`;

/** Isotipo a color (solo sobre fondo blanco). */
export function CCICube({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d={poly([C, C], O.d180, O.d240, O.d300)} fill="#F1873D" />
      <path d={poly([C, C], O.d300, O.d0, O.d60)} fill="#F6BA8C" />
      <path d={poly([C, C], O.d60, O.d120, O.d180)} fill="#E04E00" />
      <path d={poly([C, C], I.d240, I.d300, I.d0)} fill="#E04E00" />
      <path d={poly([C, C], I.d0, I.d60, I.d120)} fill="#F1873D" />
      <path d={poly([C, C], I.d120, I.d180, I.d240)} fill="#F6BA8C" />
    </svg>
  );
}

/** Isotipo en una tinta (linea), para fondos de color. */
export function CCICubeOutline({
  size = 40,
  color = "#FFFFFF",
  strokeWidth = 4,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    fill: "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d={poly(O.d0, O.d60, O.d120, O.d180, O.d240, O.d300)} {...common} />
      <path d={poly(I.d0, I.d60, I.d120, I.d180, I.d240, I.d300)} {...common} />
      <path d={`${line([C, C], I.d0)} ${line([C, C], I.d120)} ${line([C, C], I.d240)}`} {...common} />
      <path d={`${line(I.d60, O.d60)} ${line(I.d180, O.d180)} ${line(I.d300, O.d300)}`} {...common} />
    </svg>
  );
}
