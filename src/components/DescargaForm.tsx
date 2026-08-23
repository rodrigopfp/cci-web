"use client";

// Formulario de descarga con captura de lead (Fase 2 · paso 4).
//
// - Modo API (NEXT_PUBLIC_FORMS_API_URL definida): muestra el formulario; al
//   enviar, hace POST /api/descarga y, si responde ok, descarga y recuerda en
//   localStorage para no volver a pedirlo por el mismo documento.
// - Modo respaldo (sin API): NO pide formulario; descarga directa.
//
// Nota honesta: en un sitio estático el archivo es accesible por URL; el
// formulario captura leads, no es un candado.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { enviarFormulario, formsApiActiva } from "@/lib/forms";

const TIPOS_ORG = [
  "Empresa",
  "Institución pública",
  "Academia",
  "Profesional independiente",
  "Gremio o asociación",
  "Otro",
];

function dispararDescarga(url: string, externo: boolean) {
  if (typeof document === "undefined") return;
  if (externo) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function DescargaForm({
  slug,
  titulo,
  downloadUrl,
  esExterno,
}: {
  slug: string;
  titulo: string;
  downloadUrl: string;
  esExterno: boolean;
}) {
  const apiActiva = formsApiActiva();
  const [yaDescargado, setYaDescargado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const key = `cci-descarga:${slug}`;

  useEffect(() => {
    try {
      if (window.localStorage.getItem(key)) setYaDescargado(true);
    } catch {
      /* localStorage puede estar bloqueado */
    }
  }, [key]);

  const marcarYDescargar = () => {
    try {
      window.localStorage.setItem(key, new Date().toISOString());
    } catch {
      /* ignorar */
    }
    setYaDescargado(true);
    dispararDescarga(downloadUrl, esExterno);
  };

  // Modo respaldo (sin API) o ya descargado antes: descarga directa, sin formulario.
  if (!apiActiva || yaDescargado) {
    return (
      <div className="rounded-2xl border border-cci-line bg-cci-paper p-6">
        <a
          href={downloadUrl}
          {...(esExterno ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
          onClick={() => {
            try {
              window.localStorage.setItem(key, new Date().toISOString());
            } catch {
              /* ignorar */
            }
          }}
          className="btn-primary"
        >
          Descargar el documento
        </a>
        <p className="mt-3 text-xs text-cci-slate-light">
          {yaDescargado
            ? "Ya registramos tu descarga anterior de este documento."
            : "Descarga directa. Publicación del CCI."}
        </p>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("web2") || "")) return; // honeypot
    setEnviando(true);
    const payload = {
      nombre: String(fd.get("nombre") || ""),
      apellido: String(fd.get("apellido") || ""),
      email: String(fd.get("email") || ""),
      organizacion: String(fd.get("organizacion") || ""),
      cargo: String(fd.get("cargo") || ""),
      pais: String(fd.get("pais") || ""),
      tipoOrganizacion: String(fd.get("tipoOrganizacion") || ""),
      interes: String(fd.get("interes") || ""),
      autorizaContacto: fd.get("autorizaContacto") === "on",
      recursoSlug: slug,
      recursoTitulo: titulo,
      origen: typeof window !== "undefined" ? window.location.pathname : "",
      web2: "",
    };
    const r = await enviarFormulario("descarga", payload);
    setEnviando(false);
    if (r.ok) marcarYDescargar();
    else setError("No pudimos registrar la descarga. Intenta nuevamente en unos minutos.");
  };

  const inputCls =
    "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
  const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="rounded-2xl border border-cci-line bg-cci-paper p-6">
      <h3 className="font-display text-lg font-800 text-cci-ink">Descarga el documento</h3>
      <p className="mt-1 text-sm text-cci-slate">Completa tus datos y accede de inmediato.</p>

      {/* honeypot: oculto para personas, cebo para bots */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>No completar<input type="text" name="web2" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div><label className={labelCls} htmlFor="d-nombre">Nombre</label><input id="d-nombre" name="nombre" required className={inputCls} /></div>
        <div><label className={labelCls} htmlFor="d-apellido">Apellido</label><input id="d-apellido" name="apellido" required className={inputCls} /></div>
        <div><label className={labelCls} htmlFor="d-email">Correo corporativo</label><input id="d-email" name="email" type="email" required className={inputCls} /></div>
        <div><label className={labelCls} htmlFor="d-org">Organización</label><input id="d-org" name="organizacion" required className={inputCls} /></div>
        <div><label className={labelCls} htmlFor="d-cargo">Cargo</label><input id="d-cargo" name="cargo" className={inputCls} /></div>
        <div><label className={labelCls} htmlFor="d-pais">País</label><input id="d-pais" name="pais" className={inputCls} /></div>
        <div>
          <label className={labelCls} htmlFor="d-tipo">Tipo de organización</label>
          <select id="d-tipo" name="tipoOrganizacion" className={inputCls} defaultValue="">
            <option value="" disabled>Selecciona…</option>
            {TIPOS_ORG.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div><label className={labelCls} htmlFor="d-interes">Interés principal</label><input id="d-interes" name="interes" className={inputCls} /></div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-cci-slate">
        <label className="flex items-start gap-2">
          <input type="checkbox" name="aceptaPrivacidad" required className="mt-1" />
          <span>
            He leído y acepto la{" "}
            <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" name="autorizaContacto" className="mt-1" />
          <span>Autorizo que el CCI me contacte sobre este y otros recursos.</span>
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={enviando} className="btn-primary mt-5 disabled:opacity-60">
        {enviando ? "Enviando…" : "Descargar"}
      </button>
    </form>
  );
}
