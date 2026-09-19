import { defineField, defineType } from "sanity";

/**
 * Réglages globaux du site (arborescence, rubrique 6 — Infos pratiques).
 * Document unique : un seul existe, édité depuis le Studio plutôt que
 * codé en dur dans le site.
 */
export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({ name: "telephone", title: "Téléphone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "adresse", title: "Adresse", type: "text", rows: 2 }),
    defineField({
      name: "horaires",
      title: "Horaires",
      type: "array",
      of: [{ type: "string" }],
      description: "Une ligne par créneau, ex. « Mercredi 14h-18h »",
    }),
    defineField({ name: "facebook", title: "Lien Facebook", type: "url" }),
    defineField({ name: "instagram", title: "Lien Instagram", type: "url" }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages du site" }),
  },
});
