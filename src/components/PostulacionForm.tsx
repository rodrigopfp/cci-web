"use client";

// Formulario de postulación a socio en 2 pasos (Fase 2 · paso 7).
// Modo dual (paso 4): POST /api/postulacion o mailto estructurado de respaldo.
// Conserva lo escrito al cambiar de paso (estado único), valida en línea y
// redirige a /hazte-socio/gracias tras el envío.

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { enviarFormulario, formsApiActiva, mailtoRespaldo, EMAIL_CCI } from "@/lib/forms";
import { TIPOS_ACTOR, REGIONES } from "@/lib/datos/taxonomia-vitrina";

const TAMANOS = ["1 a 10 personas", "11 a 50", "51 a 200", "201 a 500", "Más de 500"];
const CATEGORIAS = ["Oro", "Plata", "Bronce", "Academia", "Profesional Asociado"];
const EJES = ["Incidencia", "Inteligencia", "Conexión", "Conocimiento", "Posicionamiento", "Oportunidades"];

type Form = {
  nombre: string; apellido: string; email: string; telefono: string;
  organizacion: string; sitioWeb: string; cargo: string; tipoOrganizacion: string;
  tamano: string; pais: string; regiones: string[];
  categoria: string; motivo: string; ejeInteres: string; mensaje: string;
  aceptaPrivacidad: boolean; autorizaContacto: boolean;
};
const VACIO: Form = {
  nombre: "", apellido: "", email: "", telefono: "", organizacion: "", sitioWeb: "",
  cargo: "", tipoOrganizacion: "", tamano: "", pais: "", regiones: [],
  categoria: "", motivo: "", ejeInteres: "", mensaje: "", aceptaPrivacidad: false, autorizaContacto: false,
};

const inputCls =
  "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

export function PostulacionForm() {
  const router = useRouter();
  const apiActiva = formsApiActiva();
  const [paso, setPaso] = useState<1 | 2>(1);
  const [f, setF] = useState<Form>(VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const toggleRegion = (r: string) =>
    setF((p) => ({ ...p, regiones: p.regiones.includes(r) ? p.regiones.filter((x) => x !== r) : [...p.regiones, r] }));

  const validarPaso1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!f.nombre.trim()) e.nombre = "Ingresa tu nombre.";
    if (!f.apellido.trim()) e.apellido = "Ingresa tu apellido.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Ingresa un correo válido.";
    if (!f.organizacion.trim()) e.organizacion = "Ingresa tu organización.";
    if (!f.tipoOrganizacion) e.tipoOrganizacion = "Selecciona el tipo de organización.";
    if (!f.pais.trim()) e.pais = "Ingresa el país.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const continuar = () => {
    if (validarPaso1()) {
      setPaso(2);
      if (typeof window !== "undefined") window.scrollTo({ top: window.scrollY - 40, behavior: "smooth" });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEnvio(null);
    if (hp) return; // honeypot
    if (!f.aceptaPrivacidad) {
      setErrores({ aceptaPrivacidad: "Debes aceptar la política de privacidad." });
      return;
    }
    const payload = {
      ...f,
      origen: typeof window !== "undefined" ? window.location.pathname : "/hazte-socio",
      web2: "",
    };

    if (!apiActiva) {
      // Respaldo: abre un mailto estructurado y luego confirma.
      const mailto = mailtoRespaldo(`Postulación a socio CCI — ${f.organizacion || "sin organización"}`, {
        Nombre: `${f.nombre} ${f.apellido}`.trim(),
        Correo: f.email,
        Teléfono: f.telefono,
        Organización: f.organizacion,
        "Sitio web": f.sitioWeb,
        Cargo: f.cargo,
        "Tipo de organización": f.tipoOrganizacion,
        Tamaño: f.tamano,
        País: f.pais,
        Regiones: f.regiones.join(", "),
        "Categoría de interés": f.categoria,
        Motivo: f.motivo,
        "Eje de valor": f.ejeInteres,
        Mensaje: f.mensaje,
      });
      window.location.href = mailto;
      router.push("/hazte-socio/gracias");
      return;
    }

    setEnviando(true);
    const r = await enviarFormulario("postulacion", payload);
    setEnviando(false);
    if (r.ok) router.push("/hazte-socio/gracias");
    else setErrorEnvio("No pudimos enviar tu postulación. Intenta nuevamente en unos minutos.");
  };

  const Err = ({ k }: { k: string }) => (errores[k] ? <p className="mt-1 text-xs text-red-600">{errores[k]}</p> : null);

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-cci-line bg-white p-6 shadow-card md:p-8" noValidate>
      {/* Progreso */}
      <div className="mb-6 flex items-center gap-3" aria-label={`Paso ${paso} de 2`}>
        {[1, 2].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-3">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-700 ${paso >= n ? "bg-cci-orange text-white" : "bg-cci-paper text-cci-slate"}`}>{n}</span>
            <span className={`text-sm font-600 ${paso >= n ? "text-cci-ink" : "text-cci-slate-light"}`}>
              {n === 1 ? "Contacto y organización" : "Intereses y motivación"}
            </span>
            {n === 1 && <span className="hidden h-[2px] flex-1 bg-cci-line sm:block" />}
          </div>
        ))}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>No completar<input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
      </div>

      {paso === 1 ? (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={labelCls} htmlFor="p-nombre">Nombre</label><input id="p-nombre" className={inputCls} value={f.nombre} onChange={(e) => set("nombre", e.target.value)} /><Err k="nombre" /></div>
            <div><label className={labelCls} htmlFor="p-apellido">Apellido</label><input id="p-apellido" className={inputCls} value={f.apellido} onChange={(e) => set("apellido", e.target.value)} /><Err k="apellido" /></div>
            <div><label className={labelCls} htmlFor="p-email">Correo corporativo</label><input id="p-email" type="email" className={inputCls} value={f.email} onChange={(e) => set("email", e.target.value)} /><Err k="email" /></div>
            <div><label className={labelCls} htmlFor="p-tel">Teléfono (opcional)</label><input id="p-tel" className={inputCls} value={f.telefono} onChange={(e) => set("telefono", e.target.value)} /></div>
            <div><label className={labelCls} htmlFor="p-org">Organización</label><input id="p-org" className={inputCls} value={f.organizacion} onChange={(e) => set("organizacion", e.target.value)} /><Err k="organizacion" /></div>
            <div><label className={labelCls} htmlFor="p-web">Sitio web</label><input id="p-web" className={inputCls} placeholder="https://…" value={f.sitioWeb} onChange={(e) => set("sitioWeb", e.target.value)} /></div>
            <div><label className={labelCls} htmlFor="p-cargo">Cargo</label><input id="p-cargo" className={inputCls} value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></div>
            <div>
              <label className={labelCls} htmlFor="p-tipo">Tipo de organización</label>
              <select id="p-tipo" className={inputCls} value={f.tipoOrganizacion} onChange={(e) => set("tipoOrganizacion", e.target.value)}>
                <option value="">Selecciona…</option>
                {TIPOS_ACTOR.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <Err k="tipoOrganizacion" />
            </div>
            <div>
              <label className={labelCls} htmlFor="p-tam">Tamaño aproximado</label>
              <select id="p-tam" className={inputCls} value={f.tamano} onChange={(e) => set("tamano", e.target.value)}>
                <option value="">Selecciona…</option>
                {TAMANOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div><label className={labelCls} htmlFor="p-pais">País</label><input id="p-pais" className={inputCls} value={f.pais} onChange={(e) => set("pais", e.target.value)} /><Err k="pais" /></div>
          </div>
          <fieldset>
            <legend className={labelCls}>Regiones donde opera</legend>
            <div className="flex flex-wrap gap-2">
              {REGIONES.map((r) => {
                const on = f.regiones.includes(r.value);
                return (
                  <button
                    key={r.value} type="button" onClick={() => toggleRegion(r.value)} aria-pressed={on}
                    className={`rounded-full border px-3 py-1 text-xs font-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange ${on ? "border-cci-graphite bg-cci-graphite text-white" : "border-cci-line bg-white text-cci-slate hover:border-cci-slate-light"}`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-2">
            <button type="button" onClick={continuar} className="btn-primary">Continuar</button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <div>
            <span className={labelCls}>Categoría que te interesa</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((c) => (
                <button
                  key={c} type="button" onClick={() => set("categoria", c)} aria-pressed={f.categoria === c}
                  className={`rounded-full border px-4 py-1.5 text-sm font-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cci-orange ${f.categoria === c ? "border-cci-orange bg-cci-orange text-white" : "border-cci-line bg-white text-cci-graphite hover:border-cci-slate-light"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="p-motivo">Principal motivo para asociarse</label>
            <textarea id="p-motivo" rows={3} className={inputCls} value={f.motivo} onChange={(e) => set("motivo", e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="p-eje">Eje de valor que más te interesa</label>
            <select id="p-eje" className={inputCls} value={f.ejeInteres} onChange={(e) => set("ejeInteres", e.target.value)}>
              <option value="">Selecciona…</option>
              {EJES.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="p-msg">Mensaje adicional</label>
            <textarea id="p-msg" rows={3} className={inputCls} value={f.mensaje} onChange={(e) => set("mensaje", e.target.value)} />
          </div>
          <label className="flex items-start gap-2 text-sm text-cci-slate">
            <input type="checkbox" className="mt-1" checked={f.aceptaPrivacidad} onChange={(e) => set("aceptaPrivacidad", e.target.checked)} />
            <span>He leído y acepto la <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.</span>
          </label>
          <Err k="aceptaPrivacidad" />
          <label className="flex items-start gap-2 text-sm text-cci-slate">
            <input type="checkbox" className="mt-1" checked={f.autorizaContacto} onChange={(e) => set("autorizaContacto", e.target.checked)} />
            <span>Autorizo que el CCI me contacte sobre mi postulación.</span>
          </label>

          {errorEnvio && <p className="text-sm text-red-600">{errorEnvio}</p>}

          <div className="mt-2 flex flex-wrap gap-3">
            <button type="button" onClick={() => setPaso(1)} className="btn-ghost">Volver</button>
            <button type="submit" disabled={enviando} data-cta="postula-cci" data-ubicacion="hazte-socio-form" className="btn-primary disabled:opacity-60">
              {enviando ? "Enviando…" : "Enviar postulación"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-5 border-t border-cci-line pt-4 text-xs text-cci-slate-light">
        ¿Prefieres escribirnos? <a href={`mailto:${EMAIL_CCI}?subject=${encodeURIComponent("Postulación a socio CCI")}`} className="font-600 text-cci-slate hover:text-cci-orange-dark">{EMAIL_CCI}</a>
      </p>
    </form>
  );
}
