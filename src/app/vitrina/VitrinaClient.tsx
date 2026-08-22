"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { EmpresaVitrina } from "@/data/types";
import { VitrinaCard, VitrinaMiniCard } from "@/components/VitrinaCard";
import { CATEGORIAS_VITRINA, ZONAS_VITRINA, NIVEL_INFO, ordenNivel } from "@/lib/vitrina";

// ⚠️ TODO Rodrigo: reemplazar por el correo OFICIAL del CCI que debe recibir los
// requerimientos de la Vitrina. El sitio es estático y no procesa formularios:
// el botón abre el correo del visitante con estos datos pre-rellenados.
// A futuro esto puede conectarse a un servicio de formularios (Formspree,
// Netlify Forms, etc.) o al tipo "requerimiento" del panel vía un backend.
const EMAIL_CCI = "contacto@construccionindustrializada.cl";

function mailtoRequerimiento(): string {
  const asunto = encodeURIComponent("Requerimiento de proveedor · Vitrina CCI");
  const cuerpo = encodeURIComponent(
    [
      "Hola CCI, busco un proveedor de construcción industrializada. Mis datos:",
      "",
      "· Qué necesito: ",
      "· Categoría de solución: ",
      "· Región / zona de la obra: ",
      "· Plazo estimado: ",
      "· Nombre y empresa: ",
      "· Email y teléfono de contacto: ",
      "",
      "Gracias.",
    ].join("\n")
  );
  return `mailto:${EMAIL_CCI}?subject=${asunto}&body=${cuerpo}`;
}

function ordenar(a: EmpresaVitrina, b: EmpresaVitrina): number {
  return ordenNivel(a.nivel) - ordenNivel(b.nivel) || a.nombre.localeCompare(b.nombre, "es");
}

// Estilo de chip de filtro, idéntico para «solución» y «zona» (patrón Actualidad):
// borde gris sobre blanco cuando está inactivo, oscuro cuando está activo.
function chipCls(active: boolean): string {
  return `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
    active
      ? "border-cci-graphite bg-cci-graphite text-white"
      : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"
  }`;
}

export function VitrinaClient({ empresas }: { empresas: EmpresaVitrina[] }) {
  const [cat, setCat] = useState<string>("Todas");
  const [zona, setZona] = useState<string>("Todas");

  const { destacados, resto, profesionales, academia, total } = useMemo(() => {
    const match = (e: EmpresaVitrina) =>
      (cat === "Todas" || e.categorias.includes(cat)) && (zona === "Todas" || e.zonas.includes(zona));
    const filtradas = empresas.filter(match);
    const grilla = filtradas.filter((e) => NIVEL_INFO[e.nivel].enGrilla);
    const destacados = grilla.filter((e) => e.nivel === "oro").slice(0, 6);
    const destSet = new Set(destacados.map((e) => e.id));
    const resto = grilla.filter((e) => !destSet.has(e.id)).sort(ordenar);
    const profesionales = filtradas.filter((e) => e.nivel === "profesional").sort(ordenar);
    const academia = filtradas.filter((e) => e.nivel === "academia").sort(ordenar);
    return { destacados, resto, profesionales, academia, total: grilla.length };
  }, [empresas, cat, zona]);

  const sinPublicar = empresas.length === 0;

  return (
    <>
      {/* a) CABECERA — fondo claro */}
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Vitrina de socios
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Quién construye industrializado en Chile
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            El directorio del ecosistema de la construcción industrializada: empresas socias por su nivel de
            membresía y publicaciones de empresas no socias, siempre identificadas. Encuentra a tu proveedor
            por tipo de solución y zona.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-cci-slate-light">
            Directorio en actualización: las descripciones y datos de contacto de cada empresa se están
            completando.
          </p>
        </div>
      </section>

      {sinPublicar ? (
        /* ESTADO VACÍO */
        <section className="container-cci py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-cci-line bg-cci-paper px-8 py-16 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-cci-orange-soft text-cci-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-800 text-cci-ink">Vitrina en levantamiento</h2>
            <p className="mt-2 text-cci-slate">
              Estamos sumando a las empresas del ecosistema industrializado. Muy pronto podrás explorar el
              directorio por tipo de solución y zona.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* b) FILTROS: dos filas de chips (solución y zona), scroll horizontal en móvil */}
          <section className="border-b border-cci-line bg-white">
            <div className="container-cci flex flex-col gap-3 py-4">
              <div className="relative md:contents">
                <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
                  {(["Todas", ...CATEGORIAS_VITRINA] as string[]).map((c) => (
                    <button key={c} onClick={() => setCat(c)} className={`${chipCls(cat === c)} capitalize`}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
              </div>
              <div className="relative md:contents">
                <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible">
                  {(["Todas", ...ZONAS_VITRINA] as string[]).map((z) => (
                    <button key={z} onClick={() => setZona(z)} className={chipCls(zona === z)}>
                      {z === "Todas" ? "Todas las zonas" : z}
                    </button>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
              </div>
            </div>
          </section>

          {/* c) SOCIOS DESTACADOS (oro) — fondo oscuro */}
          {destacados.length > 0 && (
            <section className="bg-cci-graphite-dark py-12 md:py-14">
              <div className="container-cci">
                <h2 className="font-display text-2xl font-800 text-white md:text-3xl">Socios destacados</h2>
                <p className="mt-2 max-w-2xl text-white/60">Empresas con membresía Oro del Consejo.</p>
                <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {destacados.map((e) => (
                    <VitrinaMiniCard key={e.id} empresa={e} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* d) TODAS LAS EMPRESAS */}
          <section className="container-cci py-12 md:py-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Todas las empresas</h2>
              <span className="shrink-0 text-sm text-cci-slate-light">
                {total} {total === 1 ? "empresa" : "empresas"}
              </span>
            </div>

            {resto.length === 0 && destacados.length === 0 ? (
              <div className="rounded-xl border border-dashed border-cci-line bg-cci-paper py-20 text-center text-cci-slate">
                No hay empresas con esos criterios. Prueba con otra categoría o zona.
              </div>
            ) : resto.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resto.map((e) => (
                  <VitrinaCard key={e.id} empresa={e} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-cci-slate">Las empresas de esta selección están en «Socios destacados».</p>
            )}
          </section>

          {/* e) AVISO DE TRANSPARENCIA */}
          <section className="container-cci pb-4">
            <p className="rounded-lg border border-cci-line bg-cci-paper px-5 py-4 text-xs leading-relaxed text-cci-slate">
              Las publicaciones de empresas no socias están identificadas con la insignia{" "}
              <span className="font-700 text-cci-orange-dark">«Publicación pagada»</span>. El CCI no respalda las
              afirmaciones técnicas o comerciales de cada empresa: la responsabilidad por la información publicada
              es de la empresa que la aporta.
            </p>
          </section>

          {/* f) CAPTACIÓN DE DEMANDA */}
          <section className="border-y border-cci-line bg-cci-orange-soft">
            <div className="container-cci flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-800 text-cci-ink md:text-2xl">
                  ¿Buscas un proveedor industrializado?
                </h2>
                <p className="mt-1 max-w-xl text-sm text-cci-graphite">
                  Cuéntanos qué necesitas y te orientamos con las empresas del ecosistema que pueden resolverlo.
                </p>
              </div>
              <a href={mailtoRequerimiento()} className="btn-primary shrink-0 self-start whitespace-nowrap sm:self-auto">
                Publicar mi requerimiento
              </a>
            </div>
          </section>

          {/* g) SOCIOS PROFESIONALES Y ACADEMIA — listado simple, dos columnas */}
          {(profesionales.length > 0 || academia.length > 0) && (
            <section className="bg-cci-paper py-12 md:py-14">
              <div className="container-cci">
                <h2 className="font-display text-2xl font-800 text-cci-ink md:text-3xl">Socios profesionales y academia</h2>

                {profesionales.length > 0 && (
                  <div className="mt-7">
                    <h3 className="mb-2 text-sm font-700 uppercase tracking-wide text-cci-orange">Socios profesionales</h3>
                    <ul className="grid gap-x-10 sm:grid-cols-2">
                      {profesionales.map((e) => (
                        <li
                          key={e.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-cci-line py-2.5"
                        >
                          <span className="font-600 text-cci-ink">{e.nombre}</span>
                          {e.titular && <span className="text-sm text-cci-slate-light">{e.titular}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {academia.length > 0 && (
                  <div className="mt-9">
                    <h3 className="mb-2 text-sm font-700 uppercase tracking-wide text-cci-orange">Academia</h3>
                    <ul className="grid gap-x-10 sm:grid-cols-2">
                      {academia.map((e) => (
                        <li key={e.id} className="border-b border-cci-line py-2.5">
                          <span className="font-600 text-cci-ink">{e.nombre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
