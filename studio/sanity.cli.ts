import { defineCliConfig } from "sanity/cli";

// Reemplaza projectId por el que te entregue Sanity al crear el proyecto.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "REEMPLAZAR",
    dataset: "production",
  },
});
