import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Client de lecture, utilisé par les pages Astro pour aller chercher le
 * contenu publié dans Sanity (activités, tarifs, actualités...).
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/** Construit l'URL d'une image Sanity, prête à être redimensionnée. */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
