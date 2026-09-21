"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./vit.module.css";
import ChipsZonas from "./ChipsZonas";
import { normalizarNombre, regionLarga } from "@/lib/datos/normalizar";

const S = styles as Record<string, string>;

// ---- datos que llegan del servidor (ya recortados al mínimo para el cliente)
export type ComunaUI = {
  cut: string;
  nombre: string;
  /** Otras grafías con que se busca (oficial/INE cuando la Ditec escribe distinto). */
  alias?: string[];
  region: string;
  zonas: { zona: string; condicion: string }[];
  zonaCentroUrbano: string;
  verificar?: string;
  /** Km por carretera desde cada planta (mismo orden que `plantas`); null = sin ruta. */
  km: (number | null)[];
};
export type ViviendaUI = {
  slug: string;
  nombre: string;
  industrializadora: string;
  oficio: string;
  zonas: string[];
  condicionadas: { zonas: string[]; condicion: string }[];
  notaLiteral?: string;
  /** Índices en `plantas`; vacío = planta por confirmar. */
  plantas: number[];
};
export type PlantaUI = { id: string; nombre: string; fuenteTexto: string; aproximada: boolean };

type Props = {
  comunas: ComunaUI[];
  viviendas: ViviendaUI[];
  plantas: PlantaUI[];
  totalFichas: number;
  vitAprobadas: number;
  vitMacrozonaHI: number;
  fechaRutas: string;
  ejemplos: string[];
};

type Orden = "distancia" | "catalogo";

const fmtKm = (n: number) => Math.round(n).toLocaleString("es-CL");

/** Misma regla que buscarComunas() en src/lib/datos/comunas.ts: nombre y alias, sin tildes; primero las que empiezan igual. */
function buscar(comunas: ComunaUI[], texto: string, max = 8): ComunaUI[] {
  const n = normalizarNombre(texto);
  if (!n) return [];
  const empiezan: ComunaUI[] = [];
  const contienen: ComunaUI[] = [];
  for (const c of comunas) {
    const nombres = [c.nombre, ...(c.alias ?? [])].map(normalizarNombre);
    if (nombres.some((x) => x.startsWith(n))) empiezan.push(c);
    else if (nombres.some((x) => x.includes(n))) contienen.push(c);
  }
  const alfa = (a: ComunaUI, b: ComunaUI) => a.nombre.localeCompare(b.nombre, "es");
  return [...empiezan.sort(alfa), ...contienen.sort(alfa)].slice(0, max);
}

export default function BuscadorComuna({ comunas, viviendas, plantas, totalFichas, vitAprobadas, vitMacrozonaHI, fechaRutas, ejemplos }: Props) {
  const uid = useId();
  const idLista = `${uid}-lista`;
  const idResultado = `${uid}-resultado`;
  const [hidratado, setHidratado] = useState(false);
  const [texto, setTexto] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [cut, setCut] = useState<string | null>(null);
  const [zona, setZona] = useState<string | null>(null);
  const [orden, setOrden] = useState<Orden>("distancia");
  const resultadoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setHidratado(true), []);

  const sugerencias = useMemo(() => buscar(comunas, texto), [comunas, texto]);
  const comuna = useMemo(() => comunas.find((c) => c.cut === cut) ?? null, [comunas, cut]);

  function elegir(c: ComunaUI) {
    setCut(c.cut);
    setZona(c.zonaCentroUrbano);
    setTexto(c.nombre);
    setAbierto(false);
    setIndice(0);
    window.setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }
  function elegirPorNombre(nombre: string) {
    const c = comunas.find((x) => x.nombre === nombre);
    if (c) elegir(c);
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setAbierto(true); setIndice((i) => Math.min(i + 1, Math.max(sugerencias.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndice((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); const c = sugerencias[indice] ?? sugerencias[0]; if (c) elegir(c); }
    else if (e.key === "Escape") { setAbierto(false); }
  }

  // ---- resultado
  const partida = comuna ? comuna.zonas.length > 1 : false;
  const zonaActiva = comuna ? comuna.zonas.find((z) => z.zona === zona) ?? comuna.zonas[0] : null;
  const z = zonaActiva?.zona ?? null;

  type Fila = { v: ViviendaUI; km: number | null; planta: PlantaUI | null; condicion: string | null; sinRuta: boolean };
  const filas: Fila[] = useMemo(() => {
    if (!comuna || !z) return [];
    const compat = viviendas.filter((v) => v.zonas.includes(z));
    const lista = compat.map((v) => {
      let mejor: { km: number; planta: PlantaUI } | null = null;
      let planta: PlantaUI | null = v.plantas.length ? plantas[v.plantas[0]] : null;
      for (const i of v.plantas) {
        const k = comuna.km[i];
        if (k !== null && (mejor === null || k < mejor.km)) mejor = { km: k, planta: plantas[i] };
      }
      if (mejor) planta = mejor.planta;
      const cond = v.condicionadas.find((c) => c.zonas.includes(z));
      return { v, km: mejor ? mejor.km : null, planta, condicion: cond ? cond.condicion : null, sinRuta: v.plantas.length > 0 && !mejor };
    });
    if (orden === "distancia") {
      const rango = (f: Fila) => (f.km !== null ? 0 : f.sinRuta ? 1 : 2);
      lista.sort((a, b) => rango(a) - rango(b) || ((a.km ?? 0) - (b.km ?? 0)) || viviendas.indexOf(a.v) - viviendas.indexOf(b.v));
    }
    return lista;
  }, [comuna, z, orden, viviendas, plantas]);

  const inputDisabled = !hidratado;
  // Resumen de una línea para lectores de pantalla (región viva siempre montada).
  const anuncio = comuna && z ? `${comuna.nombre}, zona térmica ${z}: ${filas.length} de ${totalFichas} fichas publicadas aprobadas.` : "";

  return (
    <div className={S.bc}>
      <span className={S.kicker}>Buscador por comuna</span>
      <h3 className={S["bc-titulo"]}>Qué viviendas sirven en tu comuna</h3>
      <p className={S["bc-bajada"]}>
        Escribe tu comuna. Te decimos su zona térmica según la Ditec y qué viviendas industrializadas tipo están aprobadas para ella.
      </p>

      <noscript>
        <p className={S["bc-noscript"]}>
          El buscador necesita JavaScript. Sin él, las zonas aprobadas de cada vivienda se ven igual en las tarjetas del catálogo, más abajo.
        </p>
      </noscript>

      <div className={S["bc-campo"]}>
        <label htmlFor={`${uid}-q`} className={S["bc-label"]}>Comuna</label>
        <div className={S["bc-input-wrap"]}>
          <svg className={S["bc-lupa"]} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            ref={inputRef}
            id={`${uid}-q`}
            type="text"
            role="combobox"
            className={S["bc-input"]}
            placeholder="Por ejemplo, Vicuña"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={inputDisabled}
            value={texto}
            aria-expanded={abierto && sugerencias.length > 0}
            aria-controls={idLista}
            aria-autocomplete="list"
            aria-activedescendant={abierto && sugerencias[indice] ? `${idLista}-${sugerencias[indice].cut}` : undefined}
            onChange={(e) => { setTexto(e.target.value); setAbierto(true); setIndice(0); }}
            onFocus={() => setAbierto(true)}
            onBlur={() => window.setTimeout(() => setAbierto(false), 120)}
            onKeyDown={onKeyDown}
          />
          {abierto && texto.trim() !== "" && (
            <ul id={idLista} role="listbox" aria-label="Comunas que coinciden" className={S["bc-lista"]}>
              {sugerencias.length === 0 ? (
                <li className={S["bc-vacio"]} role="option" aria-selected={false} aria-disabled="true">Ninguna comuna coincide con “{texto}”.</li>
              ) : sugerencias.map((c, i) => (
                <li
                  key={c.cut}
                  id={`${idLista}-${c.cut}`}
                  role="option"
                  aria-selected={i === indice}
                  className={i === indice ? `${S["bc-opcion"]} ${S.marcada}` : S["bc-opcion"]}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setIndice(i)}
                  onClick={() => elegir(c)}
                >
                  <span>{c.nombre}</span><small>{" "}· {c.region}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={S["bc-ejemplos"]}>
        <span>Prueba con</span>
        {ejemplos.map((n) => (
          <button key={n} type="button" disabled={inputDisabled} onClick={() => elegirPorNombre(n)}>{n}</button>
        ))}
      </div>

      <p className={S["bc-anuncio"]} aria-live="polite" aria-atomic="true">{anuncio}</p>

      {comuna && z && zonaActiva && (
        <div id={idResultado} ref={resultadoRef} className={S["bc-resultado"]}>
          {/* ---- tarjeta de zona */}
          <div className={S["bc-zona"]}>
            <div className={S["bc-zona-top"]}>
              <div className={S["bc-letra"]} aria-hidden="true">{z}</div>
              <div>
                <div className={S["bc-comuna"]}>{comuna.nombre}</div>
                <div className={S["bc-region"]}>{regionLarga(comuna.region)} · CUT {comuna.cut}</div>
                <div className={S["bc-que"]}>
                  {partida ? <>Zona térmica <b>{z}</b> {zonaActiva.condicion}</> : <>Zona térmica <b>{z}</b> en toda la comuna</>}
                </div>
              </div>
            </div>
            {partida && (
              <div className={S["bc-regla"]}>
                <div className={S["bc-regla-t"]}>Esta comuna tiene {comuna.zonas.length} zonas térmicas · regla oficial de la Ditec</div>
                {comuna.zonas.map((x) => (
                  <div key={x.zona} className={x.zona === z ? `${S["bc-fila"]} ${S.activa}` : S["bc-fila"]}>
                    <span><b>{x.zona}</b>{x.condicion}</span>
                    {x.zona === z ? <span className={S["bc-tag"]}>mostrando</span> : <button type="button" onClick={() => setZona(x.zona)}>Ver zona {x.zona}</button>}
                  </div>
                ))}
                <p className={S["bc-nota"]}>
                  Por defecto mostramos la zona del centro urbano. Si tu terreno cumple otra condición, cambia de zona.
                  {comuna.verificar ? <> <b>Caso al filo de la regla:</b> {comuna.verificar}</> : null}
                </p>
              </div>
            )}
          </div>

          {/* ---- lista */}
          <div className={S["bc-resumen"]}>
            <div className={S["bc-n"]}><b>{filas.length} de {totalFichas}</b> fichas publicadas aprobadas para la zona {z}</div>
            <div className={S["bc-orden"]} role="group" aria-label="Orden de las viviendas">
              <button type="button" aria-pressed={orden === "distancia"} onClick={() => setOrden("distancia")}>Más cercana a la planta</button>
              <button type="button" aria-pressed={orden === "catalogo"} onClick={() => setOrden("catalogo")}>Orden del catálogo</button>
            </div>
          </div>

          {filas.length === 0 ? (
            <div className={S["bc-sin"]}>
              <b>Ninguna de las {totalFichas} fichas publicadas está aprobada para la zona {z}.</b>
              {(z === "H" || z === "I") && <> La Ditec informa {vitMacrozonaHI} VIT con macrozona H–I entre las {vitAprobadas} aprobadas; sus fichas no están publicadas en línea.</>}
            </div>
          ) : (
            <div className={S["bc-tarjetas"]}>
              {filas.map(({ v, km, planta, condicion, sinRuta }) => (
                <article key={v.slug} className={S["bc-viv"]}>
                  <div className={S["bc-viv-top"]}>
                    <div>
                      <div className={S["bc-viv-nombre"]}>{v.nombre}</div>
                      <div className={S["bc-viv-ind"]}>{v.industrializadora} · {v.oficio}</div>
                    </div>
                    {km !== null ? (
                      <div className={S["bc-km"]}><div className={S["bc-km-v"]}>{km < 1 ? "< 1 km" : `≈ ${fmtKm(km)} km`}</div><div className={S["bc-km-l"]}>por carretera</div></div>
                    ) : sinRuta ? (
                      <div className={`${S["bc-km"]} ${S.pend}`}><div className={S["bc-km-v"]}>sin ruta por carretera</div></div>
                    ) : (
                      <div className={`${S["bc-km"]} ${S.pend}`}><div className={S["bc-km-v"]}>planta por confirmar</div></div>
                    )}
                  </div>
                  <ChipsZonas zonas={v.zonas} condicionadas={v.condicionadas.flatMap((c) => c.zonas)} activa={z} />
                  {condicion && <p className={S["bc-condicion"]}><b>Con condición:</b> {condicion}.</p>}
                  {v.notaLiteral && <p className={S["bc-viv-nota"]}>{v.notaLiteral}</p>}
                  <p className={S["bc-planta"]}>
                    {planta ? (
                      <><b>Planta:</b> {planta.nombre} <span className={S["bc-mono"]}>· {planta.fuenteTexto}</span>{planta.aproximada ? <span className={S["bc-mono"]}> · ubicación aproximada: centro de la comuna</span> : null}</>
                    ) : (
                      <><b>Planta:</b> por confirmar con la industrializadora</>
                    )}
                  </p>
                </article>
              ))}
            </div>
          )}

          <div className={S["bc-cierre"]}>
            <b>Orientación, no aprobación.</b> La zona que rige es la del terreno específico, y la confirma el Serviu contra el oficio de aprobación de la VIT (Circular N°023). Las distancias son por carretera hasta el centro de la comuna, no hasta el terreno.
          </div>
        </div>
      )}

      {/* La línea de fuente (con la atribución de OpenStreetMap) va siempre visible, también sin JS. */}
      <p className={S["bc-fuente"]}>
        Fuente: zonas por vivienda, oficio aprobatorio de la Ditec incluido en cada ficha VIT publicada en minvu.gob.cl ({totalFichas} fichas) · zona por comuna, Ditec Minvu, zonificación térmica por comuna según NCh1079; en comunas con más de una zona, la zona del centro urbano es elaboración propia del CCI sobre las coordenadas de la cabecera comunal (coordenadas y CUT: dataset público altazor-1967/Comunas-de-Chile, provisional) · plantas, resoluciones de autorización de cada industrializadora o confirmación de la empresa · rutas por carretera, OSRM sobre datos de OpenStreetMap, © OpenStreetMap contributors, calculadas el {fechaRutas}. Hacia Chiloé, Aysén y Magallanes las rutas pueden incluir transbordador o tramos por Argentina, tal como las calcula el motor.
      </p>
    </div>
  );
}
