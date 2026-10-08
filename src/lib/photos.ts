import type { ImageMetadata } from "astro";

/**
 * Photos du club, optimisées au build par astro:assets (AVIF/WebP,
 * plusieurs largeurs). On les désigne par leur nom de fichier sans
 * extension : "pre-baie", "manege"...
 */
const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

export const photos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split("/").pop()!.replace(/\.\w+$/, ""), mod.default]),
);

export function photo(name: string): ImageMetadata {
  const meta = photos[name];
  if (!meta) throw new Error(`Photo inconnue : « ${name} » (attendu : ${Object.keys(photos).join(", ")})`);
  return meta;
}

/** Une photo est soit un nom local, soit une URL absolue (Sanity CDN). */
export const isRemote = (src: string) => /^https?:\/\//.test(src);
