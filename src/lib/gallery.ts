import { getImage } from "astro:assets";
import { photo } from "./photos";

/**
 * Prépare les photos locales pour le carrousel (île React) : une seule
 * taille WebP adaptée aux cartes (≈ 380 px affichés, ×2 pour les écrans
 * haute densité), au lieu des originaux de 1600 px.
 */
export async function galleryCards(items: { src: string; alt: string }[]) {
  return Promise.all(
    items.map(async (p) => {
      const meta = photo(p.src);
      const img = await getImage({ src: meta, width: Math.min(760, meta.width), format: "webp", quality: 78 });
      return { imgUrl: img.src, alt: p.alt };
    }),
  );
}
