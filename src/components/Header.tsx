"use client";

import Link from "next/link";
import { useState } from "react";
import { CCILogo } from "./Logo";

// Menú espejo de la portada (Fase 3 · ajuste 1, Parte 3): Inicio · CCI Data ·
// Conocimiento · Quiénes somos · Actualidad · Vitrina · Eventos · EICI.
const nav = [
  { href: "/", label: "Inicio" },
  { href: "/data", label: "CCI Data" },
  { href: "/conocimiento", label: "Conocimiento" },
  { href: "/nosotros", label: "Quiénes somos" },
  { href: "/noticias", label: "Actualidad" },
  { href: "/vitrina", label: "Vitrina" },
  { href: "/eventos", label: "Eventos" },
  { href: "/eici", label: "EICI" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cci-line bg-white/90 backdrop-blur-md">
      <div className="h-1 bg-cci-orange" />

      <div className="container-cci flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center"><CCILogo compact width={116} /></Link>

        <nav className="hidden items-center gap-x-5 lg:flex xl:gap-x-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cta="nav"
              data-ubicacion="header"
              className="link-underline whitespace-nowrap text-sm font-medium text-cci-ink hover:text-cci-orange-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/hazte-socio" data-cta="hazte-socio" data-ubicacion="header" className="btn-primary">Hazte socio</Link>
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-cta="nav" data-ubicacion="menu-movil" className="border-b border-cci-line/60 py-3 text-sm font-medium text-cci-ink">
                {item.label}
              </Link>
            ))}
            <Link href="/hazte-socio" onClick={() => setOpen(false)} data-cta="hazte-socio" data-ubicacion="menu-movil" className="btn-primary mb-3 mt-4 w-full">Postula a ser socio</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
