"use client";

// Aviso de disponibilidad (Fase 3 · ajuste 3, Parte 3).
//
// Para recursos sin archivo (en preparación / próximamente / en revisión):
// reemplaza el vacío por un formulario mínimo. Modo dual:
// - API activa → POST /api/aporte con tipo "aviso-recurso".
// - Respaldo → mailto a cci@cdt.cl, asunto "Avísame: [recurso]".
// Incorpora origen + utm (Parte 5). data-cta "aviso-disponibilidad".

import { useState } from "react";
import Link from "next/link";
import { enviarFormulario, formsApiActiva, mailtoRespaldo, origenYUtm } from "@/lib/forms";

export function AvisoDisponibilidad({ slug, titulo }: { slug: string; titulo: string }) {
  const apiActiva = formsApiActiva();
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("web2") || "")) return; // honeypot
    const nombre = String(fd.get("nombre") || "");
    const email = String(fd.get("email") || "");
    const mensaje = `Solicita aviso de disponibilidad del recurso: ${titulo}`;

    if (!apiActiva) {
      // Respaldo: mailto estructurado. Se considera enviado al abrirlo.
      window.location.href = mailtoRespaldo(`Avísame: ${titulo}`, {
        Nombre: nombre,
        Correo: email,
        Recurso: titulo,
        Solicitud: "Avísame cuando esté disponible",
      });
      setListo(true);
      return;
    }

    setEnviando(true);
    const r = await enviarFormulario("aporte", {
      tipo: "aviso-recurso",
      nombre,
      email,
      mensaje,
      recursoSlug: slug,
      recursoTitulo: titulo,
      ...origenYUtm(),
      web2: "",
    });
    setEnviando(false);
    if (r.ok) setListo(true);
    else setError("No pudimos registrar tu solicitud. Intenta nuevamente en unos minutos.");
  };

  if (listo) {
    return (
      <div className="rounded-2xl border border-cci-line bg-cci-paper p-6">
        <p className="text-sm text-cci-slate">
          <strong className="text-cci-ink">Listo.</strong> Te avisaremos cuando «{titulo}» esté disponible.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-cci-line bg-white px-3 py-2 text-sm outline-none focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
  const labelCls = "mb-1 block text-xs font-600 text-cci-ink";

  return (
    <form onSubmit={onSubmit} data-cta="aviso-disponibilidad" data-recurso={slug} className="rounded-2xl border border-dashed border-cci-line bg-cci-paper p-6">
      <h3 className="font-display text-lg font-800 text-cci-ink">Avísame cuando esté disponible</h3>
      <p className="mt-1 text-sm text-cci-slate">Este recurso aún no está publicado. Déjanos tus datos y te avisaremos.</p>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>No completar<input type="text" name="web2" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="av-nombre">Nombre</label>
          <input id="av-nombre" name="nombre" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="av-email">Correo</label>
          <input id="av-email" name="email" type="email" required className={inputCls} />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-cci-slate">
        <input type="checkbox" name="aceptaPrivacidad" required className="mt-1" />
        <span>
          He leído y acepto la{" "}
          <Link href="/privacidad" className="font-600 text-cci-orange hover:text-cci-orange-dark">política de privacidad</Link>.
        </span>
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={enviando} className="btn-primary mt-5 disabled:opacity-60">
        {enviando ? "Enviando…" : "Avísame"}
      </button>
    </form>
  );
}
