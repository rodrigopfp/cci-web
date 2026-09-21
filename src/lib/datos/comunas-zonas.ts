// ============================================================================
// COMUNAS Y ZONAS TÉRMICAS — ARCHIVO GENERADO. NO EDITAR A MANO.
// ============================================================================
// Generado por scripts/rutas/generar-comunas.ts el 2026-09-21 a partir de
//   · scripts/fichas-vit/zonas-termicas-comunas.csv (Ditec Minvu, zonificación
//     térmica por comuna según NCh1079; 410 filas, 345 comunas,
//     59 con más de una zona; no incluye la comuna Antártica).
//   · scripts/fichas-vit/coordenadas-comunas-altazor.csv (cabeceras comunales
//     y CUT; dataset provisional, a reemplazar por una capa oficial).
// La zona del centro urbano de las comunas partidas es elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec
// (reglas en comunas-reglas.ts; el validador las recalcula y compara).
// Tipos y validación: src/lib/datos/comunas.ts.
// ============================================================================

import type { ComunaZona } from "./comunas-tipos";

export const COMUNAS_META = {
  generadoEl: "2026-09-21",
  fuenteZonas: "ditec-zonas-termicas-comunas",
  fuenteCoordenadas: "coordenadas-comunas-altazor",
  fuenteCentroUrbano: "cci-zona-centro-urbano",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec",
  filasDitec: 410,
  comunas: 345,
  comunasConVariasZonas: 59,
  comunasSinIncluir: ["Antártica"],
} as const;

export const COMUNAS: ComunaZona[] = [
 {
  cut: "15101",
  nombre: "Arica",
  region: "Arica y Parinacota",
  provincia: "Arica",
  lat: -18.455,
  lon: -70.29,
  zonas: [
   {
    zona: "A",
    condicion: "bajo 1.100 msnm",
    altitud: "< 1.100"
   },
   {
    zona: "B",
    condicion: "entre 1.100 y 3.000 msnm",
    altitud: "1.100 ≤ altitud < 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "15102",
  nombre: "Camarones",
  region: "Arica y Parinacota",
  provincia: "Arica",
  lat: -19.0169,
  lon: -69.8669,
  zonas: [
   {
    zona: "A",
    condicion: "bajo 1.100 msnm",
    altitud: "< 1.100"
   },
   {
    zona: "B",
    condicion: "entre 1.100 y 3.000 msnm",
    altitud: "1.100 ≤ altitud < 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "15201",
  nombre: "Putre",
  region: "Arica y Parinacota",
  provincia: "Parinacota",
  lat: -18.2,
  lon: -69.5828,
  zonas: [
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "15202",
  nombre: "General Lagos",
  region: "Arica y Parinacota",
  provincia: "Parinacota",
  lat: -17.6528,
  lon: -69.635,
  zonas: [
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "01101",
  nombre: "Iquique",
  region: "Tarapacá",
  provincia: "Iquique",
  lat: -20.2439,
  lon: -70.1389,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "01402",
  nombre: "Camiña",
  region: "Tarapacá",
  provincia: "Tamarugal",
  lat: -20.4828,
  lon: -69.3669,
  zonas: [
   {
    zona: "B",
    condicion: "entre 1.100 y 3.000 msnm",
    altitud: "1.100 ≤ altitud < 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "01403",
  nombre: "Colchane",
  region: "Tarapacá",
  provincia: "Tamarugal",
  lat: -19.2839,
  lon: -68.675,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "01404",
  nombre: "Huara",
  region: "Tarapacá",
  provincia: "Tamarugal",
  lat: -19.8089,
  lon: -69.9719,
  zonas: [
   {
    zona: "A",
    condicion: "bajo 1.100 msnm",
    altitud: "< 1.100"
   },
   {
    zona: "B",
    condicion: "entre 1.100 y 3.000 msnm",
    altitud: "1.100 ≤ altitud < 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "01405",
  nombre: "Pica",
  region: "Tarapacá",
  provincia: "Tamarugal",
  lat: -20.4828,
  lon: -69.3778,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "01401",
  nombre: "Pozo Almonte",
  region: "Tarapacá",
  provincia: "Tamarugal",
  lat: -20.2908,
  lon: -69.6958,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "01107",
  nombre: "Alto Hospicio",
  region: "Tarapacá",
  provincia: "Iquique",
  lat: -20.2569,
  lon: -70.0219,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "02101",
  nombre: "Antofagasta",
  region: "Antofagasta",
  provincia: "Antofagasta",
  lat: -23.6508,
  lon: -70.395,
  zonas: [
   {
    zona: "A",
    condicion: "al oeste del meridiano 70°",
    meridiano: "≥ 70°"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 70° y bajo 3.000 msnm",
    meridiano: "< 70°",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "meridiano y altitud",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "02102",
  nombre: "Mejillones",
  region: "Antofagasta",
  provincia: "Antofagasta",
  lat: -23.11,
  lon: -70.4558,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "02103",
  nombre: "Sierra Gorda",
  region: "Antofagasta",
  provincia: "Antofagasta",
  lat: -22.8978,
  lon: -69.3228,
  zonas: [
   {
    zona: "B",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: null
 },
 {
  cut: "02104",
  nombre: "Taltal",
  region: "Antofagasta",
  provincia: "Antofagasta",
  lat: -25.41,
  lon: -70.4889,
  zonas: [
   {
    zona: "A",
    condicion: "al oeste del meridiano 70°",
    meridiano: "≥ 70°"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 70° y bajo 3.000 msnm",
    meridiano: "< 70°",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "meridiano y altitud",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "02201",
  nombre: "Calama",
  region: "Antofagasta",
  provincia: "El Loa",
  lat: -22.4739,
  lon: -68.9239,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "02202",
  nombre: "Ollagüe",
  region: "Antofagasta",
  provincia: "El Loa",
  lat: -21.2328,
  lon: -68.2669,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "02203",
  nombre: "San Pedro de Atacama",
  region: "Antofagasta",
  provincia: "El Loa",
  lat: -22.92,
  lon: -68.21,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "02301",
  nombre: "Tocopilla",
  region: "Antofagasta",
  provincia: "Tocopilla",
  lat: -22.0819,
  lon: -70.1889,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "02302",
  nombre: "María Elena",
  region: "Antofagasta",
  provincia: "Tocopilla",
  lat: -22.3169,
  lon: -69.6769,
  zonas: [
   {
    zona: "B",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: null
 },
 {
  cut: "03101",
  nombre: "Copiapó",
  region: "Atacama",
  provincia: "Copiapó",
  lat: -27.375,
  lon: -70.3289,
  zonas: [
   {
    zona: "A",
    condicion: "al oeste del meridiano 70°44'",
    meridiano: "> 70°44'"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 70°44' y bajo 3.000 msnm",
    meridiano: "≤ 70°44'",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "meridiano y altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "03102",
  nombre: "Caldera",
  region: "Atacama",
  provincia: "Copiapó",
  lat: -27.0658,
  lon: -70.8258,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "03103",
  nombre: "Tierra Amarilla",
  region: "Atacama",
  provincia: "Copiapó",
  lat: -27.4728,
  lon: -70.2828,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "03201",
  nombre: "Chañaral",
  region: "Atacama",
  provincia: "Chañaral",
  lat: -26.3458,
  lon: -70.6239,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "03202",
  nombre: "Diego de Almagro",
  region: "Atacama",
  provincia: "Chañaral",
  lat: -26.39,
  lon: -70.0519,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "03301",
  nombre: "Vallenar",
  region: "Atacama",
  provincia: "Huasco",
  lat: -28.5769,
  lon: -70.77,
  zonas: [
   {
    zona: "B",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: null
 },
 {
  cut: "03302",
  nombre: "Alto del Carmen",
  region: "Atacama",
  provincia: "Huasco",
  lat: -28.7489,
  lon: -70.4908,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "03303",
  nombre: "Freirina",
  region: "Atacama",
  provincia: "Huasco",
  lat: -28.5058,
  lon: -71.0758,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "03304",
  nombre: "Huasco",
  region: "Atacama",
  provincia: "Huasco",
  lat: -28.4558,
  lon: -71.1858,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "04101",
  nombre: "La Serena",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -29.9069,
  lon: -71.2469,
  zonas: [
   {
    zona: "C",
    condicion: "al oeste del meridiano 71°",
    meridiano: "> 71°"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 71°",
    meridiano: "≤ 71°"
   }
  ],
  tipoParticion: "meridiano",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04102",
  nombre: "Coquimbo",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -29.9708,
  lon: -71.3069,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "04103",
  nombre: "Andacollo",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -30.23,
  lon: -71.0858,
  zonas: [
   {
    zona: "B",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: null
 },
 {
  cut: "04104",
  nombre: "La Higuera",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -29.5,
  lon: -71.2828,
  zonas: [
   {
    zona: "C",
    condicion: "al oeste del meridiano 71°",
    meridiano: "> 71°"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 71°",
    meridiano: "≤ 71°"
   }
  ],
  tipoParticion: "meridiano",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04105",
  nombre: "Paiguano",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -30.0378,
  lon: -70.5069,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec",
  alias: [
   "Paihuano"
  ]
 },
 {
  cut: "04106",
  nombre: "Vicuña",
  region: "Coquimbo",
  provincia: "Elqui",
  lat: -30.0189,
  lon: -70.715,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04201",
  nombre: "Illapel",
  region: "Coquimbo",
  provincia: "Choapa",
  lat: -31.6389,
  lon: -71.1789,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04202",
  nombre: "Canela",
  region: "Coquimbo",
  provincia: "Choapa",
  lat: -31.3958,
  lon: -71.4189,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "04203",
  nombre: "Los Vilos",
  region: "Coquimbo",
  provincia: "Choapa",
  lat: -31.915,
  lon: -71.5058,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "04204",
  nombre: "Salamanca",
  region: "Coquimbo",
  provincia: "Choapa",
  lat: -31.78,
  lon: -70.9669,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04301",
  nombre: "Ovalle",
  region: "Coquimbo",
  provincia: "Limarí",
  lat: -30.5989,
  lon: -71.1889,
  zonas: [
   {
    zona: "C",
    condicion: "al oeste del meridiano 71°15'",
    meridiano: "> 71°15'"
   },
   {
    zona: "B",
    condicion: "al este del meridiano 71°15'",
    meridiano: "≤ 71°15'"
   }
  ],
  tipoParticion: "meridiano",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04302",
  nombre: "Combarbalá",
  region: "Coquimbo",
  provincia: "Limarí",
  lat: -31.18,
  lon: -71.0039,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04303",
  nombre: "Monte Patria",
  region: "Coquimbo",
  provincia: "Limarí",
  lat: -30.775,
  lon: -70.9428,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "04304",
  nombre: "Punitaqui",
  region: "Coquimbo",
  provincia: "Limarí",
  lat: -30.8328,
  lon: -71.26,
  zonas: [
   {
    zona: "B",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: null
 },
 {
  cut: "04305",
  nombre: "Río Hurtado",
  region: "Coquimbo",
  provincia: "Limarí",
  lat: -30.2728,
  lon: -70.6669,
  zonas: [
   {
    zona: "B",
    condicion: "bajo 3.000 msnm",
    altitud: "< 3.000"
   },
   {
    zona: "H",
    condicion: "sobre 3.000 msnm",
    altitud: "≥ 3.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "B",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05101",
  nombre: "Valparaíso",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -33.0333,
  lon: -71.6667,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05102",
  nombre: "Casablanca",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -33.325,
  lon: -71.41,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05103",
  nombre: "Concón",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -32.96,
  lon: -71.4689,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05104",
  nombre: "Juan Fernández",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -33.6328,
  lon: -78.8669,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05105",
  nombre: "Puchuncaví",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -32.7478,
  lon: -71.3978,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05801",
  nombre: "Quilpué",
  region: "Valparaíso",
  provincia: "Marga Marga",
  lat: -33.0475,
  lon: -71.4422,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05107",
  nombre: "Quintero",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -32.845,
  lon: -71.4669,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05804",
  nombre: "Villa Alemana",
  region: "Valparaíso",
  provincia: "Marga Marga",
  lat: -33.0658,
  lon: -71.3289,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05109",
  nombre: "Viña del Mar",
  region: "Valparaíso",
  provincia: "Valparaíso",
  lat: -33.025,
  lon: -71.515,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05201",
  nombre: "Isla de Pascua",
  region: "Valparaíso",
  provincia: "Isla de Pascua",
  lat: -27.1286,
  lon: -109.3597,
  zonas: [
   {
    zona: "A",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "A",
  metodoCentroUrbano: null
 },
 {
  cut: "05301",
  nombre: "Los Andes",
  region: "Valparaíso",
  provincia: "Los Andes",
  lat: -32.8369,
  lon: -70.5969,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05302",
  nombre: "Calle Larga",
  region: "Valparaíso",
  provincia: "Los Andes",
  lat: -32.8831,
  lon: -70.4819,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05303",
  nombre: "Rinconada",
  region: "Valparaíso",
  provincia: "Los Andes",
  lat: -32.8331,
  lon: -70.6883,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05304",
  nombre: "San Esteban",
  region: "Valparaíso",
  provincia: "Los Andes",
  lat: -32.805,
  lon: -70.5808,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05401",
  nombre: "La Ligua",
  region: "Valparaíso",
  provincia: "Petorca",
  lat: -32.3536,
  lon: -71.2719,
  zonas: [
   {
    zona: "C",
    condicion: "al oeste del meridiano 71°15'",
    meridiano: "> 71°15'"
   },
   {
    zona: "D",
    condicion: "al este del meridiano 71°15'",
    meridiano: "≤ 71°15'"
   }
  ],
  tipoParticion: "meridiano",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec",
  verificar: "La cabecera queda a 1,3 minutos del meridiano 71°15'; la zona del centro urbano se debe verificar en terreno."
 },
 {
  cut: "05402",
  nombre: "Cabildo",
  region: "Valparaíso",
  provincia: "Petorca",
  lat: -32.4089,
  lon: -71.08,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05403",
  nombre: "Papudo",
  region: "Valparaíso",
  provincia: "Petorca",
  lat: -32.47,
  lon: -71.3808,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05404",
  nombre: "Petorca",
  region: "Valparaíso",
  provincia: "Petorca",
  lat: -32.29,
  lon: -70.95,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05405",
  nombre: "Zapallar",
  region: "Valparaíso",
  provincia: "Petorca",
  lat: -32.5678,
  lon: -71.4378,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05501",
  nombre: "Quillota",
  region: "Valparaíso",
  provincia: "Quillota",
  lat: -32.915,
  lon: -71.2639,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05502",
  nombre: "Calera",
  region: "Valparaíso",
  provincia: "Quillota",
  lat: -32.7839,
  lon: -71.2039,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null,
  alias: [
   "La Calera"
  ]
 },
 {
  cut: "05503",
  nombre: "Hijuelas",
  region: "Valparaíso",
  provincia: "Quillota",
  lat: -32.855,
  lon: -71.0939,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05504",
  nombre: "La Cruz",
  region: "Valparaíso",
  provincia: "Quillota",
  lat: -32.8239,
  lon: -71.2439,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05802",
  nombre: "Limache",
  region: "Valparaíso",
  provincia: "Marga Marga",
  lat: -33.0028,
  lon: -71.2608,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05506",
  nombre: "Nogales",
  region: "Valparaíso",
  provincia: "Quillota",
  lat: -32.7358,
  lon: -71.2078,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05803",
  nombre: "Olmué",
  region: "Valparaíso",
  provincia: "Marga Marga",
  lat: -33.0089,
  lon: -71.17,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05601",
  nombre: "San Antonio",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.5947,
  lon: -71.6072,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05602",
  nombre: "Algarrobo",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.3692,
  lon: -71.6681,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05603",
  nombre: "Cartagena",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.5536,
  lon: -71.6075,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05604",
  nombre: "El Quisco",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.3914,
  lon: -71.6928,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05605",
  nombre: "El Tabo",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.48,
  lon: -71.6208,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05606",
  nombre: "Santo Domingo",
  region: "Valparaíso",
  provincia: "San Antonio",
  lat: -33.7078,
  lon: -71.63,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "05701",
  nombre: "San Felipe",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.75,
  lon: -70.7128,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05702",
  nombre: "Catemu",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.7808,
  lon: -70.9689,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05703",
  nombre: "Llaillay",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.8439,
  lon: -70.9569,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null,
  alias: [
   "Llay-Llay"
  ]
 },
 {
  cut: "05704",
  nombre: "Panquehue",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.7839,
  lon: -70.8369,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "05705",
  nombre: "Putaendo",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.6278,
  lon: -70.7158,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "05706",
  nombre: "Santa María",
  region: "Valparaíso",
  provincia: "San Felipe",
  lat: -32.7503,
  lon: -70.6669,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13101",
  nombre: "Santiago",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4372,
  lon: -70.6572,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13102",
  nombre: "Cerrillos",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5,
  lon: -70.7167,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13103",
  nombre: "Cerro Navia",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4219,
  lon: -70.735,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13104",
  nombre: "Conchalí",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.38,
  lon: -70.675,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13105",
  nombre: "El Bosque",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5669,
  lon: -70.675,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13106",
  nombre: "Estación Central",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4589,
  lon: -70.6989,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13107",
  nombre: "Huechuraba",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.3678,
  lon: -70.6339,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13108",
  nombre: "Independencia",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4128,
  lon: -70.6658,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13109",
  nombre: "La Cisterna",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5289,
  lon: -70.6628,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13110",
  nombre: "La Florida",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.525,
  lon: -70.5378,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13111",
  nombre: "La Granja",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5833,
  lon: -70.5833,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13112",
  nombre: "La Pintana",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5828,
  lon: -70.6339,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13113",
  nombre: "La Reina",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4428,
  lon: -70.5319,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13114",
  nombre: "Las Condes",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4167,
  lon: -70.5833,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13115",
  nombre: "Lo Barnechea",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.35,
  lon: -70.5167,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "13116",
  nombre: "Lo Espejo",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5219,
  lon: -70.6869,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13117",
  nombre: "Lo Prado",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.445,
  lon: -70.7258,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13118",
  nombre: "Macul",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4869,
  lon: -70.6039,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13119",
  nombre: "Maipú",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5167,
  lon: -70.7667,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13120",
  nombre: "Ñuñoa",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4539,
  lon: -70.6039,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13121",
  nombre: "Pedro Aguirre Cerda",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4661,
  lon: -70.6336,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13122",
  nombre: "Peñalolén",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4861,
  lon: -70.5333,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13123",
  nombre: "Providencia",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.435,
  lon: -70.6158,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13124",
  nombre: "Pudahuel",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4333,
  lon: -70.7167,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13125",
  nombre: "Quilicura",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.3608,
  lon: -70.7289,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13126",
  nombre: "Quinta Normal",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4269,
  lon: -70.6989,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13127",
  nombre: "Recoleta",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4058,
  lon: -70.64,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13128",
  nombre: "Renca",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.3978,
  lon: -70.7228,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13129",
  nombre: "San Joaquín",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4908,
  lon: -70.6278,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13130",
  nombre: "San Miguel",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4858,
  lon: -70.6494,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13131",
  nombre: "San Ramón",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.5428,
  lon: -70.6439,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13132",
  nombre: "Vitacura",
  region: "Metropolitana de Santiago",
  provincia: "Santiago",
  lat: -33.4,
  lon: -70.6,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13201",
  nombre: "Puente Alto",
  region: "Metropolitana de Santiago",
  provincia: "Cordillera",
  lat: -33.6158,
  lon: -70.57,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13202",
  nombre: "Pirque",
  region: "Metropolitana de Santiago",
  provincia: "Cordillera",
  lat: -33.6333,
  lon: -70.55,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13203",
  nombre: "San José de Maipo",
  region: "Metropolitana de Santiago",
  provincia: "Cordillera",
  lat: -33.6439,
  lon: -70.3528,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "13301",
  nombre: "Colina",
  region: "Metropolitana de Santiago",
  provincia: "Chacabuco",
  lat: -33.1939,
  lon: -70.6678,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 2.000 msnm",
    altitud: "< 2.000"
   },
   {
    zona: "H",
    condicion: "sobre 2.000 msnm",
    altitud: "≥ 2.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "13302",
  nombre: "Lampa",
  region: "Metropolitana de Santiago",
  provincia: "Chacabuco",
  lat: -33.2858,
  lon: -70.8778,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13303",
  nombre: "Tiltil",
  region: "Metropolitana de Santiago",
  provincia: "Chacabuco",
  lat: -33.085,
  lon: -70.925,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null,
  alias: [
   "Til Til"
  ]
 },
 {
  cut: "13401",
  nombre: "San Bernardo",
  region: "Metropolitana de Santiago",
  provincia: "Maipo",
  lat: -33.5819,
  lon: -70.6869,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13402",
  nombre: "Buin",
  region: "Metropolitana de Santiago",
  provincia: "Maipo",
  lat: -33.7278,
  lon: -70.7389,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13403",
  nombre: "Calera de Tango",
  region: "Metropolitana de Santiago",
  provincia: "Maipo",
  lat: -33.6278,
  lon: -70.785,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13404",
  nombre: "Paine",
  region: "Metropolitana de Santiago",
  provincia: "Maipo",
  lat: -33.8119,
  lon: -70.7228,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13501",
  nombre: "Melipilla",
  region: "Metropolitana de Santiago",
  provincia: "Melipilla",
  lat: -33.6889,
  lon: -71.2078,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13502",
  nombre: "Alhué",
  region: "Metropolitana de Santiago",
  provincia: "Melipilla",
  lat: -34.0333,
  lon: -71.1,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13503",
  nombre: "Curacaví",
  region: "Metropolitana de Santiago",
  provincia: "Melipilla",
  lat: -33.3989,
  lon: -71.1369,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13504",
  nombre: "María Pinto",
  region: "Metropolitana de Santiago",
  provincia: "Melipilla",
  lat: -33.515,
  lon: -71.1189,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13505",
  nombre: "San Pedro",
  region: "Metropolitana de Santiago",
  provincia: "Melipilla",
  lat: -33.9,
  lon: -71.4667,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13601",
  nombre: "Talagante",
  region: "Metropolitana de Santiago",
  provincia: "Talagante",
  lat: -33.6669,
  lon: -70.9308,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13602",
  nombre: "El Monte",
  region: "Metropolitana de Santiago",
  provincia: "Talagante",
  lat: -33.6839,
  lon: -71.0169,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13603",
  nombre: "Isla de Maipo",
  region: "Metropolitana de Santiago",
  provincia: "Talagante",
  lat: -33.7539,
  lon: -70.8858,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13604",
  nombre: "Padre Hurtado",
  region: "Metropolitana de Santiago",
  provincia: "Talagante",
  lat: -33.5667,
  lon: -70.8333,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "13605",
  nombre: "Peñaflor",
  region: "Metropolitana de Santiago",
  provincia: "Talagante",
  lat: -33.6061,
  lon: -70.8764,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06101",
  nombre: "Rancagua",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.1619,
  lon: -70.7408,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06102",
  nombre: "Codegua",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.0328,
  lon: -70.6669,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06103",
  nombre: "Coinco",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.2728,
  lon: -70.9528,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06104",
  nombre: "Coltauco",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.2969,
  lon: -71.0919,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06105",
  nombre: "Doñihue",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.185,
  lon: -70.8839,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06106",
  nombre: "Graneros",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.0628,
  lon: -70.7208,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06107",
  nombre: "Las Cabras",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.285,
  lon: -71.31,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06108",
  nombre: "Machalí",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.185,
  lon: -70.6619,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06109",
  nombre: "Malloa",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.445,
  lon: -70.945,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06110",
  nombre: "Mostazal",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -33.9769,
  lon: -70.7089,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06111",
  nombre: "Olivar",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.2139,
  lon: -70.8189,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06112",
  nombre: "Peumo",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.3889,
  lon: -71.1708,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06113",
  nombre: "Pichidegua",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.3569,
  lon: -71.2869,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06114",
  nombre: "Quinta de Tilcoco",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.3569,
  lon: -70.9689,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06115",
  nombre: "Rengo",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.4019,
  lon: -70.8558,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06116",
  nombre: "Requínoa",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.2828,
  lon: -70.8058,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06117",
  nombre: "San Vicente",
  region: "O'Higgins",
  provincia: "Cachapoal",
  lat: -34.0828,
  lon: -71.75,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06201",
  nombre: "Pichilemu",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -34.4019,
  lon: -72.0089,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "06202",
  nombre: "La Estrella",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -34.2,
  lon: -71.6669,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06203",
  nombre: "Litueche",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -34.1189,
  lon: -71.7278,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "06204",
  nombre: "Marchihue",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -34.4,
  lon: -71.6333,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06205",
  nombre: "Navidad",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -33.95,
  lon: -71.8328,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "06206",
  nombre: "Paredones",
  region: "O'Higgins",
  provincia: "Cardenal Caro",
  lat: -34.6608,
  lon: -71.8939,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "06301",
  nombre: "San Fernando",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.5839,
  lon: -70.9869,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "06302",
  nombre: "Chépica",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.7328,
  lon: -71.2828,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06303",
  nombre: "Chimbarongo",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.7078,
  lon: -71.0419,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06304",
  nombre: "Lolol",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.7308,
  lon: -71.6358,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06305",
  nombre: "Nancagua",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.6489,
  lon: -71.2028,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06306",
  nombre: "Palmilla",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.6039,
  lon: -71.3578,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06307",
  nombre: "Peralillo",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.4828,
  lon: -71.4828,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06308",
  nombre: "Placilla",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.6328,
  lon: -71.1169,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06309",
  nombre: "Pumanque",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.605,
  lon: -71.6439,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "06310",
  nombre: "Santa Cruz",
  region: "O'Higgins",
  provincia: "Colchagua",
  lat: -34.6308,
  lon: -71.3589,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07101",
  nombre: "Talca",
  region: "Maule",
  provincia: "Talca",
  lat: -35.4228,
  lon: -71.6569,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07102",
  nombre: "Constitución",
  region: "Maule",
  provincia: "Talca",
  lat: -35.3389,
  lon: -72.4139,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07103",
  nombre: "Curepto",
  region: "Maule",
  provincia: "Talca",
  lat: -35.0828,
  lon: -72.0169,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07104",
  nombre: "Empedrado",
  region: "Maule",
  provincia: "Talca",
  lat: -35.5908,
  lon: -72.2728,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07105",
  nombre: "Maule",
  region: "Maule",
  provincia: "Talca",
  lat: -35.5158,
  lon: -71.5719,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07106",
  nombre: "Pelarco",
  region: "Maule",
  provincia: "Talca",
  lat: -35.3778,
  lon: -71.445,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07107",
  nombre: "Pencahue",
  region: "Maule",
  provincia: "Talca",
  lat: -35.4,
  lon: -71.8167,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07108",
  nombre: "Río Claro",
  region: "Maule",
  provincia: "Talca",
  lat: -35.2169,
  lon: -71.25,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07109",
  nombre: "San Clemente",
  region: "Maule",
  provincia: "Talca",
  lat: -35.5339,
  lon: -71.4858,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07110",
  nombre: "San Rafael",
  region: "Maule",
  provincia: "Talca",
  lat: -35.3169,
  lon: -71.5328,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07201",
  nombre: "Cauquenes",
  region: "Maule",
  provincia: "Cauquenes",
  lat: -35.9639,
  lon: -72.3169,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07202",
  nombre: "Chanco",
  region: "Maule",
  provincia: "Cauquenes",
  lat: -35.7289,
  lon: -72.53,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07203",
  nombre: "Pelluhue",
  region: "Maule",
  provincia: "Cauquenes",
  lat: -35.8139,
  lon: -72.5739,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "07301",
  nombre: "Curicó",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.9758,
  lon: -71.2239,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07302",
  nombre: "Hualañé",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.9828,
  lon: -71.8169,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07303",
  nombre: "Licantén",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.9828,
  lon: -72,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "07304",
  nombre: "Molina",
  region: "Maule",
  provincia: "Curicó",
  lat: -35.09,
  lon: -71.2789,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07305",
  nombre: "Rauco",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.9289,
  lon: -71.3108,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07306",
  nombre: "Romeral",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.9669,
  lon: -71.1328,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07307",
  nombre: "Sagrada Familia",
  region: "Maule",
  provincia: "Curicó",
  lat: -35,
  lon: -71.3828,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07308",
  nombre: "Teno",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.8728,
  lon: -71.1619,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07309",
  nombre: "Vichuquén",
  region: "Maule",
  provincia: "Curicó",
  lat: -34.8228,
  lon: -72.035,
  zonas: [
   {
    zona: "C",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "C",
  metodoCentroUrbano: null
 },
 {
  cut: "07401",
  nombre: "Linares",
  region: "Maule",
  provincia: "Linares",
  lat: -35.85,
  lon: -71.585,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07402",
  nombre: "Colbún",
  region: "Maule",
  provincia: "Linares",
  lat: -35.7,
  lon: -71.4169,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07403",
  nombre: "Longaví",
  region: "Maule",
  provincia: "Linares",
  lat: -35.9658,
  lon: -71.6819,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07404",
  nombre: "Parral",
  region: "Maule",
  provincia: "Linares",
  lat: -36.1469,
  lon: -71.8219,
  zonas: [
   {
    zona: "D",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "07405",
  nombre: "Retiro",
  region: "Maule",
  provincia: "Linares",
  lat: -36.0458,
  lon: -71.7589,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07406",
  nombre: "San Javier",
  region: "Maule",
  provincia: "Linares",
  lat: -35.6,
  lon: -71.75,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07407",
  nombre: "Villa Alegre",
  region: "Maule",
  provincia: "Linares",
  lat: -35.665,
  lon: -71.7419,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "07408",
  nombre: "Yerbas Buenas",
  region: "Maule",
  provincia: "Linares",
  lat: -35.75,
  lon: -71.5828,
  zonas: [
   {
    zona: "D",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "D",
  metodoCentroUrbano: null
 },
 {
  cut: "08101",
  nombre: "Concepción",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.815,
  lon: -73.0289,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08102",
  nombre: "Coronel",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.9819,
  lon: -73.1569,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08103",
  nombre: "Chiguayante",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.9089,
  lon: -73.0278,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08104",
  nombre: "Florida",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.8208,
  lon: -72.6619,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08105",
  nombre: "Hualqui",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.9669,
  lon: -72.9328,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08106",
  nombre: "Lota",
  region: "Biobío",
  provincia: "Concepción",
  lat: -37.0889,
  lon: -73.155,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08107",
  nombre: "Penco",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.7419,
  lon: -72.9978,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08108",
  nombre: "San Pedro de la Paz",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.8639,
  lon: -73.1078,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08109",
  nombre: "Santa Juana",
  region: "Biobío",
  provincia: "Concepción",
  lat: -37.1792,
  lon: -72.9353,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08110",
  nombre: "Talcahuano",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.7358,
  lon: -73.105,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08111",
  nombre: "Tomé",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.6239,
  lon: -72.95,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08112",
  nombre: "Hualpén",
  region: "Biobío",
  provincia: "Concepción",
  lat: -36.7889,
  lon: -73.11,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08201",
  nombre: "Lebu",
  region: "Biobío",
  provincia: "Arauco",
  lat: -37.6058,
  lon: -73.6428,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08202",
  nombre: "Arauco",
  region: "Biobío",
  provincia: "Arauco",
  lat: -37.2569,
  lon: -73.2839,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08203",
  nombre: "Cañete",
  region: "Biobío",
  provincia: "Arauco",
  lat: -35.2828,
  lon: -72.2328,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08204",
  nombre: "Contulmo",
  region: "Biobío",
  provincia: "Arauco",
  lat: -38.005,
  lon: -73.225,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08205",
  nombre: "Curanilahue",
  region: "Biobío",
  provincia: "Arauco",
  lat: -37.4719,
  lon: -73.3478,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08206",
  nombre: "Los Álamos",
  region: "Biobío",
  provincia: "Arauco",
  lat: -37.6208,
  lon: -73.4558,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08207",
  nombre: "Tirúa",
  region: "Biobío",
  provincia: "Arauco",
  lat: -38.3389,
  lon: -73.4839,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "08301",
  nombre: "Los Ángeles",
  region: "Biobío",
  provincia: "Biobío",
  lat: -36.9439,
  lon: -72.3508,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08302",
  nombre: "Antuco",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.3269,
  lon: -71.6778,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "> 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "08303",
  nombre: "Cabrero",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.0389,
  lon: -72.3989,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08304",
  nombre: "Laja",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.2669,
  lon: -72.7,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08305",
  nombre: "Mulchén",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.715,
  lon: -72.2389,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08306",
  nombre: "Nacimiento",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.5008,
  lon: -72.6758,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08307",
  nombre: "Negrete",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.5828,
  lon: -72.5169,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08308",
  nombre: "Quilaco",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.68,
  lon: -72.0069,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08309",
  nombre: "Quilleco",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.4669,
  lon: -71.9669,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "08310",
  nombre: "San Rosendo",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.2578,
  lon: -72.7158,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08311",
  nombre: "Santa Bárbara",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.6628,
  lon: -72.0178,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "08312",
  nombre: "Tucapel",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.6328,
  lon: -73.3328,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "08313",
  nombre: "Yumbel",
  region: "Biobío",
  provincia: "Biobío",
  lat: -37.0958,
  lon: -72.5558,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "08314",
  nombre: "Alto Biobío",
  region: "Biobío",
  provincia: "Biobío",
  lat: -38.6189,
  lon: -71.3242,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "16101",
  nombre: "Chillán",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.6008,
  lon: -72.1089,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16102",
  nombre: "Bulnes",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.7389,
  lon: -72.2919,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16103",
  nombre: "Chillán Viejo",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.6328,
  lon: -72.14,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16104",
  nombre: "El Carmen",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.9,
  lon: -72.0333,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16105",
  nombre: "Pemuco",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.9778,
  lon: -72.0908,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16106",
  nombre: "Pinto",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.7,
  lon: -71.9,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "16107",
  nombre: "Quillón",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.7378,
  lon: -72.4689,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16108",
  nombre: "San Ignacio",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -36.8,
  lon: -72.0333,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16109",
  nombre: "Yungay",
  region: "Ñuble",
  provincia: "Diguillín",
  lat: -37.1044,
  lon: -71.9306,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "16301",
  nombre: "San Carlos",
  region: "Ñuble",
  provincia: "Punilla",
  lat: -36.4219,
  lon: -71.9589,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16302",
  nombre: "Coihueco",
  region: "Ñuble",
  provincia: "Punilla",
  lat: -36.6282,
  lon: -71.8318,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "16303",
  nombre: "Ñiquén",
  region: "Ñuble",
  provincia: "Punilla",
  lat: -36.2869,
  lon: -71.8989,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16304",
  nombre: "San Fabián",
  region: "Ñuble",
  provincia: "Punilla",
  lat: -36.5539,
  lon: -71.5489,
  zonas: [
   {
    zona: "F",
    condicion: "bajo 1.000 msnm",
    altitud: "< 1.000"
   },
   {
    zona: "H",
    condicion: "sobre 1.000 msnm",
    altitud: "≥ 1.000"
   }
  ],
  tipoParticion: "altitud",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "16305",
  nombre: "San Nicolás",
  region: "Ñuble",
  provincia: "Punilla",
  lat: -36.8828,
  lon: -72.4828,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16201",
  nombre: "Quirihue",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.2808,
  lon: -72.545,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "16202",
  nombre: "Cobquecura",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.1328,
  lon: -72.7828,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "16203",
  nombre: "Coelemu",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.485,
  lon: -72.6939,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "16204",
  nombre: "Ninhue",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.4008,
  lon: -72.3969,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16205",
  nombre: "Portezuelo",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.5328,
  lon: -72.4328,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16206",
  nombre: "Ránquil",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.65,
  lon: -72.55,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "16207",
  nombre: "Treguaco",
  region: "Ñuble",
  provincia: "Itata",
  lat: -36.4289,
  lon: -72.665,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "09101",
  nombre: "Temuco",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.7269,
  lon: -72.5989,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09102",
  nombre: "Carahue",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.7069,
  lon: -73.16,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "09103",
  nombre: "Cunco",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.93,
  lon: -72.0269,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09104",
  nombre: "Curarrehue",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.3589,
  lon: -71.5878,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "09105",
  nombre: "Freire",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.9539,
  lon: -72.6219,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09106",
  nombre: "Galvarino",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.4,
  lon: -72.7833,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09107",
  nombre: "Gorbea",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.095,
  lon: -72.6719,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09108",
  nombre: "Lautaro",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.5289,
  lon: -72.4269,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09109",
  nombre: "Loncoche",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.3539,
  lon: -72.6278,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09110",
  nombre: "Melipeuco",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.8428,
  lon: -71.6869,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "09111",
  nombre: "Nueva Imperial",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.745,
  lon: -72.95,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09112",
  nombre: "Padre Las Casas",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.7658,
  lon: -72.5928,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09113",
  nombre: "Perquenco",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.4169,
  lon: -72.3828,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09114",
  nombre: "Pitrufquén",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.9828,
  lon: -72.6428,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09115",
  nombre: "Pucón",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.2819,
  lon: -71.9539,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "09116",
  nombre: "Saavedra",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.7828,
  lon: -73.4,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "09117",
  nombre: "Teodoro Schmidt",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.9667,
  lon: -73.05,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "09118",
  nombre: "Toltén",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.2169,
  lon: -73.2169,
  zonas: [
   {
    zona: "E",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "E",
  metodoCentroUrbano: null
 },
 {
  cut: "09119",
  nombre: "Vilcún",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.1167,
  lon: -72.3794,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09120",
  nombre: "Villarrica",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -39.28,
  lon: -72.2178,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09121",
  nombre: "Cholchol",
  region: "La Araucanía",
  provincia: "Cautín",
  lat: -38.6,
  lon: -72.85,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09201",
  nombre: "Angol",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -37.8028,
  lon: -72.7019,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09202",
  nombre: "Collipulli",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -37.9528,
  lon: -72.4319,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09203",
  nombre: "Curacautín",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.4319,
  lon: -71.89,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09204",
  nombre: "Ercilla",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.05,
  lon: -72.3833,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09205",
  nombre: "Lonquimay",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.4328,
  lon: -71.2328,
  zonas: [
   {
    zona: "H",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "H",
  metodoCentroUrbano: null
 },
 {
  cut: "09206",
  nombre: "Los Sauces",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -37.9669,
  lon: -72.8328,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09207",
  nombre: "Lumaco",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.1628,
  lon: -72.9039,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09208",
  nombre: "Purén",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.0219,
  lon: -73.07,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09209",
  nombre: "Renaico",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -37.6669,
  lon: -72.5828,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09210",
  nombre: "Traiguén",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.2478,
  lon: -72.675,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "09211",
  nombre: "Victoria",
  region: "La Araucanía",
  provincia: "Malleco",
  lat: -38.23,
  lon: -72.3428,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14101",
  nombre: "Valdivia",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.8142,
  lon: -73.2458,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "14102",
  nombre: "Corral",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.8669,
  lon: -73.4328,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "14202",
  nombre: "Futrono",
  region: "Los Ríos",
  provincia: "Ranco",
  lat: -40.1308,
  lon: -72.3958,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14201",
  nombre: "La Unión",
  region: "Los Ríos",
  provincia: "Ranco",
  lat: -40.2919,
  lon: -73.0878,
  zonas: [
   {
    zona: "G",
    condicion: "al oeste del meridiano 73°15'",
    meridiano: "> 73°15'"
   },
   {
    zona: "F",
    condicion: "al este del meridiano 73°15'",
    meridiano: "≤ 73°15'"
   }
  ],
  tipoParticion: "meridiano",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: "elaboración propia del CCI: coordenadas de la cabecera comunal sobre la regla de la Ditec"
 },
 {
  cut: "14203",
  nombre: "Lago Ranco",
  region: "Los Ríos",
  provincia: "Ranco",
  lat: -40.3169,
  lon: -72.5,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14103",
  nombre: "Lanco",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.4469,
  lon: -72.7719,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14104",
  nombre: "Los Lagos",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.8634009,
  lon: -72.8129655,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null,
  coordenadasNota: "La coordenada del dataset provisional (−41,92, −72,14) cae en la cordillera de la Región de Los Lagos, a 16,6 km de la red vial, y no en la comuna Los Lagos (Los Ríos). Se reemplaza por el centro de la ciudad de Los Lagos según OpenStreetMap (Nominatim, relación 1785707, consulta del 21.09.2026)."
 },
 {
  cut: "14105",
  nombre: "Máfil",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.65,
  lon: -72.95,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "14106",
  nombre: "Mariquina",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -40.1328,
  lon: -72.3328,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "14107",
  nombre: "Paillaco",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -40.0678,
  lon: -72.8828,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14108",
  nombre: "Panguipulli",
  region: "Los Ríos",
  provincia: "Valdivia",
  lat: -39.6419,
  lon: -72.34,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "14204",
  nombre: "Río Bueno",
  region: "Los Ríos",
  provincia: "Ranco",
  lat: -40.3378,
  lon: -72.9569,
  zonas: [
   {
    zona: "F",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "F",
  metodoCentroUrbano: null
 },
 {
  cut: "10101",
  nombre: "Puerto Montt",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.4539,
  lon: -72.9928,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10102",
  nombre: "Calbuco",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.7578,
  lon: -73.1508,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10103",
  nombre: "Cochamó",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.5,
  lon: -72.3169,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10104",
  nombre: "Fresia",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.1528,
  lon: -73.42,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10105",
  nombre: "Frutillar",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.1167,
  lon: -73.1,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10106",
  nombre: "Los Muermos",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.3908,
  lon: -73.465,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10107",
  nombre: "Llanquihue",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.2658,
  lon: -73.0119,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10108",
  nombre: "Maullín",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.6178,
  lon: -73.5978,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10109",
  nombre: "Puerto Varas",
  region: "Los Lagos",
  provincia: "Llanquihue",
  lat: -41.3228,
  lon: -72.97,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10201",
  nombre: "Castro",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.4778,
  lon: -73.7789,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10202",
  nombre: "Ancud",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -41.8769,
  lon: -73.8139,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10203",
  nombre: "Chonchi",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.6258,
  lon: -73.7808,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10204",
  nombre: "Curaco de Vélez",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.4339,
  lon: -73.5819,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10205",
  nombre: "Dalcahue",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.3739,
  lon: -73.6508,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10206",
  nombre: "Puqueldón",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.6039,
  lon: -73.6839,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10207",
  nombre: "Queilén",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.8739,
  lon: -73.47,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10208",
  nombre: "Quellón",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -43.1208,
  lon: -73.6078,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10209",
  nombre: "Quemchi",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.1419,
  lon: -73.4778,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10210",
  nombre: "Quinchao",
  region: "Los Lagos",
  provincia: "Chiloé",
  lat: -42.4789,
  lon: -73.4969,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10301",
  nombre: "Osorno",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.5739,
  lon: -73.1258,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10302",
  nombre: "Puerto Octay",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.9669,
  lon: -72.9,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10303",
  nombre: "Purranque",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.9089,
  lon: -73.175,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10304",
  nombre: "Puyehue",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.7169,
  lon: -72.3208,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10305",
  nombre: "Río Negro",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -41.9669,
  lon: -72.45,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10306",
  nombre: "San Juan de la Costa",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.5008,
  lon: -73.3919,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10307",
  nombre: "San Pablo",
  region: "Los Lagos",
  provincia: "Osorno",
  lat: -40.4,
  lon: -73.0167,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10401",
  nombre: "Chaitén",
  region: "Los Lagos",
  provincia: "Palena",
  lat: -42.8989,
  lon: -72.6669,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10402",
  nombre: "Futaleufú",
  region: "Los Lagos",
  provincia: "Palena",
  lat: -43.1678,
  lon: -71.8478,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "10403",
  nombre: "Hualaihué",
  region: "Los Lagos",
  provincia: "Palena",
  lat: -41.9919,
  lon: -72.6669,
  zonas: [
   {
    zona: "G",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "G",
  metodoCentroUrbano: null
 },
 {
  cut: "10404",
  nombre: "Palena",
  region: "Los Lagos",
  provincia: "Palena",
  lat: -43.6228,
  lon: -71.8039,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11101",
  nombre: "Coihaique",
  region: "Aysén",
  provincia: "Coyhaique",
  lat: -45.5639,
  lon: -72.065,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null,
  alias: [
   "Coyhaique"
  ]
 },
 {
  cut: "11102",
  nombre: "Lago Verde",
  region: "Aysén",
  provincia: "Coyhaique",
  lat: -44.2189,
  lon: -71.8389,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11201",
  nombre: "Aisén",
  region: "Aysén",
  provincia: "Aisén",
  lat: -45.4119,
  lon: -72.6978,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null,
  alias: [
   "Aysén"
  ]
 },
 {
  cut: "11202",
  nombre: "Cisnes",
  region: "Aysén",
  provincia: "Aisén",
  lat: -44.7508,
  lon: -72.6969,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11203",
  nombre: "Guaitecas",
  region: "Aysén",
  provincia: "Aisén",
  lat: -43.8839,
  lon: -73.95,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11301",
  nombre: "Cochrane",
  region: "Aysén",
  provincia: "Capitán Prat",
  lat: -47.2539,
  lon: -72.5733,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11302",
  nombre: "O'Higgins",
  region: "Aysén",
  provincia: "Capitán Prat",
  lat: -48.4667,
  lon: -72.5667,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null,
  alias: [
   "O' Higgins"
  ]
 },
 {
  cut: "11303",
  nombre: "Tortel",
  region: "Aysén",
  provincia: "Capitán Prat",
  lat: -47.7808,
  lon: -73.5119,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11401",
  nombre: "Chile Chico",
  region: "Aysén",
  provincia: "General Carrera",
  lat: -46.5375,
  lon: -71.7292,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "11402",
  nombre: "Río Ibáñez",
  region: "Aysén",
  provincia: "General Carrera",
  lat: -46.255,
  lon: -71.95,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12101",
  nombre: "Punta Arenas",
  region: "Magallanes",
  provincia: "Magallanes",
  lat: -53.1478,
  lon: -70.9069,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12102",
  nombre: "Laguna Blanca",
  region: "Magallanes",
  provincia: "Magallanes",
  lat: -52.2669,
  lon: -71.1828,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12103",
  nombre: "Río Verde",
  region: "Magallanes",
  provincia: "Magallanes",
  lat: -52.6278,
  lon: -71.4769,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12104",
  nombre: "San Gregorio",
  region: "Magallanes",
  provincia: "Magallanes",
  lat: -52.5669,
  lon: -70.0669,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12201",
  nombre: "Cabo de Hornos",
  region: "Magallanes",
  provincia: "Antártica Chilena",
  lat: -54.9469,
  lon: -67.6069,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12301",
  nombre: "Porvenir",
  region: "Magallanes",
  provincia: "Tierra del Fuego",
  lat: -53.2978,
  lon: -70.385,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12302",
  nombre: "Primavera",
  region: "Magallanes",
  provincia: "Tierra del Fuego",
  lat: -52.8858,
  lon: -69.3528,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12303",
  nombre: "Timaukel",
  region: "Magallanes",
  provincia: "Tierra del Fuego",
  lat: -53.6719,
  lon: -69.71,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12401",
  nombre: "Natales",
  region: "Magallanes",
  provincia: "Última Esperanza",
  lat: -51.7328,
  lon: -72.5169,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 },
 {
  cut: "12402",
  nombre: "Torres del Paine",
  region: "Magallanes",
  provincia: "Última Esperanza",
  lat: -50.9819,
  lon: -72.4989,
  zonas: [
   {
    zona: "I",
    condicion: ""
   }
  ],
  tipoParticion: "ninguna",
  zonaCentroUrbano: "I",
  metodoCentroUrbano: null
 }
];
