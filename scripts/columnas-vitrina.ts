// Cabecera compartida del CSV de validación de la Vitrina (Fase 2 · paso 2).
// exportar-vitrina-csv.ts y importar-vitrina-csv.ts usan EXACTAMENTE este orden.
export const COLUMNAS = [
  "id",
  "slug",
  "nombre",
  "nivel",
  "actorTypes",
  "solutions",
  "materials",
  "capabilities",
  "regions",
  "coverageType",
  "cciRelationship",
  "minvuApproved",
  "minvuResolutions",
  "minvuPlants",
  "minvuVitCount",
  "certificaciones",
  "direccionPlantas",
  "sitioWeb",
  "emailContacto",
  "telefono",
  "validationStatus",
  "lastVerifiedAt",
  "estado", // <- lo completa el validador (nuevo validationStatus)
  "observaciones", // <- notas libres
] as const;
