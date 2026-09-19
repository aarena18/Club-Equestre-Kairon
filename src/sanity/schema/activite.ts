import { defineField, defineType } from "sanity";

/**
 * Une fiche du hub "Activités & cours" (arborescence, rubrique 2).
 * Les 8 sous-pages (baby cavaliers, enfants, adultes...) sont des
 * documents de ce type filtrés par `categorie`, pas des pages séparées.
 */
export default defineType({
  name: "activite",
  title: "Activité / cours",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      type: "slug",
      options: { source: "titre" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Baby cavaliers (2-6 ans)", value: "baby-cavaliers" },
          { title: "Enfants & ados", value: "enfants-ados" },
          { title: "Adultes", value: "adultes" },
          { title: "Expert & compétition", value: "expert-competition" },
          { title: "Équitation adaptée", value: "equitation-adaptee" },
          { title: "Balades & randonnées", value: "balades-randonnees" },
          { title: "Stages vacances", value: "stages-vacances" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trancheAge",
      title: "Tranche d'âge affichée",
      type: "string",
      description: "Ex. « 2-6 ans », « Galop 4+ »",
    }),
    defineField({
      name: "resume",
      title: "Résumé court",
      type: "text",
      rows: 2,
      description: "Affiché sur la carte, dans le hub Activités & cours.",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif (accessibilité)",
          type: "string",
          description: "Décrit la photo pour les lecteurs d'écran.",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description complète",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "texteBouton",
      title: "Texte du bouton",
      type: "string",
      initialValue: "Découvrir",
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      description: "Les activités s'affichent du plus petit au plus grand.",
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "trancheAge", media: "photo" },
  },
});
