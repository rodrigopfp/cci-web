// "La industrialización en cifras" — datos de la sección de KPIs del Radar.
//
// Regla editorial ABSOLUTA del proyecto: ninguna cifra sin fuente visible.
// Por eso la fuente (nombre, título del informe, año y URL) es parte del tipo:
// no se puede declarar un KPI sin declarar de dónde sale.
//
// A futuro estos datos podrían migrar a Sanity (igual que los indicadores del
// Radar). Por ahora viven aquí, versionados en el repo, con su fuente al lado.

export interface KpiSource {
  /** Organización responsable. Ej: "McKinsey & Company". */
  name: string;
  /** Título del informe citado. */
  title: string;
  /** Año de publicación. */
  year: number;
  /** URL a la fuente original (se abre en pestaña nueva). */
  url: string;
}

const MCKINSEY_MODULAR: KpiSource = {
  name: "McKinsey & Company",
  title: "Modular construction: From projects to products",
  year: 2019,
  url: "https://www.mckinsey.com/capabilities/operations/our-insights/modular-construction-from-projects-to-products",
};

const ASCE_RESIDUOS: KpiSource = {
  name: "ASCE · Journal of Management in Engineering",
  title: "Construcción modular y reducción de residuos (estudio de 59 edificios)",
  year: 2024,
  url: "https://ascelibrary.org/doi/10.1061/JMENEA.MEENG-5828",
};

const MCKINSEY_PRODUCTIVIDAD: KpiSource = {
  name: "McKinsey & Company",
  title: "Delivering on construction productivity is no longer optional",
  year: 2024,
  url: "https://www.mckinsey.com/capabilities/operations/our-insights/delivering-on-construction-productivity-is-no-longer-optional",
};

const MCKINSEY_REINVENTING: KpiSource = {
  name: "McKinsey Global Institute",
  title: "Reinventing Construction / Improving construction productivity",
  year: 2017,
  url: "https://www.mckinsey.com/capabilities/operations/our-insights/improving-construction-productivity",
};

const MCKINSEY_FIT: KpiSource = {
  name: "McKinsey & Company",
  title: "Making modular construction fit",
  year: 2023,
  url: "https://www.mckinsey.com/capabilities/operations/our-insights/making-modular-construction-fit",
};

/** (1) Velocidad — gauge semicircular. Rango verificado 20%–50% más rápido. */
export interface KpiGauge {
  id: string;
  label: string;
  /** Frase de contexto honesta (usa "hasta" / "según"). */
  note: string;
  /** Extremo inferior del rango verificado (%). */
  rangeMin: number;
  /** Extremo superior y valor destacado del gauge (%). */
  rangeMax: number;
  /** Texto grande que corona el instrumento. */
  display: string;
  source: KpiSource;
}

export const velocidad: KpiGauge = {
  id: "velocidad",
  label: "Velocidad de obra",
  note: "Los proyectos modulares aceleran los plazos entre 20% y 50% frente a la construcción tradicional, según McKinsey.",
  rangeMin: 20,
  rangeMax: 50,
  display: "Hasta 50% más rápido",
  source: MCKINSEY_MODULAR,
};

/** (2)(3)(6) Tarjetas de cifra grande con contador animado. */
export interface KpiCounter {
  id: string;
  label: string;
  note: string;
  /** Valor final del contador. */
  value: number;
  /** Prefijo antes del número (ej. "Hasta "). */
  prefix?: string;
  /** Sufijo tras el número (ej. "%", "x"). */
  suffix?: string;
  source: KpiSource;
}

export const costo: KpiCounter = {
  id: "costo",
  label: "Ahorro en costos",
  note: "Hasta un 20% menos en costos de construcción al optimizar la producción a escala, según McKinsey.",
  value: 20,
  prefix: "Hasta ",
  suffix: "%",
  source: MCKINSEY_MODULAR,
};

export const manoDeObra: KpiCounter = {
  id: "mano-de-obra",
  label: "Trabajo trasladado a fábrica",
  note: "Hasta un 80% del trabajo puede moverse de la faena al ambiente controlado de la fábrica, según McKinsey.",
  value: 80,
  prefix: "Hasta ",
  suffix: "%",
  source: MCKINSEY_MODULAR,
};

export const potencial: KpiCounter = {
  id: "potencial",
  label: "Potencial de productividad",
  note: "Pasar a una producción industrializada tipo manufactura puede multiplicar la productividad entre 5 y 10 veces, según McKinsey Global Institute.",
  value: 10,
  prefix: "5 a ",
  suffix: "x",
  source: MCKINSEY_REINVENTING,
};

/** (4) Residuos — dona / anillo. ≈80% menos residuos. */
export interface KpiDonut {
  id: string;
  label: string;
  note: string;
  /** Porcentaje que llena el anillo. */
  value: number;
  suffix: string;
  source: KpiSource;
}

export const residuos: KpiDonut = {
  id: "residuos",
  label: "Menos residuos",
  note: "Un estudio de 59 edificios con construcción modular midió cerca de un 80% menos de residuos de construcción.",
  value: 80,
  suffix: "%",
  source: ASCE_RESIDUOS,
};

/** (5) Productividad — barras comparativas horizontales. */
export interface KpiBar {
  /** Nombre de la serie. */
  name: string;
  /** Crecimiento anual de productividad (%). Puede ser negativo. */
  value: number;
  /** Token de color Tailwind del manual CCI. */
  color: string;
  /** Marca la barra a resaltar (caída de la construcción). */
  highlight?: boolean;
}

export interface KpiProductividad {
  id: string;
  label: string;
  note: string;
  /** Series 2000–2022 (crecimiento anual). */
  series: KpiBar[];
  /** Dato aparte: caída 2020–2022 de la construcción. */
  drop: { label: string; value: number };
  source: KpiSource;
}

export const productividad: KpiProductividad = {
  id: "productividad",
  label: "Productividad que se queda atrás",
  note: "Crecimiento anual de la productividad entre 2000 y 2022, según McKinsey. La construcción avanza muy por debajo de la manufactura y de la economía mundial.",
  series: [
    { name: "Construcción", value: 0.4, color: "#E04E00", highlight: true },
    { name: "Economía mundial", value: 2, color: "#005CAD" },
    { name: "Manufactura", value: 3, color: "#009DE6" },
  ],
  drop: { label: "Y entre 2020 y 2022 la productividad de la construcción cayó", value: -8 },
  source: MCKINSEY_PRODUCTIVIDAD,
};

/** (7) El mundo ya partió — participación de la vivienda industrializada por país. */
export interface KpiCountry {
  /** País o grupo. */
  name: string;
  /** Participación (%). */
  value: number;
  /** true cuando el valor real es "menor que" (ej. <4%). */
  lessThan?: boolean;
  color: string;
}

export interface KpiMundo {
  id: string;
  label: string;
  note: string;
  countries: KpiCountry[];
  source: KpiSource;
}

export const mundo: KpiMundo = {
  id: "mundo",
  label: "El mundo ya partió",
  note: "Participación de la vivienda industrializada sobre el total construido, según McKinsey.",
  countries: [
    { name: "EE.UU.", value: 4, lessThan: true, color: "#5C5C5C" },
    { name: "Japón", value: 15, color: "#005CAD" },
    { name: "Finlandia, Noruega y Suecia", value: 45, color: "#E04E00" },
  ],
  source: MCKINSEY_FIT,
};
