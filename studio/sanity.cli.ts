import { defineCliConfig } from "sanity/cli";

// Reemplaza projectId por el que te entregue Sanity al crear el proyecto.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REEMPLAZAR",
    dataset: "production",
  },
  // studioHost fija el subdominio del panel: cci.sanity.studio.
  studioHost: "cci",
  deployment: {
    // Mantener el studio en Sanity 5.x. autoUpdates en false evita que el panel
    // hospedado salte solo a la última versión mayor (el salto 5.x → 6.x está
    // pospuesto de forma deliberada).
    autoUpdates: false,
  },
});
