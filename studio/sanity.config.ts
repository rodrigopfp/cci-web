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
            // Singleton: un único documento de configuración de la página EICI.
            S.listItem()
              .title("Página EICI")
              .id("eici-config")
              .child(S.document().schemaType("eici").documentId("eici-config")),
            S.divider(),
            S.documentTypeListItem("empresaCertificada").title("Radar · Empresas certificadas"),
            S.documentTypeListItem("indicador").title("Radar · Indicadores"),
            S.documentTypeListItem("hito").title("Radar · Línea de tiempo"),
            S.divider(),
            S.documentTypeListItem("estudio").title("Evidencia · Estudios"),
            S.documentTypeListItem("fuente").title("Fuentes"),
            S.divider(),
            S.documentTypeListItem("empresa").title("Ecosistema · Empresas"),
            S.documentTypeListItem("evento").title("Eventos"),
            S.documentTypeListItem("recurso").title("Recursos descargables"),
          ]),
    }),
    // Herramienta para consultar el contenido; útil para depurar.
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
