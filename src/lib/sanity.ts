import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

/**
 * Client de lecture, utilisé par les pages Astro pour aller chercher le
 * contenu publié dans Sanity (activités, tarifs, actualités...).
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Le site est généré au build, pas servi à la demande : pas besoin du
  // CDN Sanity (qui a un léger délai de propagation après une
  // publication) — on lit toujours la version la plus fraîche.
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

/** Construit l'URL d'une image Sanity, prête à être redimensionnée. */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
