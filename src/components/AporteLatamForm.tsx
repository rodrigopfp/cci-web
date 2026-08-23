"use client";

// Aporte al Panorama LATAM (Fase 2 · paso 8) — modo dual (paso 4).
// Formulario propio (con campo país + tipo de aporte específicos de la región),
// más limpio que reutilizar /aporta genérico. POST /api/latam o mailto respaldo.
// Todo aporte queda pendiente de revisión antes de publicarse.

import { useEffect, useState } from "react";
import Link from "next/link";
import { enviarFormulario, formsApiActiva, mailtoRespaldo } from "@/lib/forms";

const PAISES = [
  { codigo: "cl", nombre: "Chile" }, { codigo: "br", nombre: "Brasil" }, { codigo: "mx", nombre: "México" },
  { codigo: "co", nombre: "Colombia" }, { codigo: "pe", nombre: "Perú" }, { codigo: "ar", nombre: "Argentina" },
  { codigo: "otro", nombre: "Otro país de la región" },
];
const TIPOS = ["Una fuente", "Una corrección", "Un caso", "Una organización", "Colaboración experta"];

const inputCls =
  "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

export function AporteLatamForm() {
  const apiActiva = formsApiActiva();
  const [pais, setPais] = useState("cl");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  // Preselecciona el país desde ?pais= (viene del CTA de cada ficha).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pais");
    if (p && PAISES.some((x) => x.codigo === p)) setPais(p);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("web2") || "")) return; // honeypot
    const paisNombre = PAISES.find((x) => x.codigo === pais)?.nombre ?? pais;
    const tipoAporte = String(fd.get("tipoAporte") || "");
    const descripcion = String(fd.get("descripcion") || "");
    const enlace = String(fd.get("enlace") || "");
    const nombre = String(fd.get("nombre") || "");
    const email = String(fd.get("email") || "");
    const organizacion = String(fd.get("organizacion") || "");
    const mensaje = [
      `País: ${paisNombre}`,
      `Tipo de aporte: ${tipoAporte}`,
      "",
      descripcion,
      enlace ? `\nEnlace o fuente: ${enlace}` : "",
    ].join("\n");

    if (!apiActiva) {
      window.location.href = mailtoRespaldo(`Aporte Panorama LATAM — ${paisNombre}`, {
        País: paisNombre, "Tipo de aporte": tipoAporte, Descripción: descripcion,
        "Enlace o fuente": enlace, Nombre: nombre, Correo: email, Organización: organizacion,
      });
      setEstado("ok");
      return;
    }
    setEstado("enviando");
    const r = await enviarFormulario("latam", {
      nombre, email, organizacion, mensaje,
      origen: typeof window !== "undefined" ? window.location.pathname : "/data/latam",
      web2: "",
    });
    setEstado(r.ok ? "ok" : "error");
  };

  if (estado === "ok") {
    return (
      <div className="rounded-2xl border border-cci-line bg-cci-paper p-6">
        <h2 className="font-display text-xl font-800 text-cci-ink">¡Gracias por tu aporte!</h2>
        <p className="mt-2 text-cci-slate">
          {apiActiva
            ? "Lo revisaremos antes de publicarlo. Todo aporte al Panorama LATAM queda pendiente de revisión."
            : "Abrimos tu correo con el aporte. Envíalo para completarlo; lo revisaremos antes de publicarlo."}
        </p>
        <Link href="/data/latam" className="btn-ghost mt-4">Volver al Panorama LATAM</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-cci-line bg-white p-6 shadow-card md:p-8">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>No completar<input type="text" name="web2" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="l-pais">País</label>
            <select id="l-pais" className={inputCls} value={pais} onChange={(e) => setPais(e.target.value)}>
              {PAISES.map((p) => <option key={p.codigo} value={p.codigo}>{p.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="l-tipo">Tipo de aporte</label>
            <select id="l-tipo" name="tipoAporte" className={inputCls} defaultValue="Una fuente">
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="l-desc">Descripción</label>
          <textarea id="l-desc" name="descripcion" required rows={4} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="l-enlace">Enlace de la fuente</label>
          <input id="l-enlace" name="enlace" placeholder="https://…" className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={labelCls} htmlFor="l-nombre">Nombre</label><input id="l-nombre" name="nombre" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="l-email">Correo</label><input id="l-email" name="email" type="email" required className={inputCls} /></div>
        </div>
        <div><label className={labelCls} htmlFor="l-org">Organización (opcional)</label><input id="l-org" name="organizacion" className={inputCls} /></div>
        <label className="flex items-start gap-2 text-sm text-cci-slate">
          <input type="checkbox" name="aceptaPrivacidad" required className="mt-1" />
          <span>He leído y acepto la <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.</span>
        </label>
      </div>
      {estado === "error" && <p className="mt-3 text-sm text-red-600">No pudimos enviar tu aporte. Intenta nuevamente en unos minutos.</p>}
      <button type="submit" disabled={estado === "enviando"} data-cta="aporta-pais" data-ubicacion="latam-aporta" className="btn-primary mt-5 disabled:opacity-60">
        {estado === "enviando" ? "Enviando…" : "Enviar aporte"}
      </button>
      <p className="mt-3 text-xs text-cci-slate-light">Todo aporte queda pendiente de revisión antes de publicarse.</p>
    </form>
  );
}
