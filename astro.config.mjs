// @ts-check
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

// astro.config.mjs s'exécute avant le chargement des variables d'env par
// Vite : on charge nous-mêmes le .env pour que l'intégration Sanity
// reçoive bien le projectId/dataset au build comme en dev.
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

// GitHub Pages sert ce repo sous /Club-Equestre-Kairon/ (pas de domaine
// personnalisé pour l'instant) — piloté par une variable d'env plutôt
// qu'en dur, pour que le même code reparte sans modification une fois
// sur Netlify ou un domaine perso (base = "/").
const isGitHubPages = process.env.GITHUB_PAGES === "true";

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages ? "https://aarena18.github.io" : undefined,
  base: isGitHubPages ? "/Club-Equestre-Kairon" : "/",
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
