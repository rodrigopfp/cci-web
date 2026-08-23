import Link from "next/link";
import { CCILogo } from "./Logo";

export function NewsletterBox() {
  return (
    <div className="rounded-2xl bg-cci-graphite-dark p-7 text-white md:p-9">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h3 className="font-display text-2xl font-800 md:text-3xl">Radar CCI · el newsletter del sector</h3>
          <p className="mt-2 text-white/70">Cada semana: noticias, un nuevo dato y un estudio sobre la industrialización en Chile y LATAM.</p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="tu@correo.cl" className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-cci-orange" />
          <button className="btn-primary whitespace-nowrap">Suscribirme</button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-cci-line bg-cci-paper">
      <div className="container-cci grid gap-10 py-14 md:grid-cols-4">
        <div>
          <CCILogo width={200} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cci-slate">La plataforma de datos y evidencia de la construcción industrializada en Chile y Latinoamérica.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-graphite">Plataforma</h4>
          <ul className="space-y-2 text-sm text-cci-slate">
            <li><Link href="/noticias" className="hover:text-cci-orange-dark">Actualidad</Link></li>
            <li><Link href="/data" className="hover:text-cci-orange-dark">CCI Data</Link></li>
            <li><Link href="/data/#cap4" className="hover:text-cci-orange-dark">Evidencia</Link></li>
            <li><Link href="/vitrina" className="hover:text-cci-orange-dark">Vitrina</Link></li>
            <li><Link href="/voces" className="hover:text-cci-orange-dark">Voces</Link></li>
            <li><Link href="/recursos" className="hover:text-cci-orange-dark">Recursos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-graphite">Comercial</h4>
          <ul className="space-y-2 text-sm text-cci-slate">
            <li><Link href="/publica" className="hover:text-cci-orange-dark">Publica con nosotros</Link></li>
            <li><Link href="/media-kit" className="hover:text-cci-orange-dark">Media Kit</Link></li>
            <li><Link href="/hazte-socio" className="hover:text-cci-orange-dark">Hazte socio</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-700 uppercase tracking-wide text-cci-graphite">Contacto</h4>
          <ul className="space-y-2 text-sm text-cci-slate">
            <li><a href="https://www.construccionindustrializada.cl" target="_blank" rel="noopener noreferrer" className="hover:text-cci-orange-dark">www.construccionindustrializada.cl</a></li><li>Santiago, Chile</li>
            <li className="flex gap-3 pt-2"><a href="#" className="hover:text-cci-orange-dark">in</a><a href="#" className="hover:text-cci-orange-dark">X</a><a href="#" className="hover:text-cci-orange-dark">YT</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cci-line">
        <div className="container-cci flex flex-col items-center justify-between gap-2 py-5 text-xs text-cci-slate-light sm:flex-row">
          <span>© {new Date().getFullYear()} Consejo de Construcción Industrializada. Prototipo navegable.</span>
          <div className="flex gap-4"><a href="#" className="hover:text-cci-graphite">Metodología</a><a href="#" className="hover:text-cci-graphite">Terminos</a><a href="#" className="hover:text-cci-graphite">Privacidad</a></div>
        </div>
      </div>
    </footer>
  );
}
