"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { EmpresaVitrina } from "@/data/types";
import { VitrinaCard } from "@/components/VitrinaCard";
import { ordenNivel } from "@/lib/vitrina";
import {
  TIPOS_ACTOR,
  SOLUCIONES,
  MATERIALES,
  CAPACIDADES,
  REGIONES,
  RELACIONES_CCI,
  type OpcionTaxonomia,
} from "@/lib/datos/taxonomia-vitrina";

const EMAIL_CCI = "cci@cdt.cl";

function mailtoRequerimiento(): string {
  const asunto = encodeURIComponent("Requerimiento Vitrina CCI");
  const cuerpo = encodeURIComponent(
    "Hola CCI,\n\nBusco un proveedor de construcción industrializada.\n\nQué necesito:\nRegión / zona de la obra:\nNombre y contacto:\n\nGracias.",
  );
  return `mailto:${EMAIL_CCI}?subject=${asunto}&body=${cuerpo}`;
}

// --- Configuración de las 6 dimensiones filtrables (D1-D6) -------------------
type FiltroKey = "actor" | "solucion" | "material" | "capacidad" | "region" | "relacion";

const GRUPOS: { key: FiltroKey; label: string; opciones: readonly OpcionTaxonomia[] }[] = [
  { key: "actor", label: "Tipo de actor", opciones: TIPOS_ACTOR },
  { key: "solucion", label: "Solución", opciones: SOLUCIONES },
  { key: "material", label: "Material", opciones: MATERIALES },
  { key: "capacidad", label: "Capacidad", opciones: CAPACIDADES },
  { key: "region", label: "Cobertura", opciones: REGIONES },
  { key: "relacion", label: "Relación con el CCI", opciones: RELACIONES_CCI },
];

const CAMPO: Record<FiltroKey, (e: EmpresaVitrina) => string[]> = {
  actor: (e) => e.actorTypes,
  solucion: (e) => e.solutions,
  material: (e) => e.materials,
  capacidad: (e) => e.capabilities,
  region: (e) => e.regions,
  relacion: (e) => e.cciRelationship,
};

type Filtros = Record<FiltroKey, string[]>;
const FILTROS_VACIOS: Filtros = { actor: [], solucion: [], material: [], capacidad: [], region: [], relacion: [] };

type Orden = "relevancia" | "nombre" | "validacion";

// Prioridad para el orden por estado de validación.
const RANGO_VALIDACION: Record<string, number> = {
  validado_por_organizacion: 0,
  fuente_oficial: 1,
  revisado_por_cci: 2,
  en_actualizacion: 3,
  pendiente: 4,
};

// --- Sincronización con la URL (sin router: history API) --------------------
function leerURL(): { filtros: Filtros; orden: Orden } {
  const filtros: Filtros = { actor: [], solucion: [], material: [], capacidad: [], region: [], relacion: [] };
  let orden: Orden = "relevancia";
  if (typeof window === "undefined") return { filtros, orden };
  const p = new URLSearchParams(window.location.search);
  (Object.keys(filtros) as FiltroKey[]).forEach((k) => {
    const raw = p.get(k);
    if (raw) filtros[k] = raw.split(",").filter(Boolean);
  });
  const o = p.get("orden");
  if (o === "nombre" || o === "validacion") orden = o;
  return { filtros, orden };
}

function escribirURL(filtros: Filtros, orden: Orden) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  (Object.keys(filtros) as FiltroKey[]).forEach((k) => {
    if (filtros[k].length) p.set(k, filtros[k].join(","));
  });
  if (orden !== "relevancia") p.set("orden", orden);
  const qs = p.toString();
  const url = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

function chipCls(active: boolean): string {
  return `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange focus-visible:ring-offset-1 ${
    active
      ? "border-cci-graphite bg-cci-graphite text-white"
      : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"
  }`;
}

export function VitrinaClient({ empresas }: { empresas: EmpresaVitrina[] }) {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [orden, setOrden] = useState<Orden>("relevancia");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Al montar, hidratar desde la URL (mejora progresiva: sin JS la lista sale entera).
  useEffect(() => {
    const { filtros: f, orden: o } = leerURL();
    setFiltros(f);
    setOrden(o);
  }, []);

  // Persistir en la URL cada cambio.
  useEffect(() => {
    escribirURL(filtros, orden);
  }, [filtros, orden]);

  // Cerrar el panel con Escape; enfocar el panel al abrir.
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  const toggle = useCallback((key: FiltroKey, value: string) => {
    setFiltros((prev) => {
      const on = prev[key].includes(value);
      return { ...prev, [key]: on ? prev[key].filter((v) => v !== value) : [...prev[key], value] };
    });
  }, []);

  const limpiar = useCallback(() => setFiltros(FILTROS_VACIOS), []);

  const activos = (Object.keys(filtros) as FiltroKey[]).reduce((n, k) => n + filtros[k].length, 0);

  // Opciones presentes en los datos, con conteo (solo mostramos lo que existe).
  const opcionesPresentes = useMemo(() => {
    const conteos: Record<FiltroKey, Map<string, number>> = {
      actor: new Map(), solucion: new Map(), material: new Map(),
      capacidad: new Map(), region: new Map(), relacion: new Map(),
    };
    for (const e of empresas) {
      (Object.keys(conteos) as FiltroKey[]).forEach((k) => {
        for (const v of CAMPO[k](e)) conteos[k].set(v, (conteos[k].get(v) ?? 0) + 1);
      });
    }
    return conteos;
  }, [empresas]);

  const resultados = useMemo(() => {
    const match = (e: EmpresaVitrina) =>
      (Object.keys(filtros) as FiltroKey[]).every(
        (k) => filtros[k].length === 0 || CAMPO[k](e).some((v) => filtros[k].includes(v))
      );
    const lista = empresas.filter(match);
    const cmp =
      orden === "nombre"
        ? (a: EmpresaVitrina, b: EmpresaVitrina) => a.nombre.localeCompare(b.nombre, "es")
        : orden === "validacion"
        ? (a: EmpresaVitrina, b: EmpresaVitrina) =>
            (RANGO_VALIDACION[a.validationStatus ?? "pendiente"] ?? 9) -
              (RANGO_VALIDACION[b.validationStatus ?? "pendiente"] ?? 9) ||
            a.nombre.localeCompare(b.nombre, "es")
        : (a: EmpresaVitrina, b: EmpresaVitrina) =>
            ordenNivel(a.nivel) - ordenNivel(b.nivel) || a.nombre.localeCompare(b.nombre, "es");
    return [...lista].sort(cmp);
  }, [empresas, filtros, orden]);

  const sinPublicar = empresas.length === 0;

  return (
    <>
      {/* a) CABECERA — fondo claro (se conserva) */}
      <section className="border-b border-cci-line bg-cci-paper">
        <div className="container-cci py-12 md:py-14">
          <div className="inline-flex w-fit items-center whitespace-nowrap border-l-4 border-cci-orange bg-cci-orange-soft py-2 pl-4 pr-3 text-[11px] font-700 uppercase leading-none tracking-[0.15em] text-cci-orange-dark md:text-xs">
            Vitrina de socios
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-900 leading-tight text-cci-ink md:text-5xl">
            Quién construye industrializado en Chile
          </h1>
          <p className="mt-4 max-w-2xl text-cci-slate">
            El directorio del ecosistema de la construcción industrializada: filtra por tipo de actor,
            solución, material, capacidad, cobertura y relación con el CCI.
          </p>
        </div>
      </section>

      {sinPublicar ? (
        <section className="container-cci py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-cci-line bg-cci-paper px-8 py-16 text-center">
            <h2 className="font-display text-xl font-800 text-cci-ink">Vitrina en levantamiento</h2>
            <p className="mt-2 text-cci-slate">Muy pronto podrás explorar el directorio del ecosistema.</p>
          </div>
        </section>
      ) : (
        <>
          {/* b) TOOLBAR: botón Filtros + chips activos + orden + conteo */}
          <section className="sticky top-[105px] z-20 border-b border-cci-line bg-white/95 backdrop-blur">
            <div className="container-cci flex flex-wrap items-center gap-3 py-3">
              <button
                onClick={() => setPanelOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-cci-line bg-white px-4 py-2 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange focus-visible:ring-offset-1"
                aria-haspopup="dialog"
                aria-expanded={panelOpen}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
                </svg>
                Filtros
                {activos > 0 && (
                  <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cci-orange px-1.5 text-[11px] font-700 text-white">
                    {activos}
                  </span>
                )}
              </button>

              {/* chips activos removibles (contexto sin muro de chips) */}
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {(Object.keys(filtros) as FiltroKey[]).flatMap((k) =>
                  filtros[k].map((v) => {
                    const grupo = GRUPOS.find((g) => g.key === k);
                    const label = grupo?.opciones.find((o) => o.value === v)?.label ?? v;
                    return (
                      <button
                        key={`${k}-${v}`}
                        onClick={() => toggle(k, v)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cci-graphite px-3 py-1 text-xs font-semibold text-white transition hover:bg-cci-graphite-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
                      >
                        {label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        </svg>
                      </button>
                    );
                  })
                )}
                {activos > 0 && (
                  <button
                    onClick={limpiar}
                    className="text-xs font-semibold text-cci-orange hover:text-cci-orange-dark focus:outline-none focus-visible:underline"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <label className="ml-auto flex items-center gap-2 text-xs text-cci-slate">
                <span className="hidden sm:inline">Ordenar</span>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value as Orden)}
                  className="rounded-full border border-cci-line bg-white px-3 py-1.5 text-xs font-semibold text-cci-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="nombre">Nombre (A–Z)</option>
                  <option value="validacion">Estado de validación</option>
                </select>
              </label>
              <span className="shrink-0 text-sm font-600 text-cci-slate-light" aria-live="polite">
                {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"}
              </span>
            </div>
          </section>

          {/* c) RESULTADOS */}
          <section className="container-cci py-10 md:py-12">
            {resultados.length === 0 ? (
              <div className="rounded-xl border border-dashed border-cci-line bg-cci-paper py-20 text-center">
                <p className="text-cci-slate">
                  No hay resultados con esa combinación; prueba quitar un filtro.
                </p>
                {activos > 0 && (
                  <button onClick={limpiar} className="btn-ghost mt-4">
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resultados.map((e) => (
                  <VitrinaCard key={e.id} empresa={e} />
                ))}
              </div>
            )}
          </section>

          {/* d) AVISO DE TRANSPARENCIA (se conserva) */}
          <section className="container-cci pb-4">
            <p className="rounded-lg border border-cci-line bg-cci-paper px-5 py-4 text-xs leading-relaxed text-cci-slate">
              Las publicaciones de empresas no socias están identificadas con la insignia{" "}
              <span className="font-700 text-cci-orange-dark">«Publicación pagada»</span>. El CCI no respalda las
              afirmaciones técnicas o comerciales de cada empresa: la responsabilidad por la información publicada
              es de la empresa que la aporta.
            </p>
          </section>

          {/* e) CAPTACIÓN DE DEMANDA (se conserva) */}
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
              <a href={mailtoRequerimiento()} data-cta="requerimiento" data-ubicacion="vitrina" className="btn-primary shrink-0 self-start whitespace-nowrap sm:self-auto">
                Publicar mi requerimiento
              </a>
            </div>
          </section>

          {/* f) BANDA DE CIERRE — membresía (nivel 1) + validar perfil (contextual) */}
          <section className="relative overflow-hidden bg-cci-graphite-dark">
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{ backgroundImage: "radial-gradient(circle at 88% 20%, #E04E00 0%, transparent 45%), radial-gradient(circle at 5% 90%, #5C5C5C 0%, transparent 45%)" }}
            />
            <div className="container-cci relative py-14 text-center md:py-16">
              <h2 className="mx-auto max-w-3xl font-display text-2xl font-900 leading-tight text-white md:text-3xl">
                ¿Tu organización construye industrializado?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-white/75">
                Postula a ser socio del CCI, o valida y actualiza el perfil de tu organización en la Vitrina.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="cierre-vitrina" className="btn-primary">
                  Postula a ser socio CCI
                </Link>
                <Link
                  href="/vitrina/validar"
                  data-cta="valida-perfil"
                  data-ubicacion="cierre-vitrina"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Valida el perfil de tu organización
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* DRAWER DE FILTROS — overlay para móvil y escritorio */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Filtros de la Vitrina">
          <button
            className="absolute inset-0 bg-cci-graphite-dark/50 motion-reduce:transition-none"
            aria-label="Cerrar filtros"
            onClick={() => setPanelOpen(false)}
          />
          <div
            ref={panelRef}
            tabIndex={-1}
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-cci-line px-6 py-4">
              <h2 className="font-display text-lg font-800 text-cci-ink">Filtros</h2>
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-full p-1.5 text-cci-slate hover:bg-cci-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange"
                aria-label="Cerrar"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {GRUPOS.map((g) => {
                const presentes = g.opciones.filter((o) => (opcionesPresentes[g.key].get(o.value) ?? 0) > 0);
                if (presentes.length === 0) return null;
                return (
                  <fieldset key={g.key} className="mb-6">
                    <legend className="mb-2 text-sm font-700 uppercase tracking-wide text-cci-orange">
                      {g.label}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {presentes.map((o) => {
                        const n = opcionesPresentes[g.key].get(o.value) ?? 0;
                        const active = filtros[g.key].includes(o.value);
                        return (
                          <button
                            key={o.value}
                            onClick={() => toggle(g.key, o.value)}
                            aria-pressed={active}
                            className={chipCls(active)}
                          >
                            {o.label} <span className={active ? "text-white/70" : "text-cci-slate-light"}>{n}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-cci-line px-6 py-4">
              <button
                onClick={limpiar}
                className="text-sm font-semibold text-cci-slate hover:text-cci-orange-dark focus:outline-none focus-visible:underline"
              >
                Limpiar todo
              </button>
              <button onClick={() => setPanelOpen(false)} className="btn-primary">
                Ver {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
