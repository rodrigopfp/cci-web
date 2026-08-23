"use client";

// Formulario de contribución (/aporta) — modo dual (Paso 4).
// - API activa: POST /api/aporte.
// - Modo respaldo (sin API): abre un mailto estructurado a cci@cdt.cl.
// Todo aporte se revisa antes de publicarse.

import { useState } from "react";
import Link from "next/link";
import { enviarFormulario, formsApiActiva, mailtoRespaldo } from "@/lib/forms";

const TIPOS: { value: string; label: string }[] = [
  { value: "caso", label: "Un caso" },
  { value: "proyecto", label: "Un proyecto" },
  { value: "indicador", label: "Un indicador o dato" },
  { value: "estudio", label: "Un estudio" },
  { value: "fuente", label: "Una fuente" },
  { value: "correccion", label: "Una corrección" },
  { value: "informacion_regional", label: "Información regional" },
  { value: "organizacion", label: "Una organización" },
];

export function AportaForm() {
  const apiActiva = formsApiActiva();
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const inputCls =
    "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
  const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("web2") || "")) return; // honeypot
    const tipoValue = String(fd.get("tipo") || "caso");
    const tipoLabel = TIPOS.find((t) => t.value === tipoValue)?.label ?? tipoValue;
    const nombre = String(fd.get("nombre") || "");
    const email = String(fd.get("email") || "");
    const organizacion = String(fd.get("organizacion") || "");
    const descripcion = String(fd.get("descripcion") || "");
    const enlace = String(fd.get("enlace") || "");

    if (!apiActiva) {
      const mailto = mailtoRespaldo(`Aporte CCI — ${tipoLabel}`, {
        Tipo: tipoLabel,
        Nombre: nombre,
        Correo: email,
        Organización: organizacion,
        Descripción: descripcion,
        "Enlace o fuente": enlace,
      });
      window.location.href = mailto;
      setEstado("ok");
      return;
    }

    setEstado("enviando");
    const mensaje = enlace ? `${descripcion}\n\nEnlace o fuente: ${enlace}` : descripcion;
    const r = await enviarFormulario("aporte", {
      tipo: tipoValue,
      nombre,
      email,
      organizacion,
      mensaje,
      origen: typeof window !== "undefined" ? window.location.pathname : "",
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
            ? "Lo recibimos y lo revisaremos antes de publicarlo. Te contactaremos si necesitamos más detalles."
            : "Abrimos tu cliente de correo con el aporte. Envía el mensaje para completarlo; lo revisaremos antes de publicarlo."}
        </p>
        <Link href="/data" className="btn-ghost mt-4">Volver a CCI Data</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-cci-line bg-white p-6 shadow-card md:p-8">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>No completar<input type="text" name="web2" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-4">
        <div>
          <label className={labelCls} htmlFor="a-tipo">Tipo de aporte</label>
          <select id="a-tipo" name="tipo" className={inputCls} defaultValue="caso">
            {TIPOS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={labelCls} htmlFor="a-nombre">Nombre</label><input id="a-nombre" name="nombre" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="a-email">Correo</label><input id="a-email" name="email" type="email" required className={inputCls} /></div>
        </div>
        <div><label className={labelCls} htmlFor="a-org">Organización (opcional)</label><input id="a-org" name="organizacion" className={inputCls} /></div>
        <div>
          <label className={labelCls} htmlFor="a-desc">Descripción del aporte</label>
          <textarea id="a-desc" name="descripcion" required rows={5} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="a-enlace">Enlace o referencia de la fuente</label>
          <input id="a-enlace" name="enlace" placeholder="https://…" className={inputCls} />
        </div>
        <label className="flex items-start gap-2 text-sm text-cci-slate">
          <input type="checkbox" name="aceptaPrivacidad" required className="mt-1" />
          <span>
            He leído y acepto la{" "}
            <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.
          </span>
        </label>
      </div>

      {estado === "error" && (
        <p className="mt-3 text-sm text-red-600">No pudimos enviar tu aporte. Intenta nuevamente en unos minutos.</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        data-cta="aporta"
        data-ubicacion="aporta"
        className="btn-primary mt-5 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar aporte"}
      </button>
      <p className="mt-3 text-xs text-cci-slate-light">Todo aporte se revisa antes de publicarse.</p>
    </form>
  );
}
