import styles from "./vit.module.css";

const S = styles as Record<string, string>;

/**
 * Chips de zonas térmicas de una vivienda. Sin estado ni hooks: se usa igual
 * en el catálogo (render en servidor) y dentro del buscador (cliente).
 * · activa → azul sólido (la zona de la comuna buscada);
 * · condicionada → borde punteado cálido (aprobada con condición en el oficio).
 */
export default function ChipsZonas({
  zonas,
  condicionadas,
  activa,
  compacto,
}: {
  zonas: string[];
  condicionadas: string[];
  activa?: string;
  compacto?: boolean;
}) {
  const desc = zonas.map((z) => (condicionadas.includes(z) ? `${z} con condición` : z)).join(", ");
  return (
    <ul className={compacto ? `${S["zc-lista"]} ${S.compacto}` : S["zc-lista"]} aria-label={`Zonas térmicas aprobadas: ${desc}`}>
      {zonas.map((z) => {
        const cond = condicionadas.includes(z);
        const cls = [S.zc, z === activa ? S.activa : "", cond ? S.cond : ""].filter(Boolean).join(" ");
        return (
          <li key={z} className={cls} title={cond ? `Zona ${z}, aprobada con condición` : `Zona ${z}`}>
            {z}
          </li>
        );
      })}
    </ul>
  );
}
