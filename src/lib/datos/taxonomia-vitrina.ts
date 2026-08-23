// ============================================================================
// TAXONOMÍA DE LA VITRINA — FUENTE ÚNICA (repo)
// ============================================================================
// Las 7 dimensiones multiatributo aprobadas para clasificar a las organizaciones
// del ecosistema. Este archivo es la ÚNICA fuente de verdad.
//
// ⚠️ SINCRONIZACIÓN MANUAL: el schema del Studio
// (studio/schemaTypes/empresaVitrina.ts) DUPLICA estas listas a mano, porque el
// Studio es un paquete aparte y no puede importar desde src/. Si cambias una
// lista aquí, replícala allá (y viceversa). Ambos archivos llevan este aviso.
//
// El nivel de membresía NO es una categoría técnica: vive solo en D6
// (relacionCCI) y en el campo `nivel` existente.
// ============================================================================

export interface OpcionTaxonomia<T extends string = string> {
  value: T;
  label: string;
}

// --- D1 · Tipo de actor (arreglo) -------------------------------------------
export const TIPOS_ACTOR = [
  { value: "industrializador", label: "Industrializador" },
  { value: "constructora", label: "Constructora" },
  { value: "inmobiliaria_mandante", label: "Inmobiliaria / Mandante" },
  { value: "proveedor_materiales", label: "Proveedor de materiales" },
  { value: "proveedor_componentes", label: "Proveedor de componentes" },
  { value: "ingenieria", label: "Ingeniería" },
  { value: "arquitectura", label: "Arquitectura" },
  { value: "tecnologia_software", label: "Tecnología / Software" },
  { value: "logistica_transporte", label: "Logística y transporte" },
  { value: "montaje", label: "Montaje" },
  { value: "academia", label: "Academia" },
  { value: "centro_tecnologico", label: "Centro tecnológico" },
  { value: "institucion_publica", label: "Institución pública" },
  { value: "asociacion_gremio", label: "Asociación / Gremio" },
  { value: "consultoria", label: "Consultoría" },
] as const satisfies readonly OpcionTaxonomia[];
export type TipoActor = (typeof TIPOS_ACTOR)[number]["value"];

// --- D2 · Solución (arreglo) ------------------------------------------------
export const SOLUCIONES = [
  { value: "panelizado_2d", label: "Panelizado 2D" },
  { value: "modulos_3d", label: "Módulos 3D" },
  { value: "prefabricados_estructurales", label: "Prefabricados estructurales" },
  { value: "estructuras_industrializadas", label: "Estructuras industrializadas" },
  { value: "fachadas_envolventes", label: "Fachadas y envolventes" },
  { value: "cubiertas", label: "Cubiertas" },
  { value: "instalaciones_prefabricadas", label: "Instalaciones prefabricadas" },
  { value: "banos_pods", label: "Baños / Pods" },
  { value: "componentes_subensambles", label: "Componentes y subensambles" },
  { value: "soluciones_hibridas", label: "Soluciones híbridas" },
  { value: "automatizacion_maquinaria", label: "Automatización y maquinaria" },
  { value: "software_datos", label: "Software y datos" },
  { value: "diseno_coordinacion", label: "Diseño y coordinación" },
  { value: "transporte_montaje", label: "Transporte y montaje" },
  { value: "llave_en_mano", label: "Llave en mano" },
] as const satisfies readonly OpcionTaxonomia[];
export type Solucion = (typeof SOLUCIONES)[number]["value"];

// --- D3 · Material (arreglo) ------------------------------------------------
export const MATERIALES = [
  { value: "madera", label: "Madera" },
  { value: "acero", label: "Acero" },
  { value: "hormigon", label: "Hormigón" },
  { value: "fibrocemento", label: "Fibrocemento" },
  { value: "yeso", label: "Yeso" },
  { value: "compuestos", label: "Compuestos" },
  { value: "hibrido", label: "Híbrido" },
  { value: "independiente_del_material", label: "Independiente del material" },
  { value: "otros", label: "Otros" },
] as const satisfies readonly OpcionTaxonomia[];
export type Material = (typeof MATERIALES)[number]["value"];

// --- D4 · Capacidad de la cadena de valor (arreglo) -------------------------
export const CAPACIDADES = [
  { value: "evaluacion", label: "Evaluación" },
  { value: "diseno", label: "Diseño" },
  { value: "ingenieria", label: "Ingeniería" },
  { value: "bim", label: "BIM" },
  { value: "dfma", label: "DfMA" },
  { value: "fabricacion", label: "Fabricación" },
  { value: "abastecimiento", label: "Abastecimiento" },
  { value: "transporte", label: "Transporte" },
  { value: "montaje", label: "Montaje" },
  { value: "terminaciones", label: "Terminaciones" },
  { value: "puesta_en_marcha", label: "Puesta en marcha" },
  { value: "operacion_mantenimiento", label: "Operación y mantenimiento" },
  { value: "certificacion_ensayos", label: "Certificación y ensayos" },
  { value: "medicion_datos", label: "Medición y datos" },
] as const satisfies readonly OpcionTaxonomia[];
export type Capacidad = (typeof CAPACIDADES)[number]["value"];

// --- D5 · Cobertura (arreglo de regiones + tipo de cobertura) ---------------
// Las 16 regiones de Chile, las macrozonas y los alcances supra-nacionales.
export const REGIONES = [
  // 16 regiones
  { value: "arica_parinacota", label: "Arica y Parinacota" },
  { value: "tarapaca", label: "Tarapacá" },
  { value: "antofagasta", label: "Antofagasta" },
  { value: "atacama", label: "Atacama" },
  { value: "coquimbo", label: "Coquimbo" },
  { value: "valparaiso", label: "Valparaíso" },
  { value: "metropolitana", label: "Metropolitana" },
  { value: "ohiggins", label: "O'Higgins" },
  { value: "maule", label: "Maule" },
  { value: "nuble", label: "Ñuble" },
  { value: "biobio", label: "Biobío" },
  { value: "araucania", label: "La Araucanía" },
  { value: "los_rios", label: "Los Ríos" },
  { value: "los_lagos", label: "Los Lagos" },
  { value: "aysen", label: "Aysén" },
  { value: "magallanes", label: "Magallanes" },
  // macrozonas
  { value: "norte", label: "Macrozona Norte" },
  { value: "centro", label: "Macrozona Centro" },
  { value: "sur", label: "Macrozona Sur" },
  { value: "austral", label: "Macrozona Austral" },
  // alcances amplios
  { value: "todo_chile", label: "Todo Chile" },
  { value: "latam", label: "Latinoamérica" },
  { value: "internacional", label: "Internacional" },
] as const satisfies readonly OpcionTaxonomia[];
export type Region = (typeof REGIONES)[number]["value"];

export const TIPOS_COBERTURA = [
  { value: "regional", label: "Regional" },
  { value: "macrozona", label: "Macrozona" },
  { value: "nacional", label: "Nacional" },
  { value: "latam", label: "Latinoamérica" },
  { value: "internacional", label: "Internacional" },
] as const satisfies readonly OpcionTaxonomia[];
export type CoverageType = (typeof TIPOS_COBERTURA)[number]["value"];

// --- D6 · Relación con el CCI (arreglo) -------------------------------------
export const RELACIONES_CCI = [
  { value: "socio_oro", label: "Socio Oro" },
  { value: "socio_plata", label: "Socio Plata" },
  { value: "socio_bronce", label: "Socio Bronce" },
  { value: "academia", label: "Academia" },
  { value: "profesional", label: "Profesional" },
  { value: "patrocinador", label: "Patrocinador" },
  { value: "aliado", label: "Aliado" },
  { value: "no_socio_publicado", label: "No socio (publicado)" },
  { value: "industrializador_minvu", label: "Industrializador MINVU" },
] as const satisfies readonly OpcionTaxonomia[];
export type RelacionCCI = (typeof RELACIONES_CCI)[number]["value"];

// --- D7 · Estado de validación (valor único) --------------------------------
export const ESTADOS_VALIDACION = [
  { value: "validado_por_organizacion", label: "Validado por la organización" },
  { value: "fuente_oficial", label: "Fuente oficial" },
  { value: "revisado_por_cci", label: "Revisado por el CCI" },
  { value: "en_actualizacion", label: "En actualización" },
  { value: "pendiente", label: "Pendiente" },
] as const satisfies readonly OpcionTaxonomia[];
export type EstadoValidacion = (typeof ESTADOS_VALIDACION)[number]["value"];

// --- Utilidades -------------------------------------------------------------
/** Construye un mapa value→label a partir de una lista de opciones. */
export function mapaEtiquetas(
  opciones: readonly OpcionTaxonomia[]
): Record<string, string> {
  return Object.fromEntries(opciones.map((o) => [o.value, o.label]));
}

export const ETIQUETAS_ACTOR = mapaEtiquetas(TIPOS_ACTOR);
export const ETIQUETAS_SOLUCION = mapaEtiquetas(SOLUCIONES);
export const ETIQUETAS_MATERIAL = mapaEtiquetas(MATERIALES);
export const ETIQUETAS_CAPACIDAD = mapaEtiquetas(CAPACIDADES);
export const ETIQUETAS_REGION = mapaEtiquetas(REGIONES);
export const ETIQUETAS_COBERTURA = mapaEtiquetas(TIPOS_COBERTURA);
export const ETIQUETAS_RELACION = mapaEtiquetas(RELACIONES_CCI);
export const ETIQUETAS_VALIDACION = mapaEtiquetas(ESTADOS_VALIDACION);

/** Devuelve la etiqueta legible de un valor, o el propio valor si no existe. */
export function etiqueta(mapa: Record<string, string>, value: string): string {
  return mapa[value] ?? value;
}
