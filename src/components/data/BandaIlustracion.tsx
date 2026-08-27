// BANDA DE ILUSTRACIÓN — respiro visual entre secciones de /data.
//
// Separador de ancho completo y altura contenida (no domina la página). Las
// ilustraciones tienen el PESO a la derecha y AIRE a la izquierda; si se
// superpone texto, va a la izquierda. object-cover con recorte centrado: nunca
// deforma y en móvil conserva la franja informativa. loading="lazy" + altura
// fija del contenedor para no provocar saltos de layout (CLS).
//
// CRÉDITO OBLIGATORIO "Ilustración CCI": son ilustraciones, NO fotografías de
// proyectos reales; no deben confundirse con evidencia. Por eso van FUERA de los
// capítulos, como separador, nunca junto a una cifra con fuente.
//
// Sin hooks → server-safe (el HTML estático trae la banda completa).

export function BandaIlustracion({
  src,
  alt,
  texto,
}: {
  src: string;
  alt: string;
  /** Texto corto opcional superpuesto; se ancla a la izquierda (sobre el aire). */
  texto?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-cci-paper h-36 sm:h-44 md:h-56">
      <img
        src={src}
        alt={alt}
        width={1600}
        height={686}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {texto && (
        <div className="absolute inset-y-0 left-0 flex max-w-[46%] items-center px-6 sm:px-10">
          <p className="font-display text-lg font-800 leading-snug text-cci-ink md:text-2xl">{texto}</p>
        </div>
      )}
      {/* Crédito discreto y visible (mismo registro que "Fotos: …" de la portada),
          adaptado a chip translúcido para leerse sobre la ilustración. */}
      <span className="absolute bottom-2 left-3 rounded bg-white/75 px-2 py-0.5 text-[11px] font-600 text-cci-slate backdrop-blur-sm">
        Ilustración CCI
      </span>
    </div>
  );
}

export default BandaIlustracion;
