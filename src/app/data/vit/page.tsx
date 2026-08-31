import Link from "next/link";
import { obtenerIndicador, obtenerFuente } from "@/lib/datos/indice";
import { getFichasVitImagenes } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import CriteriosAcordeon from "./CriteriosAcordeon";
import styles from "./vit.module.css";
import {
  PLAZOS_ETAPAS, PLAZOS_SERIES, PLAZOS_COLORES, AUTORIZACIONES, VIT_POR_EMPRESA,
  CRITERIOS, SISTEMAS, CATALOGO, CASOS, CINTA_TERMICA, MATERIALIDAD_SEG,
  FRENOS_INDUSTRIA, AGENDA_DITEC, CONDICIONES_ESCALA, HISTORIA, DOCS, CHECK_SERVIU,
  type SiluetaKey,
} from "./datos-vit";

const DESC =
  "Qué autorizó el Estado, qué aprobó, cuánto se está construyendo y cuánto demora. Un registro con fuente y fecha de corte en cada cifra, actualizado con cada publicación de la Ditec Minvu.";

export const metadata = {
  title: "Vivienda industrializada en la política pública · CCI Data",
  description: DESC,
  alternates: { canonical: `${SITE_URL}/data/vit/` },
  openGraph: {
    type: "website",
    title: "Vivienda industrializada en la política pública · CCI Data",
    description: DESC,
    url: `${SITE_URL}/data/vit/`,
    siteName: "CCI",
  },
};

// ---- helpers (estado final, sin JS de cliente) ----
const S = styles as Record<string, string>;
const cx = (...names: string[]) =>
  names.flatMap((x) => x.split(" ")).filter(Boolean).map((c) => S[c] ?? c).join(" ");
function fmt(v: number | string, dec = 0): string {
  const num = typeof v === "number" ? v : Number(v);
  const s = num.toFixed(dec);
  const [ent, frac] = s.split(".");
  const e = ent.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return frac ? `${e},${frac}` : e;
}
const nv = (slug: string) => Number(obtenerIndicador(slug).value);
function cif(slug: string, dec = 0): string {
  const it = obtenerIndicador(slug);
  return fmt(Number(it.value), dec) + (it.suffix ?? "");
}
const w = (pct: number): React.CSSProperties => ({ width: `${pct}%` });

function Fuente({ children }: { children: React.ReactNode }) {
  return <div className={S.fuente}>{children}</div>;
}

// ---- siluetas por tipología (decorativas, aria-hidden) ----
function Silueta({ tipo }: { tipo: SiluetaKey }) {
  const s = S.s, a = S.a;
  const inner: Record<SiluetaKey, React.ReactNode> = {
    casa2: (<>
      <path className={s} d="M28,30 L60,12 L92,30" /><rect className={s} x="34" y="30" width="52" height="44" />
      <path className={s} d="M6,74.5 L114,74.5" /><path className={s} d="M34,52 L86,52" />
      <rect className={a} x="54" y="58" width="12" height="16" /><rect className={s} x="40" y="36" width="11" height="10" />
      <rect className={s} x="70" y="36" width="11" height="10" /><rect className={s} x="40" y="58" width="9" height="9" />
      <rect className={s} x="72" y="58" width="9" height="9" />
    </>),
    casa1: (<>
      <path className={s} d="M26,42 L60,20 L94,42" /><rect className={s} x="34" y="42" width="52" height="32" />
      <path className={s} d="M6,74.5 L114,74.5" /><rect className={a} x="54" y="56" width="12" height="18" />
      <rect className={s} x="40" y="50" width="11" height="10" /><rect className={s} x="70" y="50" width="11" height="10" />
    </>),
    rural: (<>
      <path className={s} d="M14,44 L60,20 L106,44" /><rect className={s} x="24" y="44" width="72" height="30" />
      <path className={s} d="M6,74.5 L114,74.5" /><rect className={a} x="54" y="56" width="12" height="18" />
      <rect className={s} x="33" y="54" width="13" height="11" /><rect className={s} x="74" y="54" width="13" height="11" />
      <rect className={s} x="78" y="24" width="7" height="12" />
    </>),
    pareada: (<>
      <path className={s} d="M10,34 L36,16 L60,34 L84,16 L110,34" /><rect className={s} x="14" y="34" width="46" height="40" />
      <rect className={s} x="60" y="34" width="46" height="40" /><path className={s} d="M4,74.5 L116,74.5" />
      <rect className={a} x="30" y="58" width="11" height="16" /><rect className={a} x="79" y="58" width="11" height="16" />
      <rect className={s} x="20" y="42" width="10" height="9" /><rect className={s} x="88" y="42" width="10" height="9" />
    </>),
    depto: (<>
      <rect className={s} x="30" y="24" width="60" height="50" /><path className={s} d="M6,74.5 L114,74.5" />
      <path className={s} d="M30,40 L90,40 M30,56 L90,56" /><rect className={s} x="38" y="28" width="12" height="8" />
      <rect className={s} x="70" y="28" width="12" height="8" /><rect className={s} x="38" y="44" width="12" height="8" />
      <rect className={s} x="70" y="44" width="12" height="8" /><rect className={a} x="54" y="62" width="12" height="12" />
    </>),
    edificio5: (<>
      <rect className={s} x="34" y="10" width="52" height="64" /><path className={s} d="M6,74.5 L114,74.5" />
      <path className={s} d="M34,23 L86,23 M34,36 L86,36 M34,49 L86,49 M34,62 L86,62" />
      <rect className={s} x="41" y="14" width="10" height="6" /><rect className={s} x="69" y="14" width="10" height="6" />
      <rect className={s} x="41" y="27" width="10" height="6" /><rect className={s} x="69" y="27" width="10" height="6" />
      <rect className={s} x="41" y="40" width="10" height="6" /><rect className={s} x="69" y="40" width="10" height="6" />
      <rect className={a} x="54" y="66" width="12" height="8" />
    </>),
  };
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true">{inner[tipo]}</svg>
  );
}

const CHILE_PATH =
  "M160.9,23.1 L161.6,37.7 L162.4,51.3 L162.8,64.7 L163.6,78.2 L163.9,91.7 L162.6,105.2 L161.6,116.5 L160.0,130.0 L159.5,143.5 L158.7,154.7 L157.8,168.2 L157.3,181.7 L156.8,195.2 L156.0,208.8 L153.2,220.0 L151.5,235.8 L150.1,251.5 L148.7,267.2 L147.9,283.0 L146.4,296.5 L145.8,312.2 L146.6,328.0 L145.9,341.5 L144.2,352.8 L142.0,368.5 L139.2,384.2 L136.4,397.8 L132.9,413.5 L128.5,429.2 L124.8,440.5 L119.3,447.3 L122.0,456.2 L121.2,469.8 L120.7,485.5 L123.2,499.0 L120.3,514.8 L118.2,528.2 L120.3,541.8 L127.5,553.0 L128.8,568.8 L127.3,589.0 L124.5,611.5 L121.2,634.0 L117.2,654.2 L119.5,674.5 L120.7,697.0 L119.5,721.8 L121.2,744.2 L123.8,766.7 L134.2,784.8 L149.3,800.5 L154.4,811.7 L160.7,817.4 L182.5,818.5 L183.3,802.8 L183.0,789.2 L182.5,782.5 L168.9,780.7 L157.5,778.0 L143.7,770.1 L138.6,762.3 L124.8,748.7 L126.7,728.5 L131.1,708.2 L135.5,688.0 L139.2,667.8 L142.7,647.5 L144.9,627.2 L148.1,607.0 L146.4,586.8 L142.1,568.8 L141.4,553.0 L143.7,535.0 L145.9,517.0 L148.7,499.0 L151.8,481.0 L151.0,463.0 L155.0,445.0 L159.0,427.0 L161.6,409.0 L165.3,391.0 L167.3,373.0 L166.1,355.0 L163.2,337.0 L161.0,319.0 L163.8,301.0 L166.6,283.0 L169.1,265.0 L172.4,247.0 L177.1,229.0 L181.5,211.0 L184.2,193.0 L186.0,175.0 L195.3,157.0 L200.6,141.2 L201.4,125.5 L194.1,109.7 L188.4,94.0 L185.0,78.2 L182.5,60.2 L177.9,42.2 L171.4,23.1 Z";

export default async function VitPage() {
  const imagenes = await getFichasVitImagenes();

  // Anillo de materialidad — segmentos calculados desde el registro.
  const C = 2 * Math.PI * 62;
  let acc = 0;
  const segmentos = MATERIALIDAD_SEG.map((m) => {
    const cuenta = nv(m.slug);
    const len = (cuenta / nv("fichas-publicadas")) * C;
    const seg = { ...m, cuenta, len, offset: -acc, pct: Math.round((cuenta / nv("fichas-publicadas")) * 100) };
    acc += len;
    return seg;
  });

  // Planta industrial (waffle) — 20×7 celdas; coloreadas = uso declarado.
  const COLS = 20, ROWS = 7, TOTAL = COLS * ROWS;
  const coloreadas = Math.round((TOTAL * nv("uso-capacidad-declarado")) / 100);
  const celdas = Array.from({ length: TOTAL }, (_, i) => {
    const c = i % COLS, rr = Math.floor(i / COLS);
    return { x: 74.0 + c * 25.6, y: 306.8 - rr * 19.2, on: i < coloreadas };
  });

  return (
    <div className={S.page}>
      {/* ===== 1 · HERO ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>CCI Data · Registro público</span>
        <h1>Vivienda industrializada<br />en la política pública</h1>
        <p className={S.lede}>
          Qué autorizó el Estado, qué aprobó, cuánto se está construyendo y cuánto demora. Un
          registro con fuente y fecha de corte en cada cifra, que se actualiza con cada publicación de
          la División Técnica de Estudio y Fomento Habitacional del Minvu.
        </p>
        <div className={S.chips}>
          <span className={cx("chip cazul")}>Fuente oficial · Ditec Minvu</span>
          <span className={cx("chip cnaranja")}>Serie 2023 — 2026</span>
          <span className={cx("chip cgrafito")}>Último corte: may 2026</span>
        </div>
        <div className={S.serie}>
          <div className={S.item}>
            <div className={S["item-ico"]}><svg viewBox="0 0 64 64" aria-hidden="true">
              <rect className={S["ico-l"]} x="12" y="8" width="7" height="13" rx="1" />
              <path className={S["ico-l"]} d="M8,34 L8,20 L31,34 L31,20 L54,34" />
              <rect className={S["ico-l"]} x="8" y="34" width="46" height="20" rx="2" />
              <path className={S["ico-l"]} d="M4,54.5 L60,54.5" />
              <rect className={S["ico-a"]} x="13" y="44" width="9" height="6" rx="1" />
              <rect className={S["ico-a"]} x="26" y="44" width="9" height="6" rx="1" />
              <rect className={S["ico-af"]} x="39" y="44" width="9" height="6" rx="1" />
            </svg></div>
            <div className={S.num}>{cif("autorizaciones-res52")}</div>
            <div className={S.rot}>autorizaciones vigentes<br />de industrializadoras</div>
            <div className={S.de}>nov 2025: <b>{cif("autorizaciones-res52-2025")}</b> → feb 2026: <b>{cif("autorizaciones-res52")}</b></div>
          </div>
          <div className={S.item}>
            <div className={S["item-ico"]}><svg viewBox="0 0 64 64" aria-hidden="true">
              <path className={S["ico-l"]} d="M9,31 L32,13 L55,31" />
              <rect className={S["ico-l"]} x="14" y="31" width="36" height="23" rx="2" />
              <path className={S["ico-l"]} d="M4,54.5 L60,54.5" /><path className={S["ico-l"]} d="M14,40 L50,40" />
              <rect className={S["ico-a"]} x="19" y="44" width="9" height="10" rx="1" />
              <circle className={S["ico-af"]} cx="49" cy="47" r="9" />
              <path className={S["ico-ck"]} d="M45,47 L48,50 L53,44" />
            </svg></div>
            <div className={S.num}>{cif("vit-aprobadas")}</div>
            <div className={S.rot}>viviendas industrializadas<br />tipo (VIT) aprobadas</div>
            <div className={S.de}>nov 2025: <b>{cif("vit-aprobadas-2025")}</b> → may 2026: <b>{cif("vit-aprobadas")}</b></div>
          </div>
          <div className={S.item}>
            <div className={S["item-ico"]}><svg viewBox="0 0 64 64" aria-hidden="true">
              <rect className={S["ico-l"]} x="7" y="21" width="16" height="33" rx="1.5" />
              <path className={S["ico-l"]} d="M11,28 L19,28 M11,35 L19,35 M11,42 L19,42" />
              <path className={S["ico-l"]} d="M25,37 L34,29 L43,37" />
              <rect className={S["ico-l"]} x="28" y="37" width="12" height="17" rx="1" />
              <path className={S["ico-af-s"]} d="M44,41 L51,35 L58,41" />
              <rect className={S["ico-af-s"]} x="46.5" y="41" width="9" height="13" rx="1" />
              <path className={S["ico-l"]} d="M2,54.5 L62,54.5" />
            </svg></div>
            <div className={S.num}>{cif("unidades-industrializadas")}</div>
            <div className={S.rot}>viviendas industrializadas<br />en {cif("proyectos-industrializados")} proyectos</div>
            <div className={S.de}>corte may 2026 · DS10 · DS19 · DS49</div>
          </div>
        </div>
        <Fuente>
          Fuente: Minvu, <em>Vivienda industrializada: nuevas tecnologías para diversificar la vivienda de
          interés público en Chile</em>, publicación N°398, dic 2025 · Presentaciones Ditec, Seminario
          Vivienda Industrializada, 29 may 2026. Última verificación: 29 ago 2026.
        </Fuente>
      </div></section>

      {/* ===== 2 · PLAZOS ===== */}
      <section className={S.oscura}><div className={S.wrap}>
        <span className={S.kicker}>Medición del Minvu</span>
        <h2>Una vivienda de 52 m², llave en mano</h2>
        <p className={S.lede}>
          La misma superficie, tres formas de producirla. Medición de la División Técnica sobre
          proyectos ejecutados, desde el permiso de edificación hasta la recepción final.
        </p>
        <div className={S.plazo}>
          {PLAZOS_SERIES.map((serie) => {
            const total = nv(serie.slug);
            return (
              <div className={S.fila} key={serie.slug}>
                <div className={S.cab}>
                  <span className={S.tit}>{serie.titulo}</span>
                  <span className={S.tot}>{cif(serie.slug)}<span>días</span></span>
                </div>
                <div className={S.barra} style={w((total / nv("llave-en-mano-tradicional")) * 100)}>
                  {serie.dias.map((d, i) => (
                    <i key={i} className={S[PLAZOS_COLORES[i]]} style={w((d / total) * 100)} />
                  ))}
                </div>
              </div>
            );
          })}
          <div className={S.leyenda}>
            {PLAZOS_ETAPAS.map((et, i) => (
              <span key={et}><em className={S[PLAZOS_COLORES[i]]} />{et}</span>
            ))}
          </div>
        </div>
        <Fuente>
          Fuente: Ditec Minvu, presentación «Industrialización en vivienda», Seminario Vivienda
          Industrializada, 29 may 2026. Tipologías comparadas: Puelo Original (Patagual) y E2E Base,
          ambas de 52 m². Los rótulos de tipología son los de la fuente («Modular en fábrica» es el rótulo
          citado). Alcance: casos de referencia, no promedio del sector.
        </Fuente>
      </div></section>

      {/* ===== 3 · CAPACIDAD ===== */}
      <section className={S.oscura}><div className={S.wrap} id="capacidad">
        <span className={S.kicker}>La capacidad instalada</span>
        <h2>La fábrica ya está construida</h2>
        <p className={S.lede}>
          Las empresas autorizadas informan al Minvu cuánto pueden producir. La red instalada existe,
          está certificada y está distribuida en el país. La pregunta ya no es si Chile puede fabricar
          viviendas industrializadas, sino cuánto de esa capacidad se está usando.
        </p>

        <div className={S.duelo}>
          <div className={S["d-fila"]}>
            <div className={S["d-cab"]}>
              <span className={S["d-tit"]}>Capacidad instalada, en un año</span>
              <span className={S["d-val"]} style={{ color: "var(--durazno)" }}>{cif("capacidad-efectiva-anio")}</span>
            </div>
            <div className={S["d-bar"]}><i style={{ ...w(100), background: "var(--durazno)" }} /></div>
            <div className={S["d-nota"]}>Capacidad efectiva informada a la Ditec · {cif("capacidad-efectiva-mes")} viviendas al mes</div>
          </div>
          <div className={S["d-fila"]}>
            <div className={S["d-cab"]}>
              <span className={S["d-tit"]}>Todas las viviendas industrializadas ejecutadas, acumuladas</span>
              <span className={S["d-val"]} style={{ color: "#fff" }}>{cif("unidades-ejecutadas")}</span>
            </div>
            <div className={S["d-bar"]}><i style={{ ...w((nv("unidades-ejecutadas") / nv("capacidad-efectiva-anio")) * 100), background: "#fff" }} /></div>
            <div className={S["d-nota"]}>Total acumulado en DS10, DS19 y DS49 al corte de mayo 2026</div>
          </div>
        </div>

        <h3 style={{ marginTop: 38, fontSize: 21, color: "#fff" }}>La planta que el país ya tiene</h3>
        <p style={{ color: "#C9C7C3", fontSize: 15, maxWidth: "60ch", marginBottom: 0 }}>
          Toda la superficie representa las {cif("capacidad-efectiva-anio")} viviendas al año que la red
          autorizada puede producir. Coloreada, la parte que la demanda actual ocupa.
        </p>

        <div className={S["planta-duo"]}>
          <div className={S["planta-cifra"]}>
            <div className={cx("num num-gigante")}>{fmt(100 - nv("uso-capacidad-declarado"))}%</div>
            <div className={S.et}>Capacidad ociosa</div>
            <p>Unas {fmt(nv("capacidad-efectiva-anio") - nv("escenario-uso-actual"))} viviendas al año que la red ya instalada podría producir y hoy no produce.</p>
          </div>
          <div className={S.planta}>
            <svg viewBox="0 0 660 400" role="img" aria-label={`Silueta de una planta industrializadora. Su superficie representa las ${cif("capacidad-efectiva-anio")} viviendas al año de capacidad instalada. Solo una franja inferior aparece coloreada: es el ${cif("uso-capacidad-declarado")} que la demanda actual ocupa; el resto queda vacío.`}>
              <rect x="86" y="18" width="26" height="102" className={S.obra} />
              <rect x="80" y="12" width="38" height="10" rx="3" className={S.obra} />
              <path className={S.obra} d="M60,120 L60,62 L195,120 L195,62 L330,120 L330,62 L465,120 L465,62 L600,120 Z" />
              <path className={S.vidrio} d="M60,62 L60,120 M195,62 L195,120 M330,62 L330,120 M465,62 L465,120" />
              <rect x="60" y="120" width="540" height="220" rx="4" className={S.obra} />
              <path className={S.suelo} d="M30,341 L630,341" />
              <g>
                {celdas.map((c, i) => (
                  <rect key={i} className={c.on ? cx("mod on") : S.mod} x={c.x} y={c.y} width="22.6" height="16.2" rx="2" />
                ))}
              </g>
            </svg>
            <div className={S["planta-uso"]}>En uso · {cif("uso-capacidad-declarado")} · {cif("escenario-uso-actual")} viviendas al año</div>
          </div>
        </div>

        <div className={S["planta-pie"]}>
          <span><em style={{ background: "#E04E00" }} />En uso · {cif("uso-capacidad-declarado")}</span>
          <span><em style={{ border: "1px solid rgba(255,255,255,.3)" }} />Capacidad ociosa · {fmt(100 - nv("uso-capacidad-declarado"))}%</span>
          <span className={cx("chip declarado")}>Uso declarado por la industria</span>
        </div>

        <Fuente>
          Fuente: capacidad instalada de {cif("capacidad-efectiva-anio")} viviendas al año, Minvu publicación N°398,
          dic 2025, y Ditec, 29 may 2026 · uso del {cif("uso-capacidad-declarado")}, levantamiento de las
          industrializadoras certificadas Res. Ex. N°52, seminario 29 may 2026, sin metodología publicada. El
          dibujo es una representación de la capacidad anual informada; no corresponde a una planta real. Los {cif("dias-equivalentes-ejecutado")} días
          son el cociente entre las {cif("unidades-ejecutadas")} viviendas ejecutadas acumuladas y la capacidad
          anual informada: comparan un acumulado con un flujo anual, y se publican con esa advertencia.
        </Fuente>

        <div className={S.remate}>
          <span className={S["remate-et"]}>Cifras del Minvu</span>
          <div className={S["remate-cuerpo"]}>
            <div className={S["remate-cifra"]}>
              <div className={cx("num n")}>{cif("dias-equivalentes-ejecutado")}</div>
              <b>días</b>
            </div>
            <div className={S["remate-txt"]}>
              <p>Eso es lo que la red instalada tardaría en producir todo lo que la vivienda industrializada ha ejecutado en el país hasta hoy.</p>
            </div>
          </div>
        </div>

        <div className={cx("rejilla tres negras")} style={{ marginTop: 22 }}>
          <div className={S.tarjeta}><div className={S.num}>{cif("autorizaciones-sin-vit")}</div><div className={S.rot}>de las {cif("autorizaciones-res52")} autorizaciones vigentes no tienen ninguna VIT aprobada</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("capacidad-potencial-anio")}</div><div className={S.rot}>viviendas al año de capacidad potencial informada, {fmt(nv("capacidad-potencial-anio") - nv("capacidad-efectiva-anio"))} más que la efectiva</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("programacion-industrial")}</div><div className={S.rot}>de las viviendas en ejecución se programa aprovechando la eficiencia industrial</div></div>
        </div>

        <Fuente>
          Fuente: capacidad efectiva y potencial, Minvu publicación N°398, dic 2025, y Ditec «Diagnóstico
          desde lo avanzado», 29 may 2026 · viviendas ejecutadas y programación, Ditec, 29 may 2026 y
          publicación N°398 · autorizaciones con VIT, Ditec «Res. Ex. N°52», 29 may 2026.
        </Fuente>

        <div className={S["panel-claro"]}>
          <span className={cx("chip declarado")}>Dato declarado por la industria</span>
          <h3 style={{ marginTop: 12, fontSize: 21 }}>Cuánto dicen las empresas que están usando</h3>
          <p style={{ color: "var(--gris)", fontSize: 15 }}>
            En el levantamiento entre las industrializadoras certificadas Res. Ex. N°52, las empresas
            declararon un uso estimado del <b>{cif("uso-capacidad-declarado")}</b> de su capacidad instalada,
            del mismo orden de magnitud que la razón entre lo ejecutado y la capacidad que publica el Minvu.
            La metodología del levantamiento, con las empresas que respondieron y la definición de capacidad
            y de uso, está pendiente de publicación y aparecerá aquí.
          </p>
          <div className={S["lista-barras"]} style={{ marginTop: 18 }}>
            <div className={S.lb}><span className={S.e}>Uso actual · {cif("uso-capacidad-declarado")}</span><span className={S.v}>{cif("escenario-uso-actual")}</span><span className={S.pista}><i className={S.p} style={{ ...w(16), background: "#B9B4AC" }} /></span></div>
            <div className={S.lb}><span className={S.e}>Si el uso fuera 50%</span><span className={S.v}>{cif("escenario-uso-50")}</span><span className={S.pista}><i className={S.p} style={{ ...w((nv("escenario-uso-50") / nv("escenario-uso-80")) * 100), background: "#7FB6DE" }} /></span></div>
            <div className={S.lb}><span className={S.e}>Si el uso fuera 80%</span><span className={S.v}>{cif("escenario-uso-80")}</span><span className={S.pista}><i className={S.p} style={{ ...w(100), background: "#005CAD" }} /></span></div>
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--gris-suave)", marginTop: 6 }}>
            Viviendas al año según nivel de utilización de la capacidad ya instalada. Escenarios declarados, no proyecciones del CCI.
          </p>
          <h3 style={{ marginTop: 28, fontSize: 19 }}>Qué frena a las empresas, según ellas mismas</h3>
          <p style={{ color: "var(--gris)", fontSize: 14.5 }}>
            Categorías ordenadas por incidencia en el mismo levantamiento. Se publica el orden, no el número de menciones.
          </p>
          <ul className={S.agenda} style={{ marginTop: 10 }}>
            {FRENOS_INDUSTRIA.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <Fuente>
            Fuente: presentación de las industrializadoras certificadas Res. Ex. N°52, seminario 29 may 2026.
            Levantamiento entre empresas, sin metodología publicada.
          </Fuente>
        </div>
      </div></section>

      {/* ===== 4 · REGISTRO RES 52 ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Resolución Exenta N°52</span>
        <h2>Quién está autorizado para fabricar</h2>
        <p className={S.lede}>
          La Ditec evalúa y autoriza a las empresas industrializadoras que pueden presentar proyectos de
          vivienda industrializada. Cada autorización consta en una resolución exenta con número y fecha.
        </p>

        <div className={S.mapa}>
          <svg viewBox="0 0 425 897" role="img" aria-label={`Mapa de Chile en tres macrozonas: norte con ${cif("autorizaciones-norte")}, centro con ${cif("autorizaciones-centro")} y sur con ${cif("autorizaciones-sur")} autorizaciones.`}>
            <defs><clipPath id="chile"><path d={CHILE_PATH} /></clipPath></defs>
            <g clipPath="url(#chile)">
              <rect className={cx("z zn")} x="60" y="5" width="220" height="280" />
              <rect className={cx("z zc")} x="60" y="285" width="220" height="202" />
              <rect className={cx("z zs")} x="60" y="488" width="220" height="404" />
              <path className={S.corte} d="M60,285 L280,285 M60,488 L280,488" />
            </g>
            <path className={S.borde} d={CHILE_PATH} />
            <path className={S.guia} d="M204.4,154 L210,154" />
            <text className={S.cifra} x="220" y="147" style={{ fill: "#B07A45" }}>{cif("autorizaciones-norte")}</text>
            <text className={S.zt} x="220" y="172">Zona norte</text>
            <text className={S.zsub} x="220" y="193">una autorización</text>
            <path className={S.guia} d="M173.8,386 L210,386" />
            <text className={S.cifra} x="220" y="380" style={{ fill: "#E04E00" }}>{cif("autorizaciones-centro")}</text>
            <text className={S.zt} x="220" y="404">Zona centro</text>
            <text className={S.zsub} x="220" y="426">dos de cada tres del país</text>
            <path className={S.guia} d="M145.0,680 L210,680" />
            <text className={S.cifra} x="220" y="673" style={{ fill: "#005CAD" }}>{cif("autorizaciones-sur")}</text>
            <text className={S.zt} x="220" y="698">Zona sur</text>
            <text className={S.zsub} x="220" y="719">siete autorizaciones</text>
          </svg>
          <p className={S.mapapie}>Distribución de las {cif("autorizaciones-res52")} autorizaciones vigentes por macrozona. Los límites entre zonas son referenciales.</p>
        </div>

        <div className={S.aviso}>
          <b>Cómo se cuentan.</b> Las {cif("autorizaciones-res52")} corresponden a autorizaciones vigentes, no a
          empresas: Tecnotruss y Eterna tienen dos cada una. Son <b>{cif("autorizaciones-res52")} autorizaciones de {cif("empresas-res52")} empresas</b>,
          y {cif("empresas-con-vit")} de ellas tienen además al menos una VIT aprobada. Por eso la misma realidad
          aparece publicada como 22, 23 o 25 según la fecha y la unidad de conteo.
        </div>

        <details>
          <summary>Ver el registro de autorizaciones con su resolución</summary>
          <table>
            <thead><tr><th>N°</th><th>Industrializadora</th><th>Resolución</th></tr></thead>
            <tbody>
              {AUTORIZACIONES.map((a) => (
                <tr key={a.n}>
                  <td className={S.n}>{a.n}</td>
                  <td>{a.empresa}</td>
                  <td className={S.r}>
                    {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer">{a.resolucion}</a> : a.resolucion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <Fuente>
          Fuente: Ditec Minvu, presentación «Res. Ex. N°52: estándares para la evaluación de empresas
          industrializadoras», 29 may 2026 · Listado a nov 2025 en publicación N°398 del Minvu. Corte: 11 feb 2026.
        </Fuente>

        <h3 style={{ marginTop: 38, fontSize: 20 }}>Con qué se evalúa a una industrializadora</h3>
        <p style={{ color: "var(--gris)", fontSize: 15, maxWidth: "60ch" }}>
          Las {CRITERIOS.length} dimensiones que revisa la Ditec antes de autorizar a una empresa. Es también
          el vocabulario con que el Estado describe una capacidad productiva.
        </p>
        <CriteriosAcordeon criterios={CRITERIOS} iconos={ICONO_CRITERIO} />

        <h3 style={{ marginTop: 34, fontSize: 20 }}>Con qué se está fabricando</h3>
        <p style={{ color: "var(--gris)", fontSize: 15 }}>Sistemas y materialidades presentes entre las empresas autorizadas.</p>
        <div className={S.pills}>{SISTEMAS.map((s) => <span key={s}>{s}</span>)}</div>

        <Fuente>Fuente: Ditec Minvu, presentación «Res. Ex. N°52», 29 may 2026, láminas de criterios de evaluación y de modelos reales por empresa.</Fuente>

        <h3 style={{ marginTop: 38, fontSize: 20 }}>Con qué están hechas</h3>
        <p style={{ color: "var(--gris)", fontSize: 15, maxWidth: "62ch" }}>Materialidad de las {cif("fichas-publicadas")} fichas publicadas, leída una por una en la ficha oficial de la Ditec.</p>

        <div className={S["anillo-box"]}>
          <svg className={S.anillo} viewBox="0 0 200 200" role="img" aria-label={`Anillo con la materialidad de las ${cif("fichas-publicadas")} fichas: ${segmentos.map((s) => `${s.cuenta} de ${s.label}`).join(", ")}.`}>
            <circle cx="100" cy="100" r="62" className={S.pista} />
            {segmentos.map((s) => (
              <circle key={s.slug} className={S.seg} cx="100" cy="100" r="62" stroke={s.color} strokeDasharray={`${s.len.toFixed(2)} ${(C - s.len).toFixed(2)}`} strokeDashoffset={s.offset.toFixed(2)}><title>{s.label}: {s.cuenta} fichas</title></circle>
            ))}
            <text x="100" y="106" className={S["a-num"]}>{cif("fichas-publicadas")}</text>
            <text x="100" y="126" className={S["a-rot"]}>FICHAS</text>
          </svg>
          <ul className={S["anillo-leyenda"]}>
            {segmentos.map((s) => (
              <li key={s.slug}><em style={{ background: s.color }} /><span className={S.ln}>{s.label}</span><span className={S.lc}><b>{s.cuenta}</b> · {s.pct}%</span></li>
            ))}
          </ul>
        </div>

        <div className={cx("rejilla dos")} style={{ marginTop: 14 }}>
          <div className={cx("tarjeta cifra")}>
            <div className={S.num}>{fmt(Math.round((nv("materialidad-madera") / nv("fichas-publicadas")) * 100))}%</div>
            <div className={S.rot}>de las fichas publicadas son de madera. Las que detallan el sistema la describen como madera de grado estructural, seca e impregnada contra termitas y humedad</div>
          </div>
          <div className={cx("tarjeta grafito")}>
            <h3>{cif("superficie-base-min")} a {cif("superficie-base-max")} m²</h3>
            <div className={S.rot}>rango de superficie base entre las {cif("fichas-publicadas")} fichas. Con ampliación llegan hasta {cif("superficie-ampliada-max", 1)} m².</div>
          </div>
        </div>

        <p className={S["waffle-nota"]}>Tres clasificaciones están en confirmación: una ficha declara materialidades distintas en su portada y en su tabla, y otras dos traen la materialidad en un formato que exige lectura manual. Se ajustarán si cambian.</p>

        <Fuente>
          Fuente: elaboración propia del CCI sobre las {cif("fichas-publicadas")} fichas de vivienda industrializada tipo publicadas por la
          Ditec Minvu, actualizadas al 3 jun 2026. <b>Alcance: cubre las {cif("fichas-publicadas")} fichas en línea, no las {cif("vit-aprobadas")} VIT
          aprobadas.</b> Materialidad transcrita de cada ficha; la agrupación en categorías es del CCI.
        </Fuente>
      </div></section>

      {/* ===== 5 · EMBUDO ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Resolución Exenta N°59</span>
        <h2>Del ingreso a la aprobación</h2>
        <p className={S.lede}>
          Una vivienda industrializada tipo se aprueba en la Ditec tras una revisión iterativa de
          estructura, arquitectura, especialidades, exigencia térmica e higrotérmica y norma contra incendios.
        </p>
        <div className={S.embudo}>
          <div className={S.paso}><div className={cx("caja cingreso")} style={w(100)}>{cif("vit-ingresadas")}</div><span className={S.et}><b>ingresados</b>proyectos VIT presentados a la Ditec</span></div>
          <div className={S.paso}><div className={cx("caja caprob")} style={w((nv("vit-aprobadas-2025") / nv("vit-ingresadas")) * 100)}>{cif("vit-aprobadas-2025")}</div><span className={S.et}><b>aprobados</b>{cif("vit-ds49")} en DS49 · {cif("vit-ds10")} en DS10</span></div>
          <div className={S.paso}><div className={cx("caja crev")} style={{ ...w((nv("vit-en-revision") / nv("vit-ingresadas")) * 100), color: "#0A3550" }}>{cif("vit-en-revision")}</div><span className={S.et}><b>en revisión</b>en proceso iterativo</span></div>
          <div className={S.paso}><div className={cx("caja cdev")} style={w((nv("vit-devueltas") / nv("vit-ingresadas")) * 100)}>{cif("vit-devueltas")}</div><span className={S.et}><b>devueltos</b>no cumplieron los mínimos técnicos</span></div>
        </div>

        <div className={cx("rejilla dos")} style={{ marginTop: 22 }}>
          <div className={cx("tarjeta cifra")}><div className={S.num}>{cif("vit-aprobadas")}</div><div className={S.rot}>VIT aprobadas al corte de mayo 2026, en manos de {cif("empresas-con-vit")} industrializadoras</div></div>
          <div className={cx("tarjeta cifra")}><div className={S.num}>{cif("dias-revision-ditec")}</div><div className={S.rot}>días promedio de revisión en la Ditec, medidos por la propia división</div></div>
        </div>

        <details>
          <summary>Ver VIT aprobadas por industrializadora</summary>
          <div className={S["lista-barras"]} style={{ marginTop: 6 }}>
            {VIT_POR_EMPRESA.map((e) => (
              <div className={S.lb} key={e.empresa}><span className={S.e}>{e.empresa}</span><span className={S.p} style={w((e.n / VIT_POR_EMPRESA[0].n) * 100)} /><span className={S.v}>{e.n}</span></div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gris-suave)", margin: "12px 0 0" }}>Tabla publicada por la Ditec, reproducida sin reordenar. Corte: may 2026.</p>
        </details>

        <Fuente>Fuente: embudo y días de revisión, Minvu publicación N°398, corte nov 2025 · VIT aprobadas por industrializadora, presentación Ditec «Industrialización en vivienda», 29 may 2026.</Fuente>
      </div></section>

      {/* ===== 6 · LAS VIT EN DETALLE ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Las viviendas aprobadas</span>
        <h2>Para qué territorio sirve cada VIT</h2>
        <p className={S.lede}>
          Una vivienda industrializada tipo se diseña sin terreno conocido: asume un tipo de suelo, una
          zona sísmica y una zona térmica. Por eso cada aprobación queda amarrada a las macrozonas donde
          puede emplazarse, y esa es la primera pregunta de quien busca una solución para su región.
        </p>

        <div className={S.termica}>
          <div className={S["cinta-z"]}>
            {CINTA_TERMICA.map((c) => <i key={c.z} style={{ background: c.color }}>{c.z}</i>)}
          </div>
          <div className={S.ejes}><span>A · extremo norte</span><span>I · extremo austral</span></div>
          <div className={S.macro}>
            <div className={S.m}><div className={S.n} style={{ color: "#E04E00" }}>{cif("vit-macrozona-abcde")}</div><div className={S.z}>Zonas A – E</div><div className={S.d}>Norte y centro</div></div>
            <div className={S.m}><div className={S.n} style={{ color: "#3FA894" }}>{cif("vit-macrozona-fg")}</div><div className={S.z}>Zonas F – G</div><div className={S.d}>Sur</div></div>
            <div className={S.m}><div className={S.n} style={{ color: "#173A63" }}>{cif("vit-macrozona-hi")}</div><div className={S.z}>Zonas H – I</div><div className={S.d}>Extremo austral</div></div>
          </div>
        </div>

        <div className={S.verificacion} style={{ marginTop: 16 }}>
          <span className={S.et}>Cómo leer estos tres números</span>
          Suman {fmt(nv("vit-macrozona-abcde") + nv("vit-macrozona-fg") + nv("vit-macrozona-hi"))}, más que las {cif("vit-aprobadas")} VIT
          aprobadas, así que una vivienda cuenta en más de una macrozona. Al revisar las {cif("fichas-publicadas")} fichas
          publicadas apareció un dato que lo complica: <b>las {cif("fichas-publicadas")} declaran alcance nacional</b>, de modo que
          estas cifras no describen cuántas viviendas puede usar cada región. Qué mide exactamente esta
          distribución está consultado a la Ditec y se publicará cuando responda. Hasta entonces, el reparto se muestra sin interpretarlo.
        </div>

        <div className={cx("aviso celeste")}>
          <b>Por qué la zona térmica decide todo.</b> La Circular N°023 instruye que, para autorizar el
          emplazamiento, al Serviu le basta corroborar que la zona térmica del terreno aparezca en el
          oficio de aprobación de la VIT. No debe revisar ningún antecedente adicional. Si la zona no está
          en el oficio, esa vivienda no sirve para ese terreno.
        </div>

        <div className={cx("rejilla tres cortas")} style={{ marginTop: 20 }}>
          <div className={S.tarjeta}><div className={S.num}>{cif("vit-ds49")}</div><div className={S.rot}>aprobadas para DS49</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("vit-ds10")}</div><div className={S.rot}>aprobadas para DS10</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("vit-edificios-3pisos")}</div><div className={S.rot}>son edificios de más de 3 pisos</div></div>
        </div>
        <p className={S["nota-mono"]} style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--gris-suave)", marginTop: 10 }}>
          DS49 y DS10 al corte de nov 2025, sobre {cif("vit-aprobadas-2025")} VIT. Suman 44 porque una vivienda está aprobada para ambos programas.
        </p>

        <div className={S.aviso} style={{ marginTop: 20 }}>
          <b>Todas vigentes.</b> Con el estándar higrotérmico de vivienda industrializada tipo, las VIT
          aprobadas por la Ditec cumplen la modificación de la Ordenanza General introducida por el Decreto
          N°15, en vigor desde el 28 de noviembre de 2025. Ninguna quedó fuera de norma con el cambio.
        </div>

        <Fuente>
          Fuente: distribución por macrozona térmica y vigencia higrotérmica, Ditec Minvu, presentación
          «Industrialización en vivienda», 29 may 2026 · Programas DS49 y DS10, Minvu publicación N°398, corte
          nov 2025 · Edificios de más de 3 pisos, presentación de las industrializadoras certificadas Res. Ex.
          N°52, 29 may 2026. Zonificación térmica según la Ordenanza General de Urbanismo y Construcciones.
        </Fuente>

        <h3 style={{ marginTop: 38, fontSize: 20 }}>El catálogo publicado</h3>
        <p style={{ color: "var(--gris)", fontSize: 15, maxWidth: "62ch" }}>
          La Ditec publica la ficha de cada vivienda aprobada, con su planimetría, superficie y
          especificaciones. Hoy hay <b>{cif("fichas-publicadas")} fichas en línea</b> de las {cif("vit-aprobadas")} VIT aprobadas.
        </p>
        <div className={S.fichas}>
          {CATALOGO.map((f) => {
            const img = imagenes[f.slug];
            return (
              <a className={S.ficha} key={f.slug} href={f.url} target="_blank" rel="noopener noreferrer">
                <span className={S.im}>
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.url} alt={img.alt || `Render de ${f.tipo} · ${f.empresa}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  ) : (
                    <Silueta tipo={f.silueta} />
                  )}
                </span>
                <span className={S.b}><span className={S.t}>{f.tipo}</span><span className={S.e}>{f.empresa}</span><span className={S.p}>{f.programa} · Abrir ficha →</span></span>
              </a>
            );
          })}
        </div>
        <Fuente>
          Fuente: Minvu, sección Construcción Industrializada, fichas de viviendas industrializadas,
          actualizada al 3 jun 2026. Cada tarjeta abre la ficha oficial en el sitio del Minvu. Mientras no
          haya render autorizado, la imagen se reemplaza por una silueta según tipología: los renders
          pertenecen a las empresas y el servidor del Minvu no permite mostrarlos desde otro sitio.
        </Fuente>
      </div></section>

      {/* ===== 7 · CASOS ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Casos con ficha publicada</span>
        <h2>Dónde ya se construyó así</h2>
        <p className={S.lede}>
          La Ditec documenta proyectos ejecutados con ficha completa. Muestran cuatro cosas que la
          industrialización hizo posibles: llegar lejos de la fábrica, llegar a lugares de difícil acceso,
          construir más rápido y construir en altura.
        </p>
        {CASOS.map((c) => (
          <div className={S.caso} key={c.titulo}>
            <span className={S.cat}>{c.cat}</span>
            <h3>{c.titulo}</h3>
            <div className={S.ubi}>{c.ubi}</div>
            <div className={S.datos}>
              {c.datos.map((d) => <div key={d.rot}><span>{d.rot}</span><b>{d.valor}</b></div>)}
            </div>
            <div className={S.pie} dangerouslySetInnerHTML={{ __html: c.pie }} />
          </div>
        ))}
        <Fuente>
          Fuente: Ditec Minvu, presentación «Diagnóstico desde lo avanzado», 29 may 2026, fichas de proyecto.
          La duración en meses es cálculo sobre las fechas de inicio y término de cada ficha; no es un
          indicador de productividad comparable entre proyectos de distinto tamaño.
        </Fuente>
      </div></section>

      {/* ===== 8 · LO CONSTRUIDO ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Lo que ya está en obra</span>
        <h2>{cif("unidades-industrializadas")} viviendas, {cif("proyectos-industrializados")} proyectos</h2>
        <p className={S.lede}>Unidades habitacionales industrializadas en distintos estados de avance, en los programas DS10, DS19 y DS49.</p>
        {(() => {
          const total = nv("unidades-industrializadas");
          const estados = [
            { slug: "unidades-ejecutadas", color: "#B23E00", rot: "ejecutadas" },
            { slug: "unidades-en-ejecucion", color: "#E04E00", rot: "en ejecución" },
            { slug: "unidades-en-desarrollo", color: "#F6BA8C", rot: "en desarrollo" },
            { slug: "unidades-por-iniciar", color: "#CFCDC8", rot: "próximas a iniciar" },
            { slug: "unidades-sin-inicio", color: "#9C9A96", rot: "seleccionadas sin inicio" },
          ];
          return (<>
            <div className={S.apilada}>
              {estados.map((e) => <i key={e.slug} style={{ ...w((nv(e.slug) / total) * 100), background: e.color }} />)}
            </div>
            <div className={S.leyenda} style={{ color: "var(--gris)" }}>
              {estados.map((e) => <span key={e.slug}><em style={{ background: e.color }} />{cif(e.slug)} {e.rot}</span>)}
            </div>
          </>);
        })()}
        <Fuente>Fuente: Ditec Minvu, presentación «Industrialización en vivienda», 29 may 2026. Corte: may 2026. Incluye VIT y VIR.</Fuente>
      </div></section>

      {/* ===== 9 · DÓNDE SE TRABA ===== */}
      <section className={S.oscura}><div className={S.wrap}>
        <span className={S.kicker}>Diagnóstico de la Ditec</span>
        <h2>El cuello de botella no está en la fábrica</h2>
        <p className={S.lede}>Al revisar los proyectos en ejecución, la propia división identificó dónde se pierde el tiempo que la producción en fábrica ahorra.</p>
        <div className={cx("rejilla tres negras")}>
          <div className={cx("tarjeta ancha")} style={{ gridColumn: "1/-1", background: "#E04E00", borderColor: "#E04E00" }}>
            <div className={S.num} style={{ color: "#fff", fontSize: 64 }}>{cif("programacion-industrial")}</div>
            <div className={S.rot} style={{ color: "#FFE6D6", fontSize: 15.5 }}>de las viviendas en ejecución tiene una programación de plazos que aprovecha la eficiencia de la industrialización. El resto se programa como una obra tradicional.</div>
          </div>
          <div className={S.tarjeta}><div className={S.num}>{cif("avance-normal")}</div><div className={S.rot}>avanza con normalidad</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("demora-organismos-externos")}</div><div className={S.rot}>de las demoras en proyectos en desarrollo se explican por gestión con organismos externos</div></div>
          <div className={S.tarjeta}><div className={S.num}>{cif("demora-gestion-interna")}</div><div className={S.rot}>por tiempos de gestión interna: evaluación, concursos, licitaciones</div></div>
        </div>
        <h3 style={{ marginTop: 34, fontSize: 20, color: "#fff" }}>Lo que la propia división identificó para mejorar</h3>
        <ul className={S.agenda}>{AGENDA_DITEC.map((a) => <li key={a}>{a}</li>)}</ul>
        <Fuente>
          Fuente: Minvu, publicación N°398, dic 2025, capítulo «Diagnóstico y avances tecnológicos de la
          vivienda industrializada», corte nov 2025 · Ditec, presentación «Diagnóstico desde lo avanzado», 29 may 2026.
        </Fuente>
      </div></section>

      {/* ===== 10 · MARCO NORMATIVO ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Marco normativo</span>
        <h2>Con qué reglas opera</h2>
        <div className={S.vs}>
          <div className={cx("col vit")}>
            <h3>VIT · Vivienda industrializada tipo</h3>
            <ul>
              <li>Aprobada por la Ditec según Res. Ex. N°59/2023</li>
              <li>Se desarrolla para DS49 y DS10</li>
              <li>Se diseña sin terreno conocido: asume suelo, zona sísmica y térmica</li>
              <li>Mínimo 50% de elementos industrializados, con terminaciones y especialidades de fábrica</li>
              <li>Con Glosa 06, no requiere permiso ni recepción municipal</li>
            </ul>
          </div>
          <div className={cx("col vir")}>
            <h3>VIR · Vivienda industrializada regular</h3>
            <ul>
              <li>Fabricada por una empresa autorizada según Res. Ex. N°52/2023</li>
              <li>No se acoge a la Glosa 06</li>
              <li>No está limitada a DS49 ni DS10</li>
              <li>Se aprueba en los Serviu</li>
            </ul>
          </div>
        </div>
        {[
          ["Ley 1.305 · artículo 16 letra L", "Faculta a la Ditec para autorizar proyectos y especificaciones técnicas tipo de viviendas industrializadas."],
          ["Glosa 06 · Ley de Presupuesto 2026", "Las viviendas tipo industrializadas aprobadas por la Ditec y construidas con subsidio del Estado no requieren permiso ni quedan sujetas a inspección o recepción de las direcciones de obras municipales."],
          ["Quién puede presentar una VIT", "Entidades patrocinantes, entidades de gestión rural y empresas constructoras, siempre junto a una empresa industrializadora previamente autorizada por la Ditec."],
          ["Cómo se ingresa", "Directamente en la Ditec, con los antecedentes del punto 4.2 de la Res. Ex. N°59 y el anexo B. Aprobada, recibe un código y un oficio aprobatorio firmado por la jefatura de la división."],
          ["Qué revisa el Serviu después", "Al estar aprobada por la Ditec, la edificación no se vuelve a revisar. El Serviu revisa el emplazamiento en el terreno conocido, las fundaciones, la habilitación del terreno cuando corresponda y la versión definitiva de las especialidades. La Seremi ve las normas urbanísticas."],
        ].map(([et, p], i) => (
          <div className={S.norma} key={i} style={i === 0 ? { marginTop: 16 } : undefined}><span className={S.et}>{et}</span><p>{p}</p></div>
        ))}

        <h3 style={{ marginTop: 34, fontSize: 20 }}>Los incentivos vigentes</h3>
        <div className={cx("rejilla dos")} style={{ marginTop: 14 }}>
          <div className={cx("tarjeta cifra")}><div className={S.num}>{cif("anticipo-industrializadora")}</div><div className={S.rot}>de anticipo sobre el monto total de partidas industrializadas, pagado directamente a la industrializadora, en DS49 y DS10</div></div>
          <div className={cx("tarjeta cifra")}><div className={S.num}>{cif("programas-vivienda-industrializada")}</div><div className={S.rot}>programas incorporan el concepto de vivienda industrializada en sus llamados: DS10, DS49 y, recientemente, DS19</div></div>
        </div>
        <div className={S.norma} style={{ marginTop: 12 }}><span className={S.et}>Redistribución de subsidios</span><p>En viviendas tipo se permite redistribuir el subsidio base y los complementarios según los requerimientos del proyecto.</p></div>
        <div className={S.norma}><span className={S.et}>Replicabilidad</span><p>Una VIT aprobada puede volver a usarse sin nuevas revisiones. Ahí está el ahorro administrativo que ninguna otra vía entrega.</p></div>

        <Fuente>
          Fuente: Ditec Minvu, presentación «Industrialización en vivienda», 29 may 2026 · Minvu, publicación
          N°398, dic 2025, capítulo «Marco normativo y programático actual» · Res. Ex. N°52 y N°59 de 2023 y
          Glosa 06 de la Ley de Presupuestos.
        </Fuente>
      </div></section>

      {/* ===== 11 · CIRCULAR 023 ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Circular N°023</span>
        <h2>Cómo se ejecuta un proyecto VIT</h2>
        <p className={S.lede}>
          Recogida del levantamiento de procesos en todos los Serviu del país y de un taller de brechas y
          buenas prácticas con sus representantes, esta circular fija un modelo estándar de aplicación
          nacional. Es la respuesta institucional a la disparidad de criterios entre regiones.
        </p>
        <div className={S["doc-ficha"]}>
          <span className={S.et}>Documento</span>
          <h3>Circular N°023 · Subsecretaría de Vivienda y Urbanismo</h3>
          <dl className={S.meta}>
            <dt>Fecha</dt>
            <dd>16 de mayo de 2025</dd>
            <dt>Materia</dt>
            <dd>instruye sobre la implementación del proceso asociado a viviendas industrializadas tipo</dd>
            <dt>Dirigida a</dt>
            <dd>directores de Serviu y secretarios regionales ministeriales de todas las regiones</dd>
            <dt>Antecedente</dt>
            <dd>Ley N°21.450, artículo cuarto, sobre gestión de suelo y plan de emergencia habitacional</dd>
            <dt>Anexos</dt>
            <dd>
              <ul className={S.anexos}>
                <li>mandato de cobro VIT</li>
                <li>informe de recepción definitiva Serviu</li>
                <li>informe de condiciones urbanísticas Seremi</li>
                <li>Oficio Ordinario N°2009 del SII</li>
              </ul>
            </dd>
          </dl>
        </div>

        <div className={S["flujo-lienzo"]}>
          <h4>El proceso, de punta a punta</h4>
          <p className={S.sub}>Del ingreso a evaluación hasta la recepción del Serviu. Tres procesos corren en paralelo durante toda la fabricación y la obra.</p>
          <div className={S["flujo-leyenda"]}>
            <span><em style={{ background: "#009DE6" }} />Fiscalización técnica de obras</span>
            <span><em style={{ background: "#E04E00" }} />Fabricación de elementos</span>
            <span><em style={{ background: "#005CAD" }} />Gestión de pago</span>
          </div>
          <p className={S.desliza}>Desliza para recorrer el flujo <i>→</i></p>
          <div className={S["flujo-box"]}>
            <div className={S["flujo-wrap"]} tabIndex={0} role="region" aria-label="Flujo del proceso de viviendas industrializadas tipo, desplazable horizontalmente">
              <div className={S["flujo-h"]}>
                <div className={cx("zona-f f1")} style={{ gridColumn: "1/4", gridRow: "1/7" }} />
                <div className={cx("zona-f f2")} style={{ gridColumn: "4/8", gridRow: "1/7" }} />
                <div className={S["fase-h"]} style={{ gridColumn: "1/4", gridRow: 1 }}>Fase 1 · Evaluación y calificación</div>
                <div className={S["fase-h"]} style={{ gridColumn: "4/8", gridRow: 1 }}>Fase 2 · Fabricación y construcción</div>
                <div className={S.banda} style={{ gridColumn: "4/8", gridRow: 2, background: "#009DE6", color: "#0A3550" }}>Fiscalización técnica de obras<span className={S.dot} style={{ background: "#0A3550" }} /></div>
                {[
                  ["PASO 01", "Ingreso a evaluación", "El Serviu recibe la carpeta completa y actúa como ventanilla hacia la Seremi.", 1],
                  ["PASO 02", "Evaluación del proyecto VIT", "Revisión simultánea: Serviu ve lo técnico, jurídico y social; Seremi, las normas urbanísticas.", 2, true],
                  ["PASO 03", "Calificación definitiva", "Es la que habilita el pago del anticipo a la industrializadora.", 3],
                  ["PASO 04", "FTO y entrega de terreno", "Designación del fiscalizador, en terreno o en planta, y firma del acta de entrega.", 4],
                  ["PASO 05", "Inicio de obra", "La fabricación en planta ya viene corriendo en paralelo.", 5],
                  ["PASO 06", "Ejecución", "Urbanización y montaje en terreno.", 6],
                  ["PASO 07", "Recepción Serviu", "Certificado de recepción definitiva, que reemplaza a la municipal y se reduce a escritura pública.", 7, true],
                ].map(([n, t, p, col, mark]) => (
                  <div className={S["paso-h"]} style={{ gridColumn: col as number, gridRow: 3 }} key={n as string}>
                    <span className={S.n}>{n}</span><h4>{t}{mark ? <span className={S.dot} /> : null}</h4><p>{p}</p>
                  </div>
                ))}
                <div className={S["rama-h"]} style={{ gridColumn: "2/4", gridRow: 4 }}>
                  <span className={S.t}>Definición del tipo de fiscalización</span>
                  <div className={S.op}><div><b>Necesita</b>fiscalización en planta</div><div><b>No necesita</b>fiscalización en planta</div></div>
                </div>
                <div className={S.banda} style={{ gridColumn: "4/7", gridRow: 4, background: "#E04E00" }}>Fabricación de elementos industrializados</div>
                <div className={S.banda} style={{ gridColumn: "4/8", gridRow: 5, background: "#005CAD" }}>Gestión de pago<span className={S.dot} style={{ background: "#fff" }} /></div>
                <div className={S["pagos-h"]} style={{ gridColumn: "4/6", gridRow: 6 }}>
                  <span><b>Anticipo a la industrializadora</b> · hasta 50% de las partidas de fabricación · Sub. 33</span>
                  <span><b>Anticipos o préstamos a la constructora</b> · Sub. 33 / Sub. 32</span>
                </div>
                <div className={S["pagos-h"]} style={{ gridColumn: "6/8", gridRow: 6 }}>
                  <span><b>Pago de partidas en obra a la industrializadora</b> · Sub. 33</span>
                  <span><b>Avance de obra y anticipos a la constructora</b> · Sub. 33 / Sub. 32</span>
                  <span><b>Avance de obras</b> · Sub. 33 / Sub. 32</span>
                </div>
              </div>
            </div>
            <div className={S["flujo-fade"]} />
          </div>
        </div>
        <p className={S["flujo-nota"]}>El punto marca las etapas que la circular desarrolla en detalle. Redibujado a partir del diagrama de la Circular N°023; los nombres de las etapas y las glosas presupuestarias son los de la fuente.</p>

        <h3 style={{ marginTop: 34, fontSize: 20 }}>Lo único que el Serviu debe corroborar</h3>
        <p style={{ color: "var(--gris)", fontSize: 15, maxWidth: "62ch" }}>Sobre un proyecto ya aprobado por la Ditec, la circular acota la revisión regional a ocho puntos. Todo lo demás ya fue revisado.</p>
        <ol className={S.check}>
          {CHECK_SERVIU.map((c) => <li key={c.titulo}><b>{c.titulo}</b>{c.texto}</li>)}
        </ol>

        <h3 style={{ marginTop: 36, fontSize: 20 }}>Gestión de pago</h3>
        <div className={cx("rejilla dos")} style={{ marginTop: 14 }}>
          <div className={cx("tarjeta cifra")}><div className={S.num}>{cif("anticipo-industrializadora")}</div><div className={S.rot}>de anticipo sobre el total de las partidas de fabricación, con cargo a los subsidios del proyecto, pagable con calificación definitiva y sujeto a disponibilidad presupuestaria</div></div>
          <div className={S.tarjeta}><h3>Mandato de cobro</h3><div className={S.rot}>La constructora cede a la industrializadora el derecho a recibir el pago directamente, sin perder sus responsabilidades. La circular adjunta el documento tipo.</div></div>
        </div>
        <div className={S.norma} style={{ marginTop: 12 }}><span className={S.et}>Garantías</span><p>Se aceptan boleta de garantía, certificado de fianza o póliza. Se devuelven cuando el avance de las obras industrializadas supera el porcentaje anticipado. A las industrializadoras no se les exige garantía de seriedad de la oferta ni de fiel cumplimiento, porque la responsable de la obra es la constructora.</p></div>

        <h3 style={{ marginTop: 34, fontSize: 20 }}>Fiscalización y recepción</h3>
        <div className={S.norma}><span className={S.et}>Fiscalización técnica en planta</span><p>El protocolo lo estableció la Ditec por Oficio Ordinario N°1.059 del 16 de junio de 2022. Si un proyecto necesita fiscalización en planta se define según el grado de industrialización que declara la constructora. La responsabilidad de la fiscalización en planta radica en el Serviu, que puede ejecutarla o contratarla con inscritos en el Registro de Consultores del Minvu. Incluye marcado y codificado de los componentes para resguardar la trazabilidad.</p></div>
        <div className={S.norma}><span className={S.et}>Recepción</span><p>Sin recepción municipal, el Serviu emite un certificado de recepción definitiva que emula el de obras de edificación e identifica a la industrializadora. Se reduce a escritura pública, tiene carácter de contrato e incorpora las franquicias del DFL2. Los plazos del artículo 18 de la Ley General se cuentan desde esa recepción.</p></div>
        <div className={S.norma}><span className={S.et}>Modificaciones</span><p>Una VIT aprobada puede modificarse si mantiene las condiciones de industrialización que dieron origen a su aprobación. La Ditec la aprueba con un oficio complementario y conserva el código original. Los ajustes menores, como viviendas espejo o cambios de terminaciones, los autoriza el Serviu, siempre que no alteren estructura, acústica, comportamiento al fuego ni respuesta higrotérmica.</p></div>

        <h3 style={{ marginTop: 34, fontSize: 20 }}>Aspectos tributarios</h3>
        <div className={S.norma}><span className={S.et}>Crédito especial de empresas constructoras</span><p>Por Oficio Ordinario N°2009 del Servicio de Impuestos Internos, del 16 de octubre de 2024, los contratos generales de construcción sobre viviendas tipo industrializadas financiadas con subsidio tienen derecho al CEEC aun sin permiso de edificación. Como fecha homologable al permiso se usa la fecha del contrato.</p></div>
        <div className={S.norma}><span className={S.et}>Consorcios</span><p>La Res. Ex. N°339 de 2024 permite presentarse a selección con empresas o consorcios que consideren en su totalidad la ejecución de viviendas industrializadas. El consorcio se constituye por contrato, sin crear una nueva sociedad.</p></div>

        <div className={S.aviso} style={{ marginTop: 22 }}>
          <b>Dos fechas que conviene tener a la vista.</b> La Glosa 06 que exime del permiso y la recepción
          municipal se renueva en cada ley de presupuestos: la circular invoca la Ley N°21.722 para 2025 y
          la presentación de la Ditec, la ley de 2026. Y el crédito especial de empresas constructoras se
          elimina a contar del 1 de enero de 2027, según la Ley N°21.420, con un régimen de transición.
        </div>
        <Fuente>
          Fuente: Circular N°023 de la Subsecretaría de Vivienda y Urbanismo, 16 may 2025, y sus anexos ·
          Oficio Ordinario N°1.059 de la Ditec, 16 jun 2022 · Oficio Ordinario N°2009 de la Subdirección
          Normativa del SII, 16 oct 2024 · Res. Ex. N°339 de 2024, Minvu.
        </Fuente>
      </div></section>

      {/* ===== 12 · HISTORIA ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>1930 — 2025</span>
        <h2>Cómo llegamos hasta acá</h2>
        <p className={S.lede}>La industrialización habitacional en Chile no aparece de golpe. Es casi un siglo de avances, retrocesos y aprendizajes entre el Estado, la academia y la industria.</p>
        <div className={S.historia}>
          {HISTORIA.map((h) => (
            <div className={h.act ? cx("hito act") : S.hito} key={h.periodo}>
              <div className={S.a}>{h.periodo}</div><h3>{h.titulo}</h3><p>{h.texto}</p>
            </div>
          ))}
        </div>
        <Fuente>Fuente: Minvu, publicación N°398, dic 2025, capítulo «Evolución de la industrialización habitacional en Chile (1930–2025)». El tramo 2024–2026 incorpora los cortes posteriores citados en esta página.</Fuente>
      </div></section>

      {/* ===== 13 · QUÉ FALTA ===== */}
      <section className={S.oscura}><div className={S.wrap}>
        <span className={S.kicker}>La lectura de la Ditec</span>
        <h2>Qué falta para que esto escale</h2>
        <p className={S.lede}>La división plantea que la industrialización no escala sola: necesita que el resto del proceso opere con la misma lógica. Cinco condiciones habilitantes.</p>
        <div className={cx("rejilla dos")}>
          {CONDICIONES_ESCALA.map((c) => (
            <div className={c.ancho ? cx("tarjeta ancha") : S.tarjeta} key={c.titulo} style={c.ancho ? { gridColumn: "1/-1" } : undefined}><h3>{c.titulo}</h3><div className={S.rot}>{c.texto}</div></div>
          ))}
        </div>
        <Fuente>Fuente: Ditec Minvu, presentación «Industrialización habitacional: construyendo la capacidad que Chile necesita», 29 may 2026.</Fuente>
      </div></section>

      {/* ===== 14 · DATOS SOLICITADOS ===== */}
      <section><div className={S.wrap}>
        <div className={cx("verificacion cierre")}>
          <span className={S.et}>Datos solicitados a la Ditec</span>
          Tres piezas están pedidas y aún no publicadas: el listado completo de las {cif("vit-aprobadas")} VIT con su zona
          térmica y superficie por modelo; el criterio de conteo por macrozona; y la conciliación del
          registro de autorizaciones, porque el sitio del Minvu lista 26 empresas al 3 de junio de 2026
          —incluida Aceros O'Higgins, que no aparece en la presentación del seminario— y consigna a Canada
          House con una resolución distinta de la que muestra esa misma lámina. Se publican cuando estén confirmadas.
        </div>
      </div></section>

      {/* ===== 15 · FUENTES ===== */}
      <section><div className={S.wrap}>
        <span className={S.kicker}>Cómo se mantiene</span>
        <h2>Fuentes y actualización</h2>
        <p className={S.lede}>
          Todas las cifras de esta sección provienen de publicaciones y presentaciones de la División
          Técnica de Estudio y Fomento Habitacional del Minvu. El CCI las registra, las ordena y las
          mantiene en el tiempo. No las produce.
        </p>
        <div className={S.cadencia}>
          <span className={S.c}><b>Serie continua</b> desde marzo 2023</span>
          <span className={S.c}><b>Se actualiza</b> con cada publicación de la Ditec</span>
          <span className={S.c}><b>Fecha de corte</b> en cada cifra</span>
        </div>
        <ul className={S.docs}>
          {DOCS.map((d) => {
            const f = obtenerFuente(d.fuenteId);
            return (
              <li key={d.titulo}>
                {f.url ? <a href={f.url} target="_blank" rel="noopener noreferrer">{d.titulo}</a> : <span style={{ fontWeight: 600 }}>{d.titulo}</span>}
                <span className={S.m}>{d.meta}</span>
              </li>
            );
          })}
        </ul>
        <Fuente>¿Detectaste un dato desactualizado o una cifra que no calza con tu registro? Escríbenos y lo corregimos con la fuente a la vista.</Fuente>
        <div style={{ marginTop: 26 }}>
          <Link href="/data" className={S.teaser}>Volver a <b>CCI Data</b></Link>
        </div>
      </div></section>
    </div>
  );
}

// ---- íconos de los 8 criterios (decorativos, aria-hidden) ----
const ICONO_CRITERIO: Record<string, React.ReactNode> = {
  "01": (<svg viewBox="0 0 32 32" aria-hidden="true"><rect className={S.s} x="4" y="5" width="24" height="22" rx="3" /><path className={S.s} d="M4,11 L28,11" /><path className={S.s} d="M9,16 L20,16" /><path className={S.a} d="M9,20 h13 v2.6 h-13 z" /><path className={S.s} d="M9,25.5 L16,25.5" /></svg>),
  "02": (<svg viewBox="0 0 32 32" aria-hidden="true"><path className={S.s} d="M6,26 L26,26 L6,8 Z" /><circle className={S.a} cx="11" cy="21" r="2.6" /><path className={S.s} d="M6,17 L14,17" /></svg>),
  "03": (<svg viewBox="0 0 32 32" aria-hidden="true"><path className={S.s} d="M4,20 L4,13 L11,20 L11,13 L18,20" /><rect className={S.s} x="4" y="20" width="14" height="7" /><path className={S.s} d="M21,16 L28,16 M25,13 L28,16 L25,19" /><rect className={S.a} x="6" y="23" width="4" height="4" rx="1" /></svg>),
  "04": (<svg viewBox="0 0 32 32" aria-hidden="true"><circle className={S.s} cx="12" cy="16" r="7" /><circle className={S.s} cx="20" cy="16" r="7" /><path className={S.a} d="M14.6,12.5 h2.8 v7 h-2.8 z" opacity=".5" /></svg>),
  "05": (<svg viewBox="0 0 32 32" aria-hidden="true"><path className={S.s} d="M5,10 L10,16 L5,22" /><path className={S.s} d="M13,10 L18,16 L13,22" /><path className={S.a} d="M21,10 L26,16 L21,22 L23.4,16 Z" /></svg>),
  "06": (<svg viewBox="0 0 32 32" aria-hidden="true"><circle className={S.s} cx="16" cy="13" r="7.5" /><path className={S.a} d="M12.6,13.2 L15,15.6 L19.6,10.6 L21.2,12.2 L15,18.4 L11,14.4 Z" /><path className={S.s} d="M11,20 L9,28 L16,25 L23,28 L21,20" /></svg>),
  "07": (<svg viewBox="0 0 32 32" aria-hidden="true"><rect className={S.s} x="4" y="6" width="24" height="17" rx="2.5" /><path className={S.s} d="M12,27 L20,27 M16,23 L16,27" /><path className={S.a} d="M16,10 L21,12.8 L21,17.4 L16,20.2 L11,17.4 L11,12.8 Z" opacity=".55" /><path className={S.s} d="M16,10 L21,12.8 L21,17.4 L16,20.2 L11,17.4 L11,12.8 Z" /></svg>),
  "08": (<svg viewBox="0 0 32 32" aria-hidden="true"><path className={S.s} d="M5,23 A11,11 0 0 1 27,23" /><path className={S.s} d="M5,23 L27,23" opacity=".35" /><path className={S.a} d="M16,23 L23.5,14.5 L24.9,15.9 Z" /><circle className={S.a} cx="16" cy="23" r="2.4" /></svg>),
};
