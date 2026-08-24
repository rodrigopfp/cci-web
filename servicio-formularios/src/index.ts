// ============================================================================
// cci-forms — microservicio de formularios del sitio CCI
// ============================================================================
// Recibe POST desde el sitio estático y crea documentos en Sanity (bandeja
// interna del equipo). Modo dual en el sitio: si NEXT_PUBLIC_FORMS_API_URL no
// está definida, el sitio usa mailto/descarga directa y este servicio no se usa.
//
// Variables (ver README): SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN,
// ALLOWED_ORIGIN (coma-separado), PORT.
//
// Despliegue en Railway: se hará guiado en el chat. NO desplegar automáticamente.
// ============================================================================

import express, { type Request, type Response, type NextFunction } from "express";
import { createClient } from "@sanity/client";

const PORT = Number(process.env.PORT ?? 8080);
const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN ?? "").split(",").map((s) => s.trim()).filter(Boolean);

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID ?? "",
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_WRITE_TOKEN ?? "",
  useCdn: false,
});

const app = express();
app.use(express.json({ limit: "64kb" }));

// ---- CORS restringido a ALLOWED_ORIGIN --------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && (ALLOWED_ORIGIN.length === 0 || ALLOWED_ORIGIN.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ---- Rate limit simple por IP (ventana 60s, máx 10) -------------------------
const HITS = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const w = HITS.get(ip);
  if (!w || now - w.ts > 60_000) {
    HITS.set(ip, { count: 1, ts: now });
    return false;
  }
  w.count += 1;
  return w.count > 10;
}

type Body = Record<string, unknown>;
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const faltan = (b: Body, campos: string[]): string[] => campos.filter((c) => !str(b[c]));

// Envuelve un handler con honeypot, rate limit y manejo de errores.
function handler(
  requeridos: string[],
  construir: (b: Body) => { _type: string; [k: string]: unknown }
) {
  return async (req: Request, res: Response) => {
    try {
      const b = (req.body ?? {}) as Body;
      // Honeypot: si "web2" viene lleno, es bot → fingir éxito sin guardar.
      if (str(b.web2)) return res.json({ ok: true });

      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "0.0.0.0";
      if (rateLimited(ip)) return res.status(429).json({ ok: false, error: "demasiadas solicitudes" });

      const missing = faltan(b, requeridos);
      if (missing.length) return res.status(400).json({ ok: false, error: `faltan campos: ${missing.join(", ")}` });

      const doc = construir(b);
      await sanity.create(doc);
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: "error interno" });
    }
  };
}

const comunes = (b: Body) => ({
  fecha: new Date().toISOString(),
  origen: str(b.origen) || undefined,
  utm: str(b.utm) || undefined,
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const lista = (v: unknown): string[] | undefined =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.length > 0) : undefined;

app.post(
  "/api/postulacion",
  handler(["nombre", "email", "organizacion"], (b) => ({
    _type: "postulacion",
    nombre: str(b.nombre), apellido: str(b.apellido), email: str(b.email), telefono: str(b.telefono),
    organizacion: str(b.organizacion), sitioWeb: str(b.sitioWeb), cargo: str(b.cargo),
    tipoOrganizacion: str(b.tipoOrganizacion), tamano: str(b.tamano), pais: str(b.pais),
    regiones: lista(b.regiones), categoria: str(b.categoria), motivo: str(b.motivo),
    ejeInteres: str(b.ejeInteres), mensaje: str(b.mensaje),
    estado: "nueva", ...comunes(b),
  }))
);

app.post(
  "/api/descarga",
  handler(["nombre", "email", "organizacion", "recursoSlug"], (b) => ({
    _type: "descargaLead",
    nombre: str(b.nombre), apellido: str(b.apellido), email: str(b.email),
    organizacion: str(b.organizacion), cargo: str(b.cargo), pais: str(b.pais),
    tipoOrganizacion: str(b.tipoOrganizacion), interes: str(b.interes),
    recursoSlug: str(b.recursoSlug), recursoTitulo: str(b.recursoTitulo),
    autorizaContacto: Boolean(b.autorizaContacto), estado: "nueva", ...comunes(b),
  }))
);

app.post(
  "/api/aporte",
  handler(["nombre", "email", "mensaje"], (b) => ({
    _type: "aporte",
    nombre: str(b.nombre), email: str(b.email), organizacion: str(b.organizacion),
    // tipo abierto: "dato" (por defecto), "aviso-recurso" (Aviso de disponibilidad), etc.
    tipo: str(b.tipo) || "dato", mensaje: str(b.mensaje),
    // Recurso asociado (p. ej. aviso de disponibilidad). Opcional.
    recursoSlug: str(b.recursoSlug) || undefined,
    recursoTitulo: str(b.recursoTitulo) || undefined,
    estado: "nueva", ...comunes(b),
  }))
);

app.post(
  "/api/latam",
  handler(["nombre", "email", "mensaje"], (b) => ({
    _type: "aporte",
    nombre: str(b.nombre), email: str(b.email), organizacion: str(b.organizacion),
    tipo: "latam", mensaje: str(b.mensaje), estado: "nueva", ...comunes(b),
  }))
);

app.listen(PORT, () => console.log(`cci-forms escuchando en :${PORT}`));
