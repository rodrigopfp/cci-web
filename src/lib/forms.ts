// Modo dual de formularios del sitio estático (Fase 2 · paso 4).
//
// - NEXT_PUBLIC_FORMS_API_URL definida → POST al microservicio cci-forms.
// - Vacía o ausente (estado actual) → modo respaldo: mailto estructurado a
//   cci@cdt.cl (para postulación/aporte) o descarga directa (para recursos).
//
// Nada del sitio debe romperse si la variable no existe.

export const FORMS_API_URL = (process.env.NEXT_PUBLIC_FORMS_API_URL ?? "").replace(/\/$/, "");

export function formsApiActiva(): boolean {
  return FORMS_API_URL.length > 0;
}

export const EMAIL_CCI = "cci@cdt.cl";

export type EndpointForm = "postulacion" | "descarga" | "aporte" | "latam";

/** POST al microservicio. Devuelve {ok:false, error:"sin-api"} si no hay API. */
export async function enviarFormulario(
  endpoint: EndpointForm,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  if (!formsApiActiva()) return { ok: false, error: "sin-api" };
  try {
    const res = await fetch(`${FORMS_API_URL}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    return { ok: Boolean(data?.ok), error: data?.error };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "error de red" };
  }
}

/** mailto estructurado de respaldo (cuando no hay API). */
export function mailtoRespaldo(asunto: string, campos: Record<string, string | undefined>): string {
  const cuerpo = Object.entries(campos)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${EMAIL_CCI}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
