import { getEici } from "@/sanity/fetch";
import { EiciCountdown } from "@/components/EiciCountdown";

export const metadata = {
  title: "EICI · Encuentro Internacional de Construcción Industrializada",
  description:
    "El EICI reúne al ecosistema de la construcción industrializada para visibilizar y acelerar la transformación del sector. Organizado por el CCI, Construye2025 y la CChC.",
};

// Fuentes públicas para la sección de historia/cifras (se enlazan discretas).
const FUENTES = [
  "https://construccionindustrializada.cl/2025/09/25/eici-2025-impulsa-la-internacionalizacion-de-la-construccion-desde-chile/",
  "https://construccionindustrializada.cl/2025/09/25/industrializacion-a-escala-nacional-eici-cierra-su-edicion-2025-con-actividades-a-lo-largo-del-pais/",
  "https://construye2025.cl/2025/08/07/eici-2025-chile-se-convierte-en-epicentro-de-la-construccion-industrializada-en-latinoamerica/",
];

const COCREADORES = [
  { nombre: "CCI", marca: "CCI", color: "#E04E00" },
  { nombre: "Construye2025", marca: "C25", color: "#009DE6" },
  { nombre: "Cámara Chilena de la Construcción", marca: "CChC", color: "#005CAD" },
];

const COLABORADORES = [
  { nombre: "CDT", marca: "CDT", color: "#5C5C5C" },
  { nombre: "CTEC", marca: "CTEC", color: "#009DE6" },
  { nombre: "AOA", marca: "AOA", color: "#005CAD" },
  { nombre: "Colegio de Ingenieros", marca: "CI", color: "#5C5C5C" },
];

const CIFRAS_2025 = [
  { valor: "+3.300", etiqueta: "Asistentes" },
  { valor: "14", etiqueta: "Ciudades, de Arica a Punta Arenas" },
  { valor: "+100", etiqueta: "Expertos" },
  { valor: "3", etiqueta: "Jornadas (8–10 de septiembre)" },
];

/** Marca tipográfica (sustituto generado, NO el logo oficial). */
function Marca({ nombre, marca, color }: { nombre: string; marca: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-cci-line bg-white px-4 py-3 shadow-card">
      <span
        className="flex h-10 shrink-0 items-center justify-center rounded-lg px-2.5 font-display text-sm font-900 tracking-tight text-white"
        style={{ background: color }}
      >
        {marca}
      </span>
      <span className="text-sm font-600 text-cci-ink">{nombre}</span>
    </div>
  );
}

export default async function EiciPage() {
  const eici = await getEici();
  const titulo = eici?.tituloProximaEdicion ?? "EICI 2027";
  const email = eici?.emailCallForSpeakers?.trim();
  const mostrarCFS = eici?.mostrarCallForSpeakers ?? true;
  const galeria = eici?.galeria ?? [];

  const mailtoHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(`Postulación Speaker ${titulo}`)}`
    : undefined;

  return (
    <>
      {/* 1 · HERO (banner oficial) + CUENTA REGRESIVA — mismo contenedor a ancho
          completo: banner y tarjeta comparten ancho y bordes alineados. En móvil,
          de borde a borde con un padding mínimo. */}
      <section className="bg-white py-6 md:py-8">
        <div className="mx-auto w-full px-3 sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/eici/eici-2027-banner.jpg"
            alt="EICI Chile 2027 — Encuentro Internacional de Construcción Industrializada, 8 al 10 de septiembre"
            className="block h-auto w-full"
          />
          <div className="mt-4 md:mt-6">
            <EiciCountdown fechaInicio={eici?.fechaInicio} />
          </div>
        </div>
      </section>

      {/* 3 · QUÉ ES EL EICI */}
      <section className="container-cci py-16 md:py-20">
        <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
          <span className="h-[2px] w-6 bg-cci-orange" />
          Qué es
        </div>
        <h2 className="max-w-3xl font-display text-2xl font-800 text-cci-ink md:text-4xl">
          El punto de encuentro de la construcción industrializada
        </h2>
        <div className="mt-5 grid max-w-3xl gap-4 text-lg leading-relaxed text-cci-slate">
          <p>
            El Encuentro Internacional de Construcción Industrializada (EICI) es organizado por el CCI,
            Construye2025 y la Cámara Chilena de la Construcción, con la colaboración de CDT, CTEC, AOA
            y el Colegio de Ingenieros.
          </p>
          <p>
            Busca visibilizar y acelerar la transformación del sector mediante soluciones
            industrializadas, bajo el lema de su edición 2025:{" "}
            <span className="font-700 text-cci-ink">Rápido · Sostenible · Rentable</span>.
          </p>
          <p>
            Da continuidad al Encuentro Nacional (ENCI) 2023, que alcanzó a más de 3.000 personas. La
            primera edición internacional se realizó del 8 al 10 de septiembre de 2025: dos jornadas en
            Santiago y una tercera con despliegue simultáneo en regiones.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-700 uppercase tracking-wide text-cci-slate-light">
              Co-creadores
            </h3>
            <div className="flex flex-col gap-3">
              {COCREADORES.map((m) => (
                <Marca key={m.nombre} {...m} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-700 uppercase tracking-wide text-cci-slate-light">
              Colaboradores
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {COLABORADORES.map((m) => (
                <Marca key={m.nombre} {...m} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-cci-slate-light">
          Marcas tipográficas provisorias; los logotipos oficiales se incorporan con su archivo y
          autorización.
        </p>
      </section>

      {/* 4 · EDICIÓN 2025 EN CIFRAS */}
      <section className="bg-cci-paper py-16 md:py-20">
        <div className="container-cci">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Edición 2025 en cifras
          </div>
          <h2 className="max-w-3xl font-display text-2xl font-800 text-cci-ink md:text-3xl">
            Industrialización a escala nacional
          </h2>
          <p className="mt-2 max-w-2xl text-cci-slate">
            Más de 100 expertos, charlas magistrales, paneles, talleres, rutas técnicas a plantas y
            obras, y el anuncio de los premios Build UP CCI.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CIFRAS_2025.map((c) => (
              <div key={c.etiqueta} className="rounded-2xl border border-cci-line bg-white p-6 shadow-card">
                <div className="font-display text-5xl font-900 leading-none text-cci-orange">
                  {c.valor}
                </div>
                <p className="mt-3 text-sm text-cci-slate">{c.etiqueta}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-cci-slate-light">
            <span>Fuente:</span>
            {FUENTES.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-600 text-cci-orange hover:text-cci-orange-dark"
              >
                CCI / Construye2025 [{i + 1}]
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · GALERÍA (solo si hay imágenes cargadas) */}
      {galeria.length > 0 && (
        <section className="container-cci py-16 md:py-20">
          <div className="mb-2 flex items-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
            <span className="h-[2px] w-6 bg-cci-orange" />
            Galería
          </div>
          <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Imágenes del EICI</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((img, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-xl border border-cci-line bg-cci-paper shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption ?? "Fotografía del EICI"}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                {img.caption && (
                  <figcaption className="px-4 py-3 text-sm text-cci-slate">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 6 · CALL FOR SPEAKERS */}
      {mostrarCFS && (
        <section className="bg-cci-graphite-dark py-16 md:py-20">
          <div className="container-cci max-w-3xl text-center">
            <div className="mx-auto mb-3 flex items-center justify-center gap-2 text-sm font-700 uppercase tracking-wide text-cci-blue-light">
              <span className="h-[2px] w-6 bg-cci-orange" />
              Call for Speakers
              <span className="h-[2px] w-6 bg-cci-orange" />
            </div>
            <h2 className="font-display text-2xl font-900 text-white md:text-4xl">
              ¿Quieres exponer en el {titulo}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Buscamos experiencias, proyectos y aprendizajes que aporten a la conversación sobre
              construcción industrializada. Si tienes algo que compartir, cuéntanos de tu propuesta y
              nos pondremos en contacto.
            </p>
            <div className="mt-8">
              {mailtoHref ? (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cci-orange px-8 py-4 text-base font-700 text-white transition-all hover:bg-cci-orange-dark hover:shadow-lg active:scale-[0.98]"
                >
                  Postula como speaker
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="text-white/60">Correo de postulaciones por confirmar.</span>
              )}
            </div>
            <p className="mt-4 text-xs text-white/50">La postulación se gestiona por correo electrónico.</p>
          </div>
        </section>
      )}
    </>
  );
}
