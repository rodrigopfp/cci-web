"use client";

import Link from "next/link";
import { useState } from "react";
import { CCILogo } from "./Logo";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Actualidad" },
  { href: "/voces", label: "Voces" },
  { href: "/radar", label: "Radar" },
  { href: "/evidencia", label: "Evidencia" },
  { href: "/socios", label: "Ecosistema" },
  { href: "/recursos", label: "Recursos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/eici", label: "EICI" },
  { href: "/publica", label: "Publica" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cci-line bg-white/90 backdrop-blur-md">
      <div className="h-1 bg-cci-orange" />
      <div className="bg-cci-graphite-dark text-white">
        <div className="container-cci flex h-9 items-center justify-between text-xs">
          <span className="hidden sm:block tracking-wide text-white/70">
            Consejo de Construcción Industrializada · Datos y evidencia de la industrialización en Chile
          </span>
          <div className="flex items-center gap-4">
            <Link href="/publica" className="text-white/80 hover:text-white">Envía tu noticia</Link>
            <span className="text-white/30">|</span>
            <a href="#" className="font-semibold text-cci-orange-light hover:text-white">Hazte socio</a>
          </div>
        </div>
      </div>

      <div className="container-cci flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center"><CCILogo compact width={116} /></Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline text-sm font-medium text-cci-ink hover:text-cci-orange-dark">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/publica" className="btn-primary">Publicar</Link>
        </div>

        <button aria-label="Abrir menu" className="lg:hidden" onClick={() => setOpen((v) => !v)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-cci-line bg-white lg:hidden">
          <div className="container-cci flex flex-col py-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-cci-line/60 py-3 text-sm font-medium text-cci-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/publica" onClick={() => setOpen(false)} className="btn-primary my-3 w-full">Publicar</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
