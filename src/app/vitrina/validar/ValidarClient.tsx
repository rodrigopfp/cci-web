"use client";

// Validación de perfil de la Vitrina (Fase 3 · ajuste 4).
//
// PRECAUCIÓN SEMÁNTICA: "validar" = la propia organización confirma o corrige su
// información. NO es una certificación ni un sello del CCI. Todo texto lo respeta.
//
// Ruta única: la empresa llega por ?empresa=slug y se resuelve en cliente contra
// el mapa embebido. Sin parámetro (o sin JS, vía fallback del servidor) se
// muestra la versión genérica con enlace a /vitrina y mailto de respaldo.

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { enviarFormulario, formsApiActiva, mailtoRespaldo, origenYUtm, EMAIL_CCI } from "@/lib/forms";

export type EmpresaValidar = { nombre: string };

const inputCls =
  "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

// Versión genérica (sin empresa): pide llegar desde la ficha y ofrece respaldo.
function Generico() {
  const mailto = `mailto:${EMAIL_CCI}?subject=${encodeURIComponent("Validación de perfil Vitrina")}&body=${encodeURIComponent(
    "Hola CCI,\n\nQuiero validar o corregir el perfil de mi organización en la Vitrina.\n\nOrganización:\nNombre y cargo:\nCorreo corporativo:\nDatos a confirmar o corregir:\n\nGracias."
  )}`;
  return (
    <section className="container-cci max-w-2xl py-16">
      <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">Validar un perfil de la Vitrina</h1>
      <p className="mt-4 text-cci-slate">
        Para validar o corregir la información de una organización, entra desde el botón
        <strong> «Validar o corregir este perfil»</strong> en su ficha de la Vitrina.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/vitrina" className="btn-primary">Ir a la Vitrina</Link>
        <a href={mailto} data-cta="validar-perfil" data-ubicacion="validar-generico" className="inline-flex items-center rounded-full border border-cci-line px-5 py-2.5 text-sm font-semibold text-cci-graphite transition hover:border-cci-graphite">
          Escribir al equipo
        </a>
      </div>
    </section>
  );
}

export function ValidarClient({ empresas }: { empresas: Record<string, EmpresaValidar> }) {
  const params = useSearchParams();
  const slug = params.get("empresa") ?? "";
  const empresa = slug ? empresas[slug] : undefined;
  const apiActiva = formsApiActiva();
  const [tipo, setTipo] = useState<"confirmacion" | "correccion">("confirmacion");
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!empresa) return <Generico />;

  const nombreEmpresa = empresa.nombre;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("web2") || "")) return; // honeypot
    const nombre = String(fd.get("nombre") || "");
    const cargo = String(fd.get("cargo") || "");
    const correo = String(fd.get("correo") || "");
    const correcciones = {
      contacto: String(fd.get("c_contacto") || ""),
      clasificacion: String(fd.get("c_clasificacion") || ""),
      descripcion: String(fd.get("c_descripcion") || ""),
      otros: String(fd.get("c_otros") || ""),
    };
    const mensaje = String(fd.get("mensaje") || "");

    if (!apiActiva) {
      // Respaldo: mailto estructurado al equipo.
      window.location.href = mailtoRespaldo(`Validación de perfil Vitrina — ${nombreEmpresa}`, {
        Organización: nombreEmpresa,
        Perfil: `/vitrina/${slug}`,
        "Solicitante": nombre,
        Cargo: cargo,
        "Correo corporativo": correo,
        Solicitud: tipo === "confirmacion" ? "Confirmo que el perfil está correcto" : "Quiero corregir información",
        "Contacto (corrección)": correcciones.contacto,
        "Clasificación / rubros (corrección)": correcciones.clasificacion,
        "Descripción (corrección)": correcciones.descripcion,
        "Otros (corrección)": correcciones.otros,
        Mensaje: mensaje,
      });
      setListo(true);
      return;
    }

    setEnviando(true);
    const r = await enviarFormulario("validacion", {
      empresaSlug: slug,
      empresaNombre: nombreEmpresa,
      nombre,
      cargo,
      correo,
      tipo,
      correcciones,
      mensaje,
      ...origenYUtm(),
      web2: "",
    });
    setEnviando(false);
    if (r.ok) setListo(true);
    else setError("No pudimos registrar tu solicitud. Intenta nuevamente en unos minutos.");
  };

  if (listo) {
    return (
      <section className="container-cci max-w-2xl py-16">
        <div className="rounded-2xl border border-cci-line bg-cci-paper p-7">
          <h1 className="font-display text-2xl font-800 text-cci-ink">¡Gracias!</h1>
          <p className="mt-2 text-cci-slate">
            Recibimos tu solicitud sobre el perfil de <strong>{nombreEmpresa}</strong>. El equipo del CCI
            revisa cada solicitud antes de aplicar cualquier cambio.
          </p>
          <Link href={`/vitrina/${slug}`} className="btn-primary mt-5">Volver al perfil</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-cci max-w-2xl py-12">
      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cci-slate-light">
        <Link href="/" className="hover:text-cci-orange-dark">Inicio</Link>
        <span>/</span>
        <Link href="/vitrina" className="hover:text-cci-orange-dark">Vitrina</Link>
        <span>/</span>
        <Link href={`/vitrina/${slug}`} className="hover:text-cci-orange-dark">{nombreEmpresa}</Link>
        <span>/</span>
        <span className="text-cci-slate">Validar</span>
      </nav>

      <h1 className="font-display text-3xl font-900 leading-tight text-cci-ink md:text-4xl">
        Estás validando el perfil de {nombreEmpresa}
      </h1>
      <p className="mt-3 text-cci-slate">
        Confirma o corrige la información de tu organización. El equipo del CCI revisa cada solicitud antes
        de aplicar cambios; validar significa que la propia organización confirma sus datos, no es una
        certificación del CCI.
      </p>

      <form onSubmit={onSubmit} data-cta="validar-perfil" data-empresa={slug} className="mt-8 rounded-2xl border border-cci-line bg-white p-6 shadow-card md:p-8">
        {/* honeypot */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label>No completar<input type="text" name="web2" tabIndex={-1} autoComplete="off" /></label>
        </div>

        {/* a) Identificación */}
        <fieldset>
          <legend className="font-display text-base font-800 text-cci-ink">Tus datos</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className={labelCls} htmlFor="v-nombre">Nombre</label><input id="v-nombre" name="nombre" required className={inputCls} /></div>
            <div><label className={labelCls} htmlFor="v-cargo">Cargo</label><input id="v-cargo" name="cargo" className={inputCls} /></div>
            <div><label className={labelCls} htmlFor="v-correo">Correo corporativo</label><input id="v-correo" name="correo" type="email" required className={inputCls} /></div>
          </div>
        </fieldset>

        {/* b) Dos caminos */}
        <fieldset className="mt-6">
          <legend className="font-display text-base font-800 text-cci-ink">¿Qué necesitas?</legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-start gap-2 text-sm text-cci-ink">
              <input type="radio" name="tipo" value="confirmacion" checked={tipo === "confirmacion"} onChange={() => setTipo("confirmacion")} className="mt-1" />
              <span>Confirmo que el perfil está correcto.</span>
            </label>
            <label className="flex items-start gap-2 text-sm text-cci-ink">
              <input type="radio" name="tipo" value="correccion" checked={tipo === "correccion"} onChange={() => setTipo("correccion")} className="mt-1" />
              <span>Quiero corregir información.</span>
            </label>
          </div>
        </fieldset>

        {/* Bloques de corrección por sección (la reclasificación fina la aplica el equipo) */}
        {tipo === "correccion" && (
          <div className="mt-5 space-y-4 rounded-xl border border-cci-line bg-cci-paper p-4">
            <p className="text-xs text-cci-slate">Describe qué corregir en cada sección. El equipo aplica los cambios en los catálogos.</p>
            <div><label className={labelCls} htmlFor="v-contacto">Contacto (web, correo, teléfono, direcciones)</label><textarea id="v-contacto" name="c_contacto" rows={2} className={inputCls} /></div>
            <div><label className={labelCls} htmlFor="v-clasificacion">Clasificación / rubros</label><textarea id="v-clasificacion" name="c_clasificacion" rows={2} className={inputCls} /></div>
            <div><label className={labelCls} htmlFor="v-descripcion">Descripción</label><textarea id="v-descripcion" name="c_descripcion" rows={3} className={inputCls} /></div>
            <div><label className={labelCls} htmlFor="v-otros">Otros</label><textarea id="v-otros" name="c_otros" rows={2} className={inputCls} /></div>
          </div>
        )}

        <div className="mt-5"><label className={labelCls} htmlFor="v-mensaje">Mensaje para el equipo (opcional)</label><textarea id="v-mensaje" name="mensaje" rows={2} className={inputCls} /></div>

        {/* c) Privacidad */}
        <label className="mt-5 flex items-start gap-2 text-sm text-cci-slate">
          <input type="checkbox" name="aceptaPrivacidad" required className="mt-1" />
          <span>
            He leído y acepto la{" "}
            <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.
          </span>
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={enviando} className="btn-primary mt-6 disabled:opacity-60">
          {enviando ? "Enviando…" : "Enviar solicitud"}
        </button>
        <p className="mt-3 text-xs text-cci-slate-light">El equipo del CCI revisa cada solicitud antes de aplicar cambios.</p>
      </form>
    </section>
  );
}
