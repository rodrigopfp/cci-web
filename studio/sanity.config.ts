import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "cci",
  title: "CCI · Administrador de contenido",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REEMPLAZAR",
  dataset: "production",

  plugins: [
    // Organiza el menú lateral por tipo de contenido.
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.documentTypeListItem("noticia").title("Noticias"),
            S.documentTypeListItem("voz").title("Voces de la industrialización"),
            S.documentTypeListItem("empresaVitrina").title("Vitrina · Empresas"),
            S.documentTypeListItem("requerimiento").title("Vitrina · Requerimientos recibidos"),
            // Singleton: un único documento de configuración de la página EICI.
            S.listItem()
              .title("Página EICI")
              .id("eici-config")
              .child(S.document().schemaType("eici").documentId("eici-config")),
            S.divider(),
            // Renombrado de etiqueta (Radar → CCI Data); mismo tipo de documento.
            S.documentTypeListItem("empresaCertificada").title("CCI Data · Empresas certificadas"),
            S.documentTypeListItem("indicador").title("CCI Data · Indicadores"),
            S.documentTypeListItem("hito").title("CCI Data · Línea de tiempo"),
            S.documentTypeListItem("fichaVit").title("CCI Data · Fichas VIT (imágenes)"),
            S.divider(),
            S.documentTypeListItem("estudio").title("Evidencia · Estudios"),
            S.documentTypeListItem("fuente").title("Fuentes"),
            S.divider(),
            S.documentTypeListItem("empresa").title("Ecosistema · Empresas"),
            S.documentTypeListItem("evento").title("Eventos"),
            S.documentTypeListItem("recurso").title("Recursos descargables"),
            S.divider(),
            // Bandeja de entrada del equipo: documentos creados por el
            // microservicio de formularios (postulaciones, aportes, descargas).
            // Se añade sin reordenar ni tocar las secciones existentes.
            S.listItem()
              .title("Bandeja de entrada")
              .id("bandeja-entrada")
              .child(
                S.list()
                  .title("Bandeja de entrada")
                  .items([
                    S.documentTypeListItem("postulacion").title("Postulaciones"),
                    S.documentTypeListItem("aporte").title("Aportes"),
                    S.documentTypeListItem("descargaLead").title("Descargas"),
                    S.documentTypeListItem("solicitudValidacion").title("Solicitudes de validación"),
                  ])
              ),
          ]),
    }),
    // Herramienta para consultar el contenido; útil para depurar.
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
