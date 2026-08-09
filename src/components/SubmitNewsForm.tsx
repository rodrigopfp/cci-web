"use client";
import { useState } from "react";

export function SubmitNewsForm() {
  const [sent, setSent] = useState(false);
  const inputClass = "w-full rounded-lg border border-cci-line bg-white px-4 py-2.5 text-sm text-cci-ink outline-none transition focus:border-cci-orange focus:ring-2 focus:ring-cci-orange/15";
  if (sent) {
    return (
      <div className="rounded-2xl border border-cci-line bg-cci-paper p-9 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cci-orange text-white"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <h3 className="font-display text-xl font-800 text-cci-graphite">Recibimos tu propuesta</h3>
        <p className="mt-2 text-sm text-cci-slate">El equipo editorial revisara tu envío y te contactara. (Demo: ningun dato fue almacenado.)</p>
        <button onClick={() => setSent(false)} className="btn-ghost mt-5">Enviar otra</button>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-cci-line bg-white p-7 shadow-card md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-600 text-cci-ink">Nombre</label><input required className={inputClass} placeholder="Tu nombre" /></div>
        <div><label className="mb-1.5 block text-sm font-600 text-cci-ink">Empresa</label><input className={inputClass} placeholder="Nombre de la empresa" /></div>
        <div><label className="mb-1.5 block text-sm font-600 text-cci-ink">Email</label><input required type="email" className={inputClass} placeholder="tu@correo.cl" /></div>
        <div><label className="mb-1.5 block text-sm font-600 text-cci-ink">Tipo de publicación</label>
          <select className={inputClass} defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Noticia de socio</option><option>Publirreportaje</option><option>Aporte de datos / proyecto</option><option>Entrevista</option><option>Banner</option><option>Newsletter</option><option>Especial tematico</option><option>Cobertura de evento</option></select>
        </div>
        <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-600 text-cci-ink">Mensaje</label><textarea rows={4} className={inputClass} placeholder="Cuentanos brevemente de qué se trata tu propuesta" /></div>
        <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-600 text-cci-ink">Archivo o link de referencia</label><input className={inputClass} placeholder="https://... o adjunta un archivo" /></div>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Enviar propuesta</button>
    </form>
  );
}
