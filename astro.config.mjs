// @ts-check
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

// astro.config.mjs s'exécute avant le chargement des variables d'env par
// Vite : on charge nous-mêmes le .env pour que l'intégration Sanity
// reçoive bien le projectId/dataset au build comme en dev.
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],
});
